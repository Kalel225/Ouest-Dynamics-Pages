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
    custom: string;
    customSub: string;
    valueGenerated: string;
    simplicity: string;
    simplicitySub: string;
    guarantee: string;
    guaranteeSub: string;
    ownership: string;
    ownershipSub: string;
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
    includedTitle: string;
    benefitsTitle: string;
    closeModal: string;
    items: {
      id: string;
      number: string;
      title: string;
      subtitle: string;
      description: string;
      deliverables: string[];
      keyBenefit: string;
      keyBenefitLabel: string;
      whyChoose: string;
      turnaround: string;
    }[];
  };

  // Methodology Section (3 Simple Steps)
  methodology: {
    surtitle: string;
    title: string;
    subtitle: string;
    stepPrefix: string;
    stepOf: string;
    keyCheckpoints: string[];
    whatYouGet: string;
    simpleStandard: string;
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
    currencySwitchHint: string;
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
    guaranteesTitle: string;
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
    messageAction: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      expertises: 'What We Do',
      methodology: 'How It Works',
      governance: 'Guarantees',
      contact: 'Get a Quote',
      launchProject: 'Start a Project',
      menu: 'Menu',
      close: 'Close',
    },
    hero: {
      surtitle: 'DIGITAL ENGINEERING & GROWTH PARTNER',
      title: 'Digital Excellence Engineered for Your Growth.',
      subtitle:
        'We design and build bespoke high-performance websites, mobile applications, and digital platforms that convert visitors into revenue and scale your business effortlessly.',
      ctaPrimary: 'Get a Free Quote',
      ctaSecondary: 'See What We Do',
      custom: '100% Custom Built',
      customSub: 'Tailored to your needs',
      valueGenerated: 'Generated for Clients',
      simplicity: 'Easy to Manage',
      simplicitySub: 'No tech skills needed',
      guarantee: 'Preview Before Launch',
      guaranteeSub: 'Approved with you',
      ownership: 'Full Ownership',
      ownershipSub: 'Everything belongs to you',
    },
    services: {
      surtitle: 'OUR 4 MAIN SERVICES',
      title: 'Clear, Simple Digital Solutions for Your Business.',
      subtitle:
        'Whether you want to sell products online, launch a smartphone app, or refresh your brand image, we deliver top-quality results explained in plain words.',
      pole: 'SERVICE',
      detailsBtn: 'Learn more',
      selectBtn: 'Choose this service',
      modalTitle: 'Service Details',
      includedTitle: "What's Included for You",
      benefitsTitle: 'Why Your Business Will Love It',
      closeModal: 'Close',
      items: [
        {
          id: 'web',
          number: '01',
          title: 'Websites & Online Stores',
          subtitle: 'Fast, modern websites that turn visitors into paying customers',
          description:
            'We create showcase websites and easy-to-run e-commerce shops. Your site loads instantly on smartphones and computers, and you can change text and photos easily on your own.',
          deliverables: [
            'Modern website custom-made for your activity',
            'Secure payments for your customers (Cards & Mobile Money)',
            'Flawless display on all smartphones and laptops',
            'Simple dashboard to update your products and articles without code',
          ],
          keyBenefit: '100% Mobile Ready',
          keyBenefitLabel: 'Fast and responsive on all devices',
          whyChoose:
            'You get an online presence that looks trustworthy, works 24/7 to bring in clients, and requires zero technical maintenance on your part.',
          turnaround: 'Delivered in 2 to 4 weeks',
        },
        {
          id: 'mobile',
          number: '02',
          title: 'Mobile Apps (iPhone & Android)',
          subtitle: 'Smooth, user-friendly apps your customers will enjoy every day',
          description:
            'An app built specifically for your audience, available for download on both the Apple App Store and Google Play Store. Quick to open, simple to navigate, and reliable.',
          deliverables: [
            'App available on both iPhone and Android smartphones',
            'Works smoothly even with slow or unstable internet',
            'Send helpful notifications to announce promos or new updates',
            'Friendly step-by-step guidance to manage your users',
          ],
          keyBenefit: 'Fast & Intuitive',
          keyBenefitLabel: 'Ready for App Store & Google Play',
          whyChoose:
            'An app keeps your brand right on your customers’ home screens, making repeat purchases and appointments faster than ever.',
          turnaround: 'Delivered in 4 to 8 weeks',
        },
        {
          id: 'design',
          number: '03',
          title: 'Design & Visual Identity',
          subtitle: 'Memorable logos and elegant designs that inspire instant trust',
          description:
            'We give your business a polished, professional look. You will see and approve full visual previews of your project before any coding even begins.',
          deliverables: [
            'Unique logo creation and harmonious color palette',
            'Complete visual mockups presented and approved together',
            'Ready-to-use visuals for social media, business cards, and brochures',
            'A practical brand guide so your look stays consistent everywhere',
          ],
          keyBenefit: 'Visual Approval First',
          keyBenefitLabel: 'You review every mockup before code',
          whyChoose:
            'A premium visual image lets you stand out from competitors immediately and justify higher prices with total confidence.',
          turnaround: 'Delivered in 1 to 3 weeks',
        },
        {
          id: 'growth',
          number: '04',
          title: 'Social Media & Customer Growth',
          subtitle: 'Grow your audience and attract regular new clients every week',
          description:
            'Boost your presence online. We create engaging posts, produce short videos, and handle incoming customer inquiries swiftly to help you close more sales.',
          deliverables: [
            'Consistent, appealing posts on LinkedIn, Instagram, or Facebook',
            'Catchy short videos and branded graphic templates',
            'Fast and courteous replies to your customer messages',
            'Simple monthly summary to see your new contacts and leads',
          ],
          keyBenefit: '< 2h Response Time',
          keyBenefitLabel: 'Quick answers for your prospective buyers',
          whyChoose:
            'You stay active and visible on social channels without having to spend hours writing posts or editing videos yourself.',
          turnaround: 'Ongoing monthly care',
        },
      ],
    },
    methodology: {
      surtitle: 'HOW WE WORK TOGETHER',
      title: '3 Simple Steps. Zero Stress.',
      subtitle:
        'We take care of all the technical heavy lifting. You remain in full control and know what is happening at every step.',
      stepPrefix: 'STEP',
      stepOf: 'of 3',
      keyCheckpoints: [
        'Friendly conversation to understand your goals',
        'Visual preview shown before we build anything',
        'You test on your own phone before going live',
      ],
      whatYouGet: 'What you get',
      simpleStandard: '100% Clear & Transparent',
      pillars: [
        {
          title: 'DEDICATED HUMAN GUIDE',
          description:
            'A friendly single point of contact who explains everything in everyday words and answers all your questions promptly.',
        },
        {
          title: 'YOU OWN 100% OF EVERYTHING',
          description:
            'The website, domain name, logos, accounts, and files belong to you entirely from day one. No hidden locks.',
        },
        {
          title: '30-DAY FREE PEACE OF MIND',
          description:
            'After launch, we stay by your side for 30 days to answer questions and ensure everything runs smoothly at no extra cost.',
        },
      ],
      steps: [
        {
          number: '01',
          title: 'Listening & Visual Mockups',
          tagline: 'See the exact look before we write any code',
          description:
            'We chat about what you want to achieve and design visual previews of your website or app. You see exactly how it looks and feels, and we adjust until you love it.',
          checkpoints: [
            'Informal discussion about your vision and target customers',
            'Creation of beautiful visual mockups easy to preview on your screen',
            'Refinements based on your feedback until you are 100% happy',
            'Your official thumbs-up before we move to the next phase',
          ],
          deliverable: 'Complete visual mockups approved by you',
          delay: '1 to 2 Weeks',
        },
        {
          number: '02',
          title: 'Building & Private Testing',
          tagline: 'Test your project privately on your phone',
          description:
            'Our developers build your project cleanly. We give you a private link so you can test it directly on your smartphone and computer, ensuring everything works as expected.',
          checkpoints: [
            'Careful building according to the approved visuals',
            'Thorough checks on iPhones, Android phones, and laptops',
            'Testing of forms, buttons, and payment methods',
            'You click around and tell us if you want any small tweaks',
          ],
          deliverable: 'Private test link for your phone and computer',
          delay: 'Ongoing regular updates',
        },
        {
          number: '03',
          title: 'Official Launch & Easy Training',
          tagline: 'Going live smoothly with step-by-step guidance',
          description:
            'We publish your site or app online. We sit down with you (or send short video guides) to show you how to use everything with ease, and we hand over all your logins.',
          checkpoints: [
            'Smooth public launch without any downtime',
            'Short, simple video training so you can manage your site alone',
            'Handover of all logins, passwords, and source files',
            '30 days of free post-launch support whenever you need help',
          ],
          deliverable: 'Live website/app + passwords + easy video guide',
          delay: 'Launch day + 30 days free support',
        },
      ],
    },
    contact: {
      surtitle: "LET'S TALK ABOUT YOUR PROJECT",
      title: 'Ready to Bring Your Idea to Life?',
      subtitle:
        'Tell us what you have in mind in a few simple words. We will get back to you within 4 hours with friendly advice and a clear estimate.',
      fullName: 'Your Name',
      fullNamePlaceholder: 'Alex Morgan',
      company: 'Business or Project Name',
      companyPlaceholder: 'Horizon Boutique',
      email: 'Email Address',
      emailPlaceholder: 'alex@mycompany.com',
      serviceLabel: 'What do you need?',
      budgetLabel: 'Estimated Budget',
      currencySwitchHint: 'Change currency',
      descriptionLabel: 'Tell us a bit about what you want to create',
      descriptionPlaceholder:
        'e.g. I want to build a clean website for my business to showcase my services and let customers book appointments...',
      confidentiality: 'Your details remain 100% confidential. No spam ever.',
      submitBtn: 'Send My Free Inquiry',
      submittingBtn: 'Sending your inquiry...',
      successTitle: 'Inquiry Received!',
      successRef: 'Case Reference',
      successMsg:
        'Thank you! We received your message. A dedicated project manager will contact you within 4 business hours to discuss your needs in plain language.',
      resetBtn: 'Send Another Inquiry',
      securityTag: 'CONFIDENTIAL & PROTECTED',
      errors: {
        fullName: 'Please enter your name',
        company: 'Please indicate your business or project name',
        email: 'Please provide a valid email address',
        emailInvalid: 'Please enter a valid email format',
        description: 'Please write a few words about your project',
      },
    },
    projectModal: {
      surtitle: 'Ouest Dynamics · Project Scoping',
      title: 'What Would You Like to Build?',
      subtitle:
        'Select the main service you need to get a fast, tailored answer within 4 hours.',
      serviceLabel: 'Choose your main need',
      continueBtn: 'Continue to Easy Form',
      cancelBtn: 'Close',
    },
    footer: {
      tagline:
        'We design and build modern websites, mobile apps, and brand visuals that help businesses attract more customers effortlessly.',
      domainsTitle: 'Our Services',
      methodologyTitle: 'Simple Process',
      guaranteesTitle: 'Guarantees',
      confidentialityNote: 'All inquiries and project details remain strictly confidential.',
      rightsReserved: 'All rights reserved.',
      legalMentions: 'Legal Notice',
      privacyPolicy: 'Privacy & Data Protection',
      backToTop: 'Back to Top',
      location: 'Abidjan',
    },
    langPrompt: {
      detected: 'Langue détectée : Votre appareil est en français. Souhaitez-vous basculer le site en français ?',
      switchText: 'Passer en Français',
      keepText: 'Stay in English',
    },
    mobileBar: {
      callToAction: 'Get a Quote',
      messageAction: 'Message Us',
    },
  },

  fr: {
    nav: {
      expertises: 'Ce que nous faisons',
      methodology: 'Comment ça marche',
      governance: 'Nos Garanties',
      contact: 'Demander un Devis',
      launchProject: 'Lancer mon projet',
      menu: 'Menu',
      close: 'Fermer',
    },
    hero: {
      surtitle: 'INGÉNIERIE DIGITALE & PARTENAIRE DE CROISSANCE',
      title: "L'Excellence Numérique au Service de Votre Croissance.",
      subtitle:
        "Nous concevons et développons des sites web d'exception, des applications mobiles fluides et des solutions numériques sur-mesure pour développer vos ventes et propulser votre entreprise, en toute simplicité.",
      ctaPrimary: 'Demander un devis gratuit',
      ctaSecondary: 'Découvrir nos services',
      custom: '100% Sur-Mesure',
      customSub: 'Adapté à votre activité',
      valueGenerated: 'Générés pour nos Clients',
      simplicity: 'Simple à Gérer',
      simplicitySub: 'Zéro compétence requise',
      guarantee: 'Maquette Avant Travaux',
      guaranteeSub: 'Validé avec vous pas à pas',
      ownership: 'Vous Êtes Propriétaire',
      ownershipSub: 'Tout vous appartient dès le 1er jour',
    },
    services: {
      surtitle: 'NOS 4 SERVICES PRINCIPAUX',
      title: 'Des solutions numériques claires, utiles et sans jargon.',
      subtitle:
        'Que vous souhaitiez vendre en ligne, lancer une application sur smartphone ou moderniser votre image, nous réalisons votre projet avec soin et vous expliquons tout simplement.',
      pole: 'SERVICE',
      detailsBtn: 'En savoir plus',
      selectBtn: 'Choisir ce service',
      modalTitle: 'Détails du service',
      includedTitle: 'Ce qui est inclus pour vous',
      benefitsTitle: 'Pourquoi vous allez adorer',
      closeModal: 'Fermer',
      items: [
        {
          id: 'web',
          number: '01',
          title: 'Sites Web & Boutiques en Ligne',
          subtitle: 'Des sites rapides et élégants qui convertissent vos visiteurs en clients',
          description:
            'Nous concevons votre site vitrine ou votre boutique de vente en ligne. Vos clients profitent d’un site ultra-rapide sur téléphone et ordinateur, et vous pouvez modifier vous-même vos textes et photos en quelques clics.',
          deliverables: [
            'Site moderne conçu sur-mesure pour votre activité',
            'Paiement sécurisé pour vos clients (Carte bancaire & Mobile Money)',
            'Affichage parfait sur tous les smartphones, tablettes et ordinateurs',
            'Espace simple pour ajouter vos produits et modifier vos textes en autonomie',
          ],
          keyBenefit: '100% Adapté Mobile',
          keyBenefitLabel: 'Rapide et fluide sur tous les écrans',
          whyChoose:
            'Vous obtenez une présence en ligne professionnelle qui inspire confiance, tourne 24h/24 pour trouver des clients et ne nécessite aucune compétence technique de votre part.',
          turnaround: 'Livraison en 2 à 4 semaines',
        },
        {
          id: 'mobile',
          number: '02',
          title: 'Applications Mobiles (iPhone & Android)',
          subtitle: 'Des applications simples et agréables à utiliser au quotidien',
          description:
            'Une application créée spécialement pour vos clients, disponible en téléchargement sur l’App Store d’Apple et le Google Play Store. Fluide, facile à utiliser et toujours disponible.',
          deliverables: [
            'Application disponible sur smartphones iPhone et Android',
            'Fonctionne même lorsque la connexion Internet est lente',
            'Envoi de notifications pour prévenir vos clients de vos nouveautés',
            'Accompagnement pas-à-pas pour prendre en main votre application',
          ],
          keyBenefit: 'Simple & Fluide',
          keyBenefitLabel: 'Prête pour App Store et Google Play',
          whyChoose:
            'Une application installe votre marque directement dans la poche de vos clients et rend les commandes ou réservations instantanées.',
          turnaround: 'Livraison en 4 à 8 semaines',
        },
        {
          id: 'design',
          number: '03',
          title: 'Design & Identité Visuelle',
          subtitle: 'Logo mémorable et charte graphique qui inspirent confiance immédiatement',
          description:
            'Nous donnons à votre entreprise une image soignée et professionnelle. Vous visualisez et validez l’ensemble des maquettes visuelles avant même que le développement technique ne commence.',
          deliverables: [
            'Création de votre logo unique et de vos couleurs de marque',
            'Maquettes visuelles complètes présentées et validées ensemble',
            'Visuels prêts à l’emploi pour vos réseaux sociaux et cartes de visite',
            'Guide visuel pratique pour garder une belle image partout',
          ],
          keyBenefit: 'Maquette Validée d’Abord',
          keyBenefitLabel: 'Vous validez le visuel avant tout code',
          whyChoose:
            'Une image haut de gamme permet de vous démarquer immédiatement de vos concurrents et de rassurer vos futurs clients dès la première seconde.',
          turnaround: 'Livraison en 1 à 3 semaines',
        },
        {
          id: 'growth',
          number: '04',
          title: 'Visibilité & Réseaux Sociaux',
          subtitle: 'Faites grandir votre communauté et attirez de nouveaux clients',
          description:
            'Développez votre visibilité sur Internet. Nous créons des publications régulières, réalisons des vidéos courtes attrayantes et répondons rapidement aux messages de vos prospects.',
          deliverables: [
            'Publications régulières et attrayantes sur vos réseaux (Instagram, LinkedIn, Facebook)',
            'Création de visuels et de petites vidéos pour capter l’attention',
            'Réponses rapides et courtoises aux questions de vos clients',
            'Bilan mensuel simple pour suivre vos nouveaux contacts gagnés',
          ],
          keyBenefit: 'Réponse en < 2h',
          keyBenefitLabel: 'Prise en charge rapide de vos prospects',
          whyChoose:
            'Votre entreprise reste vivante et active en ligne sans que vous ayez besoin de passer vos soirées à rédiger des posts ou monter des vidéos.',
          turnaround: 'Accompagnement mensuel',
        },
      ],
    },
    methodology: {
      surtitle: 'COMMENT NOUS TRAVAILLONS ENSEMBLE',
      title: '3 étapes simples. Zéro prise de tête.',
      subtitle:
        'Nous nous occupons de toute la technique. Vous gardez la main et savez exactement ce qui se passe à chaque étape.',
      stepPrefix: 'ÉTAPE',
      stepOf: 'sur 3',
      keyCheckpoints: [
        'Échange amical pour comprendre vos attentes',
        'Maquette visuelle montrée avant de construire',
        'Essais sur votre propre téléphone avant la mise en ligne',
      ],
      whatYouGet: 'Ce que vous recevez',
      simpleStandard: '100% Clair & Transparent',
      pillars: [
        {
          title: 'UN CONSEILLER DÉDIÉ',
          description:
            'Un interlocuteur unique et disponible qui vous parle clairement en français simple et répond à toutes vos questions.',
        },
        {
          title: 'VOUS ÊTES 100% PROPRIÉTAIRE',
          description:
            'Le site, le nom de domaine, les logos et tous les fichiers vous appartiennent intégralement dès le premier jour.',
        },
        {
          title: 'GARANTIE 30 JOURS SÉRÉNITÉ',
          description:
            'Après la mise en ligne, nous restons à vos côtés pendant 30 jours pour vous aider et veiller au bon fonctionnement de tout.',
        },
      ],
      steps: [
        {
          number: '01',
          title: 'Écoute & Maquette Visuelle',
          tagline: 'Vous voyez le résultat exact avant de commencer',
          description:
            'Nous discutons de vos besoins et créons les maquettes visuelles de votre projet. Vous voyez précisément à quoi ressemblera votre futur site ou application, et nous ajustons ensemble jusqu’à ce que vous soyez conquis.',
          checkpoints: [
            'Discussion simple pour cerner vos goûts et vos objectifs',
            'Création des visuels complets de votre projet',
            'Modifications selon vos remarques jusqu’à entière satisfaction',
            'Votre accord officiel avant de passer à la création technique',
          ],
          deliverable: 'Toutes les maquettes visuelles validées par vous',
          delay: '1 à 2 semaines',
        },
        {
          number: '02',
          title: 'Création & Essais Privés',
          tagline: 'Testez vous-même sur votre téléphone',
          description:
            'Notre équipe construit votre projet selon les maquettes validées. Nous vous donnons un lien privé pour essayer vous-même sur votre smartphone et votre ordinateur en toute tranquillité.',
          checkpoints: [
            'Construction soignée et sécurisée de votre projet',
            'Tests sur téléphones iPhone, Android et ordinateurs',
            'Vérification du bon fonctionnement des formulaires et paiements',
            'Vous cliquez partout et partagez vos retours facilement',
          ],
          deliverable: 'Un accès d’essai privé sur votre téléphone',
          delay: 'Avancement régulier avec nouvelles',
        },
        {
          number: '03',
          title: 'Mise en Ligne & Formation Offerte',
          tagline: 'Votre projet est en direct avec notre aide',
          description:
            'Nous mettons votre site ou application en ligne officiellement. Nous prenons le temps de vous former simplement en vidéo ou visio pour que vous sachiez tout utiliser facilement.',
          checkpoints: [
            'Lancement officiel en ligne sans interruption',
            'Petite formation simple pour être autonome sur vos contenus',
            'Remise de tous vos identifiants, mots de passe et fichiers',
            '30 jours de suivi et d’aide offerte pour vous accompagner sereinement',
          ],
          deliverable: 'Projet en ligne + Identifiants + Formation vidéo',
          delay: 'Jour du lancement + 30 jours de support offert',
        },
      ],
    },
    contact: {
      surtitle: 'PARLONS SIMPLEMENT DE VOTRE PROJET',
      title: 'Prêt à donner vie à votre projet ?',
      subtitle:
        'Expliquez-nous en quelques mots votre idée. Nous vous répondrons sous 4 heures avec des conseils clairs et un devis gratuit sans engagement.',
      fullName: 'Votre Nom & Prénom',
      fullNamePlaceholder: 'Alexandre Martin',
      company: 'Nom de votre entreprise ou projet',
      companyPlaceholder: 'Boutique Horizon',
      email: 'Votre Adresse E-mail',
      emailPlaceholder: 'alexandre@exemple.com',
      serviceLabel: 'De quoi avez-vous besoin ?',
      budgetLabel: 'Budget indicatif',
      currencySwitchHint: 'Changer de monnaie',
      descriptionLabel: 'Décrivez votre projet en quelques mots',
      descriptionPlaceholder:
        'Ex : J’aimerais créer un site moderne pour présenter mon activité et permettre à mes clients de me contacter ou réserver en ligne...',
      confidentiality: 'Vos informations restent 100% confidentielles. Zéro spam.',
      submitBtn: 'Envoyer ma demande gratuite',
      submittingBtn: 'Envoi en cours...',
      successTitle: 'Demande bien reçue !',
      successRef: 'Numéro de dossier',
      successMsg:
        'Merci ! Votre demande a bien été transmise à notre équipe. Un conseiller dédié va vous recontacter sous 4 heures pour faire le point simplement avec vous.',
      resetBtn: 'Envoyer une autre demande',
      securityTag: 'CONFIDENTIEL & SÉCURISÉ',
      errors: {
        fullName: 'Veuillez indiquer votre nom et prénom',
        company: 'Veuillez indiquer le nom de votre entreprise ou projet',
        email: 'Veuillez saisir votre adresse e-mail',
        emailInvalid: 'Format d’adresse e-mail invalide',
        description: 'Veuillez écrire quelques mots sur votre projet',
      },
    },
    projectModal: {
      surtitle: 'Ouest Dynamics · Préparation de Projet',
      title: 'Que souhaitez-vous créer ?',
      subtitle:
        'Sélectionnez votre besoin principal pour recevoir une réponse claire et un devis sous 4h.',
      serviceLabel: 'Choisissez votre besoin',
      continueBtn: 'Passer au formulaire simple',
      cancelBtn: 'Fermer',
    },
    footer: {
      tagline:
        'Nous créons des sites web, des applications mobiles et des identités visuelles pour aider les entreprises à attirer de nouveaux clients en toute simplicité.',
      domainsTitle: 'Nos Services',
      methodologyTitle: 'Notre Démarche',
      guaranteesTitle: 'Nos Engagements',
      confidentialityNote: 'Toutes les demandes sont traitées dans la plus stricte confidentialité.',
      rightsReserved: 'Tous droits réservés.',
      legalMentions: 'Mentions Légales',
      privacyPolicy: 'Protection des Données',
      backToTop: 'Haut de page',
      location: 'Abidjan',
    },
    langPrompt: {
      detected: 'Language detected: Your device is set to English. Would you like to view the site in English?',
      switchText: 'Switch to English',
      keepText: 'Rester en Français',
    },
    mobileBar: {
      callToAction: 'Demander un devis',
      messageAction: 'Nous écrire',
    },
  },
};
