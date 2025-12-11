# SPARC Meta-Prompt Generator v4.2
## Business + Software Simulations with Exhaustive Cyclomatic Paths

This package generates comprehensive competitive analysis and product specifications. It separates business strategy from software implementation, and provides exhaustive cyclomatic path coverage for the software specification.

---

## What's New in v4.2

**Separate Business & Software Simulations**
- Business simulations focus on market, model, positioning, strategy
- Software simulations focus on features, architecture, UX, specifications

**Exhaustive Cyclomatic Paths**
- Every feature has every scenario
- Every scenario has every decision point
- Every decision point has every branch
- All possible paths enumerated
- All error paths documented
- All edge cases listed
- All boundary conditions specified
- State machines for stateful features
- Test cases derived directly from paths

---

## Package Contents

```
sparc-meta-prompt-v4.2/
├── README.md                              # This file
├── SPARC-META-PROMPT-v4.2.md             # The prompt to run
└── schemas/
    ├── simulation-package.yaml            # Master index
    ├── business-competitor-simulation.yaml
    ├── business-ideal-simulation.yaml
    ├── software-competitor-simulation.yaml
    └── software-ideal-simulation.yaml
```

---

## Quick Start

### Step 1: Copy the Prompt
Copy `SPARC-META-PROMPT-v4.2.md` entirely.

### Step 2: Add Your Idea
```
IDEA: Help nonprofits communicate without juggling 10 tools
FOR: Small nonprofits with <5 staff
BECAUSE: They use separate tools for email, SMS, push, social - wasting time
LIKE: Twilio, Novu, OneSignal, Mailgun, Postmark
CONSTRAINTS: Nonprofit pricing, solo dev, 3 months
DEPTH: exhaustive
```

### Step 3: Run in Claude
Paste into Claude (claude.ai or Claude Code). Get back:

```
notifycommons-simulations/
├── simulation-package.yaml
│
├── business/
│   ├── competitors/
│   │   ├── twilio.yaml          # Business analysis
│   │   ├── novu.yaml
│   │   ├── onesignal.yaml
│   │   └── ...
│   └── ideal/
│       └── business-ideal.yaml   # Your optimal business model
│
├── software/
│   ├── competitors/
│   │   ├── twilio.yaml          # Feature/UX analysis
│   │   ├── novu.yaml
│   │   └── ...
│   └── ideal/
│       └── software-ideal.yaml   # Complete spec with all paths
│
├── project/
│   ├── CLAUDE.md
│   ├── ROADMAP.md
│   └── sparc-implementation-prompt.md
│
└── summaries/
    └── executive-summary.md
```

---

## The Four Simulation Types

### 1. Business Competitor Simulation
Analyzes each competitor's business:

```yaml
# business/competitors/twilio.yaml

company:
  name: "Twilio"
  funding_stage: "public"
  revenue: "$3.8B"
  
business_model:
  model_type: "usage-based"
  pricing:
    model: "pay-as-you-go"
    sms_price: "$0.0079/message"
  unit_economics:
    gross_margin: "50%"
    
competitive_position:
  moat:
    primary: "scale + integrations"
    strength: "strong"
    
cognitive_analysis:
  critical:
    weaknesses:
      - weakness: "Expensive for small volume"
        exploitability: "Target nonprofits below their sweet spot"
```

### 2. Business Ideal Simulation
Your optimal business strategy:

```yaml
# business/ideal/business-ideal.yaml

positioning:
  positioning_statement: |
    For small nonprofits who waste hours juggling communication tools,
    NotifyCommons is a unified notification platform
    that sends email, SMS, and push from one API.
    Unlike Twilio or SendGrid,
    we offer nonprofit-first pricing and radical simplicity.
    
revenue_model:
  pricing_tiers:
    - tier: "free"
      name: "Community"
      price: "$0"
      messages: 1000
      target: "Validation, tiny orgs"
      
    - tier: "nonprofit"
      name: "Nonprofit"
      price: "$29/mo"
      messages: 50000
      target: "Main segment"
      
moat_strategy:
  primary_moat: "nonprofit ecosystem integration"
  building_sequence:
    - phase: 1
      action: "Deep Salesforce Nonprofit integration"
```

