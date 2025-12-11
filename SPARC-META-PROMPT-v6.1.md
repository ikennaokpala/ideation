# SPARC META-PROMPT GENERATOR v6.1
# Unified Analysis → Simulation → Executable DSL Pipeline
# 
# This prompt generates:
# 1. Business competitor analysis and ideal synthesis
# 2. Software competitor analysis with exhaustive cyclomatic paths
# 3. Platform architecture (if detected) with unified auth and bounded contexts
# 4. White-label ready, change-friendly architecture
# 5. Executable DSL family for autonomous implementation
# 6. Integration test specifications following all cyclomatic paths
#
# Philosophy: Analysis informs specification, specification becomes code.
# Architecture: Platform-aware, white-label ready, change-friendly.

---

## EXECUTION PROMPT

You are an expert business strategist, software architect, and system designer. Your task is to transform an idea through comprehensive analysis into a complete, executable DSL specification that can be used for fully autonomous implementation.

**CRITICAL ARCHITECTURAL PRINCIPLES:**
1. **Platform Detection**: Identify if this is a platform (multiple services/products) vs single SaaS
2. **Unified Authentication**: Platforms get shared auth across all bounded contexts
3. **White-Label Ready**: Every service must be deployable standalone for client white-labeling
4. **Change-Friendly**: Architecture must be flexible and easy to modify
5. **Repository Structure**: Each bounded context gets its own Git repository

---

# ═══════════════════════════════════════════════════════════════════════════════
# PHASE 0: PLATFORM DETECTION & ARCHITECTURE DECISION
# Determine the nature of what we're building
# ═══════════════════════════════════════════════════════════════════════════════

## PLATFORM DETECTION CRITERIA

Analyze the idea and determine if it's a **Platform** or **Single SaaS**:

### Platform Indicators (if 3+ match, it's a platform):
- Multiple distinct user types with different products (e.g., merchants + consumers)
- Multiple revenue streams from different products
- Marketplace dynamics (connecting multiple parties)
- Suite of related but separable tools
- B2B2C model
- White-label requirement mentioned
- Multiple bounded contexts with shared identity
- Internal tools + external products
- API-first with multiple consumer applications

### Single SaaS Indicators:
- One primary user type
- One core product/feature set
- Single revenue model
- Monolithic feature set
- Direct B2B or B2C model

```yaml
# architecture/platform-decision.yaml

platform_detection:
  idea_analysis:
    user_types: []
    revenue_streams: []
    product_components: []
    bounded_contexts: []
    
  indicators:
    multiple_user_types: false
    multiple_products: false
    marketplace_dynamics: false
    white_label_requirement: false
    shared_identity_needed: false
    api_platform: false
    
  decision: ""                # "platform" | "single_saas"
  confidence: ""              # "high" | "medium" | "low"
  rationale: ""
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PLATFORM ARCHITECTURE (If platform detected)
# ═══════════════════════════════════════════════════════════════════════════════

## IF PLATFORM: Generate Platform Architecture

```yaml
# architecture/platform-architecture.yaml

$schema: "https://sparc-dsl.dev/schemas/platform-architecture.yaml.json"
version: "1.0"

meta:
  platform_name: ""
  description: ""
  
# ═══════════════════════════════════════════════════════════════════════════════
# BOUNDED CONTEXTS
# Each becomes its own Git repository
# ═══════════════════════════════════════════════════════════════════════════════

bounded_contexts:
  
  # ─────────────────────────────────────────────────────────────────────────────
  # SHARED SERVICES (Cross-cutting concerns)
  # ─────────────────────────────────────────────────────────────────────────────
  
  shared:
    
    - name: "auth"
      description: "Unified authentication and identity service"
      repository: "{platform}-auth"
      type: "shared_service"
      
      responsibilities:
        - "User registration and login"
        - "OAuth provider integration"
        - "Session management"
        - "API key management"
        - "Organization/tenant management"
        - "Role and permission management"
        - "SSO (SAML, OIDC)"
        
      api_surface:
        internal:
          - "Token validation"
          - "Permission checks"
          - "User lookup"
        external:
          - "Login/register endpoints"
          - "OAuth flows"
          - "API key management"
          
      database: "auth_db"
      
      white_label_config:
        customizable:
          - "branding (logo, colors)"
          - "email templates"
          - "login page"
          - "domain"
        tenant_isolation: "schema"    # schema | database | row
        
    - name: "billing"
      description: "Unified billing and subscription management"
      repository: "{platform}-billing"
      type: "shared_service"
      
      responsibilities:
        - "Subscription management"
        - "Usage tracking"
        - "Invoice generation"
        - "Payment processing"
        - "Plan management"
        
      integrates_with:
        - "stripe"
        - "auth (for tenant context)"
        
      white_label_config:
        customizable:
          - "invoice branding"
          - "payment page"
          - "pricing display"
          
    - name: "notifications"
      description: "Unified notification delivery"
      repository: "{platform}-notifications"
      type: "shared_service"
      
      responsibilities:
        - "Email delivery"
        - "SMS delivery"
        - "Push notifications"
        - "In-app notifications"
        - "Webhook delivery"
        - "Template management"
        
  # ─────────────────────────────────────────────────────────────────────────────
  # PRODUCT CONTEXTS (Individual products/services)
  # ─────────────────────────────────────────────────────────────────────────────
  
  products:
    
    - name: ""                        # e.g., "merchant-portal"
      description: ""
      repository: "{platform}-{name}"
      type: "product"
      
      target_users: []
      
      owns:
        entities: []                  # Domain entities this context owns
        features: []                  # Features this context provides
        
      depends_on:
        - service: "auth"
          for: "authentication"
        - service: "billing"
          for: "subscription checks"
          
      api_surface:
        public: []
        internal: []
        
      database: "{name}_db"
      
      white_label_config:
        standalone_deployable: true
        customizable:
          - "branding"
          - "domain"
          - "feature flags"
        requires_shared_services:
          - "auth"
          
# ═══════════════════════════════════════════════════════════════════════════════
# UNIFIED AUTHENTICATION ARCHITECTURE
# Shared across all bounded contexts
# ═══════════════════════════════════════════════════════════════════════════════

unified_auth:
  
  architecture: "centralized"         # centralized | federated
  
  identity_model:
    user:
      - id
      - email
      - password_hash
      - external_providers []
      - mfa_enabled
      - created_at
      
    organization:                     # Multi-tenant support
      - id
      - name
      - slug
      - plan
      - settings
      
    membership:
      - user_id
      - organization_id
      - role
      - permissions []
      
  token_strategy:
    type: "jwt"
    access_token_ttl: "15m"
    refresh_token_ttl: "7d"
    
    claims:
      standard:
        - sub                         # User ID
        - iat
        - exp
      custom:
        - org_id                      # Current organization
        - org_role                    # Role in organization
        - permissions []              # Resolved permissions
        
  cross_service_auth:
    method: "token_passthrough"       # All services validate same JWT
    
    service_to_service:
      method: "internal_api_key"      # For service-to-service calls
      
  session_management:
    store: "redis"
    strategy: "sliding_window"
    
  sso_support:
    saml: true
    oidc: true
    
# ═══════════════════════════════════════════════════════════════════════════════
# CROSS-CUTTING CONCERNS
# Shared APIs and resources between bounded contexts
# ═══════════════════════════════════════════════════════════════════════════════

