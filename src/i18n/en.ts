import { Dictionary, CaseStudy, LegalDoc } from './fr';
import { PoleId, TransverseModifierId } from '../utils/pricingEngine';

export const en: Dictionary = {
  nav: {
    work: 'Work',
    process: 'Approach',
    estimate: 'Configure',
    concierge: 'Assistant',
    start: 'Start',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    home: 'Ouest Dynamics, back to top',
  },

  hero: {
    clock: (time: string) => `Abidjan, ${time}`,
    title: 'Brand design, web engineering and bespoke AI.',
    subtitle:
      'An independent senior studio. Transparent pricing, direct execution, and complete ownership of your assets on delivery.',
    primary: 'Configure a project',
    secondary: 'Describe your brief to AI',
  },

  services: {
    title: 'Compose your project.',
    intro: 'Select the disciplines you need for an immediate estimate.',
    from: (price: string) => `from ${price}`,
    currency: 'Currency',
    items: [
      {
        id: 'BRANDING' as PoleId,
        name: 'Brand identity',
        line: 'Positioning, visual system and Brand Book.',
      },
      {
        id: 'WEB' as PoleId,
        name: 'Web & Platforms',
        line: 'Bespoke sites, e-commerce and SaaS platforms.',
      },
      {
        id: 'MOBILE_DESKTOP' as PoleId,
        name: 'Mobile & Desktop Apps',
        line: 'iOS, Android and offline-first field software.',
      },
      {
        id: 'GROWTH' as PoleId,
        name: 'Growth & Data',
        line: 'Paid media, SEO/GEO and Server-Side tracking.',
      },
    ],
  },

  options: {
    items: [
      {
        id: 'TRANSVERSE_DA' as TransverseModifierId,
        name: 'Art direction',
        line: 'W3C design system and high-fidelity prototypes.',
        rate: '+20%',
      },
      {
        id: 'TRANSVERSE_AI' as TransverseModifierId,
        name: 'AI & n8n engineering',
        line: 'Qualifying agents and workflow automations.',
        rate: '+25%',
      },
    ],
    fastTrack: {
      name: '48h mobilization',
      line: 'Priority kickoff, timelines compressed by 25%.',
      rate: '+15%',
    },
  },

  work: {
    title: 'Selected work.',
    intro: 'Four recent engagements across West Africa and internationally.',
    read: 'Case study',
    similar: 'Estimate similar',
    challenge: 'Context',
    solution: 'Deployed architecture',
    result: 'Measured outcome',
    close: 'Close',
    cases: [
      {
        id: 'fintech-uemoa',
        pole: 'MOBILE_DESKTOP',
        client: 'Kauri Settlement',
        sector: 'Mobile payments',
        city: 'Abidjan & Dakar',
        metric: { value: '+215%', label: 'volume in 6 months' },
        summary: 'Merchant checkout app engineered to run uninterrupted through network drops.',
        challenge:
          'Merchants were losing sales during connectivity drops while bank reconciliation remained manual.',
        solution:
          'iOS/Android app and desktop POS with an encrypted local queue and automatic cloud sync.',
        result:
          'Transaction volume tripled in six months and merchant onboarding time fell by 64%.',
        figures: [
          { value: '+215%', label: 'transactions' },
          { value: '99.98%', label: 'uptime' },
          { value: '−64%', label: 'onboarding' },
        ],
      },
      {
        id: 'immobilier-riviera',
        pole: 'BRANDING',
        client: 'Riviera Souveraine',
        sector: 'Real estate',
        city: 'Abidjan',
        metric: { value: '100%', label: 'sold in 11 weeks' },
        summary: 'Institutional identity and multi-currency investor portal for diaspora buyers.',
        challenge:
          'Earning immediate confidence from buyers in London or Dubai without on-site visits.',
        solution:
          'Restrained art direction, print monograph and encrypted property data-room in XOF, EUR and USD.',
        result:
          'Phase one sold out in eleven weeks and qualified diaspora inquiries nearly tripled.',
        figures: [
          { value: '100%', label: 'phase 1 sold' },
          { value: '+180%', label: 'diaspora leads' },
          { value: '11 wks', label: 'sales cycle' },
        ],
      },
      {
        id: 'agro-export',
        pole: 'GROWTH',
        client: 'Ivoire Origin',
        sector: 'Agro-industry',
        city: 'San-Pédro',
        metric: { value: '−42%', label: 'acquisition cost' },
        summary: 'B2B acquisition infrastructure connecting West African exporters with global buyers.',
        challenge:
          'Heavy reliance on intermediaries and no reliable attribution from campaigns to signed contracts.',
        solution:
          'GDPR/ARTCI-compliant server-side tracking, multilingual SEO and targeted industrial campaigns.',
        result:
          'Thirty-eight new importer accounts signed in one quarter at 42% lower acquisition cost.',
        figures: [
          { value: '−42%', label: 'acquisition cost' },
          { value: '+38', label: 'importers' },
          { value: '100%', label: 'compliance' },
        ],
      },
      {
        id: 'saas-logistique',
        pole: 'WEB',
        client: 'CorridorFlow',
        sector: 'Logistics',
        city: 'Abidjan & Ouagadougou',
        metric: { value: '5×', label: 'customs clearance speed' },
        summary: 'SaaS platform tracking 850 trucks and extracting customs manifests automatically.',
        challenge:
          'Manual port paperwork delayed fleet dispatch and slowed down B2B invoicing.',
        solution:
          'Real-time fleet portal paired with a structured AI extractor validating customs manifests.',
        result:
          'Document processing runs five times faster and corridor fleet idle time dropped by 39%.',
        figures: [
          { value: '5×', label: 'processing' },
          { value: '−39%', label: 'idle time' },
          { value: '140', label: 'forwarders' },
        ],
      },
    ] as CaseStudy[],
  },

  process: {
    title: 'Direct process.',
    steps: [
      {
        title: 'Scoping',
        duration: 'Week 1',
        text: 'Alignment on goals, creative direction and architecture before a single line of code.',
      },
      {
        title: 'Production',
        duration: 'Weekly sprints',
        text: 'Dedicated senior squad, continuous staging access and weekly reviews.',
      },
      {
        title: 'Handover',
        duration: 'Delivery',
        text: 'Production launch, team training and full transfer of source code and accounts.',
      },
    ],
    guaranteesToggle: 'Contractual commitments',
    guarantees: [
      'Domains, cloud servers and Store accounts opened exclusively in your name.',
      'Full intellectual property transfer of source code and designs upon final payment.',
      'Milestone schedule: 40% kickoff, 30% design sign-off, 30% final delivery.',
      'Strict ARTCI (Côte d’Ivoire), GDPR and Zero-Data Retention AI compliance.',
    ],
  },

  estimate: {
    services: 'Disciplines',
    options: 'Options',
    result: 'Indicative estimate',
    empty: 'Select at least one discipline above.',
    duration: (min: number, max: number) => `${min} to ${max} business days`,
    discount: '10% multi-discipline discount applied',
    schedule: '40% kickoff · 30% design · 30% delivery',
    next: 'Finalize request',
    prefilled: 'Pre-filled by the AI assistant. Adjust anytime.',
    contact: {
      title: 'Your details',
      intro: 'Detailed proposal returned within 24 business hours.',
      back: 'Edit selection',
      name: 'Full name',
      namePh: 'Awa Koné',
      company: 'Company',
      companyPh: 'Organization',
      email: 'Work email',
      emailPh: 'awa@company.com',
      phone: 'Phone',
      phonePh: '+2250700000000',
      phoneHint: 'International format with country code (e.g. +2250700000000).',
      message: 'Project context',
      messagePh: 'Goals, constraints, target timeline…',
      consentBefore: 'I agree to data processing under the ',
      consentLink: 'privacy policy',
      consentAfter: '.',
      submit: 'Send brief',
      submitting: 'Sending…',
      errors: {
        name: 'Enter your full name.',
        company: 'Enter your company name.',
        email: 'Invalid email address.',
        phone: 'International format required (e.g. +2250700000000).',
        message: 'Describe your project (min. 15 characters).',
        consent: 'Confirmation required before sending.',
        network: 'Network error. Check your connection and retry.',
        rateLimit: 'Too many requests. Please wait a few minutes.',
        server: 'Submission rejected. Check your fields.',
      },
    },
    done: {
      title: (name: string) => (name ? `Thank you, ${name}.` : 'Brief recorded.'),
      text: 'A partner is reviewing your configuration and will reply within 24 business hours.',
      reference: 'Reference',
      again: 'New estimate',
    },
  },

  concierge: {
    open: 'AI Assistant',
    title: 'Scoping assistant',
    intro:
      'Describe your project naturally: industry, goal, timeline. The assistant maps the disciplines and pre-fills the configurator.',
    placeholder: 'E.g.: B2B payment platform in Abidjan with mobile app…',
    send: 'Send',
    thinking: 'Analyzing…',
    examplesTitle: 'Examples',
    examples: [
      'Fintech launch in Abidjan: brand identity, iOS/Android app and website.',
      'E-commerce rebuild in XOF/EUR with AI automation within 48h.',
      'Brand Book and real estate investor portal for the diaspora.',
    ],
    resultTitle: 'Suggested configuration',
    servicesLabel: 'Disciplines',
    optionsLabel: 'Options',
    followUp: 'Follow-up',
    apply: 'Apply to configurator',
    unavailable: 'The assistant is temporarily unavailable.',
    estimateDirect: 'Configure manually',
    privacy: 'Zero-Data Retention policy (ARTCI / GDPR).',
    close: 'Close',
    you: 'You',
  },

  legal: {
    title: 'Legal information',
    close: 'Back to studio',
    tabs: {
      privacy: 'Privacy',
      terms: 'Terms',
      notices: 'Notices',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'January 2026 · ARTCI & GDPR',
      sections: [
        {
          heading: 'Legal framework',
          body: 'Ouest Dynamics processes data in compliance with Ivorian Law n°2013-450 (ARTCI) and EU Regulation 2016/679 (GDPR).',
        },
        {
          heading: 'Collected data',
          body: 'Strictly what is required to scope your brief: name, company, email, phone and project summary. Never sold or rented.',
        },
        {
          heading: 'AI Assistant',
          body: 'Conversations go through our server proxy under a Zero-Data Retention policy and are never used to train third-party models.',
        },
        {
          heading: 'Rights & retention',
          body: 'Retained at most 24 months without a contract. Access or erasure requests: dpo@ouestdynamics.com.',
        },
      ],
    } as LegalDoc,
    terms: {
      title: 'Terms & Conditions',
      updated: 'Version 2.0 · OHADA Law',
      sections: [
        {
          heading: 'Asset ownership',
          body: 'Domains, cloud hosting, Apple/Google developer accounts and ad managers are registered directly in the client’s name.',
        },
        {
          heading: '40 / 30 / 30 schedule',
          body: '40% on signature, 30% on design/architecture approval, 30% on final acceptance.',
        },
        {
          heading: '5-day review window',
          body: 'Each delivered milestone includes a 5-business-day review window before tacit acceptance.',
        },
        {
          heading: 'Intellectual property',
          body: 'Exclusive worldwide transfer of source code and design rights upon full settlement.',
        },
      ],
    } as LegalDoc,
    notices: {
      title: 'Legal Notices',
      updated: 'Abidjan, Côte d’Ivoire',
      sections: [
        {
          heading: 'Publisher',
          body: 'Ouest Dynamics — Digital architecture and AI engineering studio. Cocody, Abidjan, Côte d’Ivoire.',
        },
        {
          heading: 'Contact',
          body: 'Executive contact: direction@ouestdynamics.com · DPO: dpo@ouestdynamics.com.',
        },
      ],
    } as LegalDoc,
  },

  cookies: {
    text: 'Audience measurement cookies only with your consent.',
    accept: 'Accept',
    refuse: 'Decline',
    customize: 'Options',
    save: 'Save',
    policy: 'Privacy',
    essential: {
      label: 'Essential',
      desc: 'Active language and currency.',
    },
    analytics: {
      label: 'Analytics',
      desc: 'Anonymous performance metrics.',
    },
    marketing: {
      label: 'Attribution',
      desc: 'Campaign tracking (off by default).',
    },
  },

  footer: {
    place: 'Ouest Dynamics · Abidjan',
    email: 'direction@ouestdynamics.com',
    cookies: 'Cookies',
  },
};