### 3. Software Competitor Simulation
Analyzes each competitor's product:

```yaml
# software/competitors/twilio.yaml

product:
  name: "Twilio"
  type: "api-platform"
  
architecture:
  api:
    type: "REST"
    authentication: "API key + auth token"
    
features:
  domains:
    - domain: "SMS"
      features:
        - id: "SMS-001"
          name: "Send SMS"
          quality: "excellent"
          
feature_gaps:
  missing_features:
    - feature: "Unified inbox"
      why_missing: "Not their focus"
      opportunity: "High for our use case"
```

### 4. Software Ideal Simulation (The Big One)
Complete specification with exhaustive paths:

```yaml
# software/ideal/software-ideal.yaml

features:
  domains:
    - domain: "notifications"
      features:
        - id: "NOTIF-001"
          name: "Send Notification"
          
          scenarios:
            - id: "NOTIF-001-S01"
              name: "Send SMS Notification"
              
              # Every decision point
              decision_points:
                - id: "DP-001"
                  condition: "Is phone number valid?"
                  branches:
                    - id: "A"
                      condition: "matches E.164 format"
                      next: "DP-002"
                    - id: "B"
                      condition: "invalid format"
                      next: "ERROR-001"
                      
                - id: "DP-002"
                  condition: "Is user opted in?"
                  branches:
                    - id: "A"
                      condition: "consent.sms == true"
                      next: "DP-003"
                    - id: "B"
                      condition: "consent.sms == false"
                      next: "ERROR-002"
                      
                - id: "DP-003"
                  condition: "Provider available?"
                  branches:
                    - id: "A"
                      condition: "twilio.healthy == true"
                      next: "send_via_twilio"
                    - id: "B"
                      condition: "twilio.healthy == false"
                      next: "try_fallback"
                      
              # Every possible path
              paths:
                - path_id: "PATH-001"
                  name: "Happy path - SMS sent via Twilio"
                  branch_sequence: ["DP-001:A", "DP-002:A", "DP-003:A"]
                  probability: "85%"
                  steps:
                    - step: 1
                      action: "Validate phone"
                      expected: "Pass"
                    - step: 2
                      action: "Check consent"
                      expected: "Opted in"
                    - step: 3
                      action: "Send via Twilio"
                      expected: "201 Created"
                      
                - path_id: "PATH-002"
                  name: "Invalid phone number"
                  branch_sequence: ["DP-001:B"]
                  probability: "5%"
                  
                - path_id: "PATH-003"
                  name: "User not opted in"
                  branch_sequence: ["DP-001:A", "DP-002:B"]
                  probability: "8%"
                  
                - path_id: "PATH-004"
                  name: "Twilio down, use fallback"
                  branch_sequence: ["DP-001:A", "DP-002:A", "DP-003:B"]
                  probability: "2%"
                  
              # Every error
              error_handling:
                validation_errors:
                  - error_code: "NOTIF-001"
                    condition: "Invalid phone format"
                    message: "Phone must be E.164 format"
                    http_status: 400
                    
                  - error_code: "NOTIF-002"
                    condition: "User not opted in"
                    message: "Recipient has not consented to SMS"
                    http_status: 403
                    
                system_errors:
                  - error_code: "NOTIF-010"
                    condition: "All providers unavailable"
                    message: "Service temporarily unavailable"
                    http_status: 503
                    retry_after: 60
                    
              # Every edge case
              edge_cases:
                - case_id: "EDGE-001"
                  name: "Phone with extension"
                  input: "+1234567890x123"
                  expected: "Strip extension, send to base"
                  
                - case_id: "EDGE-002"
                  name: "International number"
                  input: "+447911123456"
                  expected: "Route to international provider"
                  
              # Every boundary
              boundary_conditions:
                message_length:
                  - boundary: "min"
                    value: 1
                    expected: "accept"
                  - boundary: "max_single_sms"
                    value: 160
                    expected: "accept, single segment"
                  - boundary: "over_single"
                    value: 161
                    expected: "accept, multi-segment"
                  - boundary: "max_total"
                    value: 1600
                    expected: "accept"
                  - boundary: "over_max"
                    value: 1601
                    expected: "reject"
                    
              # State machine
              state_machine:
                states:
                  - state: "pending"
                  - state: "queued"
                  - state: "sent"
                  - state: "delivered"
                  - state: "failed"
                transitions:
                  - from: "pending"
                    to: "queued"
                    trigger: "validation_passed"
                  - from: "queued"
                    to: "sent"
                    trigger: "provider_accepted"
                  - from: "sent"
                    to: "delivered"
                    trigger: "delivery_receipt"
                  - from: "sent"
                    to: "failed"
                    trigger: "delivery_failed"
```