cross_cutting:
  
  api_gateway:
    type: "unified"                   # Single entry point
    routes_to: "bounded_contexts"
    
    responsibilities:
      - "Request routing"
      - "Authentication"
      - "Rate limiting"
      - "Request/response transformation"
      - "API versioning"
      
  shared_libraries:
    - name: "{platform}-common"
      repository: "{platform}-common"
      contains:
        - "Auth middleware"
        - "Error types"
        - "Logging"
        - "Tracing"
        - "Common types"
        
    - name: "{platform}-sdk"
      repository: "{platform}-sdk"
      contains:
        - "TypeScript SDK"
        - "Python SDK"
        
  event_bus:
    type: "async"                     # For cross-context communication
    technology: "rabbitmq"            # or kafka, sqs
    
    patterns:
      - "Domain events"
      - "Integration events"
      - "Saga orchestration"
      
  observability:
    tracing:
      technology: "opentelemetry"
      correlation: "trace_id across services"
      
    logging:
      format: "structured_json"
      aggregation: "elasticsearch"
      
    metrics:
      technology: "prometheus"
      
# ═══════════════════════════════════════════════════════════════════════════════
# REPOSITORY STRUCTURE
# How code is organized across Git repositories
# ═══════════════════════════════════════════════════════════════════════════════

repository_structure:
  
  organization: "{platform}"          # GitHub/GitLab organization
  
  repositories:
    
    # Platform orchestration
    - name: "{platform}-platform"
      type: "meta"
      description: "Platform orchestration, docker-compose, deployment"
      contains:
        - "docker-compose.yaml"
        - "kubernetes manifests"
        - "terraform"
        - "CI/CD pipelines"
        - "Documentation"
        
    # Shared services (each is own repo)
    - name: "{platform}-auth"
      type: "service"
      bounded_context: "auth"
      
    - name: "{platform}-billing"
      type: "service"
      bounded_context: "billing"
      
    - name: "{platform}-notifications"
      type: "service"
      bounded_context: "notifications"
      
    # Products (each is own repo)
    - name: "{platform}-{product}"
      type: "product"
      bounded_context: "{product}"
      
    # Shared code
    - name: "{platform}-common"
      type: "library"
      
    - name: "{platform}-sdk"
      type: "library"
      
  monorepo_alternative:
    enabled: false
    structure: |
      {platform}/
      ├── services/
      │   ├── auth/
      │   ├── billing/
      │   └── notifications/
      ├── products/
      │   ├── product-a/
      │   └── product-b/
      ├── packages/
      │   ├── common/
      │   └── sdk/
      └── infra/
      
# ═══════════════════════════════════════════════════════════════════════════════
# WHITE-LABEL ARCHITECTURE
# Support for standalone deployment and customization
# ═══════════════════════════════════════════════════════════════════════════════

white_label:
  
  strategy: "configuration_driven"
  
  customization_layers:
    
    - layer: "branding"
      scope: "visual"
      configurable:
        - logo_url
        - favicon_url
        - primary_color
        - secondary_color
        - font_family
      storage: "tenant_settings"
      
    - layer: "domain"
      scope: "infrastructure"
      configurable:
        - custom_domain
        - ssl_certificate
        - email_domain
      requires: "dns_configuration"
      
    - layer: "features"
      scope: "functionality"
      configurable:
        - feature_flags
        - enabled_modules
        - custom_workflows
      storage: "tenant_settings"
      
    - layer: "integrations"
      scope: "connectivity"
      configurable:
        - oauth_providers
        - payment_provider
        - email_provider
        - custom_webhooks
      storage: "tenant_secrets"
      
  tenant_isolation:
    
    data:
      strategy: "schema_per_tenant"   # row | schema | database
      
    compute:
      strategy: "shared"              # shared | dedicated
      
    storage:
      strategy: "prefixed"            # prefixed | separate_bucket
      
  standalone_deployment:
    
    description: |
      Each product can be deployed standalone for clients who want
      to run the software on their own infrastructure.
      
    requirements:
      - "Self-contained Docker image"
      - "Environment-based configuration"
      - "Optional external auth integration"
      - "Database migration scripts"
      - "Seed data scripts"
      
    deployment_options:
      - docker_compose
      - kubernetes_helm
      - terraform_module
      
    configuration:
      - "Environment variables for all settings"
      - "Config file override capability"
      - "Secret management integration"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PART I: BUSINESS ANALYSIS
# Understanding the market before building
# ═══════════════════════════════════════════════════════════════════════════════

## PHASE 1: BUSINESS COMPETITOR ANALYSIS

For each competitor (analyze 5-8), create a detailed business simulation:

