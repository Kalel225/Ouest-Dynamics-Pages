export type Language = 'en' | 'fr';

export interface Translations {
  // Navigation
  nav: {
    expertises: string;
    methodology: string;
    governance: string;
    contact: string;
    launchProject: string;
    menu: string;
    close: string;
  };

  // Hero Section
  hero: {
    surtitle: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    sla: string;
    slaSub: string;
    volume: string;
    volumeSub: string;
    code: string;
    codeSub: string;
    figma: string;
    figmaSub: string;
  };

  // Services Section
  services: {
    surtitle: string;
    title: string;
    subtitle: string;
    pole: string;
    detailsBtn: string;
    selectBtn: string;
    modalTitle: string;
    deliverablesTitle: string;
    techStackTitle: string;
    closeModal: string;
    items: {
      id: string;
      number: string;
      title: string;
      subtitle: string;
      description: string;
      deliverables: string[];
      keyMetric: string;
      metricLabel: string;
      techStack: string[];
    }[];
  };

  // Methodology Section
  methodology: {
    surtitle: string;
    title: string;
    subtitle: string;
    stepPrefix: string;
    stepOf: string;
    securityControls: string;
    contractDeliverable: string;
    protocolBadge: string;
    protocolStandard: string;
    pillars: {
      title: string;
      description: string;
    }[];
    steps: {
      number: string;
      title: string;
      tagline: string;
      description: string;
      checkpoints: string[];
      deliverable: string;
      delay: string;
    }[];
  };

  // Contact Form Section
  contact: {
    surtitle: string;
    title: string;
    subtitle: string;
    fullName: string;
    fullNamePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    email: string;
    emailPlaceholder: string;
    serviceLabel: string;
    budgetLabel: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    confidentiality: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successRef: string;
    successMsg: string;
    resetBtn: string;
    securityTag: string;
    errors: {
      fullName: string;
      company: string;
      email: string;
      emailInvalid: string;
      description: string;
    };
    budgets: { id: string; label: string }[];
  };

  // Project Modal
  projectModal: {
    surtitle: string;
    title: string;
    subtitle: string;
    serviceLabel: string;
    continueBtn: string;
    cancelBtn: string;
  };

  // Footer
  footer: {
    tagline: string;
    domainsTitle: string;
    methodologyTitle: string;
    governanceTitle: string;
    confidentialityNote: string;
    rightsReserved: string;
    legalMentions: string;
    privacyPolicy: string;
    backToTop: string;
    location: string;
  };

  // Translation prompt banner
  langPrompt: {
    detected: string;
    switchText: string;
    keepText: string;
  };

