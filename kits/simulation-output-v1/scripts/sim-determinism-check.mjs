#!/usr/bin/env node
import crypto from 'crypto';
import fs from 'fs';
import { execSync } from 'child_process';

function usage() {
  console.log(
    [
      'Usage:',
      '  node scripts/sim-determinism-check.mjs \\',
      '    --out <events_v1.jsonl> \\',
      '    --cmd "<generator command that produces --out>"',
      '',
      'Example:',
      '  node scripts/sim-determinism-check.mjs \\',
      '    --out simulations/outputs/events_v1.jsonl \\',
      '    --cmd "node scripts/generate-events.mjs --run simulations/runs/run_v1.json --out simulations/outputs/events_v1.jsonl"',
      '',
      'Defaults:',
      '  --out simulations/outputs/events_v1.jsonl'
    ].join('\n')
  );
}

function getArg(args, key, fallback) {
  const index = args.indexOf(key);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
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

  const outPath = getArg(args, '--out', 'simulations/outputs/events_v1.jsonl');
  const cmd = getArg(args, '--cmd', null);
  if (!cmd) {
    usage();
    process.exit(1);
  }

  execSync(cmd, { stdio: 'inherit', shell: true });
  const shaA = sha256FileHex(outPath);

  execSync(cmd, { stdio: 'inherit', shell: true });
  const shaB = sha256FileHex(outPath);

  if (shaA !== shaB) {
    console.log(`✗ Determinism FAIL: ${shaA} != ${shaB}`);
    process.exit(1);
  }

  console.log(`✓ Determinism PASS (sha256=${shaA})`);
}

main();