```yaml
# business/competitors/{competitor-name}.yaml

$schema: "https://sparc-dsl.dev/schemas/business-competitor.yaml.json"
version: "1.0"

meta:
  company_name: ""
  website: ""
  founded: ""
  headquarters: ""
  analysis_date: ""
  analyst: "sparc-v6.1"
  confidence_level: ""        # high | medium | low

# ═══════════════════════════════════════════════════════════════════════════════
# COMPANY PROFILE
# ═══════════════════════════════════════════════════════════════════════════════

company_profile:
  
  stage: ""                   # pre-seed | seed | series-a | series-b | growth | mature | declining
  
  funding:
    total_raised: ""
    last_round:
      type: ""
      amount: ""
      date: ""
      lead_investor: ""
    investors:
      - name: ""
        type: ""              # vc | angel | strategic | pe
        
  team:
    total_employees: ""
    engineering_percentage: ""
    growth_rate: ""           # YoY headcount growth
    
  key_leadership:
    - name: ""
      role: ""
      background: ""
      notable: ""
      linkedin: ""
      
  culture_signals:
    - signal: ""
      source: ""
      implication: ""
      
  recent_news:
    - date: ""
      headline: ""
      significance: ""

# ═══════════════════════════════════════════════════════════════════════════════
# MARKET ANALYSIS
# ═══════════════════════════════════════════════════════════════════════════════

market_analysis:
  
  tam:
    value: ""
    year: ""
    source: ""
    growth_rate: ""
    
  sam:
    value: ""
    definition: ""
    
  som:
    value: ""
    current_capture: ""
    growth_trajectory: ""
    
  market_dynamics:
    growth_rate: ""
    stage: ""                 # emerging | growing | mature | declining
    consolidation: ""         # fragmented | consolidating | oligopoly
    regulatory_environment: ""
    
  competitive_intensity:
    level: ""                 # low | moderate | high | intense
    main_battlegrounds:
      - battleground: ""
        intensity: ""
        our_position: ""
        
  market_position:
    position: ""              # leader | challenger | niche | emerging
    market_share_estimate: ""
    trend: ""                 # gaining | stable | losing
    evidence: []

# ═══════════════════════════════════════════════════════════════════════════════
# BUSINESS MODEL
# ═══════════════════════════════════════════════════════════════════════════════

business_model:
  
  type: ""                    # saas | marketplace | transactional | freemium | enterprise | hybrid
  
  revenue_streams:
    - name: ""
      type: ""                # subscription | usage | transaction | advertising | services
      percentage_of_revenue: ""
      trend: ""               # growing | stable | declining
      margin: ""
      
  pricing:
    model: ""                 # flat | tiered | usage | per-seat | hybrid
    transparency: ""          # public | semi-public | sales-only
    
    tiers:
      - name: ""
        price: ""
        billing: ""           # monthly | annual | usage
        target_segment: ""
        features:
          included: []
          excluded: []
        limits:
          - resource: ""
            limit: ""
        value_proposition: ""
            
    discounting:
      annual_discount: ""
      volume_discount: ""
      startup_program:
        exists: ""
        terms: ""
      nonprofit_discount: ""
      enterprise_negotiation: ""
      
  unit_economics:
    arr_estimate: ""
    arr_growth: ""
    mrr_estimate: ""
    cac: ""
    ltv: ""
    ltv_cac_ratio: ""
    payback_period: ""
    gross_margin: ""
    net_revenue_retention: ""
    logo_churn: ""
    revenue_churn: ""
    
  monetization_levers:
    - lever: ""
      current_exploitation: ""
      potential: ""

# ═══════════════════════════════════════════════════════════════════════════════
# CUSTOMER ANALYSIS
# ═══════════════════════════════════════════════════════════════════════════════

customer_analysis:
  
  total_customers_estimate: ""
  
  segments:
    - name: ""
      size_estimate: ""
      percentage_of_customers: ""
      percentage_of_revenue: ""
      characteristics:
        company_size: ""
        industry: []
        geography: []
        tech_sophistication: ""
        budget: ""
      needs:
        - need: ""
          importance: ""
      pain_points:
        - pain: ""
          severity: ""
      willingness_to_pay: ""
      acquisition_difficulty: ""
      retention_rate: ""
      
  ideal_customer_profile:
    company_size: ""
    employee_count: ""
    industry: []
    annual_revenue: ""
    tech_stack: []
    decision_maker:
      title: ""
      concerns: []
    buying_trigger: []
    budget_range: ""
    
  customer_journey:
    awareness:
      channels: []
      content_types: []
      time_in_stage: ""
    consideration:
      evaluation_criteria: []
      competitors_considered: []
      timeline: ""
      stakeholders: []
    decision:
      decision_maker: ""
      influencers: []
      approval_process: ""
      deal_blockers: []
      typical_deal_size: ""
    onboarding:
      time_to_value: ""
      implementation_effort: ""
      success_criteria: []
      common_obstacles: []
    retention:
      engagement_patterns: []
      health_indicators: []
      churn_triggers: []
    expansion:
      upsell_triggers: []
      cross_sell_opportunities: []
      expansion_revenue_rate: ""
      
  notable_customers:
    - name: ""
      segment: ""
      use_case: ""
      public_reference: ""
      case_study_available: ""
      
  customer_sentiment:
    nps_estimate: ""
    g2_rating: ""
    capterra_rating: ""
    common_complaints: []
    common_praise: []

# ═══════════════════════════════════════════════════════════════════════════════
# GO-TO-MARKET STRATEGY
# ═══════════════════════════════════════════════════════════════════════════════

go_to_market:
  
  primary_motion: ""          # product-led | sales-led | marketing-led | community-led | hybrid
  
  sales:
    model: ""                 # self-serve | inside-sales | field-sales | channel | hybrid
    cycle_length: ""
    team_size_estimate: ""
    quota_per_rep: ""
    territories: []
    specialization: ""        # none | vertical | deal-size | function
    
  marketing:
    positioning: ""
    tagline: ""
    key_messages:
      - message: ""
        audience: ""
    tone: ""
    brand_strength: ""
    
    channels:
      - channel: ""
        investment_level: ""  # high | medium | low
        effectiveness: ""
        cac_contribution: ""
        
    content_strategy:
      primary_formats: []
      publishing_frequency: ""
      quality_level: ""
      seo_strength: ""
      notable_content: []
      
    community:
      presence: ""            # none | emerging | established | strong
      platforms: []
      engagement_level: ""
      
    events:
      hosted: []
      sponsored: []
      speaking: []
      
  partnerships:
    - partner_type: ""        # integration | reseller | referral | strategic | technology
      notable_partners: []
      importance: ""
      revenue_contribution: ""
      
  international:
    primary_markets: []
    expansion_strategy: ""
    localization_depth: ""
    local_teams: []

# ═══════════════════════════════════════════════════════════════════════════════
# COMPETITIVE POSITIONING
# ═══════════════════════════════════════════════════════════════════════════════

competitive_positioning:
  
  moat:
    type: ""                  # network | data | switching | brand | scale | technology | regulatory
    strength: ""              # weak | moderate | strong | very-strong
    sustainability: ""
    description: ""
    evidence: []
    
  differentiation:
    - factor: ""
      description: ""
      strength: ""            # weak | moderate | strong
      defensibility: ""       # low | medium | high
      importance_to_customer: ""
      evidence: ""
      
  positioning_statement: ""
  
  value_proposition:
    primary: ""
    supporting: []
    proof_points: []
    
  vulnerabilities:
    - weakness: ""
      description: ""
      severity: ""            # minor | moderate | major | critical
      exploitability: ""      # easy | moderate | difficult
      how_to_exploit: ""
      
  win_loss:
    primary_win_reasons:
      - reason: ""
        frequency: ""
    primary_loss_reasons:
      - reason: ""
        frequency: ""
    competitive_win_rate: ""
    
  positioning_against:
    - competitor: ""
      their_positioning: ""
      our_counter: ""

# ═══════════════════════════════════════════════════════════════════════════════
# COGNITIVE ANALYSIS
# Apply diverse thinking patterns to understand the business
# ═══════════════════════════════════════════════════════════════════════════════

cognitive_analysis:
  
  # Adversarial: What could go wrong?
  adversarial:
    existential_threats:
      - threat: ""
        probability: ""
        timeline: ""
        trigger: ""
        
    competitive_vulnerabilities:
      - vulnerability: ""
        who_could_exploit: ""
        how: ""
        
    market_risks:
      - risk: ""
        trigger: ""
        impact: ""
        
    execution_risks:
      - risk: ""
        indicators: []
        likelihood: ""
        
    black_swan_scenarios:
      - scenario: ""
        probability: ""
        impact: ""
        
  # Contrarian: What does everyone get wrong?
  contrarian:
    common_assumptions:
      - assumption: ""
        believers: ""
        why_might_be_wrong: ""
        evidence_against: ""
        
    overlooked_opportunities:
      - opportunity: ""
        why_overlooked: ""
        size: ""
        
    unconventional_moves:
      - move: ""
        why_unconventional: ""
        potential_impact: ""
        
    contrarian_bets:
      - bet: ""
        against_consensus: ""
        rationale: ""
        
  # Temporal: How does this evolve?
  temporal:
    history:
      founding_story: ""
      key_pivots:
        - date: ""
          from: ""
          to: ""
          reason: ""
      major_milestones:
        - date: ""
          milestone: ""
          significance: ""
      
    current_trajectory: ""    # accelerating | steady | decelerating | pivoting
    
    projections:
      year_1:
        focus: ""
        likely_moves: []
        challenges: []
      year_3:
        focus: ""
        likely_position: ""
        threats: []
      year_5:
        focus: ""
        scenarios:
          - scenario: ""
            probability: ""
            implications: ""
            
    disruption_risk:
      level: ""               # low | moderate | high | critical
      potential_disruptors:
        - disruptor: ""
          mechanism: ""
          timeline: ""
          
  # First principles: What's actually true?
  first_principles:
    core_value_created: ""
    fundamental_constraints: []
    assumptions_to_question:
      - assumption: ""
        validity: ""
    irreducible_truths: []
    
  # Network effects
  network_analysis:
    type: ""                  # none | weak | moderate | strong
    network_type: ""          # direct | indirect | data | marketplace | platform
    current_strength: ""
    reinforcing_loops:
      - loop: ""
        strength: ""
    network_density: ""
    critical_mass_achieved: ""
    
  # Counterfactual: What if they chose differently?
  counterfactual:
    key_decisions:
      - decision: ""
        date: ""
        alternative: ""
        likely_outcome_if_different: ""
        learning: ""

# ═══════════════════════════════════════════════════════════════════════════════
# PRODUCT ANALYSIS (Brief - detailed in software analysis)
# ═══════════════════════════════════════════════════════════════════════════════

product_brief:
  
  core_offering: ""
  
  key_features:
    - feature: ""
      strength: ""
      
  platform_vs_product: ""     # platform | product | hybrid
  
  technical_reputation: ""
  
  innovation_velocity: ""     # slow | moderate | fast | very-fast
  
  api_first: ""
  
  integration_ecosystem_size: ""

# ═══════════════════════════════════════════════════════════════════════════════
# SWOT SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════

swot:
  
  strengths:
    - strength: ""
      importance: ""          # critical | high | medium | low
      evidence: ""
      
  weaknesses:
    - weakness: ""
      severity: ""
      exploitable: ""
      evidence: ""
      
  opportunities:
    - opportunity: ""
      size: ""
      fit: ""
      timing: ""
      
  threats:
    - threat: ""
      probability: ""
      impact: ""
      timeline: ""

# ═══════════════════════════════════════════════════════════════════════════════
# KEY TAKEAWAYS
# What we learn from this competitor
# ═══════════════════════════════════════════════════════════════════════════════

takeaways:
  
  learn_from:
    - lesson: ""
      application: ""
      priority: ""
      
  avoid:
    - mistake: ""
      why: ""
      
  exploit:
    - gap: ""
      how: ""
      difficulty: ""
      
  differentiate_on:
    - factor: ""
      why_winnable: ""
      evidence: ""
      
  overall_assessment:
    threat_level: ""          # low | moderate | high | critical
    respect_level: ""         # low | moderate | high
    primary_learning: ""
```

