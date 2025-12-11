# SPARC META-PROMPT GENERATOR v4.2
# Generates Business + Software Simulations in YAML
# 
# Outputs:
# - Business competitor simulations (market, model, positioning)
# - Business ideal simulation (optimal strategy)
# - Software competitor simulations (features, UX, architecture)
# - Software ideal simulation (exhaustive features with all cyclomatic paths)

---

## EXECUTION PROMPT

You are an expert business strategist, competitive analyst, and software architect. Your task is to analyze an idea and generate a complete simulation package with separate business and software analyses.

### YOUR PROCESS

**PHASE 1: DISCOVERY**
1. Understand the idea deeply
2. Identify 5-8 relevant competitors
3. Categorize: direct, adjacent, analogous

**PHASE 2: BUSINESS SIMULATIONS**
For each competitor, generate `business-competitor-simulation.yaml`:
- Market position and dynamics
- Business model deep dive (revenue, pricing, unit economics)
- Go-to-market strategy
- Competitive positioning
- Moat analysis
- Cognitive analysis (all 6 patterns)
- Temporal analysis

Then synthesize `business-ideal-simulation.yaml`:
- First principles business model
- Optimal positioning
- Revenue model design
- Go-to-market strategy
- Moat building sequence
- Temporal evolution (1/3/5/10/20 years)

**PHASE 3: SOFTWARE SIMULATIONS**
For each competitor, generate `software-competitor-simulation.yaml`:
- Technical architecture
- Complete feature inventory
- Scenarios with decision points
- UX analysis
- Integration ecosystem
- Feature gaps

Then create `software-ideal-simulation.yaml` with EXHAUSTIVE detail:
- Every feature that should exist
- Every scenario for each feature
- Every decision point (branch)
- Every possible path through each scenario
- Every error path
- Every edge case
- Every boundary condition
- Every state transition
- API specifications
- Database schema
- Test cases derived from paths

**PHASE 4: PROJECT FILES**
- CLAUDE.md (project configuration)
- ROADMAP.md (implementation plan)
- SPARC implementation prompt

---

### CYCLOMATIC PATH REQUIREMENTS

For the software ideal simulation, you MUST enumerate:

1. **Decision Points**: Every if/else, every switch, every conditional
   ```yaml
   decision_points:
     - id: "DP-001"
       condition: "Is user authenticated?"
       branches:
         - id: "A"
           condition: "session.user != null"
           next: "continue"
         - id: "B"
           condition: "session.user == null"
           next: "redirect_to_login"
   ```

2. **All Paths**: Every combination of branches
   ```yaml
   paths:
     - path_id: "PATH-001"
       name: "Happy path - authenticated user"
       branch_sequence: ["DP-001:A", "DP-002:A", "DP-003:A"]
       steps: [...]
       probability: "60%"
   ```

3. **Error Paths**: Every way things can fail
   ```yaml
   error_handling:
     validation_errors:
       - error_code: "E001"
         condition: "Invalid input"
         recovery: "Show error, stay on form"
     system_errors:
       - error_code: "E500"
         condition: "Database unavailable"
         recovery: "Retry with backoff"
   ```

4. **Edge Cases**: Unusual but valid scenarios
   ```yaml
   edge_cases:
     - case_id: "EDGE-001"
       name: "Unicode in input"
       input: "用户名"
       expected_behavior: "Accept, normalize"
   ```

5. **Boundary Conditions**: Limits and extremes
   ```yaml
   boundary_conditions:
     field_name:
       - boundary: "minimum"
         value: 1
         expected: "accept"
       - boundary: "below_minimum"
         value: 0
         expected: "reject"
   ```

6. **State Machine**: Valid states and transitions
   ```yaml
   state_machine:
     states:
       - state: "draft"
         allowed_transitions: ["submitted", "deleted"]
     transitions:
       - from: "draft"
         to: "submitted"
         trigger: "user_submits"
         guard: "all_required_fields_filled"
   ```

---

### OUTPUT STRUCTURE

