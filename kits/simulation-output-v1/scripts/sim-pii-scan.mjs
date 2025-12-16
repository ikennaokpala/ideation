#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function usage() {
  console.log(
    [
      'Usage:',
      '  node scripts/sim-pii-scan.mjs --path <file-or-directory>',
      '',
      'Default:',
      '  --path simulations/outputs'
    ].join('\n')
  );
}

function getArg(args, key, fallback) {
  const index = args.indexOf(key);
  if (index === -1) return fallback;
  return args[index + 1] ?? fallback;
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

function scanText(text) {
  const hits = [];
  for (const { name, re } of PII_PATTERNS) {
    const match = text.match(re);
    if (match) hits.push({ type: name, match: match[0] });
  }
  return hits;
}

function collectFiles(rootPath) {
  const stat = fs.statSync(rootPath);
  if (stat.isFile()) return [rootPath];

  const files = [];
  const stack = [rootPath];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else files.push(full);
    }
  }
  return files;
}

function isScannable(filePath) {
  return filePath.endsWith('.json') || filePath.endsWith('.jsonl') || filePath.endsWith('.txt') || filePath.endsWith('.md');
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    usage();
    process.exit(0);
  }

  const target = getArg(args, '--path', 'simulations/outputs');
  const files = collectFiles(target).filter(isScannable);
  if (files.length === 0) {
    console.log(`No scannable files found under ${target}`);
    process.exit(0);
  }

  const findings = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const hits = scanText(text);
    if (hits.length) findings.push({ file, hits });
  }

  if (findings.length) {
    for (const f of findings) {
      console.log(`✗ PII hits in ${f.file}`);
      for (const hit of f.hits) console.log(`  - ${hit.type}: ${hit.match}`);
    }
    process.exit(1);
  }

  console.log(`✓ PII scan PASS (${files.length} files): ${target}`);
}

main();