## PHASE 2: BUSINESS IDEAL SYNTHESIS

After analyzing all competitors, synthesize the optimal business strategy:

```yaml
# business/ideal/business-ideal.yaml

$schema: "https://sparc-dsl.dev/schemas/business-ideal.yaml.json"
version: "1.0"

meta:
  project_name: ""
  synthesis_date: ""
  competitors_analyzed: []
  confidence_level: ""

# ═══════════════════════════════════════════════════════════════════════════════
# COMPETITOR SYNTHESIS
# Patterns and insights from analysis
# ═══════════════════════════════════════════════════════════════════════════════

competitor_synthesis:
  
  market_overview:
    total_market_size: ""
    growth_rate: ""
    maturity: ""
    consolidation_trend: ""
    
  patterns_observed:
    
    pricing:
      - pattern: ""
        frequency: ""         # How many competitors
        effectiveness: ""
        evidence: ""
        
    go_to_market:
      - pattern: ""
        frequency: ""
        effectiveness: ""
        
    positioning:
      - pattern: ""
        frequency: ""
        differentiation_potential: ""
        
    technology:
      - pattern: ""
        frequency: ""
        innovation_opportunity: ""
        
    business_model:
      - pattern: ""
        frequency: ""
        profitability: ""
        
  gaps_identified:
    - gap: ""
      description: ""
      opportunity_size: ""    # small | medium | large | massive
      difficulty: ""          # easy | moderate | hard | very-hard
      time_to_exploit: ""
      competitors_ignoring: []
      evidence: ""
      
  lessons_learned:
    - from_competitor: ""
      lesson: ""
      application: ""
      priority: ""            # critical | high | medium | low
      
  anti_patterns:
    - pattern: ""
      why_avoid: ""
      who_does_this: []
      evidence: ""
      
  competitive_landscape_summary:
    leaders: []
    challengers: []
    niche_players: []
    emerging_threats: []
    
  market_gaps_matrix:
    # What's not being served well
    underserved_segments: []
    underserved_needs: []
    underserved_geographies: []

# ═══════════════════════════════════════════════════════════════════════════════
# OPTIMAL POSITIONING
# Where to play in the market
# ═══════════════════════════════════════════════════════════════════════════════

optimal_positioning:
  
  positioning_statement: |
    For [target customer]
    Who [have this need/problem]
    [Product name] is a [category]
    That [key benefit/differentiation]
    Unlike [primary competitor/alternative]
    We [unique value proposition]
    
  positioning_rationale: ""
  
  target_market:
    
    primary_segment:
      name: ""
      description: ""
      size: ""
      growth_rate: ""
      characteristics:
        company_size: ""
        employee_range: ""
        revenue_range: ""
        industry: []
        geography: []
        tech_maturity: ""
      needs:
        - need: ""
          importance: ""
          current_solutions: []
      pain_points:
        - pain: ""
          severity: ""
          current_workarounds: []
      willingness_to_pay: ""
      acquisition_channels: []
      
    secondary_segments:
      - name: ""
        description: ""
        size: ""
        priority: ""
        expansion_timeline: ""
        prerequisites: []
        
    explicitly_not_targeting:
      - segment: ""
        reason: ""
        
  differentiation:
    
    primary_differentiator:
      factor: ""
      description: ""
      proof_points: []
      defensibility: ""
      time_to_copy: ""
      
    supporting_differentiators:
      - factor: ""
        importance: ""
        evidence: ""
        
    differentiation_sustainability: ""
    
  category:
    existing_category: ""
    category_strategy: ""     # compete | create | reframe
    new_category_name: ""     # If creating
    category_narrative: ""
    category_positioning: ""
    
  competitive_frame:
    primary_competitor: ""
    frame_as: ""              # How to position against them
    win_themes: []
    
  messaging:
    tagline: ""
    elevator_pitch: ""
    value_proposition_statement: ""
    
    key_messages:
      - message: ""
        audience: ""
        supporting_proof: ""
        use_when: ""
        
    messaging_do:
      - ""
    messaging_dont:
      - ""

# ═══════════════════════════════════════════════════════════════════════════════
# OPTIMAL BUSINESS MODEL
# How to make money
# ═══════════════════════════════════════════════════════════════════════════════

optimal_business_model:
  
  revenue_model:
    primary: ""               # subscription | usage | transaction | hybrid
    rationale: ""
    
  pricing_strategy:
    philosophy: ""            # value | competitive | penetration | premium
    rationale: ""
    
    value_metric: ""          # What customers pay for
    value_metric_rationale: ""
    
    recommended_tiers:
      
      - name: "Free"
        price: "$0"
        target: ""
        purpose: ""           # acquisition | trial | community | viral
        features:
          included: []
          excluded: []
        limits:
          - resource: ""
            limit: ""
        conversion_target: ""
        time_limit: ""        # none | 14 days | 30 days
        
      - name: "Starter"
        price: ""
        billing: ""           # monthly | annual
        annual_discount: ""
        target: ""
        positioning: ""
        features:
          included: []
        limits:
          - resource: ""
            limit: ""
        expected_ltv: ""
        
      - name: "Pro"
        price: ""
        billing: ""
        annual_discount: ""
        target: ""
        positioning: ""
        features:
          included: []
        limits:
          - resource: ""
            limit: ""
        expected_ltv: ""
        
      - name: "Enterprise"
        price: "Custom"
        target: ""
        features:
          included: []
        requirements:
          - ""
        sales_process: ""
        expected_deal_size: ""
        
    pricing_psychology:
      anchor_tier: ""
      decoy_tier: ""
      most_popular: ""
      rationale: ""
      
    discounts:
      annual_discount: ""
      annual_discount_rationale: ""
      startup_program:
        discount: ""
        eligibility: ""
        duration: ""
      nonprofit_discount: ""
      volume_discount: ""
      
    pricing_experiments:
      - experiment: ""
        hypothesis: ""
        
  target_unit_economics:
    
    by_segment:
      - segment: ""
        target_cac: ""
        target_ltv: ""
        target_ltv_cac_ratio: ""
        target_payback_period: ""
        
    overall:
      target_gross_margin: ""
      target_net_margin: ""
      target_nrr: ""            # Net Revenue Retention
      target_logo_churn: ""
      
  monetization_timeline:
    
    phase_1:
      focus: ""
      monetization: ""
      target_revenue: ""
      
    phase_2:
      focus: ""
      monetization: ""
      target_revenue: ""
      
    phase_3:
      focus: ""
      monetization: ""
      target_revenue: ""

# ═══════════════════════════════════════════════════════════════════════════════
# OPTIMAL GO-TO-MARKET
# How to acquire and retain customers
# ═══════════════════════════════════════════════════════════════════════════════

optimal_go_to_market:
  
  primary_motion: ""          # product-led | sales-led | community-led | hybrid
  motion_rationale: ""
  
  phase_1_launch:
    duration: ""
    focus: ""
    target_customers: ""
    target_customer_count: ""
    
    channels:
      - channel: ""
        investment: ""
        expected_cac: ""
        rationale: ""
        
    key_activities:
      - activity: ""
        owner: ""
        timeline: ""
        
    success_metrics:
      - metric: ""
        target: ""
        
    budget_allocation:
      total: ""
      breakdown:
        - category: ""
          amount: ""
          percentage: ""
          
    launch_strategy: ""
    
  phase_2_growth:
    trigger: ""               # What triggers moving to phase 2
    focus: ""
    expansion_strategy: ""
    
    new_channels:
      - channel: ""
        rationale: ""
        
    team_additions:
      - role: ""
        when: ""
        
    target_metrics:
      - metric: ""
        target: ""
        
  phase_3_scale:
    trigger: ""
    focus: ""
    moat_building: []
    international_expansion: ""
    
  acquisition_strategy:
    
    inbound:
      content_strategy:
        themes: []
        formats: []
        frequency: ""
        quality_bar: ""
      seo_focus:
        keywords: []
        content_types: []
      community_building:
        platforms: []
        strategy: ""
      thought_leadership:
        topics: []
        channels: []
        
    outbound:
      target_accounts: ""
      account_criteria: []
      outreach_strategy: ""
      cadence: ""
      
    product_led:
      viral_loops:
        - loop: ""
          mechanism: ""
      freemium_conversion:
        target: ""
        triggers: []
      self_serve_optimization: []
      
    partnerships:
      integration_partners:
        - partner: ""
          value_exchange: ""
      channel_partners:
        - partner_type: ""
          strategy: ""
      referral_program:
        structure: ""
        incentives: ""
        
  retention_strategy:
    
    onboarding:
      time_to_value_target: ""
      key_milestones:
        - milestone: ""
          target_time: ""
      success_criteria: []
      
    engagement:
      health_metrics:
        - metric: ""
          healthy: ""
          at_risk: ""
      intervention_triggers:
        - trigger: ""
          action: ""
      engagement_programs: []
      
    expansion:
      upsell_triggers:
        - trigger: ""
          offer: ""
      cross_sell_opportunities:
        - opportunity: ""
          timing: ""
      account_growth_playbook: ""
      
  sales_strategy:
    model: ""
    team_structure: ""
    territories: ""
    quota_model: ""
    compensation:
      base_ote_split: ""
      accelerators: ""
    tools: []

# ═══════════════════════════════════════════════════════════════════════════════
# MOAT STRATEGY
# Building defensibility
# ═══════════════════════════════════════════════════════════════════════════════

moat_strategy:
  
  primary_moat:
    type: ""                  # network | data | switching | brand | scale | technology
    description: ""
    time_to_build: ""
    defensibility: ""
    
  moat_building_sequence:
    
    - phase: 1
      moat_type: ""
      action: ""
      timeline: ""
      success_indicator: ""
      investment: ""
      
    - phase: 2
      moat_type: ""
      action: ""
      timeline: ""
      success_indicator: ""
      
    - phase: 3
      moat_type: ""
      action: ""
      timeline: ""
      success_indicator: ""
      
  reinforcing_loops:
    - loop: ""
      description: ""
      strength: ""
      timeline_to_activate: ""
      
  moat_vulnerabilities:
    - vulnerability: ""
      mitigation: ""

# ═══════════════════════════════════════════════════════════════════════════════
# RISK ANALYSIS
# What could go wrong
# ═══════════════════════════════════════════════════════════════════════════════

risk_analysis:
  
  market_risks:
    - risk: ""
      description: ""
      probability: ""         # low | medium | high
      impact: ""              # minor | moderate | severe | critical
      mitigation: ""
      trigger_indicators: []
      contingency: ""
      
  competitive_risks:
    - risk: ""
      probability: ""
      impact: ""
      mitigation: ""
      
  execution_risks:
    - risk: ""
      probability: ""
      impact: ""
      mitigation: ""
      
  financial_risks:
    - risk: ""
      probability: ""
      impact: ""
      mitigation: ""
      
  regulatory_risks:
    - risk: ""
      probability: ""
      impact: ""
      mitigation: ""
      
  technology_risks:
    - risk: ""
      probability: ""
      impact: ""
      mitigation: ""
      
  existential_risks:
    - risk: ""
      probability: ""
      mitigation: ""
      early_warning_signs: []

# ═══════════════════════════════════════════════════════════════════════════════
# SUCCESS METRICS
# How to measure success
# ═══════════════════════════════════════════════════════════════════════════════

success_metrics:
  
  north_star:
    metric: ""
    definition: ""
    rationale: ""
    target_trajectory: ""
    
  primary_metrics:
    - metric: ""
      definition: ""
      target_phase_1: ""
      target_phase_2: ""
      target_phase_3: ""
      measurement_frequency: ""
      owner: ""
      
  health_metrics:
    - metric: ""
      definition: ""
      healthy_range: ""
      warning_threshold: ""
      critical_threshold: ""
      action_if_unhealthy: ""
      
  anti_metrics:
    - metric: ""
      why_not_optimize: ""
      acceptable_range: ""
      
  leading_indicators:
    - indicator: ""
      leads_to: ""
      lag_time: ""
      
  milestone_targets:
    - milestone: ""
      target_date: ""
      success_criteria: []
      stretch_goal: ""
      minimum_viable: ""

# ═══════════════════════════════════════════════════════════════════════════════
# COGNITIVE VALIDATION
# Stress-test the strategy
# ═══════════════════════════════════════════════════════════════════════════════

cognitive_validation:
  
  adversarial:
    how_could_this_fail:
      - failure_mode: ""
        likelihood: ""
        prevention: ""
        detection: ""
        
    competitive_responses:
      - competitor: ""
        likely_response: ""
        our_counter: ""
        
    worst_case_scenarios:
      - scenario: ""
        probability: ""
        impact: ""
        recovery_plan: ""
        
  contrarian:
    assumptions_questioned:
      - assumption: ""
        alternative_view: ""
        if_wrong_impact: ""
        test: ""
        
    unconventional_elements:
      - element: ""
        why_different: ""
        evidence_supporting: ""
        risk: ""
        
  temporal:
    year_1:
      focus: ""
      expected_position: ""
      key_milestones: []
      biggest_challenges: []
      
    year_3:
      focus: ""
      expected_position: ""
      scaling_challenges: []
      
    year_5:
      focus: ""
      expected_position: ""
      strategic_options: []
      
    year_10:
      vision: ""
      potential_outcomes:
        - outcome: ""
          probability: ""

# ═══════════════════════════════════════════════════════════════════════════════
# RESOURCE REQUIREMENTS
# What's needed to execute
# ═══════════════════════════════════════════════════════════════════════════════

resources:
  
  funding:
    phase_1:
      amount: ""
      use_of_funds:
        - category: ""
          amount: ""
          percentage: ""
      runway: ""
      funding_source: ""
      
    phase_2:
      amount: ""
      use_of_funds: []
      trigger_for_raise: ""
      
    phase_3:
      amount: ""
      use_of_funds: []
      
  team:
    phase_1:
      size: ""
      key_hires:
        - role: ""
          priority: ""
          timing: ""
          
    phase_2:
      size: ""
      key_hires: []
      
    phase_3:
      size: ""
      departments: []
      
  technology:
    phase_1:
      infrastructure_cost: ""
      key_investments: []
      
    scaling_considerations: []
    
  partnerships:
    critical_partnerships:
      - partner_type: ""
        purpose: ""
        timeline: ""
        
    nice_to_have: []

# ═══════════════════════════════════════════════════════════════════════════════
# EXECUTION ROADMAP
# Sequenced actions
# ═══════════════════════════════════════════════════════════════════════════════

roadmap:
  
  immediate_actions:
    - action: ""
      owner: ""
      deadline: ""
      success_criteria: ""
      dependencies: []
      
  phase_1_priorities:
    - priority: ""
      rationale: ""
      dependencies: []
      timeline: ""
      
  phase_2_priorities:
    - priority: ""
      trigger: ""
      
  decision_points:
    - decision: ""
      timing: ""
      criteria: []
      options: []
      
  go_no_go_criteria:
    - milestone: ""
      criteria: []
      fallback_if_not_met: ""
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PART II: SOFTWARE ANALYSIS
# Understanding existing solutions before designing
# ═══════════════════════════════════════════════════════════════════════════════

## PHASE 3: SOFTWARE COMPETITOR ANALYSIS

For each competitor, analyze their software implementation:

```yaml
# software/competitors/{competitor-name}.yaml

