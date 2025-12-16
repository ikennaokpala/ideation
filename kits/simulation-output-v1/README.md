# Simulation output v1 kit (Sprint 1 tooling)

This kit provides copy/paste scripts for Sprint 1 guardrails:

- Validate `simulation_run_v1` + `events_v1` JSONL (G1, G2, G3*, G4).
- Scan outputs for raw PII (emails/phones/IPs).
- Determinism check (run generation twice, compare SHA-256).

*G3 is enforced only for operational event types (`request_`, `span_`, `queue_`, `db_`, `error_`).

## Expected file layout (recommended)

- Run manifests: `simulations/runs/*.json` (must match `simulation_run_v1`)
- Outputs: `simulations/outputs/events_v1.jsonl` (JSON Lines, one event per line)

## Scripts

Copy the scripts from `kits/simulation-output-v1/scripts/` into your project’s `scripts/` and run:

- Validate run + events:
  - `node scripts/sim-validate-events-v1.mjs --run simulations/runs/run_v1.json --events simulations/outputs/events_v1.jsonl`

- PII scan:
  - `node scripts/sim-pii-scan.mjs --path simulations/outputs`

- Determinism check (generator command runs twice):
  - `node scripts/sim-determinism-check.mjs --out simulations/outputs/events_v1.jsonl --cmd "node scripts/generate-events.mjs --run simulations/runs/run_v1.json --out simulations/outputs/events_v1.jsonl"`

## Package.json snippet (optional)

```json
{
  "scripts": {
    "sim:validate": "node scripts/sim-validate-events-v1.mjs",
    "sim:pii": "node scripts/sim-pii-scan.mjs",
    "sim:determinism": "node scripts/sim-determinism-check.mjs"
  }
}
```

