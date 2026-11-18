import { Dictionary, CaseStudy, LegalDoc } from './fr';
import { PoleId, TransverseModifierId } from '../utils/pricingEngine';

export const en: Dictionary = {
  nav: {
    services: 'Services',
    work: 'Work',
    process: 'Process',
    estimate: 'Estimate',
    start: 'Start a project',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    home: 'Ouest Dynamics, back to top',
  },

  hero: {
    clock: (time: string) => `It’s ${time} in Abidjan`,
    title: 'Brands, websites and apps. Built in Abidjan.',
    subtitle:
      'For companies across West Africa and those expanding into it. One senior team, pricing shown upfront, and everything is yours at handover.',
    primary: 'Estimate my project',
    secondary: 'Describe my project to the assistant',
  },

  services: {
    title: 'Four disciplines, one team.',
    intro: 'Select what you need. The estimate below updates as you go.',
    from: (price: string) => `from ${price}`,
    currency: 'Currency',
    seeEstimate: (n: number) =>
      n > 1 ? `See estimate for ${n} services` : 'See estimate',
    items: [
      {
        id: 'BRANDING' as PoleId,
        name: 'Brand identity',
        line: 'Naming, logo, visual system and print collateral that make your company unmistakable.',
      },
      {
        id: 'WEB' as PoleId,
        name: 'Websites & platforms',
        line: 'Corporate sites, e-commerce stores and custom web platforms, fast and simple to run.',
      },
      {
        id: 'MOBILE_DESKTOP' as PoleId,
        name: 'Applications',
        line: 'iOS, Android and desktop apps engineered to keep working when the network drops.',
      },
      {
        id: 'GROWTH' as PoleId,
        name: 'Growth',
        line: 'Paid acquisition, search visibility and conversion tracking, from first click to signed deal.',
      },
    ],
  },

  options: {
    items: [
      {
        id: 'TRANSVERSE_DA' as TransverseModifierId,
        name: 'Dedicated art direction',
        line: 'A senior art director oversees every screen, token and print touchpoint.',
        rate: '+20%',
      },
      {
        id: 'TRANSVERSE_AI' as TransverseModifierId,
        name: 'Artificial intelligence',
        line: 'Custom assistants and workflow automations connected to your existing tools.',
        rate: '+25%',
      },
    ],
    fastTrack: {
      name: '48-hour kickoff',
      line: 'Senior team mobilized in two days with delivery timelines compressed by roughly a quarter.',
      rate: '+15%',
    },
  },

  work: {
    title: 'Recent work.',
    intro: 'Four engagements, four measured outcomes.',
    read: 'Read case study',
    similar: 'Estimate a similar project',
    challenge: 'The challenge',
    solution: 'What we built',
    result: 'The outcome',
    close: 'Close',
    cases: [
      {
        id: 'fintech-uemoa',
        pole: 'MOBILE_DESKTOP',
        client: 'Kauri Settlement',
        sector: 'Mobile payments',
        city: 'Abidjan & Dakar',
        metric: { value: '+215%', label: 'transaction volume in six months' },
        summary:
          'A merchant checkout app that keeps processing sales even when connectivity drops.',
        challenge:
          'Merchants were losing sales during network outages, and bank reconciliation was still manual.',
        solution:
          'A mobile and desktop POS app that records payments offline locally and syncs automatically once back online.',
        result:
          'Transaction volume tripled in six months and merchant onboarding time dropped by more than half.',
        figures: [
          { value: '+215%', label: 'volume' },
          { value: '99.98%', label: 'uptime' },
          { value: '−64%', label: 'onboarding time' },
        ],
      },
      {
        id: 'immobilier-riviera',
        pole: 'BRANDING',
        client: 'Riviera Souveraine',
        sector: 'Residential real estate',
        city: 'Abidjan',
        metric: { value: '100%', label: 'of units reserved in 11 weeks' },
        summary:
          'Identity and investor portal for a flagship residential development targeting diaspora buyers.',
        challenge:
          'A new development needed to earn immediate trust from buyers in London and Dubai without in-person visits.',
        solution:
          'A full visual identity, architectural signage and a multi-currency portal displaying units in XOF, EUR and USD.',
        result:
          'Phase one sold out in eleven weeks and qualified diaspora inquiries nearly tripled.',
        figures: [
          { value: '100%', label: 'phase 1 sold' },
          { value: '+180%', label: 'diaspora leads' },
          { value: '11', label: 'weeks' },
        ],
      },
      {
        id: 'agro-export',
        pole: 'GROWTH',
        client: 'Ivoire Origin',
        sector: 'Cocoa & cashew export',
        city: 'San-Pédro',
        metric: { value: '−42%', label: 'acquisition cost per buyer' },
        summary:
          'B2B acquisition engine connecting certified West African producers with European and North American buyers.',
        challenge:
          'The exporter relied on a handful of brokers and had no visibility into which campaigns drove real contracts.',
        solution:
          'Server-side conversion tracking, multilingual search optimization and targeted campaigns for industrial buyers.',
        result:
          'Thirty-eight new importer accounts signed in one quarter at a 42% lower acquisition cost.',
        figures: [
          { value: '−42%', label: 'acquisition cost' },
          { value: '+38', label: 'importers' },
          { value: '1', label: 'quarter' },
        ],
      },
      {
        id: 'saas-logistique',
        pole: 'WEB',
        client: 'CorridorFlow',
        sector: 'Freight & logistics',
        city: 'Abidjan & Ouagadougou',
        metric: { value: '5×', label: 'faster customs document processing' },
        summary:
          'A web platform tracking 850 trucks and extracting customs manifests automatically.',
        challenge:
          'Manual manifest entry slowed down port clearance and delayed B2B invoicing.',
        solution:
          'A real-time fleet portal paired with an AI document extractor that validates customs manifests.',
        result:
          'Paperwork clears five times faster and fleet idle time along the corridor dropped by 39%.',
        figures: [
          { value: '5×', label: 'faster clearance' },
          { value: '−39%', label: 'idle time' },
          { value: '140', label: 'forwarders active' },
        ],
      },
    ] as CaseStudy[],
  },

  process: {
    title: 'How we work.',
    steps: [
      {
        title: 'Scoping',
        duration: 'Week one',
        text: 'We align on goals, budget and creative direction. Nothing enters production without your sign-off.',
      },
      {
        title: 'Production',
        duration: 'Project dependent',
        text: 'A senior team assembled within 48 hours, weekly reviews and a live staging link you can test anytime.',
      },
      {
        title: 'Handover',
        duration: 'Final week',
        text: 'Production launch, team training and complete transfer of all repositories, accounts and files.',
      },
    ],
    guaranteesTitle: 'Written into every contract',
    guarantees: [
      'Domains, cloud servers and Store accounts are opened in your company’s name.',
      'All source code and design files belong to you upon final payment.',
      'Three-part schedule: 40% at kickoff, 30% on design sign-off, 30% on delivery.',
      'Your data is handled under Côte d’Ivoire Law n°2013-450 (ARTCI) and EU GDPR.',
    ],
  },

  estimate: {
    title: 'Estimate your project.',
    intro: 'An indicative range in seconds, no account required.',
    services: 'Services',
    options: 'Options',
    currency: 'Currency',
    result: 'Your estimate',
    empty: 'Select at least one service to see an estimate.',
    duration: (min: number, max: number) => `Delivered in ${min} to ${max} business days`,
    discount: '10% multi-service discount included',
    schedule: 'Payment schedule',
    milestones: ['At kickoff, 40%', 'On design sign-off, 30%', 'On delivery, 30%'],
    note: 'Excluding taxes. Final quote confirmed after a brief discovery call.',
    next: 'Request a detailed proposal',
    prefilled: 'The assistant prepared this estimate. Adjust anything you need.',
    edit: 'Edit',
    contact: {
      title: 'Where should we send the proposal?',
      intro: 'We reply within 24 business hours.',
      back: 'Back to estimate',
      name: 'Full name',
      namePh: 'Awa Koné',
      company: 'Company',
      companyPh: 'Your organization',
      email: 'Email',
      emailPh: 'awa@company.com',
      phone: 'Phone',
      phonePh: '+225 07 00 00 00 00',
      phoneHint: 'Include country code.',
      message: 'About your project',
      messagePh: 'Goals, timeline, what already exists…',
      consentBefore: 'I agree that Ouest Dynamics may use this information to respond to my inquiry under its ',
      consentLink: 'privacy policy',
      consentAfter: '.',
      submit: 'Send request',
      submitting: 'Sending…',
      errors: {
        name: 'Please enter your name.',
        company: 'Please enter your company name.',
        email: 'Please enter a valid email address.',
        phone: 'Please include your country code, e.g. +225 07 00 00 00 00.',
        message: 'Please add a few details (at least 15 characters).',
        consent: 'Please check this box to send your request.',
        network: 'Could not send your request. Check your connection and try again.',
        rateLimit: 'Too many requests sent. Please wait a few minutes.',
        server: 'The request was rejected. Please review your details and try again.',
      },
    },
    done: {
      title: (name: string) => (name ? `Thank you, ${name}.` : 'Thank you.'),
      text: 'We received your request and will reply within 24 business hours.',
      reference: 'Request reference',
      again: 'Start a new estimate',
    },
  },

  concierge: {
    open: 'Describe my project',
    title: 'Describe your project',
    intro:
      'A couple of sentences is enough: your industry, what you want to build, your timeline. The assistant suggests the right services and prepares your estimate.',
    placeholder: 'For example: a delivery app in Abidjan, launching in March…',
    send: 'Send',
    thinking: 'Thinking…',
    examplesTitle: 'Or start from an example',
    examples: [
      'We are launching a fintech in Abidjan and need a brand, a mobile app and a website.',
      'We want to rebuild our online store with XOF and EUR payments as fast as possible.',
      'A logo and website for a real estate group selling to the diaspora.',
    ],
    resultTitle: 'Assistant suggestion',
    servicesLabel: 'Suggested services',
    optionsLabel: 'Options',
    followUp: 'To refine',
    apply: 'Use this estimate',
    unavailable: 'The assistant is currently unavailable.',
    estimateDirect: 'Estimate manually',
    privacy: 'Your messages are never used to train third-party AI models.',
    close: 'Close assistant',
    you: 'You',
  },

  legal: {
    title: 'Legal information',
    close: 'Close',
    tabs: {
      privacy: 'Privacy',
      terms: 'Terms',
      notices: 'Legal notices',
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Updated January 2026',
      sections: [
        {
          heading: 'Regulatory framework',
          body: 'Ouest Dynamics processes personal data in compliance with Ivorian Law n°2013-450 of June 19, 2013 (supervised by ARTCI) and EU Regulation 2016/679 (GDPR) for international clients and visitors.',
        },
        {
          heading: 'What we collect',
          body: 'Only what is needed to respond to your inquiry: your name, company, email address, phone number and project summary. This data is never sold or rented.',
        },
        {
          heading: 'AI Assistant',
          body: 'Messages sent to the assistant go through our own server and are not retained to train AI models.',
        },
        {
          heading: 'Retention & your rights',
          body: 'Without a signed contract, inquiry records are retained for at most 24 months. You can access, correct, export or erase your data by writing to dpo@ouestdynamics.com.',
        },
      ],
    } as LegalDoc,
    terms: {
      title: 'Terms & Conditions',
      updated: 'Version 2.0, OHADA Law',
      sections: [
        {
          heading: 'Your accounts stay yours',
          body: 'Domains, hosting, Apple Developer and Google Play accounts, and ad managers are opened directly in the client’s name. Ouest Dynamics maintains zero vendor lock-in.',
        },
        {
          heading: 'Three-part payment schedule',
          body: 'Unless otherwise agreed in writing, projects are billed in three installments: 40% upon signature, 30% on design and architecture sign-off, and 30% on final delivery.',
        },
        {
          heading: 'Five-day milestone review',
          body: 'Upon each milestone delivery, the client has five business days to provide written feedback. Without feedback in that window, the milestone is deemed approved to keep delivery on track.',
        },
        {
          heading: 'Intellectual property',
          body: 'Upon full payment, Ouest Dynamics transfers exclusive, worldwide, perpetual rights to custom source code, visual deliverables and documentation to the client.',
        },
      ],
    } as LegalDoc,
    notices: {
      title: 'Legal Notices',
      updated: 'Headquartered in Abidjan, Côte d’Ivoire',
      sections: [
        {
          heading: 'Publisher',
          body: 'Ouest Dynamics, digital design and engineering studio. Headquarters: Cocody, Abidjan, Republic of Côte d’Ivoire.',
        },
        {
          heading: 'Contact',
          body: 'Editorial contact: direction@ouestdynamics.com. Data protection: dpo@ouestdynamics.com.',
        },
        {
          heading: 'Technology',
          body: 'Designed and engineered by Ouest Dynamics with React, TypeScript and Tailwind CSS.',
        },
      ],
    } as LegalDoc,
  },

  cookies: {
    text: 'We use a few cookies to measure site traffic. You can opt out.',
    accept: 'Accept',
    refuse: 'Decline',
    customize: 'Customize',
    save: 'Save choices',
    policy: 'Learn more',
    essential: {
      label: 'Essential',
      desc: 'Language, currency and core site operation. Always active.',
    },
    analytics: {
      label: 'Analytics',
      desc: 'Anonymous visit statistics.',
    },
    marketing: {
      label: 'Marketing',
      desc: 'Measuring campaign effectiveness.',
    },
  },

  footer: {
    pitch: 'Have a project in mind?',
    pitchCta: 'Estimate my project',
    write: 'Or write to us:',
    email: 'direction@ouestdynamics.com',
    explore: 'Explore',
    legal: 'Legal',
    cookies: 'Cookies',
    studio: 'Studio',
    place: 'Cocody, Abidjan',
    country: 'Côte d’Ivoire',
    rights: '© 2026 Ouest Dynamics',
  },
};