$schema: "https://sparc-dsl.dev/schemas/software-competitor.yaml.json"
version: "1.0"

meta:
  product_name: ""
  company: ""
  website: ""
  analysis_date: ""
  analyst: "sparc-v6.1"

# ═══════════════════════════════════════════════════════════════════════════════
# PRODUCT OVERVIEW
# ═══════════════════════════════════════════════════════════════════════════════

product_overview:
  
  description: ""
  
  type: ""                    # web-app | mobile-app | desktop | api-first | hybrid
  
  platforms:
    - platform: ""            # web | ios | android | windows | mac | linux
      quality: ""             # poor | adequate | good | excellent
      feature_parity: ""      # full | partial | minimal
      
  deployment:
    model: ""                 # cloud-only | self-hosted | hybrid | on-premise
    regions: []
    multi_tenant: ""
    
  maturity:
    level: ""                 # alpha | beta | stable | mature | legacy
    years_in_market: ""
    major_version: ""
    release_cadence: ""

# ═══════════════════════════════════════════════════════════════════════════════
# TECHNICAL ARCHITECTURE
# ═══════════════════════════════════════════════════════════════════════════════

technical_architecture:
  
  stack:
    frontend:
      framework: ""
      language: ""
      ui_library: ""
      state_management: ""
      confidence: ""          # confirmed | likely | speculated
      evidence: ""
      
    backend:
      language: ""
      framework: ""
      architecture: ""        # monolith | microservices | serverless
      confidence: ""
      evidence: ""
      
    database:
      primary:
        type: ""              # postgresql | mysql | mongodb | etc
        technology: ""
      secondary: []
      confidence: ""
      
    cache:
      technology: ""
      usage: ""
      
    search:
      technology: ""
      
    queue:
      technology: ""
      
    infrastructure:
      cloud_provider: ""
      regions: []
      cdn: ""
      confidence: ""
      evidence: ""
      
  api:
    type: ""                  # rest | graphql | grpc | soap | hybrid
    
    documentation:
      exists: ""
      quality: ""             # poor | adequate | good | excellent
      url: ""
      completeness: ""
      
    versioning:
      strategy: ""            # url | header | query
      current_version: ""
      deprecated_versions: []
      
    authentication:
      methods: []             # api-key | oauth2 | jwt | basic
      oauth_scopes: []
      
    rate_limits:
      documented: ""
      limits:
        - endpoint: ""
          limit: ""
          window: ""
          
    pagination:
      style: ""               # offset | cursor | keyset
      
    error_handling:
      format: ""
      quality: ""
      
    sdk_availability:
      - language: ""
        official: ""          # official | community | none
        quality: ""
        maintained: ""
        
    webhooks:
      available: ""
      events: []
      reliability: ""
      
  real_time:
    technology: ""            # websocket | sse | polling | none
    use_cases: []
    
  scalability:
    architecture: ""          # monolith | microservices | serverless | hybrid
    estimated_scale: ""
    known_limits: []
    performance_reputation: ""
    
  reliability:
    uptime_sla: ""
    status_page_url: ""
    historical_uptime: ""
    incident_history: ""
    disaster_recovery: ""
    
  security:
    certifications: []        # soc2 | iso27001 | hipaa | gdpr | pci-dss
    notable_features: []
    known_issues: []
    penetration_tested: ""
    bug_bounty: ""

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE INVENTORY
# Comprehensive feature listing
# ═══════════════════════════════════════════════════════════════════════════════

