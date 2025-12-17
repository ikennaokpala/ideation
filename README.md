# SPARC v6.1.1 — Unified Analysis → Simulation → Executable DSL Framework

> **Philosophy:** Analysis informs specification, specification becomes code.
> **Architecture:** Platform-aware, white-label ready, change-friendly.
> **Authentication:** Passwordless only (OTP via MailChannels/Twilio + Social Login). No passwords.

---

## Implementation Status

| Feature | Status | Priority | Description |
|---------|--------|----------|-------------|
| `sparc generate api` | ✅ Implemented | P1 | Generate API routes from dsl/api.yaml |
| `sparc sim api:mock` | ✅ Implemented | P1 | Mock server from API spec |
| `sparc generate db` | ✅ Implemented | P1 | Generate database schema/migrations |
| `sparc sim software:paths` | ✅ Implemented | P1 | Interactive cyclomatic path explorer |
| `sparc validate` | ✅ Implemented | P1 | Schema validation for all YAML files |
| `sparc init` | ✅ Implemented | P1 | Initialize project with templates |
| `sparc upgrade` | ✅ Implemented | P1 | Upgrade project complexity level |
| `sparc generate tests` | 🔄 In Progress | P2 | Generate test scaffolding from paths |
| `sparc sim tests:coverage` | 🔄 In Progress | P2 | Path-to-test coverage mapping |
| `sparc lint` | 📋 Planned | P3 | Best practices linting |
| `sparc sim data:diagram` | 📋 Planned | P3 | ERD visualization |
| `sparc sim software:states` | 📋 Planned | P3 | State machine viewer |
| `sparc interactive` | 📋 Planned | P4 | Full dashboard |
| `sparc sim business:landscape` | 📝 Spec Only | P4 | Competitive landscape chart |
| `sparc sim deploy:cost` | 📝 Spec Only | P4 | Infrastructure cost estimation |

---

## Table of Contents