  // Quick Action Bar Mobile
  mobileBar: {
    callToAction: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      expertises: 'Expertise',
      methodology: 'Methodology',
      governance: 'Governance',
      contact: 'Executive Contact',
      launchProject: 'Launch Your Project',
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      surtitle: 'DIGITAL ENGINEERING & GROWTH PARTNER',
      title: 'Digital Excellence Engineered for Your Growth.',
      subtitle:
        'We architect high-performance custom web and mobile platforms, prestige brand systems, and ROI-obsessed acquisition engines for enterprises that demand uncompromising perfection.',
      ctaPrimary: 'Launch Your Project',
      ctaSecondary: 'Explore Our Expertise',
      sla: 'SLA 99.98%',
      slaSub: 'High Availability',
      volume: '+$450M',
      volumeSub: 'Processed Volume',
      code: '100% Proprietary Code',
      codeSub: 'Zero Tech Debt',
      figma: 'Guaranteed Figma BAT',
      figmaSub: 'Before Any Code',
    },
    services: {
      surtitle: 'OUR CORE PILLARS',
      title: 'Full Mastery of the Modern Digital Value Chain.',
      subtitle:
        'From high-concurrency systems architecture to conversion-optimized brand infrastructure, we deliver institutional-grade engineering at every milestone.',
      pole: 'PILLAR',
      detailsBtn: 'Specifications',
      selectBtn: 'Select Pillar',
      modalTitle: 'Technical Specification',
      deliverablesTitle: 'Key Contractual Deliverables',
      techStackTitle: 'Recommended Architecture & Tech Stack',
      closeModal: 'Close',
      items: [
        {
          id: 'web',
          number: '01',
          title: 'Web & E-Commerce Infrastructure',
          subtitle: 'High-Performance Architectures & Hybrid Global Payments',
          description:
            'We construct sub-second web platforms and e-commerce architectures engineered to withstand extreme traffic spikes. Custom integration of Tier-1 global payment gateways (Stripe, Adyen) and regional mobile money ecosystems.',
          deliverables: [
            'Headless & SSR velocity architectures (< 800ms LCP)',
            'Multi-operator Mobile Money & international payment gateways',
            'PCI-DSS compliant bank-grade end-to-end encryption',
            'Custom executive back-offices with ERP & CRM synchronizations',
          ],
          keyMetric: '< 650ms',
          metricLabel: 'Global Average Page Load Time',
          techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API', 'Mobile Money SDKs'],
        },
        {
          id: 'mobile',
          number: '02',
          title: 'Mobile Engineering',
          subtitle: 'Fluid, Resilient Native & Cross-Platform iOS/Android Apps',
          description:
            'Crafting native and unified cross-platform mobile apps with frictionless fluidity. Modular offline-first architecture, local caching, and real-time state synchronization engineered for enterprise scalability.',
          deliverables: [
            'React Native, Swift & Kotlin native production codebases',
            'Resilient offline-first synchronization engine',
            'High-deliverability targeted push notification infrastructure',
            'Certified App Store & Google Play Store release pipelines',
          ],
          keyMetric: '60 FPS',
          metricLabel: 'Continuous Execution Frame Rate',
          techStack: ['React Native', 'Swift', 'Kotlin', 'GraphQL', 'Firebase', 'Secure Storage'],
        },
        {
          id: 'design',
          number: '03',
          title: 'Design Systems & Brand Identity',
          subtitle: 'Executive Art Direction, Tokenized Design Systems & Figma BAT',
          description:
            'Forging distinguished visual identities and tactile digital experiences. Every project is anchored by a unified Figma design system, guaranteeing pixel-perfect coherence across all touchpoints.',
          deliverables: [
            'Prestige art direction & complete institutional brand re-architecture',
            'Modular tokenized Figma design system for engineering teams',
            'Interactive high-fidelity prototypes for formal sign-off',
            'Comprehensive typography, color, and motion design guidelines',
          ],
          keyMetric: '100% BAT',
          metricLabel: 'Formal Design Approval Before Code',
          techStack: ['Figma Pro', 'Design Tokens', 'Tailwind Systems', 'Motion Design', 'Micro-interactions'],
        },
        {
          id: 'growth',
          number: '04',
          title: 'Growth Strategy & Community Management',
          subtitle: 'ROI-Driven Editorial Strategy & Active SLA < 2h Moderation',
          description:
            'Amplifying enterprise market authority and converting strategic audiences. Premium video and editorial asset production, executive reputation management, and SLA-bound real-time brand moderation.',
          deliverables: [
            'Omnichannel B2B & consumer editorial strategy (LinkedIn, X, Instagram)',
            'High-production short-form video & signature editorial assets',
            'Strict SLA-bound community management and brand defense (< 2h)',
            'Monthly executive conversion and ROI-attributed reporting',
          ],
          keyMetric: '< 2h',
          metricLabel: 'Guaranteed Interaction SLA',
          techStack: ['B2B Copywriting', 'Content Studio', 'Social Analytics', 'Crisis Protocol', 'ROI Tracking'],
        },
      ],
    },
    methodology: {
      surtitle: 'OUR GOVERNANCE',
      title: 'Zero Improvisation. Military-Grade Project Governance.',
      subtitle:
        'Our battle-tested delivery framework guarantees uncompromising respect for deadlines, capital efficiency, and institutional security standards.',
      stepPrefix: 'MILESTONE',
      stepOf: 'of 03',
      securityControls: 'Security Audits & Quality Control Protocol',
      contractDeliverable: 'Contractual Deliverable',
      protocolBadge: 'Ouest Dynamics Protocol',
      protocolStandard: 'ISO 27001 Standard Aligned',
      pillars: [
        {
          title: 'EXECUTIVE GOVERNANCE',
          description:
            'A single dedicated Lead Solutions Architect. Weekly steering committees and 100% transparency via direct real-time access to Kanban delivery boards.',
        },
        {
          title: 'FULL INTELLECTUAL PROPERTY',
          description:
            '100% assignment of all rights over source code, Figma design assets, databases, and digital brand collateral upon final deployment.',
        },
        {
          title: '30-DAY STABILIZATION WARRANTY',
          description:
            'Post-deployment white-glove engineering support with prioritized < 2h resolution for any critical anomalies.',
        },
      ],
      steps: [
        {
          number: '01',
          title: 'Scoping & Validated Design Sign-Off',
          tagline: 'Formal Figma BAT Mandatory Prior to Any Code',
          description:
            'No engineer writes a single line of production code without formal executive sign-off. We collaboratively construct detailed functional specifications and present an interactive pixel-accurate Figma prototype.',
          checkpoints: [
            'Architecture workshop & comprehensive functional specification book',
            'Ergonomic wireframing & high-conversion user journey mapping',
            'Custom tokenized Design System & interactive high-fidelity prototype',
            'Formal sign-off of the BAT (Good to Print/Code) by executive committee',
          ],
          deliverable: 'Interactive Figma Prototype & Technical Specification Book',
          delay: 'Milestones: 1 to 3 Weeks',
        },
        {
          number: '02',
          title: 'Rigorous Technical Staging & QA',
          tagline: 'Cross-Device QA & Isolated Staging Sandbox',
          description:
            'Software implementation executes in automated CI/CD continuous deployment cycles. Your executive team gains exclusive access to an isolated staging environment with anonymized datasets.',
          checkpoints: [
            'Dedicated mirror staging sandbox with encrypted multi-factor access',
            'Cross-browser, physical device & degraded network stress testing',
            'Security audits, OWASP Top-10 compliance & data encryption reviews',
            'Structured user acceptance testing (UAT) with prioritized defect resolution',
          ],
          deliverable: 'Validated Staging Environment & 100% Clean Quality Audit Report',
          delay: 'Continuous Iterative Cycles',
        },
        {
          number: '03',
          title: 'Controlled Zero-Downtime Release',
          tagline: 'Zero-Downtime Deployment & Knowledge Transfer',
          description:
            'Live traffic switch occurs via planned blue/green or canary deployment without service interruption. We hand over all administrative credentials, operational documentation, and train your internal team.',
          checkpoints: [
            'Planned blue/green zero-downtime production cutover',
            'Real-time observability, automated alerts & multi-region automated backups',
            'Formal technical and administrative knowledge transfer sessions',
            'Delivery of the complete Operations Runbook & 30-day stabilization warranty',
          ],
          deliverable: 'Live Production Platform, Full IP Codebase & Operations Runbook',
          delay: 'Launch Day + 30-Day Guarantee',
        },
      ],
    },
    contact: {
      surtitle: 'EXECUTIVE ENGAGEMENT',
      title: 'Ready to Dominate Your Market?',
      subtitle:
        'Let us discuss your strategic vision today and architect your next monumental digital success.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Alexander Montgomery',
      company: 'Company / Organization',
      companyPlaceholder: 'Apex Global Capital',
      email: 'Corporate E-mail',
      emailPlaceholder: 'alexander@apex-capital.com',
      serviceLabel: 'Primary Scope of Intervention',
      budgetLabel: 'Target Capital Allocation',
      descriptionLabel: 'Project Overview & Objectives',
      descriptionPlaceholder:
        'Outline your objectives, target audience, timeline constraints, and desired outcomes...',
      confidentiality: 'Absolute Discretion: Standard NDA executed prior to technical exchange.',
      submitBtn: 'Submit Dossier to Ouest Dynamics',
      submittingBtn: 'Encrypting & Transmitting...',
      successTitle: 'Dossier Transmitted Successfully',
      successRef: 'Case Reference',
      successMsg:
        'Your engineering dossier has been securely dispatched to the executive operations committee at Ouest Dynamics. A Managing Partner will initiate confidential contact within 4 business hours.',
      resetBtn: 'Submit Another Inquiry',
      securityTag: 'TLS 1.3 / NDA ACTIVE',
      errors: {
        fullName: 'Please enter your full name',
        company: 'Please indicate your company name',
        email: 'Please provide a valid corporate email',
        emailInvalid: 'Invalid corporate email format',
        description: 'Please describe your project scope and objectives',
      },
      budgets: [
        { id: '25k-50k', label: '$25,000 - $50,000' },
        { id: '50k-100k', label: '$50,000 - $100,000' },
        { id: '100k-250k', label: '$100,000 - $250,000' },
        { id: '250k+', label: '$250,000+' },
      ],
    },
    projectModal: {
      surtitle: 'Executive Scoping · Ouest Dynamics',
      title: 'Initiate Your Landmark Project',
      subtitle:
        'Select your strategic priority to configure priority handling by our Managing Partners within 4 hours.',
      serviceLabel: 'Domain of Intervention',
      continueBtn: 'Continue to Scoping Dossier',
      cancelBtn: 'Close Window',
    },
    footer: {
      tagline:
        'Digital Engineering & Growth Partner. Architecting prestige digital infrastructure and driving market dominance for ambitious enterprises.',
      domainsTitle: 'Core Capabilities',
      methodologyTitle: 'Framework & Delivery',
      governanceTitle: 'Standards',
      confidentialityNote: 'All strategic engagements protected by strict bilateral non-disclosure agreements.',
      rightsReserved: 'All rights reserved. Proprietary institutional code.',
      legalMentions: 'Legal Notices',
      privacyPolicy: 'Data Governance & Privacy',
      backToTop: 'Back to Top',
      location: 'Abidjan',
    },
    langPrompt: {
      detected: 'Langue détectée : Votre appareil est en français. Souhaitez-vous basculer le site en français ?',
      switchText: 'Passer en Français',
      keepText: 'Stay in English',
    },
    mobileBar: {
      callToAction: 'Launch Project',
    },
  },

  fr: {
    nav: {
      expertises: 'Expertises',
      methodology: 'Méthodologie',
      governance: 'Gouvernance',
      contact: 'Contact Exécutif',
      launchProject: 'Lancer votre projet',
      menu: 'Menu',
      close: 'Fermer',
    },
    hero: {
      surtitle: 'DIGITAL ENGINEERING & GROWTH PARTNER',
      title: "L'Excellence Numérique au Service de votre Croissance.",
      subtitle:
        "Nous concevons des plateformes web et mobiles sur-mesure, des identités visuelles de prestige et des stratégies d'acquisition orientées ROI pour les entreprises qui exigent la perfection.",
      ctaPrimary: 'Lancer votre projet',
      ctaSecondary: 'Découvrir nos expertises',
      sla: 'SLA 99.98%',
      slaSub: 'Haute Disponibilité',
      volume: '+450M€',
      volumeSub: 'Volumes Transigés',
      code: '100% Code Propriétaire',
      codeSub: 'Zéro Dette',
      figma: 'BAT Figma Garanti',
      figmaSub: 'Avant Tout Code',
    },
    services: {
      surtitle: 'NOS DOMAINES D’EXCELLENCE',
      title: 'Une maîtrise complète de la chaîne de valeur numérique.',
      subtitle:
        "De l'ingénierie logicielle avancée aux dispositifs d'acquisition à fort impact, nous déployons une rigueur sans compromis à chaque étape de votre transformation digitale.",
      pole: 'PÔLE',
      detailsBtn: 'Détails',
      selectBtn: 'Sélectionner',
      modalTitle: 'Cahier des charges',
      deliverablesTitle: 'Livrables Contractuels Clés',
      techStackTitle: 'Architecture Technique Recommandée',
      closeModal: 'Fermer',
      items: [
        {
          id: 'web',
          number: '01',
          title: 'Solutions Web & E-commerce',
          subtitle: 'Architectures Haute Performance & Paiements Hybrides',
          description:
            'Nous bâtissons des plateformes web ultra-rapides et des infrastructures e-commerce capables de supporter des pics de charge intenses. Intégration sur-mesure des passerelles de paiement internationales (Stripe, Adyen) et régionales (Mobile Money).',
          deliverables: [
            'Architectures Headless & SSR ultra-véloces (< 800ms LCP)',
            'Intégration Mobile Money multi-opérateurs & cartes bancaires',
            'Sécurité financière PCI-DSS & chiffrement bancaire de bout en bout',
            'Back-offices sur-mesure et synchronisation ERP/CRM',
          ],
          keyMetric: '< 650ms',
          metricLabel: 'Temps de chargement moyen global',
          techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API', 'Mobile Money SDKs'],
        },
        {
          id: 'mobile',
          number: '02',
          title: 'Développement Mobile',
          subtitle: 'Applications iOS & Android Fluides et Scalables',
          description:
            'Conception d’applications mobiles natives et cross-platform d’une fluidité absolue. Architecture modulaire, fonctionnement offline-first résilient et synchronisation temps réel pour une expérience utilisateur sans friction.',
          deliverables: [
            'Développement React Native & Swift / Kotlin natif',
            'Mode hors-ligne robuste avec synchronisation automatique',
            'Système de notifications push ciblées à haute délivrabilité',
            'Publication certifiée sur l’App Store et Google Play Store',
          ],
          keyMetric: '60 FPS',
          metricLabel: 'Fluidité d’exécution continue',
          techStack: ['React Native', 'Swift', 'Kotlin', 'GraphQL', 'Firebase', 'Secure Storage'],
        },
        {
          id: 'design',
          number: '03',
          title: 'Design & Brand Identity',
          subtitle: 'Direction Artistique, Brand Books & Design Systems Figma',
          description:
            'Création d’identités visuelles d’exception et d’expériences d’interface raffinées. Chaque projet bénéficie d’un Design System complet sur Figma assurant une cohérence millimétrée entre votre marque et vos interfaces numériques.',
          deliverables: [
            'Direction artistique de prestige & refonte de marque globale',
            'Design System Figma unifié avec tokens modulaires',
            'Prototypage interactif haute-fidélité pour validation BAT',
            'Guidelines typographiques, chromatiques et iconographiques',
          ],
          keyMetric: '100% BAT',
          metricLabel: 'Validation maquette avant tout codage',
          techStack: ['Figma Pro', 'Design Tokens', 'Tailwind Systems', 'Motion Design', 'Micro-interactions'],
        },
        {
          id: 'growth',
          number: '04',
          title: 'Social Growth & Community Management',
          subtitle: 'Stratégie Éditoriale & Modération Active SLA < 2h',
          description:
            'Amplification de votre notoriété et fidélisation de vos audiences stratégiques. Élaboration de contenus vidéo et visuels à haute valeur perçue, gestion de réputation et service de modération continue avec temps de réponse garanti.',
          deliverables: [
            'Stratégie éditoriale omnicanale (LinkedIn, Instagram, X)',
            'Production de contenus vidéos courts & visuels signature',
            'Modération active et service client sous SLA rigoureux (< 2h)',
            'Reporting exécutif mensuel orienté conversion & ROI',
          ],
          keyMetric: '< 2h',
          metricLabel: 'SLA de prise en charge des interactions',
          techStack: ['Copywriting B2B', 'Content Studio', 'Social Analytics', 'Crisis Protocol', 'ROI Tracking'],
        },
      ],
    },
    methodology: {
      surtitle: 'NOTRE MÉTHODOLOGIE',
      title: 'Zéro improvisation. Une gouvernance de projet au cordeau.',
      subtitle:
        'Notre rigueur méthodologique garantit le respect absolu de vos délais, de vos budgets et de vos exigences de sécurité les plus strictes.',
      stepPrefix: 'JALON',
      stepOf: 'sur 03',
      securityControls: 'Contrôles de Sécurité & Validation Qualité',
      contractDeliverable: 'Livrable Contractuel',
      protocolBadge: 'Protocole Ouest Dynamics',
      protocolStandard: 'Standard ISO 27001',
      pillars: [
        {
          title: 'GOUVERNANCE EXÉCUTIVE',
          description:
            'Un interlocuteur Lead Architect unique dédié. Comités hebdomadaires de suivi et transparence totale via accès direct aux tableaux Kanban.',
        },
        {
          title: 'PROPRIÉTÉ INTELLECTUELLE INTÉGRALE',
          description:
            '100% de cession de droits sur le code source, les maquettes Figma, les bases de données et les actifs de marque dès validation finale.',
        },
        {
          title: 'GARANTIE DE STABILITÉ 30 JOURS',
          description:
            'Accompagnement post-déploiement avec résolution prioritaire sous 2h des anomalies critiques éventuelles.',
        },
      ],
      steps: [
        {
          number: '01',
          title: 'Cadrage & Maquettage Validé',
          tagline: 'BAT Figma Obligatoire Avant Tout Code',
          description:
            'Aucune ligne de code n’est produite sans validation préalable formelle. Nous co-construisons le périmètre fonctionnel précis et présentons un prototype Figma interactif au pixel près.',
          checkpoints: [
            'Atelier d’architecture & spécifications fonctionnelles détaillées',
            'Wireframes ergonomiques & parcours utilisateur optimisés',
            'Design System sur-mesure & prototype haute fidélité interactif',
            'Signature formelle du BAT (Bon À Tirer) par le comité exécutif',
          ],
          deliverable: 'Prototype Figma interactif & Cahier des Spécifications Techniques',
          delay: 'Jalons 1 à 3 semaines',
        },
        {
          number: '02',
          title: 'Recette Technique Rigoureuse',
          tagline: 'Tests Croisés & Environnement Staging Hermétique',
          description:
            'L’implémentation logicielle se déroule selon des cycles d’intégration continue (CI/CD). Votre équipe a accès à un environnement de pré-production (staging) hermétique avec données anonymisées.',
          checkpoints: [
            'Environnement Staging miroir dédié avec accès restreint sécurisé',
            'Tests croisés navigateurs, terminaux réels & vitesses réseaux dégradées',
            'Audits de sécurité, conformité OWASP et cryptographie des flux sensibles',
            'Recette fonctionnelle guidée avec cahier d’anomalies et résolutions prioritaires',
          ],
          deliverable: 'Environnement Staging validé & Rapport d’Audit Qualité 100% vert',
          delay: 'Cycles itératifs continus',
        },
        {
          number: '03',
          title: 'Mise en Production Contrôlée',
          tagline: 'Déploiement Zéro-Downtime & Transfert de Compétences',
          description:
            'La bascule en environnement réel s’effectue selon un plan de déploiement à chaud sans interruption de service (Zero-Downtime). Nous remettons l’intégralité des accès et de la documentation.',
          checkpoints: [
            'Déploiement planifié Blue/Green ou Canary sans interruption de service',
            'Configuration du monitoring temps réel, alertes automatisées & backups',
            'Session formelle de transfert de compétences administratives et techniques',
            'Remise du Runbook d’exploitation et 30 jours de garantie de stabilisation',
          ],
          deliverable: 'Plateforme en direct, Code Propriétaire remis & Runbook d’exploitation',
          delay: 'Jour J + 30j de garantie',
        },
      ],
    },
    contact: {
      surtitle: 'ENGAGEMENT EXÉCUTIF',
      title: 'Prêt à dominer votre marché ?',
      subtitle:
        'Discutons dès aujourd’hui de votre vision et structurons votre prochain succès numérique.',
      fullName: 'Nom & Prénom',
      fullNamePlaceholder: 'Alexandre de Montmirail',
      company: 'Nom de l’Entreprise',
      companyPlaceholder: 'Apex Global Capital',
      email: 'E-mail Professionnel',
      emailPlaceholder: 'alexandre@apex-capital.com',
      serviceLabel: 'Service Souhaité',
      budgetLabel: 'Budget d’Investissement Prévu',
      descriptionLabel: 'Description du Projet',
      descriptionPlaceholder:
        'Présentez succinctement vos enjeux, vos objectifs de conversion, et vos contraintes de calendrier...',
      confidentiality: 'Confidentialité absolue : accord NDA signé avant transmission technique.',
      submitBtn: 'Transmettre notre dossier à Ouest Dynamics',
      submittingBtn: 'Transmission chiffrée...',
      successTitle: 'Dossier Transmis avec Succès',
      successRef: 'Référence Dossier',
      successMsg:
        'Votre dossier d’ingénierie a été transmis à la direction des opérations d’Ouest Dynamics. Un Associé Référent vous contactera sous 4 heures ouvrées pour convenir d’un échange confidentiel.',
      resetBtn: 'Soumettre un autre projet',
      securityTag: 'TLS 1.3 / NDA ACTIF',
      errors: {
        fullName: 'Veuillez renseigner votre Nom & Prénom',
        company: 'Veuillez indiquer le nom de votre entreprise',
        email: 'Veuillez saisir votre adresse e-mail professionnelle',
        emailInvalid: 'Adresse e-mail invalide',
        description: 'Veuillez décrire succinctement vos objectifs et votre calendrier',
      },
      budgets: [
        { id: '25k-50k', label: '25 000 € - 50 000 €' },
        { id: '50k-100k', label: '50 000 € - 100 000 €' },
        { id: '100k-250k', label: '100 000 € - 250 000 €' },
        { id: '250k+', label: '250 000 € +' },
      ],
    },
    projectModal: {
      surtitle: 'Cadrage Exécutif · Ouest Dynamics',
      title: "Initier votre projet d'exception",
      subtitle:
        "Sélectionnez votre domaine d'intervention prioritaire pour configurer votre prise en charge sous 4h.",
      serviceLabel: "Domaine d'intervention",
      continueBtn: 'Continuer vers le formulaire',
      cancelBtn: 'Fermer',
    },
    footer: {
      tagline:
        "Digital Engineering & Growth Partner. Nous concevons des plateformes de prestige et pilotons l'accélération numérique des leaders de marché.",
      domainsTitle: "Domaines d'Excellence",
      methodologyTitle: 'Méthodologie & Déploiement',
      governanceTitle: 'Standards',
      confidentialityNote: 'Toutes les missions sont encadrées par des accords stricts de non-divulgation.',
      rightsReserved: 'Tous droits réservés. Code propriétaire institutionnel.',
      legalMentions: 'Mentions Légales',
      privacyPolicy: 'Protection des Données & Confidentialité',
      backToTop: 'Haut de page',
      location: 'Abidjan',
    },
    langPrompt: {
      detected: 'Language detected: Your device is set to English. Would you like to view the site in English?',
      switchText: 'Switch to English',
      keepText: 'Rester en Français',
    },
    mobileBar: {
      callToAction: 'Lancer un projet',
    },
  },
};