feature_inventory:
  
  domains:
    
    - name: ""                # e.g., "Authentication"
      description: ""
      maturity: ""            # basic | standard | advanced | best-in-class
      
      features:
        - name: ""
          description: ""
          
          availability: ""    # all-tiers | paid | enterprise
          
          maturity: ""        # basic | standard | advanced | best-in-class
          ux_quality: ""      # poor | adequate | good | excellent
          
          capabilities:
            - capability: ""
              depth: ""       # shallow | moderate | deep
              
          limitations:
            - limitation: ""
              severity: ""    # minor | moderate | major
              workaround: ""
              
          competitive_strength: "" # weakness | parity | strength | differentiator
          
          implementation_notes: ""
          
  feature_comparison_summary:
    strengths: []
    weaknesses: []
    unique_features: []
    missing_table_stakes: []

# ═══════════════════════════════════════════════════════════════════════════════
# UX ANALYSIS
# User experience evaluation
# ═══════════════════════════════════════════════════════════════════════════════

ux_analysis:
  
  overall_quality: ""         # poor | adequate | good | excellent
  
  design_system:
    quality: ""
    consistency: ""
    accessibility: ""
    dark_mode: ""
    modern: ""                # dated | current | cutting-edge
    customization: ""
    
  information_architecture:
    quality: ""
    navigation_type: ""       # sidebar | top-nav | command-palette | hybrid
    findability: ""
    depth: ""
    
  onboarding:
    type: ""                  # self-serve | guided | assisted | white-glove
    time_to_value: ""
    steps_to_first_success: ""
    
    flow:
      - step: ""
        description: ""
        friction: ""          # none | low | medium | high
        drop_off_risk: ""
        
    friction_points:
      - point: ""
        severity: ""
        
    onboarding_quality: ""
    
  key_workflows:
    - workflow: ""
      frequency: ""           # daily | weekly | occasional
      importance: ""          # critical | high | medium | low
      steps: ""
      time_to_complete: ""
      pain_points: []
      excellence_points: []
      competitive_assessment: ""
      
  mobile_experience:
    responsive: ""
    native_apps: ""
    parity_with_web: ""
    mobile_specific_features: []
    
  performance:
    initial_load: ""
    time_to_interactive: ""
    interaction_speed: ""
    perceived_speed: ""
    offline_capability: ""
    
  customization:
    theming: ""
    layout: ""
    workflows: ""
    branding: ""
    
  accessibility:
    wcag_compliance: ""
    screen_reader: ""
    keyboard_navigation: ""
    
  documentation:
    quality: ""
    completeness: ""
    freshness: ""
    formats: []               # docs | video | interactive

# ═══════════════════════════════════════════════════════════════════════════════
# INTEGRATION ECOSYSTEM
# Connectivity with other tools
# ═══════════════════════════════════════════════════════════════════════════════

integrations:
  
  ecosystem_size: ""          # small | medium | large | extensive
  ecosystem_quality: ""
  
  native_integrations:
    - name: ""
      category: ""            # crm | email | payment | analytics | etc.
      depth: ""               # basic | standard | deep
      bidirectional: ""
      quality: ""
      popularity: ""
      
  categories:
    - category: ""
      integration_count: ""
      notable: []
      gaps: []
      
  integration_platform:
    zapier:
      available: ""
      trigger_count: ""
      action_count: ""
    make:
      available: ""
    native_webhooks:
      available: ""
      events: []
    custom_integration:
      api_quality: ""
      documentation: ""
      
  api_capabilities:
    crud_coverage: ""         # What % of features are API-accessible
    real_time: ""             # webhooks | websockets | polling | none
    bulk_operations: ""
    rate_limits: ""
    
  import_export:
    import_formats: []
    export_formats: []
    migration_tools: ""
    data_portability: ""
    
  marketplace:
    exists: ""
    app_count: ""
    quality: ""
    revenue_share: ""

