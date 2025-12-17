# Changelog

## v6.1.1

### Progressive Complexity Mode
- New 4-level progression system (quick_start → mvp → competitive → full)
- Quick start templates for rapid adoption (`crud_api`, `auth_api`, `saas_starter`)
- `sparc init --template <name> --level <0-3>` for scaffolding
- `sparc upgrade --to <level>` for incremental depth
- Quality over quantity: 3 well-analyzed competitors now acceptable at Level 2

### Passwordless Authentication Providers
- Email OTP via MailChannels (Cloudflare Workers integration with DKIM)
- SMS OTP via Twilio Verify API
- Social OAuth: Google, Apple, GitHub, Microsoft with PKCE
- No password auth — by design, not configurable

### Production-Ready Simulations
- Complete mock server implementation with stateful mode, CORS, OpenAPI docs
- Complete path explorer implementation with Mermaid flowcharts, coverage tracking
- Implementation status tracking for all features (implemented → in_progress → planned → spec_only)
- Priority-based roadmap (P1: developer tools first, P4: business tools last)

### Schema Consolidation
- Consolidated `auth.yaml` and `auth-passwordless-dsl.yaml` into single canonical schema
- Added `_redirect` pattern for deprecated files with migration guidance
- Added `_meta` sections with code generation targets

### SPARC Lite Mode (Deprecated)
- Replaced by Progressive Complexity Mode Level 0
- Legacy `lite_mode` section retained for backwards compatibility
- Migration path: `progressive_mode.levels[0]`

### Runtime Validation (JSON Schemas)
- Added JSON Schemas under `schemas/json-schemas/` for core DSLs and templates
- Core DSLs: `package.schema.json`, `auth.schema.json`, `ui.schema.json`, `data.schema.json`, `api.schema.json`, `logic.schema.json`
- Templates + configuration: `quick-start.schema.json`, `simulation-modes.schema.json`
- Added/updated `$schema` references for portable validation (including hosted schema URLs under `https://sparc-dsl.dev/schemas/...`)

### Simulation Output Contracts (Deterministic + Auditable)
- Base output schemas: `simulation-run-v1.schema.json` and `events-v1.schema.json` (+ `*.schema.json` aliases)
- Sprint 1 guardrails: determinism checks, PII scanning, and schema validation scripts under `kits/simulation-output-v1/scripts/`
- Sprint 2+ contract schemas: event taxonomy, KPI definitions, journey state machine, billing ledger, acquisition, observability, vector graph
- Copy/paste contract templates under `kits/simulation-output-v1/contracts/`

### Code Generation Documentation
- DSL-to-code mapping tables for all DSLs
- Handlebars template system documentation
- Example transformations for data, ui, logic, api, auth DSLs
- Template directory structure

### CLI Implementation Specification
- Full `sparc` CLI command specification in `simulation/modes.yaml`
- TypeScript implementation examples for all simulation modes
- Mock server, path explorer, coverage report implementations
- Installation and usage instructions

## v6.1

### New Features
- Platform detection (automatic)
- Unified auth for platforms
- Passwordless-only authentication (OTP + Social)
- White-label architecture
- Separate repositories per bounded context
- Simulation modes

### Changes from v6.0
- Removed password authentication
- Added platform architecture schema
- Enhanced cross-service auth
- Added repository structure templates