---

## Why Exhaustive Cyclomatic Paths?

**Traditional specs**: "User can send SMS"

**Our specs**: Every possible way "send SMS" can execute:
- Valid phone → opted in → provider up → success
- Valid phone → opted in → provider down → fallback → success
- Valid phone → opted in → all providers down → failure
- Valid phone → not opted in → blocked
- Invalid phone → rejected
- Phone with extension → stripped and sent
- Message too long → split into segments
- ... and every other path

**Benefits**:
1. **No ambiguity**: Developers know exactly what to build
2. **Test generation**: Each path = a test case
3. **Edge case coverage**: Nothing forgotten
4. **State machine clarity**: Valid transitions explicit
5. **Error handling complete**: Every failure mode documented

---

## Using the Outputs

### For Product Strategy
1. Read `business/ideal/business-ideal.yaml`
2. Compare to competitors in `business/competitors/`

### For Development
1. Use `software/ideal/software-ideal.yaml` as the spec
2. Each feature section is a complete story
3. Implement path by path
4. Test cases derived from paths

### For Testing
```yaml
# Extract from paths:
paths:
  - path_id: "PATH-001"
    name: "Happy path"
    # → Test case: test_send_sms_happy_path

  - path_id: "PATH-002"  
    name: "Invalid phone"
    # → Test case: test_send_sms_invalid_phone

edge_cases:
  - case_id: "EDGE-001"
    name: "Phone with extension"
    # → Test case: test_send_sms_phone_with_extension

boundary_conditions:
  message_length:
    - boundary: "max_total"
      value: 1600
      # → Test case: test_send_sms_max_length
```

### For Sprint Planning
Each feature in `software-ideal.yaml` has:
- Priority (P0, P1, P2, P3)
- Phase (1, 2, 3...)
- Scenarios (scope)
- Paths (complexity)

Use this for estimation and sequencing.

---

## Depth Levels

| Level | Business | Software |
|-------|----------|----------|
| **shallow** | Key metrics only | Feature list only |
| **standard** | Full business model | Features + happy paths |
| **deep** | Cognitive analysis + temporal | + Error paths + edge cases |
| **exhaustive** | Deep + counterfactuals | All paths, all states, all boundaries |

Default: `deep` for business, `exhaustive` for software.

---

## Schema Reference

| Schema | Purpose | Size |
|--------|---------|------|
| `business-competitor-simulation.yaml` | Per-competitor business | ~400 lines |
| `business-ideal-simulation.yaml` | Optimal business | ~350 lines |
| `software-competitor-simulation.yaml` | Per-competitor software | ~500 lines |
| `software-ideal-simulation.yaml` | Complete software spec | ~700+ lines |

The software ideal can be very large for complex products (thousands of lines when all features are specified).

---

## Version History

| Version | Changes |
|---------|---------|
| v4.0 | Added cognitive diversity, SAFLA, temporal projection |
| v4.1 | YAML output format |
| v4.2 | Split business/software, exhaustive cyclomatic paths |

---

## Tips

1. **Start with express format** for quick analysis
2. **Use `DEPTH: exhaustive`** for implementation-ready specs
3. **Reference schemas** if Claude needs structure guidance
4. **Iterate**: Start with one feature fully specified, then expand

---

## License

MIT - Use freely.