# ═══════════════════════════════════════════════════════════════════════════════
# COGNITIVE ANALYSIS
# ═══════════════════════════════════════════════════════════════════════════════

cognitive_analysis:
  
  adversarial:
    security_concerns:
      - concern: ""
        severity: ""
        evidence: ""
        
    reliability_issues:
      - issue: ""
        frequency: ""
        impact: ""
        
    scalability_limits:
      - limit: ""
        threshold: ""
        impact: ""
        
    technical_debt_signals:
      - signal: ""
        implication: ""
        
  user_perspective:
    frustrations:
      - frustration: ""
        frequency: ""         # common | occasional | rare
        severity: ""
        source: ""            # g2 | twitter | reddit | support
        
    workarounds_needed:
      - workaround: ""
        for_limitation: ""
        
    feature_requests:
      - request: ""
        votes: ""
        status: ""
        source: ""
        
    praise_points:
      - point: ""
        frequency: ""
        
  temporal:
    release_velocity: ""      # rapid | moderate | slow | stagnant
    recent_releases:
      - version: ""
        date: ""
        highlights: []
    recent_improvements: []
    stagnant_areas: []
    roadmap_visibility: ""
    public_roadmap_url: ""
    
  innovation:
    innovation_level: ""      # laggard | follower | fast-follower | innovator
    innovative_features: []
    following_trends: []
    missing_trends: []
    ai_features: []

# ═══════════════════════════════════════════════════════════════════════════════
# FEATURE GAPS
# What's missing or poorly done
# ═══════════════════════════════════════════════════════════════════════════════

feature_gaps:
  
  missing_features:
    - feature: ""
      description: ""
      impact: ""              # Would solve what problem
      user_demand: ""         # How much users want this
      difficulty: ""          # How hard to build
      opportunity: ""         # low | medium | high
      
  incomplete_features:
    - feature: ""
      current_state: ""
      missing_capabilities: []
      user_impact: ""
      
  poor_implementations:
    - feature: ""
      issues: []
      how_to_do_better: ""
      competitive_opportunity: ""

# ═══════════════════════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════

summary:
  
  overall_assessment: ""
  
  strengths:
    - strength: ""
      importance: ""
      
  weaknesses:
    - weakness: ""
      exploitability: ""
      
  learn_from:
    - lesson: ""
      application: ""
      
  differentiate_on:
    - factor: ""
      approach: ""
      
  avoid:
    - pattern: ""
      reason: ""
      
  technical_respect: ""       # low | moderate | high
  ux_respect: ""              # low | moderate | high
  threat_level: ""            # low | moderate | high
```

---

## PHASE 4: SOFTWARE IDEAL SPECIFICATION

Synthesize into exhaustive software specification with ALL cyclomatic paths.

See separate file: `schemas/software-ideal.yaml` (complete schema with full cyclomatic path coverage for every feature)

---

# ═══════════════════════════════════════════════════════════════════════════════
# PART III: EXECUTABLE DSL FAMILY
# Transform specification into code-ready DSLs
# ═══════════════════════════════════════════════════════════════════════════════

## DSL FILES TO GENERATE

For complete schemas, see the `/schemas/` directory:

1. **data.yaml** - Database schema, entities, relationships, migrations
2. **ui.yaml** - Screens, components, design system, navigation
3. **logic.yaml** - Workflows, state machines, validations, business rules
4. **api.yaml** - Endpoints, schemas, handlers, OpenAPI
5. **auth.yaml** - Authentication, authorization, roles, permissions
6. **deploy.yaml** - Infrastructure, CI/CD, monitoring
7. **tests.yaml** - Integration tests, factories, external mocks

---

# ═══════════════════════════════════════════════════════════════════════════════
# PART IV: TESTING SPECIFICATION
# ═══════════════════════════════════════════════════════════════════════════════

## TESTING PHILOSOPHY - HARD RULES

```yaml
# MANDATORY TESTING RULES - NON-NEGOTIABLE

test_philosophy:
  
  # 1. NO UNIT TESTS
  unit_tests: false
  reason: "API integration tests catch more real issues"
  
  # 2. API-LEVEL INTEGRATION TESTS ONLY
  test_level: "api_integration"
  test_through: "HTTP endpoints"
  
  # 3. FOLLOW ALL CYCLOMATIC PATHS
  coverage_requirement: "all_paths_from_simulation"
  must_test:
    - "Every PATH-* from software-ideal.yaml"
    - "Every EDGE-* case"
    - "Every boundary condition"
    - "Every state machine transition"
    
  # 4. MOCK ONLY EXTERNAL SERVICES
  allowed_mocks:
    - "OAuth providers (Google, Apple, GitHub, Microsoft)"
    - "Email providers (MailChannels)"
    - "SMS providers (Twilio)"
    - "Payment providers (Stripe, PayPal)"
    - "External storage (S3, GCS)"
    - "Any third-party API"
    
  forbidden_mocks:
    - "Database - use real test database"
    - "Redis/cache - use real test instance"
    - "File system - use real test filesystem"
    - "Message queues - use real test queue"
    - "Internal services - call actual implementation"
    - "ORM/query builders - never mock"
    
  # 5. FACTORIES OVER FIXTURES
  data_strategy:
    prefer: "factories"
    fallback: "fixtures (only when factories impossible)"
    
  # 6. LIVE DATABASE
  database:
    type: "real_database"
    isolation: "transaction_rollback"

  # 7. NEVER IGNORE TESTS
  test_discipline:
    ignore_tests: false
    skip_tests: false
    disable_tests: false
    rule: |
      Do not mark any test as ignored, skipped, or disabled for any reason.
      If a test is failing, continue thinking differently and find another approach.
      Tests exist to catch real issues — ignoring them hides problems that surface in production.
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# PART V: SIMULATION & INTERACTION
# ═══════════════════════════════════════════════════════════════════════════════

## SIMULATION MODES