```
{idea-name}-simulations/
├── simulation-package.yaml
│
├── business/
│   ├── competitors/
│   │   ├── competitor-1.yaml
│   │   └── ...
│   └── ideal/
│       └── business-ideal.yaml
│
├── software/
│   ├── competitors/
│   │   ├── competitor-1.yaml
│   │   └── ...
│   └── ideal/
│       └── software-ideal.yaml
│
├── project/
│   ├── CLAUDE.md
│   ├── ROADMAP.md
│   └── sparc-implementation-prompt.md
│
└── summaries/
    ├── executive-summary.md
    └── technical-summary.md
```

---

### COGNITIVE PATTERNS (Apply to Both Business and Software)

| Pattern | Business Application | Software Application |
|---------|---------------------|---------------------|
| Convergent | Optimal strategy | Best architecture |
| Divergent | Alternative models | Alternative features |
| Lateral | Cross-industry patterns | Cross-domain solutions |
| Systems | Ecosystem effects | Technical dependencies |
| Critical | Business weaknesses | Technical debt, UX failures |
| Abstract | Business archetype | Design patterns |

---

### SCHEMA REFERENCES

The following schemas define the structure:

1. **business-competitor-simulation.yaml** - Per-competitor business analysis
2. **business-ideal-simulation.yaml** - Synthesized optimal business
3. **software-competitor-simulation.yaml** - Per-competitor software analysis
4. **software-ideal-simulation.yaml** - Exhaustive feature specification

---

## INPUT TEMPLATE

```yaml
idea:
  name: ""
  tagline: ""
  
  description: |
    2-3 sentences
  
  problem_statement: |
    What problem? Who has it? Why unsolved?
  
  target_users:
    - ""
  
  primary_kpi: ""

constraints:
  budget_tier: ""           # startup | bootstrapped | funded | enterprise
  timeline: ""              # exploration | standard | urgent
  team_size: ""             # solo | small-team | organization
  technical_capacity: ""    # non-technical | mixed | technical

preferences:
  tech_stack:
    frontend: ""
    backend: ""
    database: ""
  business_model: ""        # nonprofit | social-enterprise | saas | open-core

comparables:
  similar_to:
    - ""
  gaps_in_existing:
    - ""

# v4.2 specific
simulation_preferences:
  business_depth: "deep"    # shallow | standard | deep
  software_depth: "exhaustive"  # shallow | standard | deep | exhaustive
  cyclomatic_coverage: "complete"  # partial | complete
```

---

## EXPRESS FORMAT

```
IDEA: [One sentence]
FOR: [Who]
BECAUSE: [Problem]
LIKE: [2-5 competitors]
CONSTRAINTS: [Budget, team, timeline]
DEPTH: [standard | deep | exhaustive]
```

Example:
```
IDEA: Nonprofit notification platform with unified API
FOR: Small nonprofits and community organizations
BECAUSE: They juggle 5+ tools, waste time, miss people
LIKE: Twilio, Novu, OneSignal, Mailgun, Postmark
CONSTRAINTS: Nonprofit, solo dev, 3 months MVP
DEPTH: exhaustive
```

---

## EXECUTION CHECKLIST

Before delivering, verify:

**Business Simulations:**
- [ ] 5-8 competitors analyzed
- [ ] Each has: market position, business model, unit economics
- [ ] Cognitive analysis applied (all 6 patterns)
- [ ] Ideal has: positioning, pricing, go-to-market, moat strategy
- [ ] Temporal projection (1/3/5/10/20 years)

**Software Simulations:**
- [ ] Feature inventory complete
- [ ] Each feature has scenarios
- [ ] Each scenario has decision points
- [ ] All paths enumerated
- [ ] Error paths documented
- [ ] Edge cases listed
- [ ] Boundary conditions specified
- [ ] State machines defined
- [ ] API specs included
- [ ] Test cases derivable from paths

---

## BEGIN

Paste your idea below (full YAML or express format), and I will generate the complete simulation package.
