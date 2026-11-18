import { Dictionary } from './fr';

export const en: Dictionary = {
  meta: {
    lang: 'en',
  },
  nav: {
    poles: 'Practices & Engines',
    methodology: 'Governance',
    portfolio: 'Case Studies',
    configurator: 'Brief Configurator',
    concierge: 'AI Concierge',
    ctaStart: 'Start a Project',
  },
  hero: {
    kicker: 'Abidjan · West Africa & International · Sovereign Digital Architecture',
    title: 'Sovereign Digital Engineering, Executive Art Direction & 360° AI Automation.',
    subtitle:
      'We architect, engineer, and scale mission-critical platforms for ambitious organizations: sovereign brand identities, high-performance Web & SaaS ecosystems, Offline-First Mobile/Desktop applications, and AI-driven growth infrastructure.',
    ctaPrimary: 'Configure My Brief',
    ctaSecondary: 'Speak to AI Concierge',
    governanceMetrics: [
      {
        value: '100%',
        label: 'Client Asset Ownership & Full IP Transfer',
        detail: 'Domains, cloud servers, Store accounts, and source code in your name',
      },
      {
        value: '5 Days',
        label: 'Structured Milestone Review Window',
        detail: 'Agile contractual cadence with 5-business-day milestone sign-off',
      },
      {
        value: '40 / 30 / 30',
        label: 'Transparent Contractual Payment Schedule',
        detail: '40% kickoff · 30% design/architecture sign-off · 30% final delivery',
      },
      {
        value: 'ARTCI & GDPR',
        label: 'Compliance & Zero-Data Retention',
        detail: 'Côte d’Ivoire Law n°2013-450, EU GDPR & strict AI context isolation',
      },
    ],
  },
  polesMatrix: {
    sectionKicker: '01. 360° Operational Architecture',
    title: '4 Specialized Execution Poles Powered by 2 Transverse Engines.',
    subtitle:
      'Every engagement is governed by our Executive Art Direction and AI Engineering engines, ensuring uncompromising aesthetic and technical cohesion across your entire digital ecosystem.',
    transverseHeader: 'Transverse Authority Engines (Available Across All 4 Poles)',
    transverseEngines: [
      {
        id: 'TRANSVERSE_DA',
        code: 'TRANSVERSE ENGINE A · +20%',
        title: 'Executive Art Direction & W3C Design Tokens',
        description:
          'Sovereign design systems, authoritative typography, high-fidelity interactive prototypes, and W3C design tokens (design-tokens.json) validated prior to engineering.',
        specs: ['W3C Design System', 'WCAG AAA Contrast', 'High-Fidelity Prototypes'],
      },
      {
        id: 'TRANSVERSE_AI',
        code: 'TRANSVERSE ENGINE B · +25%',
        title: 'AI Engineering (Gemini) & n8n Automation (ZDR)',
        description:
          'Integration of structured-output Gemini AI qualification agents, n8n business workflow automation, and data pipelines governed by a strict Zero-Data Retention policy.',
        specs: ['Gemini Structured JSON', 'n8n / API Orchestration', 'Zero-Data Retention'],
      },
    ],
    polesHeader: 'The 4 Specialized Production Poles',
    selectInConfigurator: 'Select in Configurator',
    selectedInConfigurator: 'Selected in Your Brief',
    indicativeRangeLabel: 'Indicative range:',
    deliveryLabel: 'Typical timeline:',
    daysUnit: 'business days',
    poles: [
      {
        id: 'BRANDING',
        number: 'POLE 01',
        title: '360° Identity & Branding',
        subtitle: 'Brand strategy, institutional Brand Book, Design Tokens & Packaging',
        description:
          'Crafting high-authority, sovereign brand identities for corporate groups, financial institutions, and scale-ups operating across West Africa and global markets.',
        deliverables: [
          'Brand platform, narrative architecture & executive positioning',
          'Full vector identity system & standardized institutional Brand Book',
          'UI/UX design system & W3C token specification (design-tokens.json)',
          'Physical collateral, architectural signage, annual reports & luxury packaging',
        ],
      },
      {
        id: 'WEB',
        number: 'POLE 02',
        title: 'High-Performance Web Engineering',
        subtitle: 'Institutional platforms, multi-currency E-Commerce, SaaS & SEO/GEO',
        description:
          'Modern web engineering (React / Next.js App Router / TypeScript) calibrated for instant load speeds (LCP < 1.8s), B2B/B2C conversion, and Generative Engine Optimization.',
        deliverables: [
          'Executive corporate websites & high-security institutional portals',
          'Multi-currency E-Commerce platforms (XOF / Mobile Money / EUR / USD)',
          'Custom Web SaaS applications & client portals on PostgreSQL / RLS',
          'Technical SEO architecture, Schema.org JSON-LD & AI Search (GEO)',
        ],
      },
      {
        id: 'MOBILE_DESKTOP',
        number: 'POLE 03',
        title: 'Mobile & Desktop Applications',
        subtitle: 'iOS, Android, Windows/macOS & Resilient Offline-First Architecture',
        description:
          'Native and cross-platform applications engineered to operate seamlessly even under intermittent network connectivity, with encrypted local-to-cloud synchronization.',
        deliverables: [
          'iOS (Apple App Store) & Android (Google Play Store) mobile applications',
          'Mission-critical Desktop software (Windows / macOS) for field operations',
          'Offline-First local synchronization engine & resilient transaction queue',
          'Direct deployment onto your organization’s own Apple & Google developer accounts',
        ],
      },
      {
        id: 'GROWTH',
        number: 'POLE 04',
        title: 'Growth, Paid Media & Visibility',
        subtitle: 'Meta / TikTok / Google Ads, Server-Side CAPI Tracking & CRO',
        description:
          'Measurable, ARTCI/GDPR-compliant acquisition infrastructure connecting your advertising spend directly to verified pipeline and revenue inside your CRM.',
        deliverables: [
          'Server-Side Tracking Architecture (Conversions API, GTM Server, Consent Mode v2)',
          'Paid Media acquisition campaigns (LinkedIn, Meta, Google, TikTok)',
          'Conversion Rate Optimization (CRO) & B2B qualification funnels',
          'Real-time ROAS / CAC / LTV executive dashboards in XOF, EUR, and USD',
        ],
      },
    ],
  },
  methodology: {
    sectionKicker: '02. Operating Model & Contractual Governance',
    title: '“Core & Elastic Guilds” Architecture & Sovereign Guarantees.',
    subtitle:
      'We combine the strategic rigor of an internal executive Core in Abidjan with the velocity of senior engineering and creative Guilds deployable within 48 hours.',
    guildModelTitle: 'How Core & Elastic Guilds Operate',
    guildSteps: [
      {
        step: '01',
        title: 'Internal Executive Core (Architecture & Art Direction)',
        duration: 'Days 1 to 5',
        description:
          'Strategic scoping, technical architecture, Executive Art Direction, and W3C Design Token definition led directly by our Managing Partners.',
        deliverable: 'Architecture blueprint, high-fidelity mockups & milestone contract',
      },
      {
        step: '02',
        title: 'Senior Elastic Guild Mobilization (Within 48h)',
        duration: 'Agile Production',
        description:
          'Rapid deployment of specialized senior squads (Web, Offline-First Mobile, AI/n8n, Growth CAPI) under strict architectural and QA supervision.',
        deliverable: 'Private staging environment & weekly executive sprint reviews',
      },
      {
        step: '03',
        title: 'Final QA, Sovereign Handover & Documentation',
        duration: 'Launch & Handover',
        description:
          'Security audit, load testing, complete handover of credentials (Git repositories, cloud servers, Store accounts), and live team training.',
        deliverable: '100% assigned source code + operational runbook',
      },
    ],
    guaranteesTitle: 'The 4 Governance Clauses Enforced in Every Contract',
    guarantees: [
      {
        code: 'CLAUSE 01',
        title: 'Full Independence of Client Assets',
        description:
          'Domain names, Cloud/Supabase hosting, Apple Developer / Google Play accounts, and Ad Business Managers are registered and remain exclusively under your company’s name.',
      },
      {
        code: 'CLAUSE 02',
        title: '100% Intellectual Property Assignment',
        description:
          'Upon final milestone settlement, 100% of intellectual property rights covering custom source code, Figma files, design tokens, and AI workflows transfer unconditionally to you.',
      },
      {
        code: 'CLAUSE 03',
        title: '5-Business-Day Structured Milestone Approval',
        description:
          'To protect delivery velocity, each submitted milestone includes a clear 5-business-day review window, preventing timeline drift and bottlenecks.',
      },
      {
        code: 'CLAUSE 04',
        title: '40 / 30 / 30 Payment Schedule & Zero-Data Retention',
        description:
          'Balanced milestone billing (40% upon signature, 30% upon design/architecture sign-off, 30% upon final acceptance) and strict Zero-Data Retention AI processing.',
      },
    ],
  },
  portfolio: {
    sectionKicker: '03. Sector Case Studies',
    title: 'Measured ROI Impact & Deployed Architectures.',
    subtitle:
      'Four representative engagements illustrating our execution method: Business Challenge, Architecture & Art Direction, and Verified ROI Impact.',
    filters: {
      ALL: 'All Poles',
      BRANDING: 'Pole 1 · Branding',
      WEB: 'Pole 2 · Web & SaaS',
      MOBILE_DESKTOP: 'Pole 3 · Mobile & Offline',
      GROWTH: 'Pole 4 · Growth & CAPI',
    },
    labels: {
      challenge: 'Business Challenge',
      architecture: 'Architecture & Art Direction',
      impact: 'Measured ROI Impact',
      inspectCase: 'Inspect Technical Case Study',
      configureSimilar: 'Configure a Similar Project',
      closeModal: 'Close Case Study',
      deliverablesTitle: 'Delivered Assets & Technical Stack',
    },
    cases: [
      {
        id: 'fintech-uemoa',
        pole: 'MOBILE_DESKTOP',
        poleLabel: 'Pole 3 · Offline-First Mobile & Desktop',
        sector: 'FinTech & Cross-Border UEMOA Payments',
        location: 'Abidjan · Dakar · Paris',
        title: 'Kauri Settlement — Offline-First B2B Wallet & Merchant POS Terminal',
        clientType: 'Regional Electronic Money Institution',
        challenge:
          'Guarantee merchant payment acceptance and interbank reconciliation across the UEMOA region despite intermittent network drops, while meeting strict BCEAO compliance.',
        architectureAndDa:
          'iOS/Android mobile app and Desktop POS terminal built on a locally encrypted transaction queue (SQLite Offline-First) paired with a high-contrast sovereign interface.',
        roiImpact:
          '+215% transaction volume in 6 months, 99.98% field availability, and a 64% reduction in merchant onboarding time.',
        metrics: [
          { label: 'Transaction Volume', value: '+215%' },
          { label: 'Field Availability', value: '99.98%' },
          { label: 'Merchant Onboarding', value: '-64%' },
        ],
        stack: ['React Native', 'SQLite Offline-First', 'PostgreSQL RLS', 'W3C Design Tokens'],
        deliverables: [
          'Synchronized iOS, Android & Desktop POS applications',
          'Sovereign design system & institutional Brand Book',
          'Automated reconciliation API & real-time anomaly alerts',
        ],
      },
      {
        id: 'immobilier-prestige-abidjan',
        pole: 'BRANDING',
        poleLabel: 'Pole 1 · 360° Identity & Branding',
        title: 'Riviera Souveraine — Institutional Brand & Diaspora Investor Portal',
        sector: 'Luxury Real Estate & Land Development',
        location: 'Abidjan (Cocody Ambassades) · London · Dubai',
        clientType: 'Premier Real Estate Developer',
        challenge:
          'Position a flagship diplomatic residential development for institutional investors and the international diaspora with immediate architectural authority.',
        architectureAndDa:
          'Executive Art Direction (Sovereign Gold & Obsidian), comprehensive Brand Book, architectural signage system, and an encrypted multi-currency investor data-room (XOF/EUR/USD).',
        roiImpact:
          '100% of Phase 1 units reserved within 11 weeks and +180% qualified inbound inquiries from international diaspora investors.',
        metrics: [
          { label: 'Phase 1 Reserved', value: '100%' },
          { label: 'Qualified Diaspora Leads', value: '+180%' },
          { label: 'Sales Velocity', value: '11 wks' },
        ],
        stack: ['360° Brand Book', 'W3C Design Tokens', 'Next.js 15', 'Encrypted Data-Room'],
        deliverables: [
          'Complete visual identity, printed monograph & signage guidelines',
          'Multi-currency investment portal (XOF, EUR, USD)',
          'Automated investor dossier qualification workflow',
        ],
      },
      {
        id: 'agro-industrie-export',
        pole: 'GROWTH',
        poleLabel: 'Pole 4 · Growth, Paid Media & Visibility',
        title: 'Ivoire Origin — International B2B Acquisition & Server-Side CAPI Tracking',
        sector: 'Certified Agro-Industry & Export (Cocoa / Cashew)',
        location: 'San-Pédro · Abidjan · Rotterdam',
        clientType: 'Industrial Agro-Export Group',
        challenge:
          'Generate a predictable pipeline of wholesale B2B supply contracts across Europe and North America while complying with EUDR traceability and Consent Mode v2.',
        architectureAndDa:
          'Deployment of a Server-Side tracking infrastructure (GTM Server + CAPI), multilingual B2B SEO/GEO authority, and targeted LinkedIn/Search acquisition.',
        roiImpact:
          'B2B Customer Acquisition Cost (CAC) reduced by 42%, 38 new qualified importer accounts in one quarter, and 100% GDPR/ARTCI compliance.',
        metrics: [
          { label: 'B2B CAC Reduction', value: '-42%' },
          { label: 'Importer Accounts', value: '+38' },
          { label: 'CMP v2 Compliance', value: '100%' },
        ],
        stack: ['Server-Side CAPI', 'Consent Mode v2', 'B2B SEO / GEO', 'n8n Automation'],
        deliverables: [
          'GTM Server-Side architecture & ARTCI/GDPR consent governance',
          'Automated lead enrichment and CRM routing pipeline via n8n',
          'Multi-currency executive commercial pipeline dashboard',
        ],
      },
      {
        id: 'saas-logistique-corridor',
        pole: 'WEB',
        poleLabel: 'Pole 2 · High-Performance Web Engineering',
        title: 'CorridorFlow — Fleet Management & AI-Automated Customs SaaS Platform',
        sector: 'Port Logistics & Corridor Freight',
        location: 'Abidjan Port · Ouagadougou · Tema',
        clientType: 'Regional Logistics Operator',
        challenge:
          'Digitize real-time tracking for 850 freight trucks and automate customs manifest extraction that previously delayed port clearance and B2B billing.',
        architectureAndDa:
          'High-performance Web SaaS platform (1.1s LCP) paired with a Gemini Structured Output document extraction engine and automated n8n alert workflows.',
        roiImpact:
          'Customs document processing speed increased 5x, corridor fleet downtime reduced by 39%, and adopted by 140 partner freight forwarders.',
        metrics: [
          { label: 'Customs Processing', value: '5x Faster' },
          { label: 'Fleet Downtime', value: '-39%' },
          { label: 'Platform LCP', value: '1.1s' },
        ],
        stack: ['React 19 / Next.js', 'Gemini Structured JSON', 'n8n Workflows', 'Supabase RLS'],
        deliverables: [
          'Real-time multi-role Web SaaS portal with Row-Level Security',
          'AI agent for customs manifest extraction and validation',
          'Automated multi-currency invoicing (XOF / EUR / USD)',
        ],
      },
    ],
  },
  configurator: {
    sectionKicker: '04. Brief Configurator & Budget Estimator',
    title: 'Calibrate Your Scope & Generate Your Contractual Estimate.',
    subtitle:
      'Select your execution Poles and transverse engines. Indicative budget ranges and the 40% / 30% / 30% payment schedule calculate instantaneously in your selected currency.',
    aiPrefillBanner:
      'AI Concierge diagnostic applied. Your recommended Poles, modifiers, and project summary have been pre-filled.',
    steps: [
      { num: '01', label: 'Execution Poles' },
      { num: '02', label: 'Engines & Urgency' },
      { num: '03', label: 'Estimate & Schedule' },
      { num: '04', label: 'Executive Sign-Off' },
    ],
    step1: {
      title: 'Step 1 — Select One or More Execution Poles',
      hint: 'An automatic -10% Multi-Pole Synergy discount is applied whenever 2 or more Poles are selected together.',
      multiPoleBadge: 'Multi-Pole Synergy Discount (-10%) Active',
    },
    step2: {
      title: 'Step 2 — Transverse Engines & Mobilization Cadence',
      subtitle:
        'Enable our transverse authority engines or request priority 48-hour Elastic Guild mobilization.',
      urgencyTitle: 'Mobilization Cadence',
      standardLabel: 'Standard — Regular Guild Schedule (0%)',
      standardDesc: 'Standard kickoff and delivery timeline across your selected poles.',
      fastTrackLabel: 'Fast-Track 48h Elastic Guild (+15%)',
      fastTrackDesc:
        'Priority mobilization of a dedicated senior guild within 48 business hours with a 25% timeline compression.',
    },
    step3: {
      title: 'Step 3 — Budget Estimate & Contractual Schedule (40 / 30 / 30)',
      currencySwitchLabel: 'Display & Billing Currency:',
      totalRangeTitle: 'Estimated Investment Range (Excl. Tax)',
      timelineTitle: 'Estimated Delivery Timeline',
      baseSumLabel: 'Base sum of selected Poles',
      multiPoleDiscountLabel: 'Multi-Pole Synergy Discount (-10%)',
      modifiersAppliedLabel: 'Transverse Modifiers & Urgency',
      scheduleTitle: 'Contractual Milestone Breakdown (40% / 30% / 30%)',
      milestone1Title: 'Milestone 1 · 40% Upon Signature',
      milestone1Desc: 'Project initialization, Core mobilization, and strategic discovery kickoff.',
      milestone2Title: 'Milestone 2 · 30% Design & Architecture Sign-Off',
      milestone2Desc: 'Upon formal approval of interactive mockups and technical blueprint.',
      milestone3Title: 'Milestone 3 · 30% Final QA & Full IP Handover',
      milestone3Desc: 'Upon production deployment and complete transfer of credentials and source code.',
      governanceNote:
        'Contractual guarantee: 100% client ownership, 5-business-day milestone review window, and Zero-Data Retention confidentiality.',
    },
    step4: {
      title: 'Step 4 — Executive Contact Details & Brief Submission',
      fullNameLabel: 'Full Name & Title *',
      fullNamePlaceholder: 'e.g. Marc-Arthur Konan — Managing Director',
      companyLabel: 'Company / Institution *',
      companyPlaceholder: 'e.g. Kauri Financial Group',
      emailLabel: 'Corporate Email *',
      emailPlaceholder: 'm.konan@company.com',
      phoneLabel: 'Phone Number (International E.164 Format) *',
      phonePlaceholder: '+2250700000000 or +12125550199',
      phoneHint: 'Required E.164 format: + followed by country code and subscriber number without spaces.',
      summaryLabel: 'Project Summary & Business Objectives *',
      summaryPlaceholder:
        'Describe your business context, primary objectives, and target launch window...',
      consentLabel:
        'I agree that this information will be processed by Ouest Dynamics strictly to evaluate this brief, in accordance with Law n°2013-450 (ARTCI Côte d’Ivoire), EU GDPR, and the Zero-Data Retention policy. *',
      submitBtn: 'Submit Official Project Brief',
      submittingBtn: 'Encrypting & Registering Brief...',
      errors: {
        poles: 'Please select at least one Execution Pole.',
        fullName: 'Please enter your full name (minimum 2 characters).',
        company: 'Please enter your organization name (minimum 2 characters).',
        email: 'Please enter a valid corporate email address.',
        phone:
          'Please enter a valid international E.164 phone number (e.g. +2250708091011 or +33612345678).',
        summary: 'Please provide a project summary (minimum 15 characters).',
        consent: 'You must accept the ARTCI / GDPR compliance clause to submit your brief.',
      },
      confirmation: {
        badge: 'DOSSIER REGISTERED · SOVEREIGN ARCHITECTURE',
        title: 'Your Executive Brief Has Been Registered.',
        subtitle:
          'A Managing Partner at Ouest Dynamics is reviewing your configuration and will deliver your contractual proposal within 24 business hours.',
        referenceLabel: 'Official Dossier Reference',
        summaryTitle: 'Configuration Summary',
        newBriefBtn: 'Configure Another Brief',
      },
    },
    navButtons: {
      prev: 'Previous Step',
      next: 'Continue to Next Step',
    },
  },
  concierge: {
    drawerTitle: 'Executive AI Concierge',
    drawerSubtitle: 'Structured qualification in 2–3 turns · Gemini Structured Output (ZDR)',
    welcomeMessage:
      'Welcome to Ouest Dynamics. I am your Executive AI Concierge. Describe your project in a few sentences (industry, goals, timeline): I will map it to our Execution Poles and pre-fill your Brief Configurator.',
    inputPlaceholder:
      'e.g. We are launching a fintech in Abidjan and need a brand identity, an iOS/Android mobile app, and a landing page...',
    sendBtn: 'Analyze',
    thinkingLabel: 'Performing architectural analysis & Pole mapping...',
    promptsTitle: 'Quick diagnostic examples:',
    samplePrompts: [
      'We are launching a fintech in Abidjan and need a brand identity, an iOS/Android mobile app, and a landing page.',
      'We want to rebuild our B2B e-commerce platform in EUR/XOF with AI agents and Server-Side CAPI tracking in 48h Fast-Track.',
      'We need an executive Brand Book and an institutional web portal for a real estate group in Abidjan.',
    ],
    diagnosticCardTitle: 'Structured AI Concierge Diagnostic',
    qualificationReadyBadge: 'Qualification Complete',
    qualificationInProgressBadge: 'Qualification in Progress',
    recommendedPolesLabel: 'Recommended Poles:',
    recommendedModifiersLabel: 'Transverse Engines:',
    urgencyLabel: 'Suggested Urgency:',
    currencyLabel: 'Suggested Currency:',
    summaryLabel: 'Synthesized Brief Ready for Configurator:',
    followUpLabel: 'Follow-up Question:',
    applyButton: 'Apply Diagnostic to Brief Configurator',
    zdrNotice:
      'Zero-Data Retention Policy (ARTCI / GDPR): No data from this conversation is used to train third-party models. Official estimates are calculated in the Brief Configurator.',
  },
  legal: {
    backToPlatform: 'Return to Main Platform',
    portalKicker: 'Unified Legal & Regulatory Compliance Portal',
    portalTitle: 'Legal Governance, Data Protection & Contractual Terms.',
    portalSubtitle:
      'Strict compliance with Ivorian Law n°2013-450 (ARTCI), the European Union General Data Protection Regulation (GDPR 2016/679), and international IP standards.',
    tabs: {
      privacy: 'Privacy Policy (ARTCI & GDPR)',
      terms: 'Terms & Conditions (CGV / CGU)',
      notices: 'Legal Notices & Publisher',
    },
    privacy: {
      title: 'Privacy Policy & Personal Data Protection',
      effectiveDate: 'Effective Date: January 2026 · ARTCI & GDPR Framework',
      sections: [
        {
          heading: '1. Dual Regulatory Framework: ARTCI (Côte d’Ivoire) & GDPR (European Union)',
          body: 'Ouest Dynamics processes all personal and corporate data in strict compliance with Law n°2013-450 of June 19, 2013 relating to personal data protection in the Republic of Côte d’Ivoire (supervised by ARTCI) as well as Regulation (EU) 2016/679 (GDPR) for international clients and visitors.',
        },
        {
          heading: '2. PII Minimization & Exclusive Business Purpose',
          body: 'We collect only the information strictly required to scope your B2B project brief and manage contractual engagements: executive name, legal entity, corporate email, E.164 phone number, and project summary. We never sell, rent, or share your data with advertising brokers.',
        },
        {
          heading: '3. AI Governance & Zero-Data Retention (ZDR) Policy',
          body: 'Prompts submitted to the Executive AI Concierge are routed exclusively through our secure server proxy with strict context isolation. Under our Zero-Data Retention policy, no client inputs or trade secrets are retained to train public language models.',
        },
        {
          heading: '4. Data Retention, Security & Exercising Your Rights',
          body: 'Consultation dossiers are encrypted and retained for a maximum of 24 months in the absence of a signed contract. You may exercise your right to access, rectify, export, or permanently erase your data at any time by contacting our Data Protection Officer (dpo@ouestdynamics.com).',
        },
      ],
    },
    terms: {
      title: 'General Terms and Conditions of Sale & Use (CGV / CGU)',
      effectiveDate: 'Contractual Version V2.0 · OHADA & International Commercial Law',
      sections: [
        {
          heading: '1. Sovereign Independence of Client Assets',
          body: 'Ouest Dynamics guarantees that all critical infrastructure assets—domain names, Cloud/Supabase hosting accounts, Apple Developer accounts, Google Play Console accounts, and ad managers (Meta/Google/TikTok Business Manager)—are registered directly in the Client’s name with zero vendor lock-in.',
        },
        {
          heading: '2. Contractual Payment Schedule (40% / 30% / 30%)',
          body: 'Unless otherwise specified in a statement of work, every project follows our three-stage milestone schedule: 40% deposit upon contract signature; 30% upon formal approval of the Executive Art Direction & Architecture milestone; 30% upon final QA acceptance and production launch.',
        },
        {
          heading: '3. 5-Business-Day Milestone Approval Mechanism',
          body: 'Upon delivery of each milestone (Brand Book, Figma mockups, functional staging prototype, or final release), the Client has five (5) business days to submit consolidated feedback. If no written feedback is issued within 5 business days, the milestone is deemed tacitly approved to protect the delivery schedule.',
        },
        {
          heading: '4. Unconditional Intellectual Property Assignment',
          body: 'Upon full settlement of the agreed contract price (100% across the 3 milestones), Ouest Dynamics assigns to the Client, on an exclusive, worldwide, and royalty-free basis, all intellectual property rights to custom source code, visual assets, Design Tokens, and technical documentation.',
        },
      ],
    },
    notices: {
      title: 'Legal Notices & Corporate Information',
      effectiveDate: 'Headquarters: Abidjan, Republic of Côte d’Ivoire',
      sections: [
        {
          heading: '1. Platform Publisher',
          body: 'Ouest Dynamics — Sovereign Digital Architecture, Executive Art Direction & 360° AI Engineering Practice. Operating Headquarters: Abidjan, Cocody, Republic of Côte d’Ivoire. Operations: UEMOA Region, West Africa, Europe & North America.',
        },
        {
          heading: '2. Publication Director & Official Contact',
          body: 'Ouest Dynamics Executive Board. Official Contact: direction@ouestdynamics.com · Data Protection Officer (DPO / ARTCI): dpo@ouestdynamics.com.',
        },
        {
          heading: '3. Technical Architecture & Credits',
          body: 'Engineered under the “Sovereign Digital Architecture” design system (W3C design-tokens.json), powered by React 19, strict TypeScript, Tailwind CSS, and Gemini Structured Output server infrastructure.',
        },
      ],
    },
  },
  cookies: {
    title: 'Consent Governance (ARTCI & GDPR — Consent Mode v2)',
    description:
      'We enforce Google Consent Mode v2 and Law n°2013-450 (ARTCI). Select your authorized cookie categories below. A timestamped audit receipt is stored locally.',
    acceptAll: 'Allow All',
    essentialOnly: 'Essential Only',
    customize: 'Customize',
    saveChoices: 'Save Preferences',
    auditReceiptPrefix: 'Timestamped consent receipt:',
    categories: {
      essential: {
        label: 'Essential & Security Cookies (Required)',
        desc: 'Stores language (FR/EN), currency (XOF/EUR/USD), and Brief Configurator session integrity.',
      },
      analytics: {
        label: 'Anonymized Performance Analytics',
        desc: 'Aggregated Core Web Vitals metrics (LCP, INP, CLS) with zero individual profiling.',
      },
      marketing: {
        label: 'Attribution & Paid Media (Consent Mode v2)',
        desc: 'Server-Side CAPI attribution signals (denied by default without explicit opt-in).',
      },
      aiConcierge: {
        label: 'AI Concierge Session Context (ZDR)',
        desc: 'Preserves your AI diagnostic during your active session to pre-fill the Brief Configurator.',
      },
    },
  },
  footer: {
    tagline:
      '360° digital architecture and AI engineering agency based in Abidjan (Côte d’Ivoire) operating across West Africa and internationally. Core & Elastic Guilds model.',
    navigationTitle: 'Architecture',
    legalTitle: 'Unified Legal Portal',
    governanceTitle: 'Sovereign Commitments',
    governanceBullets: [
      '100% Client Ownership & Full IP Transfer',
      '5-business-day milestone sign-off window',
      '40% / 30% / 30% milestone payment schedule',
      'ARTCI (CI) & GDPR (EU) compliance',
    ],
    manageCookies: 'Manage Cookie Preferences (CMP v2)',
    copyright: '© 2026 Ouest Dynamics. All rights reserved. Sovereign Digital Architecture.',
  },
};