```yaml
# simulation/modes.yaml

simulations:
  
  # Business Simulations
  business:
    
    - name: "competitive_landscape"
      command: "sparc sim business:landscape"
      description: "Visual competitive positioning map"
      output: "Interactive chart showing market positions"
      
    - name: "pricing_comparison"
      command: "sparc sim business:pricing"
      description: "Pricing tier comparison across competitors"
      output: "Comparison table with feature/price matrix"
      
    - name: "market_sizing"
      command: "sparc sim business:market"
      description: "TAM/SAM/SOM visualization"
      output: "Market size funnel with sources"
      
    - name: "gtm_timeline"
      command: "sparc sim business:gtm"
      description: "Go-to-market timeline simulation"
      output: "Gantt chart with milestones"
      
  # Software Simulations
  software:
    
    - name: "feature_matrix"
      command: "sparc sim software:features"
      description: "Feature comparison matrix"
      output: "Interactive feature comparison table"
      
    - name: "path_explorer"
      command: "sparc sim software:paths"
      description: "Interactive cyclomatic path explorer"
      output: "Visual flow diagram with all paths"
      
    - name: "state_machine_viewer"
      command: "sparc sim software:states"
      description: "Interactive state machine visualization"
      output: "State diagram with transitions"
      
    - name: "api_explorer"
      command: "sparc sim software:api"
      description: "Interactive API documentation"
      output: "Swagger/OpenAPI explorer"
      
  # Technical Simulations
  technical:
    
    - name: "mock_server"
      command: "sparc sim api:mock"
      description: "Running mock API server from spec"
      output: "Local server at localhost:3000"
      
    - name: "ui_prototype"
      command: "sparc sim ui:prototype"
      description: "Interactive UI prototype"
      output: "Storybook with all components"
      
    - name: "database_diagram"
      command: "sparc sim data:diagram"
      description: "Entity relationship diagram"
      output: "ERD with relationships"
      
    - name: "architecture_diagram"
      command: "sparc sim deploy:architecture"
      description: "System architecture visualization"
      output: "Infrastructure diagram"
      
    - name: "cost_estimation"
      command: "sparc sim deploy:cost"
      description: "Infrastructure cost estimation"
      output: "Monthly cost breakdown by service"
      
  # Test Simulations
  testing:
    
    - name: "coverage_report"
      command: "sparc sim tests:coverage"
      description: "Path-to-test coverage mapping"
      output: "Coverage report showing all paths"
      
    - name: "test_matrix"
      command: "sparc sim tests:matrix"
      description: "Test case matrix"
      output: "Table of all test cases by feature"
      
  # Platform Simulations (if platform)
  platform:
    
    - name: "service_map"
      command: "sparc sim platform:services"
      description: "Service dependency visualization"
      output: "Service mesh diagram"
      
    - name: "auth_flow"
      command: "sparc sim platform:auth"
      description: "Authentication flow visualization"
      output: "Sequence diagrams for auth flows"
      
    - name: "event_flow"
      command: "sparc sim platform:events"
      description: "Event bus message flow"
      output: "Event flow diagram"

# Interactive CLI
interactive:
  
  command: "sparc interactive"
  
  capabilities:
    - "Navigate through all simulations"
    - "Modify parameters and see results"
    - "Export diagrams and reports"
    - "Generate code from any point"
    - "Validate completeness"
    - "Run tests against mock server"
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# OUTPUT STRUCTURE
# ═══════════════════════════════════════════════════════════════════════════════

## GENERATED FILE STRUCTURE

```
{project-name}/
├── README.md
│
├── spec/
│   ├── package.yaml                    # Master index
│   │
│   ├── architecture/
│   │   ├── platform-decision.yaml      # Platform vs Single SaaS
│   │   └── platform-architecture.yaml  # (If platform)
│   │
│   ├── business/
│   │   ├── competitors/
│   │   │   ├── competitor-1.yaml
│   │   │   ├── competitor-2.yaml
│   │   │   ├── competitor-3.yaml
│   │   │   ├── competitor-4.yaml
│   │   │   └── competitor-5.yaml
│   │   └── ideal/
│   │       └── business-ideal.yaml
│   │
│   ├── software/
│   │   ├── competitors/
│   │   │   ├── competitor-1.yaml
│   │   │   ├── competitor-2.yaml
│   │   │   ├── competitor-3.yaml
│   │   │   ├── competitor-4.yaml
│   │   │   └── competitor-5.yaml
│   │   └── ideal/
│   │       └── software-ideal.yaml     # With ALL cyclomatic paths
│   │
│   ├── dsl/
│   │   ├── data.yaml
│   │   ├── ui.yaml
│   │   ├── logic.yaml
│   │   ├── api.yaml
│   │   ├── auth.yaml
│   │   └── deploy.yaml
│   │
│   └── tests/
│       ├── tests.yaml
│       ├── factories.yaml
│       └── mocks/
│           ├── oauth.yaml
│           ├── email.yaml
│           ├── sms.yaml
│           └── payment.yaml
│
├── simulation/
│   ├── modes.yaml
│   └── scripts/
│
└── project/
    ├── CLAUDE.md                       # AI assistant instructions
    └── ROADMAP.md
```

### IF PLATFORM: Repository Structure

```
{platform}/                             # GitHub Organization
│
├── {platform}-platform/                # Meta repository
│   ├── README.md
│   ├── docker-compose.yaml
│   ├── spec/                          # All SPARC specs
│   └── infra/
│
├── {platform}-auth/                    # Shared auth service
│   ├── spec/                          # Service-specific DSLs
│   └── src/
│
├── {platform}-billing/                 # Shared billing service
│   └── ...
│
├── {platform}-notifications/           # Shared notifications
│   └── ...
│
├── {platform}-{product-a}/            # Product A
│   ├── spec/
│   └── src/
│
├── {platform}-{product-b}/            # Product B
│   └── ...
│
├── {platform}-common/                  # Shared libraries
│   └── ...
│
└── {platform}-sdk/                     # Client SDKs
    └── ...
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# INPUT FORMAT
# ═══════════════════════════════════════════════════════════════════════════════

## FULL INPUT FORMAT

```yaml
idea:
  name: ""
  tagline: ""
  description: ""
  problem_statement: ""
  target_users: []
  primary_kpi: ""
  
  # Platform indicators
  platform_signals:
    multiple_user_types: []
    multiple_products: []
    marketplace: false
    white_label_needed: false

constraints:
  budget_tier: ""             # bootstrap | startup | funded | enterprise
  timeline: ""                # mvp | standard | comprehensive
  team_size: ""               # solo | small | medium | large

preferences:
  stack:
    frontend: ""              # react | vue | svelte | nextjs
    backend: ""               # rust | node | python | go
    database: ""              # postgres | mysql | mongodb
    
  deployment:
    cloud: ""                 # aws | gcp | azure | vercel
    orchestration: ""         # kubernetes | docker | serverless
    
  architecture:
    white_label: true         # Always true by default
    multi_tenant: true
    
comparables:
  similar_to: []              # List 5-8 competitors
  gaps_in_existing: []
```

## EXPRESS INPUT FORMAT

```
IDEA: [One sentence description]
FOR: [Target users]
BECAUSE: [Problem statement]
LIKE: [5-8 competitors to analyze]
STACK: [frontend/backend/database]
DEPLOY: [cloud/orchestration]
PLATFORM: [yes/no - multiple products/services?]
WHITE_LABEL: [yes/no - need standalone deployment?]
```

---

# ═══════════════════════════════════════════════════════════════════════════════
# EXECUTION CHECKLIST
# ═══════════════════════════════════════════════════════════════════════════════

## WHAT THIS PROMPT GENERATES

1. **Platform Decision** - Analyze if platform or single SaaS
2. **Platform Architecture** (if platform) - Bounded contexts, unified auth, repo structure
3. **Business Competitor Analysis** - 5-8 detailed competitor business models
4. **Business Ideal Synthesis** - Optimal business strategy
5. **Software Competitor Analysis** - 5-8 detailed competitor product analyses
6. **Software Ideal Specification** - Complete spec with ALL cyclomatic paths
7. **Executable DSLs** - data, ui, logic, api, auth, deploy
8. **Test Specification** - Integration tests for all paths, factories, mocks
9. **Simulation Modes** - Interactive exploration tools
10. **White-Label Configuration** - Standalone deployment support

## VALIDATION CHECKLIST

- [ ] Platform detection completed with rationale
- [ ] If platform: unified auth architecture defined
- [ ] If platform: each bounded context has own repository
- [ ] All 5-8 competitors analyzed (business)
- [ ] All 5-8 competitors analyzed (software)
- [ ] Business ideal synthesizes all learnings
- [ ] Every feature has complete PATH-* coverage
- [ ] Every feature has EDGE-* cases
- [ ] Every feature has boundary conditions
- [ ] Every stateful entity has state machine
- [ ] All DSL files cross-reference correctly
- [ ] Tests cover all cyclomatic paths
- [ ] Only external services are mocked
- [ ] White-label configuration included
- [ ] Simulation modes documented

---

## BEGIN

Paste your idea below. I will generate the complete SPARC v6.1 specification.
