#!/usr/bin/env node
import crypto from 'crypto';
import fs from 'fs';

function usage() {
  console.log(
    [
      'Usage:',
      '  node scripts/sim-validate-events-v1.mjs \\',
      '    --run <simulation_run_v1.json> \\',
      '    --events <events_v1.jsonl>',
      '',
      'Defaults:',
      '  --run    simulations/runs/run_v1.json',
      '  --events simulations/outputs/events_v1.jsonl'
    ].join('\n')
  );
}

function getArg(args, key, fallback) {
  const index = args.indexOf(key);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isInt(value) {
  return Number.isInteger(value);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function parseRfc3339ToMs(value, label) {
  assert(isNonEmptyString(value), `Missing ${label}`);
  const ms = Date.parse(value);
  assert(!Number.isNaN(ms), `Invalid RFC3339 ${label}: ${value}`);
  return ms;
}

const PII_PATTERNS = [
  { name: 'email', re: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { name: 'ipv4', re: /\b(?:\d{1,3}\.){3}\d{1,3}\b/ },
  { name: 'ipv6', re: /\b(?:[A-F0-9]{1,4}:){2,7}[A-F0-9]{1,4}\b/i },
  {
    name: 'phone',
    re: /\b(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/
  }
];

function findPii(rawLine) {
  for (const { name, re } of PII_PATTERNS) {
    const match = rawLine.match(re);
    if (match) return { type: name, match: match[0] };
  }
  return null;
}

function validateSimulationRunV1(run) {
  assert(isObject(run), 'Run manifest must be an object');
  assert(run.schema === 'simulation_run_v1', `Run schema must be "simulation_run_v1" (got ${run.schema})`);
  assert(isNonEmptyString(run.simulation_run_id), 'Run simulation_run_id required');
  assert(isInt(run.random_seed), 'Run random_seed must be an integer');
  assert(run.profile === 'low' || run.profile === 'high', 'Run profile must be "low" or "high"');
  parseRfc3339ToMs(run.start_time, 'start_time');
  assert(isInt(run.step_size_ms) && run.step_size_ms > 0, 'Run step_size_ms must be a positive integer');

  const hasTenantId = isNonEmptyString(run.tenant_id);
  const hasTenantIds = Array.isArray(run.tenant_ids) && run.tenant_ids.length > 0;
  assert(hasTenantId || hasTenantIds, 'Run must define tenant_id or tenant_ids[]');
  if (hasTenantIds) {
    for (const tenantId of run.tenant_ids) assert(isNonEmptyString(tenantId), 'Run tenant_ids[] must be non-empty strings');
  }

  assert(isObject(run.generator), 'Run generator must be an object');
  assert(isNonEmptyString(run.generator.name), 'Run generator.name required');
  assert(isNonEmptyString(run.generator.version), 'Run generator.version required');
  assert(isNonEmptyString(run.generator.source_revision), 'Run generator.source_revision required');

  assert(isObject(run.parameters), 'Run parameters must be an object');
  return run;
}

function computeExpectedStepIndex(eventTimeMs, runStartTimeMs, stepSizeMs) {
  return Math.floor((eventTimeMs - runStartTimeMs) / stepSizeMs);
}

function validateEventV1(event, rawLine, run) {
  assert(isObject(event), 'Event must be an object');

  assert(event.schema === 'events_v1', `Event schema must be "events_v1" (got ${event.schema})`);
  assert(isNonEmptyString(event.tenant_id), 'G1: tenant_id required');
  assert(isNonEmptyString(event.simulation_run_id), 'G1: simulation_run_id required');
  assert(event.simulation_run_id === run.simulation_run_id, 'simulation_run_id must match run manifest');

  const pii = findPii(rawLine);
  assert(!pii, `G4: PII detected (${pii?.type}): ${pii?.match}`);

  assert(isNonEmptyString(event.event_id), 'event_id required');
  assert(isNonEmptyString(event.event_type), 'event_type required');

  const eventTimeMs = parseRfc3339ToMs(event.event_time, 'event_time');
  assert(isInt(event.step_index) && event.step_index >= 0, 'G2: step_index must be a non-negative int');

  assert(isObject(event.actor), 'actor must be an object');
  assert(
    event.actor.type === 'org' || event.actor.type === 'user' || event.actor.type === 'system',
    'actor.type invalid'
  );
  assert(isNonEmptyString(event.actor.id), 'actor.id required');

  assert(isObject(event.props), 'props must be an object');

  const tenantAllowList = Array.isArray(run.tenant_ids) ? new Set(run.tenant_ids) : null;
  if (tenantAllowList) assert(tenantAllowList.has(event.tenant_id), `tenant_id not in run tenant_ids[]: ${event.tenant_id}`);
  if (isNonEmptyString(run.tenant_id)) assert(event.tenant_id === run.tenant_id, 'tenant_id must match run tenant_id');

  const runStartTimeMs = parseRfc3339ToMs(run.start_time, 'start_time');
  const expectedStep = computeExpectedStepIndex(eventTimeMs, runStartTimeMs, run.step_size_ms);
  assert(expectedStep === event.step_index, `step_index mismatch (expected ${expectedStep}, got ${event.step_index})`);

  const isOperational = /^(request_|span_|queue_|db_|error_)/.test(event.event_type);
  if (isOperational) {
    assert(isNonEmptyString(event.trace_id), 'G3: operational event missing trace_id');
    assert(isNonEmptyString(event.service), 'G3: operational event missing service');
    assert(isNonEmptyString(event.operation), 'G3: operational event missing operation');
    assert(
      isNonEmptyString(event.parent_span_id) || isNonEmptyString(event.parent_event_id),
      'G3: operational event missing parent_span_id or parent_event_id'
    );
  }
}

function sha256FileHex(filePath) {
  const hash = crypto.createHash('sha256');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    usage();
    process.exit(0);
  }

  const runPath = getArg(args, '--run', 'simulations/runs/run_v1.json');
  const eventsPath = getArg(args, '--events', 'simulations/outputs/events_v1.jsonl');

  const run = validateSimulationRunV1(JSON.parse(fs.readFileSync(runPath, 'utf8')));
  const raw = fs.readFileSync(eventsPath, 'utf8');
  const lines = raw.split('\n').filter(Boolean);
  assert(lines.length > 0, `No events found in ${eventsPath}`);

  let validated = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    let event;
    try {
      event = JSON.parse(line);
    } catch (err) {
      throw new Error(`Invalid JSON on line ${i + 1}: ${(err && err.message) || err}`);
    }
    try {
      validateEventV1(event, line, run);
    } catch (err) {
      throw new Error(`Validation failed on line ${i + 1}: ${(err && err.message) || err}`);
    }
    validated += 1;
  }

  const sha = sha256FileHex(eventsPath);
  console.log(`✓ Run manifest valid: ${runPath}`);
  console.log(`✓ Events valid: ${validated} lines`);
  console.log(`✓ events_v1.jsonl sha256: ${sha}`);
}

main();