1. [Overview](#overview)
2. [What's New in v6.1.1](#whats-new-in-v611)
3. [What SPARC v6.1 Generates](#what-sparc-v61-generates)
4. [Key Principles](#key-principles)
5. [Quick Start](#quick-start)
6. [Progressive Complexity Mode](#progressive-complexity-mode)
7. [Input Formats](#input-formats)
8. [Architecture Decision: Platform vs Single SaaS](#architecture-decision-platform-vs-single-saas)
9. [The Analysis Pipeline](#the-analysis-pipeline)
   - [Phase 1: Business Competitor Analysis](#phase-1-business-competitor-analysis)
   - [Phase 2: Business Ideal Synthesis](#phase-2-business-ideal-synthesis)
   - [Phase 3: Software Competitor Analysis](#phase-3-software-competitor-analysis)
   - [Phase 4: Software Ideal Specification](#phase-4-software-ideal-specification)
10. [Cyclomatic Path Coverage](#cyclomatic-path-coverage)
11. [Executable DSL Family](#executable-dsl-family)
12. [Testing Philosophy](#testing-philosophy)
13. [Authentication Architecture](#authentication-architecture)
14. [Platform Architecture](#platform-architecture)
15. [White-Label Support](#white-label-support)
16. [Simulation Modes](#simulation-modes)
17. [Directory Structure](#directory-structure)
18. [Schema Reference](#schema-reference)
19. [Code Generation](#code-generation)
20. [Validation Checklist](#validation-checklist)
21. [Examples](#examples)
22. [FAQ](#faq)
23. [Changelog](#changelog)

---

## Overview

SPARC (Specification, Planning, Architecture, Research, Coding) v6.1 is a **meta-prompt framework** that transforms a business idea into a complete, executable specification through systematic analysis.

### The Problem SPARC Solves

Building software without proper analysis leads to:
- Building features nobody wants
- Pricing that doesn't fit the market
- Architecture that doesn't scale
- Incomplete specifications that cause endless back-and-forth
- Tests that don't cover real edge cases

### The SPARC Solution

SPARC v6.1 provides a structured pipeline:

```
Idea → Business Analysis → Software Analysis → Exhaustive Specification → Executable DSLs → Code
         ↓                    ↓                      ↓                        ↓
    Understand            Understand            Document ALL            Machine-readable
    the market            competitors           possible paths          blueprints
```

### What Makes v6.1 Special

| Feature | Description |
|---------|-------------|
| **Platform Detection** | Automatically determines if you're building a platform or single SaaS |
| **Unified Auth** | Platforms get shared authentication across all services |
| **Passwordless Only** | OTP (email/SMS) + Social Login — no passwords ever |
| **White-Label Ready** | Every service can be deployed standalone for clients |
| **Exhaustive Paths** | Every cyclomatic path documented and tested |
| **Separate Repos** | Each bounded context becomes its own Git repository |

---

## What's New in v6.1.1

### Progressive Complexity Mode
No more "all or nothing" analysis. Start with a minimal spec and add depth incrementally:

| Level | Name | What You Need | What You Get |
|-------|------|---------------|--------------|
| 0 | Quick Start | `spec/quick-start.yaml` | Basic code generation, simple mock server |
| 1 | MVP Spec | `dsl/*.yaml` + `software-ideal.yaml` | Full code gen, cyclomatic tests, DB migrations |
| 2 | Competitive | Level 1 + 3 competitors analyzed | Feature gap analysis, pricing comparison |
| 3 | Full | 5-8 competitors + all DSLs | Everything: all simulations, platform architecture |

**Start fast, add depth later:**
```bash
sparc init --template crud_api --level 0    # 30 minutes to working spec
sparc upgrade --to mvp                       # When ready for more detail
sparc upgrade --to competitive               # When planning strategy
```

### Passwordless Authentication Providers
Authentication uses OTP (email/SMS) + Social Login only — no passwords by design:

| Channel | Provider | Configuration |
|---------|----------|---------------|
| Email OTP | MailChannels | Via Cloudflare Workers with DKIM support |
| SMS OTP | Twilio | Via Twilio Verify API for better deliverability |
| Social | Google, Apple, GitHub, Microsoft | OAuth 2.0 with PKCE |

This eliminates password-related security risks (breaches, phishing, credential stuffing) and simplifies UX (no password reset flows).

### Production-Ready Simulations
Mock server and path explorer now have complete implementations:

```bash
# Start a stateful mock API server with OpenAPI docs
sparc sim api:mock --stateful --port 3000
# → http://localhost:3000/docs for Swagger UI

# Explore all cyclomatic paths with coverage tracking
sparc sim software:paths
# → Interactive flowchart with test coverage indicators
```

### Quality Over Quantity for Competitor Analysis
You can now analyze 3 competitors instead of 5-8 if they include:
- Market leader (dominant player)
- Direct competitor (most similar to you)
- Adjacent player (different approach to same problem)

Deep analysis of 3 competitors beats superficial analysis of 8.

---

## What SPARC v6.1 Generates

When you run SPARC v6.1 with your idea, you get:

### 1. Architecture Decision
- Platform vs Single SaaS determination
- Bounded contexts identification
- Repository structure

### 2. Business Analysis (5-8 competitors)
- Company profiles and funding
- Market positioning and share
- Business models and pricing
- Customer segments and ICP
- Go-to-market strategies
- Competitive moats
- SWOT analysis

### 3. Business Strategy
- Optimal positioning
- Pricing strategy
- Go-to-market plan
- Moat building sequence
- Success metrics
- Risk analysis

### 4. Software Analysis (5-8 competitors)
- Technical architecture
- Feature inventory
- UX analysis
- Integration ecosystem
- Feature gaps

### 5. Software Specification
- Product vision
- Feature specifications with:
  - All decision points
  - All cyclomatic paths
  - All edge cases
  - All boundary conditions
  - State machines
  - API specifications

### 6. Executable DSLs
- `data.yaml` — Database schema
- `ui.yaml` — Screens and components
- `logic.yaml` — Workflows and state machines
- `api.yaml` — Endpoints and handlers
- `auth.yaml` — Authentication (passwordless)
- `deploy.yaml` — Infrastructure

### 7. Test Specifications
- API integration tests for every path
- Factories for test data
- Mocks for external services only

### 8. Simulation Tools
- Competitive landscape visualization
- Path explorer
- Mock API server
- UI prototypes
- Cost estimation

---

## Key Principles

### 1. Analysis Before Building
Never build without understanding the market, competitors, and users first.

### 2. Exhaustive Specification
Document every possible path through the system. If it's not specified, it can't be built correctly.

### 3. Passwordless Authentication
Passwords are a security liability. Use OTP (email/SMS) and Social Login only.

### 4. Platform-Aware Architecture
Detect early if you're building a platform. Platforms need unified auth and separate repositories.

### 5. White-Label by Default
Every service should be deployable standalone for white-label clients.

### 6. API Integration Tests Only
No unit tests. All tests hit real APIs with real databases. Mock only external services.

### 7. Factories Over Fixtures
Generate test data dynamically. Fixtures are a last resort.

---

## Quick Start

### Step 1: Prepare Your Input

**Express format (simple):**
```
IDEA: AI-powered notification platform for SaaS companies
FOR: B2B SaaS product teams
BECAUSE: Existing solutions are complex and expensive
LIKE: Customer.io, Knock, Novu, OneSignal, Courier
STACK: React/Rust/PostgreSQL
DEPLOY: AWS/Kubernetes
PLATFORM: yes
WHITE_LABEL: yes
```

**Or full YAML format** (see [Input Formats](#input-formats))

### Step 2: Run the Meta-Prompt

Paste the `SPARC-META-PROMPT-v6.1.md` into Claude along with your input.

### Step 3: Review Generated Output

You'll receive:
- Architecture decision
- Business competitor analyses
- Business ideal synthesis
- Software competitor analyses
- Software ideal specification
- All DSL files
- Test specifications

### Step 4: Generate Code

Use the DSL interpreters to generate actual code:
```bash
sparc generate data      # → SQL migrations, ORM models
sparc generate ui        # → React components
sparc generate logic     # → Services, state machines
sparc generate api       # → API routes, OpenAPI spec
sparc generate auth      # → Auth middleware, RBAC
sparc generate deploy    # → Terraform, Kubernetes
sparc generate tests     # → Integration tests
```

### Step 5: Run Simulations

Explore and validate before building:
```bash
sparc sim business:landscape    # Competitive positioning
sparc sim software:paths        # Explore all paths
sparc sim api:mock              # Run mock API server
sparc sim tests:coverage        # Check test coverage
```

---

## Progressive Complexity Mode

SPARC v6.1.1 introduces progressive complexity to prevent scope creep and abandonment. Instead of requiring full competitor analysis upfront, you can start minimal and add depth incrementally.

### The Problem with Full Analysis Upfront

The full SPARC pipeline (5-8 competitor analyses × business + software) is massive. Teams often:
- Abandon partway through due to overwhelming scope
- Generate superficial "checkbox" analyses to complete faster
- Never reach code generation because specification takes too long

### The Solution: Progressive Levels

| Level | Name | Required Files | Unlocks |
|-------|------|----------------|---------|
| **0** | `quick_start` | `spec/quick-start.yaml` | Basic code gen, simple mock server, happy path tests |
| **1** | `mvp_spec` | `dsl/*.yaml` + `software-ideal.yaml` | Full code gen, stateful mock, cyclomatic tests, DB migrations |
| **2** | `competitive_aware` | Level 1 + `top-3.yaml` competitors | Competitive landscape sim, feature gaps, pricing comparison |
| **3** | `full_analysis` | 5-8 competitors + platform architecture | All simulations, infrastructure cost estimation |

### Quick Start Templates

Get started in 30 minutes with pre-built templates:

```bash
# Simple REST API
sparc init --template crud_api
# → spec/quick-start.yaml, dsl/data.yaml, dsl/api.yaml

# API with authentication
sparc init --template auth_api
# → Adds dsl/auth.yaml with OTP + Social

# Multi-tenant SaaS
sparc init --template saas_starter
# → All DSLs + basic software-ideal.yaml

# Multi-service platform
sparc init --template platform_starter
# → Platform architecture + all DSLs
```

### Upgrading Between Levels

As your project matures, upgrade to add more depth:

```bash
# Start with quick spec
sparc init --template crud_api --level 0

# Add full DSL specs when ready for production
sparc upgrade --to mvp

# Add competitor analysis when planning strategy
sparc upgrade --to competitive

# Full analysis for enterprise/fundraising
sparc upgrade --to full
```

### Quality Over Quantity

For competitor analysis, depth beats breadth:

**Minimum viable competitor set (3):**
1. **Market leader** — The dominant player everyone knows
2. **Direct competitor** — Most similar to your product
3. **Adjacent player** — Different approach to same problem

This is sufficient for Level 2. Full analysis (5-8 competitors) unlocks more patterns but isn't required.

---

## Input Formats

### Express Format

Quick input for getting started:

```
IDEA: [One sentence description]
FOR: [Target users]
BECAUSE: [Problem being solved]
LIKE: [5-8 competitors to analyze]
STACK: [frontend/backend/database]
DEPLOY: [cloud/orchestration]
PLATFORM: [yes/no]
WHITE_LABEL: [yes/no]
```

### Full YAML Format

Complete input with all options:

```yaml
idea:
  name: "NotifyCommons"
  tagline: "Unified notifications for modern SaaS"
  description: |
    A notification platform that handles email, SMS, push, and in-app
    notifications with a simple API and powerful templates.
  problem_statement: |
    SaaS teams spend weeks building notification infrastructure instead
    of focusing on their core product. Existing solutions are either
    too complex or too expensive for growing companies.
  target_users:
    - "B2B SaaS product teams"
    - "Developer-led companies"
    - "Startups scaling past MVP"
  primary_kpi: "Monthly Active Notifications Sent"
  
  platform_signals:
    multiple_user_types:
      - "End users receiving notifications"
      - "Developers integrating API"
      - "Product managers designing templates"
    multiple_products:
      - "Notification API"
      - "Template Editor"
      - "Analytics Dashboard"
    marketplace: false
    white_label_needed: true

constraints:
  budget_tier: "startup"          # bootstrap | startup | funded | enterprise
  timeline: "mvp"                 # mvp | standard | comprehensive
  team_size: "small"              # solo | small | medium | large

preferences:
  stack:
    frontend: "react"             # react | vue | svelte | nextjs
    backend: "rust"               # rust | node | python | go
    database: "postgres"          # postgres | mysql | mongodb
    
  deployment:
    cloud: "aws"                  # aws | gcp | azure | vercel
    orchestration: "kubernetes"   # kubernetes | docker | serverless
    
  architecture:
    white_label: true
    multi_tenant: true

comparables:
  similar_to:
    - "Customer.io"
    - "Knock"
    - "Novu"
    - "OneSignal"
    - "Courier"
    - "Pushover"
    - "MagicBell"
  gaps_in_existing:
    - "Too complex for simple use cases"
    - "Expensive at scale"
    - "Poor developer experience"
    - "Limited white-label options"
```

---

## Architecture Decision: Platform vs Single SaaS

SPARC v6.1 automatically analyzes your idea to determine the appropriate architecture.

### Platform Indicators (3+ triggers platform architecture)

- Multiple distinct user types with different products
- Multiple revenue streams
- Marketplace dynamics
- Suite of related but separable tools
- B2B2C model
- White-label requirement
- Multiple bounded contexts with shared identity
- API-first with multiple consumer applications

### Single SaaS Indicators

- One primary user type
- One core product/feature set
- Single revenue model
- Monolithic feature set

### What Changes for Platforms

| Aspect | Single SaaS | Platform |
|--------|-------------|----------|
| Repositories | Single repo | One per bounded context |
| Authentication | Built into app | Separate auth service |
| Database | Single database | Database per service |
| Deployment | Single deployment | Service mesh |
| Communication | In-process | Events + APIs |

---

## The Analysis Pipeline

### Phase 1: Business Competitor Analysis

For each of 5-8 competitors, SPARC analyzes:

#### Company Profile
- Stage (seed → mature)
- Funding history
- Team size and composition
- Key leadership
- Recent news

#### Market Analysis
- TAM/SAM/SOM
- Market position
- Growth trajectory
- Competitive intensity

#### Business Model
- Revenue streams
- Pricing tiers
- Unit economics (CAC, LTV, churn)
- Monetization levers

#### Customer Analysis
- Segments
- Ideal Customer Profile
- Customer journey
- Notable customers
- Sentiment (reviews, NPS)

#### Go-to-Market
- Primary motion (PLG, sales-led, etc.)
- Marketing channels
- Partnerships
- International presence

#### Competitive Positioning
- Moat type and strength
- Differentiation factors
- Win/loss reasons
- Vulnerabilities

#### Cognitive Analysis
- **Adversarial:** What could go wrong for them?
- **Contrarian:** What does everyone get wrong?
- **Temporal:** How will they evolve?
- **First principles:** What's actually true?

### Phase 2: Business Ideal Synthesis

Synthesizes all competitor analysis into your optimal strategy:

#### Competitor Synthesis
- Patterns observed
- Gaps identified
- Lessons learned
- Anti-patterns to avoid

#### Optimal Positioning
- Target market definition
- Positioning statement
- Differentiation strategy
- Messaging framework

#### Optimal Business Model
- Pricing strategy
- Tier structure
- Unit economics targets
- Monetization timeline

#### Optimal Go-to-Market
- Primary motion
- Phase 1 launch plan
- Phase 2 growth plan
- Acquisition and retention strategies

#### Moat Strategy
- Primary moat type
- Building sequence
- Reinforcing loops

#### Risk Analysis
- Market risks
- Competitive risks
- Execution risks
- Mitigation strategies

#### Success Metrics
- North star metric
- Primary metrics
- Health metrics
- Anti-metrics

### Phase 3: Software Competitor Analysis

For each competitor, SPARC analyzes their product:

#### Product Overview
- Type (web, mobile, API)
- Platforms
- Deployment model
- Maturity level

#### Technical Architecture
- Stack (frontend, backend, database)
- API design
- Scalability approach
- Security posture

#### Feature Inventory
- Features by domain
- Maturity ratings
- Quality assessments
- Competitive strength

#### UX Analysis
- Design system quality
- Information architecture
- Onboarding flow
- Key workflows
- Performance

#### Integration Ecosystem
- Native integrations
- API capabilities
- Marketplace

#### Cognitive Analysis
- Security concerns
- User frustrations
- Innovation velocity
- Stagnant areas

#### Feature Gaps
- Missing features
- Incomplete features
- Poor implementations

### Phase 4: Software Ideal Specification

The complete software specification with **exhaustive cyclomatic paths**.

#### Product Vision
- Mission statement
- Job-to-be-done
- Design principles
- Technical principles

#### Feature Specifications

Each feature includes:

1. **User Stories**
   - As a [user type]
   - I want to [action]
   - So that [benefit]

2. **Scenarios**
   - Happy path
   - Preconditions
   - Postconditions

3. **Decision Points** (every branch)
   ```yaml
   decision_points:
     - id: "DP-001"
       name: "Email format validation"
       description: "Check if email is valid format"
       branches:
         - id: "A"
           condition: "Valid email format"
           leads_to: "DP-002"
         - id: "B"
           condition: "Invalid email format"
           leads_to: "Return 400 error"
   ```

4. **All Paths** (every combination)
   ```yaml
   paths:
     - path_id: "PATH-001"
       name: "Successful registration"
       branch_sequence: ["DP-001:A", "DP-002:A", "DP-003:A"]
       probability: "70%"
       priority: "P0"
       http_status: 201
       
     - path_id: "PATH-002"
       name: "Invalid email format"
       branch_sequence: ["DP-001:B"]
       probability: "5%"
       priority: "P0"
       http_status: 400
       error_code: "INVALID_EMAIL_FORMAT"
   ```

5. **Edge Cases**
   ```yaml
   edge_cases:
     - id: "EDGE-001"
       name: "Unicode email"
       input: "üser@dömain.com"
       expected: "Should accept valid unicode"
       
     - id: "EDGE-002"
       name: "SQL injection attempt"
       input: "'; DROP TABLE users; --"
       expected: "Should sanitize and reject"
   ```

6. **Boundary Conditions**
   ```yaml
   boundary_conditions:
     email:
       - boundary: "minimum_length"
         value: 6
         test_at: 6
         test_below: 5
       - boundary: "maximum_length"
         value: 254
         test_at: 254
         test_above: 255
   ```

7. **State Machines**
   ```yaml
   state_machine:
     entity: "User"
     states:
       - name: "unverified"
         description: "Email not verified"
       - name: "verified"
         description: "Email verified, active"
       - name: "suspended"
         description: "Account suspended"
     transitions:
       - from: "unverified"
         to: "verified"
         event: "verify_email"
         guard: "valid_verification_token"
         action: "mark_email_verified"
   ```

8. **API Specification**
   ```yaml
   api:
     endpoint: "/api/v1/auth/register"
     method: "POST"
     request_body:
       email:
         type: "string"
         format: "email"
         required: true
     responses:
       201:
         description: "User created"
         body:
           id: "uuid"
           email: "string"
       400:
         description: "Validation error"
         body:
           error: "string"
           code: "string"
   ```

---

## Cyclomatic Path Coverage

### What is Cyclomatic Path Coverage?

Every feature has decision points (if/else, validations, conditions). Cyclomatic path coverage means documenting and testing **every possible path** through these decisions.

### Example: User Registration

**Decision Points:**
1. DP-001: Is email format valid?
2. DP-002: Is password long enough?
3. DP-003: Does password have uppercase?
4. DP-004: Does password have number?
5. DP-005: Does email already exist?
6. DP-006: Did database insert succeed?
7. DP-007: Did email send succeed?

**Paths Generated:**
- PATH-001: All pass → 201 Created (happy path)
- PATH-002: DP-001 fails → 400 Invalid email
- PATH-003: DP-002 fails → 400 Password too short
- PATH-004: DP-003 fails → 400 Missing uppercase
- PATH-005: DP-004 fails → 400 Missing number
- PATH-006: DP-005 fails → 409 Email exists
- PATH-007: DP-006 fails → 500 Database error
- PATH-008: DP-007 fails → 201 but with retry queue

### Why This Matters

1. **Complete specification** — Nothing is ambiguous
2. **Test generation** — Every path has a test
3. **Edge case coverage** — Forces you to think about failures
4. **Documentation** — Developers know exactly what to build

---

## Executable DSL Family

### data.yaml — Database Schema

```yaml
entities:
  - name: "User"
    table: "users"
    columns:
      - name: "id"
        type: "uuid"
        primary: true
      - name: "email"
        type: "varchar(255)"
        unique: true
    indexes:
      - columns: ["email"]
        unique: true
    
relationships:
  - type: "one_to_many"
    from: "User"
    to: "Notification"
    foreign_key: "user_id"
```

**Generates:**
- SQL migrations
- Drizzle/Prisma schema
- TypeScript types
- Seed data

### ui.yaml — Screens & Components

```yaml
design_system:
  colors:
    primary: "#6366F1"
  typography:
    font_family: "Inter"
    
screens:
  - name: "LoginScreen"
    route: "/login"
    layout: "centered"
    components:
      - type: "EmailInput"
        props:
          placeholder: "Enter your email"
      - type: "Button"
        props:
          label: "Send OTP"
          action: "requestOtp"
```

**Generates:**
- React/Vue components
- Storybook stories
- CSS/Tailwind styles
- Navigation config

### logic.yaml — Workflows & State Machines

```yaml
workflows:
  - name: "user_registration"
    trigger: "api_call"
    steps:
      - name: "validate_email"
        type: "validation"
        schema: "email"
      - name: "check_existing"
        type: "query"
        entity: "User"
        
state_machines:
  - name: "NotificationState"
    initial: "pending"
    states: ["pending", "sent", "delivered", "failed"]
    transitions:
      - event: "send"
        from: "pending"
        to: "sent"
```

**Generates:**
- Service classes
- XState machines
- Zod schemas
- Validation functions

### api.yaml — Endpoints & Handlers

```yaml
endpoints:
  - path: "/api/v1/auth/otp/request"
    method: "POST"
    handler: "otp.request"
    auth: false
    rate_limit:
      max: 5
      window: "15m"
    request:
      body:
        email: { type: "string", format: "email" }
    responses:
      200: { message: "string" }
      429: { error: "string", retry_after: "integer" }
```

**Generates:**
- Hono/Express/Axum routes
- OpenAPI specification
- TypeScript SDK
- API documentation

### auth.yaml — Authentication (Passwordless)

```yaml
authentication:
  passwordless_only: true
  
  methods:
    email_otp:
      enabled: true
      code_length: 6
      ttl_seconds: 600
      
    social:
      providers:
        google: { enabled: true }
        apple: { enabled: true }
        github: { enabled: true }
```

**Generates:**
- Auth middleware
- OTP handling
- OAuth integration
- Session management

### deploy.yaml — Infrastructure

```yaml
infrastructure:
  cloud: "aws"
  region: "us-east-1"
  
  compute:
    type: "kubernetes"
    cluster: "eks"
    
  database:
    type: "rds"
    engine: "postgres"
    
  cache:
    type: "elasticache"
    engine: "redis"
```

**Generates:**
- Terraform configs
- Kubernetes manifests
- Helm charts
- GitHub Actions

---

## Testing Philosophy

### Hard Rules (Non-Negotiable)

#### 1. NO UNIT TESTS
All tests are API-level integration tests. Tests make real HTTP requests through the full stack.

#### 2. MOCK ONLY EXTERNAL SERVICES

**Allowed to mock:**
- OAuth providers (Google, Apple, GitHub)
- Email providers (MailChannels)
- SMS providers (Twilio)
- Payment providers (Stripe)
- Any third-party API

**NEVER mock:**
- Database (use real test database)
- Redis/cache (use real test instance)
- File system
- Message queues
- Internal services
- ORM/query builders

#### 3. FACTORIES OVER FIXTURES
```yaml
factories:
  UserFactory:
    defaults:
      email: "{{faker.internet.email}}"
    traits:
      verified:
        email_verified: true
      admin:
        role: "admin"
```

#### 4. REAL DATABASE
All tests hit a real database. Isolation via transaction rollback or truncation.

#### 5. TEST EVERY PATH
Every PATH-*, EDGE-*, and boundary condition from software-ideal.yaml must have a test.

#### 6. NEVER IGNORE TESTS
Do not mark any test as ignored, skipped, or disabled for any reason. If a test is failing and you cannot make it pass, continue thinking differently and find another approach. Tests exist to catch real issues — ignoring them defeats their purpose and hides problems that will surface later in production.

### Test File Structure

```yaml
# tests/tests.yaml

test_suites:
  - name: "user_registration"
    feature_ref: "software-ideal.yaml#/user_registration"
    
    tests:
      - name: "registers user successfully"
        path_ref: "PATH-001"
        
        arrange:
          factory: null  # No existing data needed
          mocks:
            sendgrid:
              scenario: "send_success"
              
        act:
          request:
            method: "POST"
            path: "/api/v1/auth/otp/request"
            body:
              email: "{{faker.internet.email}}"
              
        assert:
          response:
            status: 200
            body:
              message: "Code sent"
          database:
            - table: "otp_requests"
              count: 1
          side_effects:
            - mock: "sendgrid"
              called: true
```

---

## Authentication Architecture

### Passwordless Only — By Design

SPARC v6.1.1 enforces passwordless authentication exclusively:

| Method | Provider | Configuration |
|--------|----------|---------------|
| Email OTP | MailChannels | 6-digit codes, 10 min TTL, 3 max attempts |
| SMS OTP | Twilio Verify | 6-digit codes, 5 min TTL, 3 max attempts |
| Social OAuth | Google, Apple, GitHub, Microsoft | OAuth 2.0 with PKCE |

### Why Passwordless Only (No Exceptions)

1. **Security** — Passwords are the #1 attack vector (credential stuffing, breaches, phishing)
2. **UX** — No passwords to remember, forget, or reset
3. **Simplicity** — No password_hash column, no reset flows, no complexity rules
4. **Modern** — Users expect magic links and social login

### This is Not Configurable

Unlike some frameworks that offer password auth as an option, SPARC enforces passwordless:
- **No `password_hash` column** in the users table
- **No password auth endpoints** generated
- **No password reset flows** to build or maintain

If your requirements mandate passwords (legacy migration, regulatory), SPARC is not the right framework for that project.

### Authentication Flows

#### Email OTP Flow
```
1. User enters email
2. POST /auth/otp/request {email}
3. System sends 6-digit code
4. User enters code
5. POST /auth/otp/verify {email, code}
6. System returns {access_token, refresh_token, user}
```

#### Social Login Flow
```
1. User clicks "Continue with Google"
2. GET /auth/oauth/google
3. Redirect to Google
4. User authenticates
5. GET /auth/oauth/google/callback
6. System returns {access_token, refresh_token, user}
```

### Database Schema (No password_hash!)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  phone VARCHAR(20) UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  name VARCHAR(255),
  avatar_url TEXT,
  preferred_auth_method VARCHAR(20) DEFAULT 'email_otp',
  created_at TIMESTAMPTZ DEFAULT NOW()
  -- NO password_hash column!
);

CREATE TABLE oauth_connections (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  provider VARCHAR(20) NOT NULL,
  provider_user_id VARCHAR(255) NOT NULL,
  UNIQUE(provider, provider_user_id)
);

CREATE TABLE otp_requests (
  id UUID PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL,
  identifier_type VARCHAR(10) NOT NULL,
  code_hash VARCHAR(255) NOT NULL,
  purpose VARCHAR(20) NOT NULL,
  attempts INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ NOT NULL
);
```

---

## Platform Architecture

When SPARC detects a platform, it generates:

### Bounded Contexts

Each major domain becomes a bounded context:

```yaml
bounded_contexts:
  shared_services:
    - auth           # Authentication (OTP + Social)
    - billing        # Subscriptions, payments
    - notifications  # Email, SMS, push delivery
    
  products:
    - merchant-portal
    - consumer-app
    - admin-dashboard
```

### Repository Structure

**Each bounded context = separate Git repository**

```
{platform}/                        # GitHub Organization
├── {platform}-platform/           # Meta repo (specs, infra)
├── {platform}-auth/               # Auth service
├── {platform}-billing/            # Billing service
├── {platform}-notifications/      # Notification service
├── {platform}-merchant-portal/    # Product
├── {platform}-consumer-app/       # Product
├── {platform}-common/             # Shared library
└── {platform}-sdk/                # Client SDKs
```

### Unified Authentication

All services share the auth service:

```
┌─────────────────┐     ┌─────────────────┐
│ Merchant Portal │────▶│                 │
└─────────────────┘     │                 │
                        │   Auth Service  │
┌─────────────────┐     │   (OTP/Social)  │
│  Consumer App   │────▶│                 │
└─────────────────┘     │                 │
                        └────────┬────────┘
                                 │
                           JWT tokens
                                 │
┌─────────────────┐              │
│ Billing Service │◀─────────────┤
└─────────────────┘              │
                                 │
┌─────────────────┐              │
│  Notification   │◀─────────────┘
│    Service      │
└─────────────────┘
```

### Cross-Service Communication

```yaml
cross_cutting:
  api_gateway:
    type: "unified"
    routes_to: "bounded_contexts"
    
  event_bus:
    type: "rabbitmq"
    patterns:
      - "Domain events"
      - "Integration events"
      
  observability:
    tracing: "opentelemetry"
    logging: "structured_json"
    metrics: "prometheus"
```

---

## White-Label Support

Every service can be deployed standalone for white-label clients.

### Customization Layers

| Layer | What's Customizable |
|-------|---------------------|
| **Branding** | Logo, colors, fonts |
| **Domain** | Custom domain, SSL |
| **Features** | Feature flags, modules |
| **Integrations** | OAuth apps, email/SMS providers |

### Tenant Isolation

```yaml
tenant_isolation:
  data:
    strategy: "schema_per_tenant"
  compute:
    strategy: "shared"  # or "dedicated" for enterprise
  storage:
    strategy: "prefixed"
```

### Standalone Deployment

Each product can be deployed independently:

```yaml
standalone_deployment:
  options:
    - docker_compose     # Simple
    - kubernetes_helm    # Scalable
    - terraform_module   # Enterprise
    
  configuration:
    method: "environment_variables"
    secrets: "external_secret_manager"
```

---

## Simulation Modes

### Business Simulations

| Command | Description |
|---------|-------------|
| `sparc sim business:landscape` | Competitive positioning map |
| `sparc sim business:pricing` | Pricing tier comparison |
| `sparc sim business:market` | TAM/SAM/SOM visualization |
| `sparc sim business:gtm` | Go-to-market timeline |

### Software Simulations

| Command | Description |
|---------|-------------|
| `sparc sim software:features` | Feature comparison matrix |
| `sparc sim software:paths` | Cyclomatic path explorer |
| `sparc sim software:states` | State machine viewer |
| `sparc sim software:api` | API documentation (Swagger) |

### Technical Simulations

| Command | Description |
|---------|-------------|
| `sparc sim api:mock` | Running mock API server |
| `sparc sim ui:prototype` | Interactive UI prototype |
| `sparc sim data:diagram` | Entity relationship diagram |
| `sparc sim deploy:architecture` | System architecture diagram |
| `sparc sim deploy:cost` | Infrastructure cost estimate |

### Platform Simulations

| Command | Description |
|---------|-------------|
| `sparc sim platform:services` | Service dependency map |
| `sparc sim platform:auth` | Authentication flow diagrams |
| `sparc sim platform:events` | Event bus message flow |

### Testing Simulations

| Command | Description |
|---------|-------------|
| `sparc sim tests:coverage` | Path-to-test coverage report |
| `sparc sim tests:matrix` | Test case matrix |

---

## Directory Structure

### Single SaaS

```
{project}/
├── README.md
├── spec/
│   ├── package.yaml                 # Master index
│   ├── architecture/
│   │   └── platform-decision.yaml
│   ├── business/
│   │   ├── competitors/
│   │   │   ├── competitor-1.yaml
│   │   │   └── ...
│   │   └── ideal/
│   │       └── business-ideal.yaml
│   ├── software/
│   │   ├── competitors/
│   │   │   ├── competitor-1.yaml
│   │   │   └── ...
│   │   └── ideal/
│   │       └── software-ideal.yaml
│   ├── dsl/
│   │   ├── data.yaml
│   │   ├── ui.yaml
│   │   ├── logic.yaml
│   │   ├── api.yaml
│   │   ├── auth.yaml
│   │   └── deploy.yaml
│   └── tests/
│       ├── tests.yaml
│       ├── factories.yaml
│       └── mocks/
├── simulation/
│   └── modes.yaml
└── project/
    ├── CLAUDE.md
    └── ROADMAP.md
```

### Platform (Multi-Repo)

```
{platform}/                          # GitHub Organization
│
├── {platform}-platform/             # Meta repository
│   ├── README.md
│   ├── docker-compose.yaml
│   ├── spec/                        # All SPARC specs
│   └── infra/                       # Terraform, K8s
│
├── {platform}-auth/                 # Auth service
│   ├── README.md
│   ├── Dockerfile
│   ├── spec/
│   │   ├── data.yaml
│   │   ├── api.yaml
│   │   └── auth.yaml
│   ├── src/
│   └── tests/
│
├── {platform}-billing/
├── {platform}-notifications/
├── {platform}-{product-a}/
├── {platform}-{product-b}/
├── {platform}-common/
└── {platform}-sdk/
```

---

## Schema Reference

### Core Schemas

| Schema | Purpose | Location |
|--------|---------|----------|
| `package.yaml` | Master index | `schemas/package.yaml` |
| `platform-architecture.yaml` | Platform config | `schemas/platform-architecture.yaml` |
| `business-competitor.yaml` | Competitor business | `schemas/business-competitor.yaml` |
| `business-ideal.yaml` | Business strategy | `schemas/business-ideal.yaml` |
| `software-competitor.yaml` | Competitor software | `schemas/software-competitor.yaml` |
| `software-ideal.yaml` | Software spec | `schemas/software-ideal.yaml` |

### DSL Schemas

| Schema | Purpose | Location |
|--------|---------|----------|
| `data.yaml` | Database | `schemas/data.yaml` |
| `ui.yaml` | UI/UX | `schemas/ui.yaml` |
| `logic.yaml` | Business logic | `schemas/logic.yaml` |
| `api.yaml` | API endpoints | `schemas/api.yaml` |
| `auth.yaml` | Authentication | `schemas/auth.yaml` |
| `deploy.yaml` | Infrastructure | `schemas/deploy.yaml` |
| `tests.yaml` | Test specs | `schemas/tests.yaml` |

### Addendum Schemas

| Schema | Purpose | Location |
|--------|---------|----------|
| `auth-passwordless-addendum.yaml` | Passwordless auth | `addendum/` |
| `auth-passwordless-dsl.yaml` | Passwordless DSL | `addendum/` |

---

## Code Generation

SPARC v6.1 DSLs are designed to be machine-readable blueprints that generate production code. This section documents how each DSL maps to generated code.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      SPARC DSL Files                            │
├─────────┬─────────┬─────────┬─────────┬─────────┬──────────────┤
│ data    │ ui      │ logic   │ api     │ auth    │ deploy       │
│ .yaml   │ .yaml   │ .yaml   │ .yaml   │ .yaml   │ .yaml        │
└────┬────┴────┬────┴────┬────┴────┬────┴────┬────┴──────┬───────┘
     │         │         │         │         │           │
     ▼         ▼         ▼         ▼         ▼           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Code Generator (Handlebars)                  │
│  Templates: templates/{target}/{dsl}/*.hbs                      │
└─────────────────────────────────────────────────────────────────┘
     │         │         │         │         │           │
     ▼         ▼         ▼         ▼         ▼           ▼
┌─────────┬─────────┬─────────┬─────────┬─────────┬──────────────┤
│ SQL     │ React   │ XState  │ Hono    │ JWT     │ Terraform    │
│ Drizzle │ Vue     │ Zod     │ OpenAPI │ OAuth   │ Kubernetes   │
│ Prisma  │ Stories │ Services│ SDK     │ OTP     │ Docker       │
└─────────┴─────────┴─────────┴─────────┴─────────┴──────────────┘
```

### Available Interpreters

```yaml
interpreters:
  data:
    - drizzle      # → src/db/schema.ts
    - prisma       # → prisma/schema.prisma
    - migrations   # → migrations/*.sql

  ui:
    - react        # → src/components/**/*.tsx
    - vue          # → src/components/**/*.vue
    - storybook    # → src/stories/**/*.stories.tsx

  logic:
    - services     # → src/services/**/*.ts
    - xstate       # → src/machines/**/*.ts
    - zod          # → src/validations/**/*.ts

  api:
    - hono         # → src/routes/**/*.ts
    - express      # → src/routes/**/*.js
    - axum         # → src/routes/**/*.rs
    - openapi      # → openapi.yaml
    - sdk          # → sdk/typescript/src/**/*.ts

  auth:
    - middleware   # → src/middleware/auth.ts
    - rbac         # → src/policies/**/*.ts

  deploy:
    - terraform    # → infra/terraform/**/*.tf
    - kubernetes   # → infra/k8s/**/*.yaml
    - docker       # → docker-compose.yaml
    - github       # → .github/workflows/**/*.yaml

  tests:
    - typescript   # → tests/**/*.test.ts
    - rust         # → tests/**/*_test.rs
```

### Generation Commands

```bash
# Generate all
sparc generate

# Generate specific
sparc generate data
sparc generate api
sparc generate tests

# Generate with options
sparc generate api --target=axum --output=src/
```

### DSL-to-Code Mappings

#### data.yaml → Database Code

| DSL Element | Generated Code |
|-------------|----------------|
| `entities[].columns` | Table columns with types |
| `entities[].indexes` | Database indexes |
| `relationships` | Foreign keys and joins |
| `enums` | TypeScript/database enums |

**Example Transformation:**

```yaml
# data.yaml
entities:
  - name: "User"
    table: "users"
    columns:
      - name: "id"
        type: "uuid"
        primary: true
      - name: "email"
        type: "varchar(255)"
        unique: true
```

Generates (Drizzle):

```typescript
// src/db/schema/users.ts
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

#### ui.yaml → Component Code

| DSL Element | Generated Code |
|-------------|----------------|
| `components[].props` | TypeScript interface |
| `components[].styles` | Tailwind classes / CSS |
| `components[].states` | React state hooks |
| `components[].slots` | Children / render props |
| `screens[].route` | Router configuration |
| `screens[].content` | Page component composition |

**Example Transformation:**

```yaml
# ui.yaml
components:
  - name: "Button"
    props:
      - name: "variant"
        type: "enum"
        values: ["primary", "secondary", "ghost"]
        default: "primary"
      - name: "size"
        type: "enum"
        values: ["sm", "md", "lg"]
        default: "md"
      - name: "loading"
        type: "boolean"
        default: false
      - name: "onClick"
        type: "function"
    styles:
      base: "inline-flex items-center justify-center font-medium transition-colors"
      variants:
        primary: "bg-primary text-white hover:bg-primary/90"
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        ghost: "hover:bg-accent hover:text-accent-foreground"
      sizes:
        sm: "h-8 px-3 text-sm"
        md: "h-10 px-4"
        lg: "h-12 px-6 text-lg"
```

Generates (React):

```tsx
// src/components/Button.tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
```

#### logic.yaml → Business Logic Code

| DSL Element | Generated Code |
|-------------|----------------|
| `workflows[].steps` | Service class methods |
| `state_machines` | XState machine definitions |
| `validation_schemas` | Zod validation schemas |

**Example Transformation:**

```yaml
# logic.yaml
state_machines:
  - name: "NotificationState"
    initial: "pending"
    states:
      - name: "pending"
        description: "Waiting to be sent"
      - name: "sent"
        description: "Dispatched to provider"
      - name: "delivered"
        description: "Confirmed delivery"
      - name: "failed"
        description: "Delivery failed"
    transitions:
      - event: "send"
        from: "pending"
        to: "sent"
        action: "dispatchToProvider"
      - event: "confirm"
        from: "sent"
        to: "delivered"
      - event: "fail"
        from: ["pending", "sent"]
        to: "failed"
        action: "recordFailure"
```

Generates (XState):

```typescript
// src/machines/notificationState.ts
import { createMachine, assign } from 'xstate';

export const notificationStateMachine = createMachine({
  id: 'notification',
  initial: 'pending',
  states: {
    pending: {
      on: {
        SEND: { target: 'sent', actions: 'dispatchToProvider' },
        FAIL: { target: 'failed', actions: 'recordFailure' },
      },
    },
    sent: {
      on: {
        CONFIRM: 'delivered',
        FAIL: { target: 'failed', actions: 'recordFailure' },
      },
    },
    delivered: { type: 'final' },
    failed: { type: 'final' },
  },
}, {
  actions: {
    dispatchToProvider: (context, event) => {
      // Implementation injected at runtime
    },
    recordFailure: (context, event) => {
      // Implementation injected at runtime
    },
  },
});
```

#### api.yaml → Route Handlers

| DSL Element | Generated Code |
|-------------|----------------|
| `endpoints[].path` | Route path |
| `endpoints[].method` | HTTP method |
| `endpoints[].handler` | Handler function reference |
| `endpoints[].request` | Request validation schema |
| `endpoints[].responses` | Response types |
| `endpoints[].rate_limit` | Rate limiting middleware |

**Example Transformation:**

```yaml
# api.yaml
endpoints:
  - path: "/api/v1/auth/otp/request"
    method: "POST"
    handler: "auth.requestOtp"
    auth: false
    rate_limit:
      max: 5
      window: "15m"
    request:
      body:
        email:
          type: "string"
          format: "email"
          required: true
    responses:
      200:
        description: "OTP sent successfully"
        body:
          message: "string"
      400:
        description: "Invalid email format"
        body:
          error: "string"
          code: "string"
      429:
        description: "Rate limit exceeded"
        body:
          error: "string"
          retry_after: "integer"
```

Generates (Hono):

```typescript
// src/routes/auth/otp.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { rateLimiter } from '@/middleware/rateLimit';
import { authService } from '@/services/auth';

const requestOtpSchema = z.object({
  email: z.string().email(),
});

export const otpRoutes = new Hono()
  .post(
    '/request',
    rateLimiter({ max: 5, window: '15m' }),
    zValidator('json', requestOtpSchema),
    async (c) => {
      const { email } = c.req.valid('json');

      try {
        await authService.requestOtp(email);
        return c.json({ message: 'Code sent' }, 200);
      } catch (error) {
        if (error instanceof ValidationError) {
          return c.json({ error: error.message, code: 'INVALID_EMAIL' }, 400);
        }
        throw error;
      }
    }
  );
```

#### auth.yaml → Authentication Code

| DSL Element | Generated Code |
|-------------|----------------|
| `methods.email_otp` | OTP generation/verification |
| `methods.social.providers` | OAuth client setup |
| `tokens.jwt` | JWT signing/verification |
| `sessions` | Session management |
| `middleware` | Auth middleware functions |

**Example Transformation:**

```yaml
# auth.yaml
authentication:
  passwordless_only: true
  methods:
    email_otp:
      enabled: true
      config:
        code_length: 6
        ttl_seconds: 600
        max_attempts: 3

tokens:
  jwt:
    algorithm: "RS256"
    issuer: "notifycommons.io"
  access_token:
    ttl_seconds: 900
```

Generates:

```typescript
// src/services/auth/otp.ts
import { randomInt } from 'crypto';
import { redis } from '@/lib/redis';
import { hashCode, verifyCode } from '@/lib/crypto';

const OTP_CONFIG = {
  codeLength: 6,
  ttlSeconds: 600,
  maxAttempts: 3,
};

export async function generateOtp(email: string): Promise<string> {
  const code = randomInt(10 ** (OTP_CONFIG.codeLength - 1), 10 ** OTP_CONFIG.codeLength)
    .toString();

  const key = `otp:${email}`;
  await redis.setex(key, OTP_CONFIG.ttlSeconds, JSON.stringify({
    codeHash: await hashCode(code),
    attempts: 0,
    createdAt: Date.now(),
  }));

  return code;
}

export async function verifyOtp(email: string, code: string): Promise<boolean> {
  const key = `otp:${email}`;
  const data = await redis.get(key);

  if (!data) return false;

  const { codeHash, attempts } = JSON.parse(data);

  if (attempts >= OTP_CONFIG.maxAttempts) {
    await redis.del(key);
    throw new Error('MAX_ATTEMPTS_EXCEEDED');
  }

  const valid = await verifyCode(code, codeHash);

  if (valid) {
    await redis.del(key);
    return true;
  }

  await redis.setex(key, OTP_CONFIG.ttlSeconds, JSON.stringify({
    codeHash,
    attempts: attempts + 1,
    createdAt: Date.now(),
  }));

  return false;
}
```

```typescript
// src/middleware/auth.ts
import { jwt } from 'hono/jwt';

export const authMiddleware = jwt({
  secret: process.env.JWT_PUBLIC_KEY!,
  alg: 'RS256',
});

export const optionalAuth = async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    try {
      c.set('user', await verifyJwt(token));
    } catch {
      // Invalid token, continue without user
    }
  }
  await next();
};
```

### Template System

SPARC uses Handlebars templates for code generation. Templates live in `templates/{target}/{dsl}/`.

```
templates/
├── react/
│   ├── ui/
│   │   ├── component.hbs
│   │   ├── screen.hbs
│   │   └── story.hbs
│   └── logic/
│       └── service.hbs
├── hono/
│   └── api/
│       ├── route.hbs
│       └── handler.hbs
├── drizzle/
│   └── data/
│       ├── table.hbs
│       └── migration.hbs
└── xstate/
    └── logic/
        └── machine.hbs
```

**Custom Template Example:**

```handlebars
{{!-- templates/react/ui/component.hbs --}}
import * as React from 'react';
{{#if hasStyles}}
import { cn } from '@/lib/utils';
{{/if}}

{{> propsInterface}}

export const {{name}} = React.forwardRef<{{elementType}}, {{name}}Props>(
  ({{ propsDestructure }}, ref) => (
    <{{element}} ref={ref} {{> classBinding}} {{> propBindings}}>
      {{#if hasSlots}}
      {children}
      {{/if}}
    </{{element}}>
  )
);

{{name}}.displayName = '{{name}}';
```

### JSON Schema Validation

All DSL files can be validated against JSON Schemas before generation:

```bash
# Validate all DSL files
sparc validate

# Validate specific file
sparc validate schemas/ui.yaml

# Validate with verbose output
sparc validate --verbose
```

Schema files are located at `schemas/json-schemas/`:

| DSL | Schema |
|-----|--------|
| package.yaml | `package.schema.json` |
| auth.yaml | `auth.schema.json` |
| ui.yaml | `ui.schema.json` |
| data.yaml | `data.schema.json` |
| api.yaml | `api.schema.json` |
| logic.yaml | `logic.schema.json` |

### Simulation output contracts

For deterministic, auditable simulations (simulation run manifests + event streams), reuse these
base schemas:

| Output | Schema |
|--------|--------|
| Run manifest | `simulation-run-v1.schema.json` (alias: `simulation-run.schema.json`) |
| Event envelope | `events-v1.schema.json` (alias: `events.schema.json`) |

Tooling templates (Sprint 1) for validation/PII/determinism are in:
- `kits/simulation-output-v1/README.md`

Sprint 2+ contract schemas (taxonomy/KPIs/journeys/finance/acquisition/ops/vectors) are in:
- `schemas/json-schemas/simulation-event-taxonomy-v1.schema.json`
- `schemas/json-schemas/simulation-kpi-definitions-v1.schema.json`
- `schemas/json-schemas/simulation-journey-state-machine-v1.schema.json`
- `schemas/json-schemas/simulation-billing-ledger-v1.schema.json`
- `schemas/json-schemas/simulation-acquisition-v1.schema.json`
- `schemas/json-schemas/simulation-observability-v1.schema.json`
- `schemas/json-schemas/simulation-vector-graph-v1.schema.json`

### SPARC Lite Mode

For simple projects, SPARC Lite mode skips enterprise features:

```yaml
# package.yaml
complexity:
  mode: "lite"

lite_mode:
  enabled: true
  skipped_phases:
    - "business_competitor_analysis"
    - "software_competitor_analysis"
  simplified_files:
    - name: "spec.yaml"
      replaces: ["business-ideal.yaml", "software-ideal.yaml"]
```

**Lite Mode Indicators (auto-detected):**
- Single user type
- Single revenue model
- Under 5 entities
- No white-label requirement
- No platform architecture

### Cross-Reference Resolution

DSLs reference each other via `_ref` fields:

```yaml
# ui.yaml
screens:
  - name: "DashboardScreen"
    data:
      - name: "notifications"
        endpoint_ref: "api.yaml#/endpoints/get_notifications"  # Links to api.yaml
```

The generator resolves these references to ensure consistency and generate proper imports.

---

## Validation Checklist

Before considering a specification complete:

### Architecture
- [ ] Platform decision made with rationale
- [ ] If platform: bounded contexts defined
- [ ] If platform: unified auth architecture specified
- [ ] If platform: repository structure defined
- [ ] White-label configuration included

### Business Analysis
- [ ] At least 5 competitors analyzed
- [ ] Business ideal synthesizes all competitors
- [ ] Pricing strategy defined
- [ ] Go-to-market strategy defined
- [ ] Success metrics defined

### Software Analysis
- [ ] At least 5 competitors analyzed
- [ ] Every feature has complete PATH-* coverage
- [ ] Every feature has EDGE-* cases
- [ ] Every feature has boundary conditions
- [ ] Every stateful entity has state machine
- [ ] All API endpoints fully specified

### DSL Completeness
- [ ] Every entity has primary key
- [ ] Every screen has route
- [ ] Every workflow has steps
- [ ] Every endpoint has handler
- [ ] Every role has permissions
- [ ] All cross-references valid

### Testing
- [ ] Every PATH-* has corresponding test
- [ ] Every EDGE-* has corresponding test
- [ ] Every boundary has corresponding test
- [ ] No mocks on database/filesystem
- [ ] External services have mock fixtures
- [ ] Factories defined for all entities

### Authentication
- [ ] Passwordless only (no password fields)
- [ ] OTP configured (email and/or SMS)
- [ ] Social providers configured
- [ ] Token strategy defined

---

## Examples

### Example 1: Simple SaaS (Reminder App)

**Input:**
```
IDEA: Smart medication reminder app for parents
FOR: Parents of children with chronic conditions
BECAUSE: Missing doses is dangerous and stressful
LIKE: Medisafe, Round Health, CareZone, Pill Reminder, MyTherapy
STACK: React Native/Node/PostgreSQL
DEPLOY: AWS/ECS
PLATFORM: no
WHITE_LABEL: no
```

**Result:** Single SaaS with one repository, simple auth, focused feature set.

### Example 2: Platform (Notification Infrastructure)

**Input:**
```
IDEA: Unified notification platform for SaaS companies
FOR: B2B SaaS product teams
BECAUSE: Building notification infrastructure is complex
LIKE: Customer.io, Knock, Novu, OneSignal, Courier, MagicBell
STACK: React/Rust/PostgreSQL
DEPLOY: AWS/Kubernetes
PLATFORM: yes
WHITE_LABEL: yes
```

**Result:** Platform with multiple repositories:
- `notifycommons-platform` (meta)
- `notifycommons-auth` (OTP + Social)
- `notifycommons-billing`
- `notifycommons-api` (core notification engine)
- `notifycommons-dashboard` (web UI)
- `notifycommons-common`
- `notifycommons-sdk`

### Example 3: Marketplace

**Input:**
```
IDEA: Rideshare marketplace for African cities
FOR: Drivers and passengers in Lagos, Nairobi, Accra
BECAUSE: Existing solutions don't fit African markets
LIKE: Uber, Bolt, inDrive, Gokada, SafeBoda, MAX
STACK: React/Go/PostgreSQL
DEPLOY: GCP/Kubernetes
PLATFORM: yes
WHITE_LABEL: yes
```

**Result:** Platform with:
- Passenger app
- Driver app
- Admin dashboard
- Shared auth service
- Billing/payments service
- Real-time location service

---

## FAQ

### Q: Why no unit tests?

Unit tests test implementation details. API integration tests verify behavior. When you refactor, unit tests break. Integration tests don't. They catch real bugs that users experience.

### Q: Why no passwords?

Passwords are the #1 attack vector:
1. **Security liability** — Credential stuffing, breaches, phishing
2. **UX friction** — Password reset flows, complexity rules, forgotten passwords
3. **Support burden** — Reset requests, lockout support tickets
4. **Database burden** — password_hash columns, argon2id hashing costs

OTP via MailChannels (email) and Twilio (SMS) + Social Login are more secure and easier. This is not configurable — if you need passwords, use a different framework.

### Q: Why separate repositories for platforms?

1. **Independent deployment** — Deploy auth without deploying billing
2. **Team ownership** — Clear boundaries
3. **Technology flexibility** — Different stacks per service
4. **White-label** — Deploy individual services standalone

### Q: What if I need password auth?

SPARC v6.1.1 does **not** support password authentication. This is by design:
- Passwordless eliminates the #1 attack vector
- No password_hash column means nothing to breach
- Better UX means fewer support tickets

If your requirements mandate passwords, SPARC is not the right framework. Consider frameworks that offer password auth with proper security guardrails.

### Q: How detailed should competitor analysis be?

Deep analysis of 3 competitors beats superficial analysis of 8.

**Minimum viable set (Level 2):**
1. Market leader
2. Direct competitor
3. Adjacent player

**Full analysis (Level 3):** 5-8 competitors for comprehensive patterns.

Use [Progressive Complexity Mode](#progressive-complexity-mode) to start with minimal analysis and add depth later.

### Q: What's the difference between PATH-* and EDGE-*?

- **PATH-*** — Normal paths through decision points (valid inputs, expected failures)
- **EDGE-*** — Unusual but valid inputs (unicode, max length, concurrent requests)

### Q: How do I use simulations?

After generating specs, run:
```bash
sparc sim software:paths --feature=user_registration
```

This opens an interactive visualization of all paths.

### Q: Can I use this with existing code?

SPARC v6.1 is for new projects. For existing code, you can:
1. Generate specs for new features
2. Use the analysis framework for competitor research
3. Gradually adopt the testing philosophy

---

## Changelog

Full release notes: `CHANGELOG.md`.

### v6.1.1 (Current)

**Progressive Complexity Mode:**
- New 4-level progression system (quick_start → mvp → competitive → full)
- Quick start templates for rapid adoption (`crud_api`, `auth_api`, `saas_starter`, `platform_starter`)
- `sparc init --template <name> --level <0-3>` for scaffolding
- `sparc upgrade --to <level>` for incremental depth
- Quality over quantity: 3 well-analyzed competitors now acceptable at Level 2

**Passwordless Authentication Providers:**
- Email OTP via MailChannels (Cloudflare Workers integration with DKIM)
- SMS OTP via Twilio Verify API
- Social OAuth: Google, Apple, GitHub, Microsoft with PKCE
- No password auth — by design, not configurable

**Production-Ready Simulations:**
- Complete mock server implementation with stateful mode, CORS, OpenAPI docs
- Complete path explorer implementation with Mermaid flowcharts, coverage tracking
- Implementation status tracking for all features (implemented → in_progress → planned → spec_only)
- Priority-based roadmap (P1: developer tools first, P4: business tools last)

**Schema Consolidation:**
- Consolidated `auth.yaml` and `auth-passwordless-dsl.yaml` into single canonical schema
- Added `_redirect` pattern for deprecated files with migration guidance
- Added `_meta` sections with code generation targets

**SPARC Lite Mode (Deprecated):**
- Replaced by Progressive Complexity Mode Level 0
- Legacy `lite_mode` section retained for backwards compatibility
- Migration path: `progressive_mode.levels[0]`

**Runtime Validation:**
- Added JSON Schemas under `schemas/json-schemas/` for core DSLs and templates
- Core DSLs: `package.schema.json`, `auth.schema.json`, `ui.schema.json`, `data.schema.json`, `api.schema.json`, `logic.schema.json`
- Templates + configuration: `quick-start.schema.json`, `simulation-modes.schema.json`
- Added/updated `$schema` references for portable validation (including hosted schema URLs under `https://sparc-dsl.dev/schemas/...`)

**Simulation Output Contracts (Deterministic + Auditable):**
- Base output schemas: `simulation-run-v1.schema.json` and `events-v1.schema.json` (+ `*.schema.json` aliases)
- Sprint 1 guardrails: determinism checks, PII scanning, and schema validation scripts under `kits/simulation-output-v1/scripts/`
- Sprint 2+ contract schemas: event taxonomy, KPI definitions, journey state machine, billing ledger, acquisition, observability, vector graph
- Copy/paste contract templates under `kits/simulation-output-v1/contracts/`

**Code Generation Documentation:**
- DSL-to-code mapping tables for all DSLs
- Handlebars template system documentation
- Example transformations for data, ui, logic, api, auth DSLs
- Template directory structure

**CLI Implementation Specification:**
- Full `sparc` CLI command specification in `simulation/modes.yaml`
- TypeScript implementation examples for all simulation modes
- Mock server, path explorer, coverage report implementations
- Installation and usage instructions

### v6.1

**New Features:**
- Platform detection (automatic)
- Unified auth for platforms
- Passwordless-only authentication (OTP + Social)
- White-label architecture
- Separate repositories per bounded context
- Simulation modes

**Changes from v6.0:**
- Removed password authentication
- Added platform architecture schema
- Enhanced cross-service auth
- Added repository structure templates

### v6.0

- Initial unified version
- Business + Software analysis
- Exhaustive cyclomatic paths
- Executable DSL family
- API integration testing philosophy

### v5.0

- Executable DSLs
- No business analysis

### v4.2

- Business + Software simulation
- No executable DSLs

---

## Support

For questions, issues, or contributions:

1. Review this README thoroughly
2. Check the schema files for detailed field descriptions
3. Run validation: `sparc validate`
4. Use simulations to explore: `sparc interactive`

---

**Built with SPARC v6.1**  
*Analysis informs specification, specification becomes code.*
