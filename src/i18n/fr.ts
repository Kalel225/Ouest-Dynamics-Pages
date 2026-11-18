import { PoleId, TransverseModifierId } from '../utils/pricingEngine';

export interface CaseStudyItem {
  id: string;
  pole: PoleId;
  poleLabel: string;
  sector: string;
  location: string;
  title: string;
  clientType: string;
  challenge: string;
  architectureAndDa: string;
  roiImpact: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  deliverables: string[];
}

export const fr = {
  meta: {
    lang: 'fr' as 'fr' | 'en',
  },
  nav: {
    poles: 'Pôles & Moteurs',
    methodology: 'Gouvernance',
    portfolio: 'Études de Cas',
    configurator: 'Configurateur',
    concierge: 'Concierge IA',
    ctaStart: 'Démarrer un projet',
  },
  hero: {
    kicker: 'Abidjan · Afrique de l’Ouest & International · Architecture Digitale Souveraine',
    title: 'Ingénierie Digitale Souveraine, Direction Artistique & Automatisation IA 360°.',
    subtitle:
      'Nous concevons, développons et propulsons les plateformes critiques des organisations ambitieuses : identités de marque souveraines, écosystèmes Web & SaaS, applications Mobile/Desktop Offline-First et infrastructures d’acquisition pilotées par l’IA.',
    ctaPrimary: 'Configurer mon brief',
    ctaSecondary: 'Parler au Concierge IA',
    governanceMetrics: [
      {
        value: '100 %',
        label: 'Propriété Client & Cession Intégrale PI',
        detail: 'Domaines, serveurs, comptes Stores et code source à votre nom',
      },
      {
        value: '5 Jours',
        label: 'Validation Structurée par Jalon',
        detail: 'Cycle contractuel agile avec validation sous 5 jours ouvrés',
      },
      {
        value: '40 / 30 / 30',
        label: 'Échéancier Contractuel Transparent',
        detail: '40 % signature · 30 % validation design/archi · 30 % recette',
      },
      {
        value: 'ARTCI & RGPD',
        label: 'Conformité & Zero-Data Retention',
        detail: 'Loi n°2013-450 Côte d’Ivoire, RGPD UE & isolation IA stricte',
      },
    ],
  },
  polesMatrix: {
    sectionKicker: '01. Architecture Opérationnelle 360°',
    title: '4 Pôles d’Exécution Pilotés par 2 Moteurs Transverses.',
    subtitle:
      'Chaque projet est orchestré par notre Direction Artistique Executive et notre Ingénierie IA, garantissant une cohérence esthétique et technique absolue sur l’ensemble de vos actifs.',
    transverseHeader: 'Moteurs Transverses d’Autorité (Activables sur les 4 Pôles)',
    transverseEngines: [
      {
        id: 'TRANSVERSE_DA' as TransverseModifierId,
        code: 'MOTEUR TRANSVERSE A · +20 %',
        title: 'Direction Artistique Executive & Design Tokens W3C',
        description:
          'Systèmes de design souverains, typographies d’autorité, prototypage interactif haute fidélité et jetons W3C (design-tokens.json) garantissant un rendu irréprochable avant toute ligne de code.',
        specs: ['Design System W3C', 'Accessibilité WCAG AAA', 'Prototypes Haute Fidélité'],
      },
      {
        id: 'TRANSVERSE_AI' as TransverseModifierId,
        code: 'MOTEUR TRANSVERSE B · +25 %',
        title: 'Ingénierie IA (Gemini) & Automatisation n8n (ZDR)',
        description:
          'Intégration d’agents IA qualificateurs à sorties structurées, workflows d’automatisation métier n8n et pipelines de données sous politique stricte Zero-Data Retention.',
        specs: ['Agents Gemini Structured JSON', 'Orchestration n8n / API', 'Zero-Data Retention'],
      },
    ],
    polesHeader: 'Les 4 Pôles de Production Spécialisés',
    selectInConfigurator: 'Sélectionner dans le Configurateur',
    selectedInConfigurator: 'Sélectionné dans votre Brief',
    indicativeRangeLabel: 'Fourchette indicative :',
    deliveryLabel: 'Délai moyen :',
    daysUnit: 'jours ouvrés',
    poles: [
      {
        id: 'BRANDING' as PoleId,
        number: 'PÔLE 01',
        title: 'Identité & Branding 360°',
        subtitle: 'Stratégie de marque, Brand Book institutionnel, Design Tokens & Packaging',
        description:
          'Construction de marques souveraines à forte valeur perçue pour groupes, institutions et scale-ups opérant en Afrique de l’Ouest et à l’international.',
        deliverables: [
          'Plateforme de marque, architecture narrative & positionnement exécutif',
          'Système identitaire vectoriel complet & Brand Book normé',
          'Charte UI/UX & fichier de jetons W3C (design-tokens.json)',
          'Supports physiques, signalétique, rapport annuel & packaging prestige',
        ],
      },
      {
        id: 'WEB' as PoleId,
        number: 'PÔLE 02',
        title: 'Développement Web Haute Performance',
        subtitle: 'Plateformes institutionnelles, E-Commerce multi-devises, SaaS & SEO/GEO',
        description:
          'Ingénierie web moderne (React / Next.js App Router / TypeScript) calibrée pour des temps de chargement instantanés (LCP < 1.8s), la conversion B2B/B2C et le référencement génératif.',
        deliverables: [
          'Sites vitrines exécutifs & portails institutionnels haute sécurité',
          'Plateformes E-Commerce & paiement multi-devises (XOF / Mobile Money / EUR / USD)',
          'Applications Web SaaS & portails clients sur base PostgreSQL / RLS',
          'Architecture SEO technique, Schema.org JSON-LD & optimisation GEO (IA)',
        ],
      },
      {
        id: 'MOBILE_DESKTOP' as PoleId,
        number: 'PÔLE 03',
        title: 'Applications Mobile & Desktop',
        subtitle: 'iOS, Android, Windows/macOS & Architecture Offline-First résiliente',
        description:
          'Applications natives et multiplateformes conçues pour fonctionner sans interruption même en cas de connectivité réseau fluctuante, avec synchronisation cryptée.',
        deliverables: [
          'Applications mobiles iOS (App Store) & Android (Google Play)',
          'Logiciels Desktop métiers (Windows / macOS) pour opérations terrain',
          'Moteur de synchronisation locale Offline-First & file d’attente résiliente',
          'Publication sur vos propres comptes développeurs Apple & Google',
        ],
      },
      {
        id: 'GROWTH' as PoleId,
        number: 'PÔLE 04',
        title: 'Growth, Paid Media & Visibilité',
        subtitle: 'Meta / TikTok / Google Ads, Tracking Server-Side CAPI & CRO',
        description:
          'Infrastructures d’acquisition mesurables et conformes ARTCI/RGPD, reliant vos investissements publicitaires directement au chiffre d’affaires généré dans votre CRM.',
        deliverables: [
          'Architecture Tracking Server-Side (Conversions API, GTM Server, Consent Mode v2)',
          'Campagnes d’acquisition Paid Media (LinkedIn, Meta, Google, TikTok)',
          'Optimisation du taux de conversion (CRO) & entonnoirs de qualification B2B',
          'Tableaux de bord temps réel ROAS / CAC / LTV en XOF, EUR et USD',
        ],
      },
    ],
  },
  methodology: {
    sectionKicker: '02. Modèle Opérationnel & Gouvernance Contractuelle',
    title: 'Architecture « Core & Elastic Guilds » & Garanties Souveraines.',
    subtitle:
      'Nous combinons la rigueur d’un noyau exécutif interne à Abidjan avec la vélocité de guildes d’ingénieurs et créatifs seniors mobilisables sous 48 heures.',
    guildModelTitle: 'Fonctionnement Core & Elastic Guilds',
    guildSteps: [
      {
        step: '01',
        title: 'Noyau Exécutif Interne (Core Architecture & DA)',
        duration: 'Jours 1 à 5',
        description:
          'Cadrage stratégique, architecture technique, Direction Artistique Executive et définition des Design Tokens par nos associés directeurs.',
        deliverable: 'Cahier d’architecture, maquettes haute fidélité & contrat jalonné',
      },
      {
        step: '02',
        title: 'Mobilisation des Guildes Élastiques Seniors (48h)',
        duration: 'Production agile',
        description:
          'Déploiement immédiat d’équipes seniors spécialisées (Web, Mobile Offline-First, IA/n8n, Growth CAPI) sous supervision qualité stricte.',
        deliverable: 'Environnement de pré-production privé & revues hebdomadaires',
      },
      {
        step: '03',
        title: 'Recette, Transfert Souverain & Documentation',
        duration: 'Livraison & Clôture',
        description:
          'Audit de sécurité, tests de charge, remise intégrale des clés (dépôts Git, serveurs, comptes Stores) et formation des équipes clientes.',
        deliverable: 'Code source 100 % cédé + Documentation d’exploitation',
      },
    ],
    guaranteesTitle: 'Les 4 Clauses de Gouvernance Appliquées à Chaque Contrat',
    guarantees: [
      {
        code: 'CLAUSE 01',
        title: 'Indépendance Totale des Actifs Clients',
        description:
          'Noms de domaine, hébergements Cloud/Supabase, comptes Apple Developer / Google Play et Business Managers sont ouverts et restent exclusivement au nom de votre entreprise.',
      },
      {
        code: 'CLAUSE 02',
        title: 'Cession Intégrale de Propriété Intellectuelle',
        description:
          'Dès le règlement du solde final, 100 % des droits patrimoniaux sur le code source, les maquettes Figma, les systèmes de design et les workflows IA vous sont cédés sans redevance.',
      },
      {
        code: 'CLAUSE 03',
        title: 'Validation Tacite sous 5 Jours Ouvrés',
        description:
          'Pour garantir la vélocité du calendrier, chaque livrable soumis dispose d’une fenêtre de revue structurée de 5 jours ouvrés, évitant tout blocage ou dérive de planning.',
      },
      {
        code: 'CLAUSE 04',
        title: 'Échéancier 40 / 30 / 30 & Zero-Data Retention',
        description:
          'Règlement sécurisé en 3 jalons (40 % à la signature, 30 % à la validation design/architecture, 30 % à la recette finale) et traitement IA sous politique stricte Zero-Data Retention.',
      },
    ],
  },
  portfolio: {
    sectionKicker: '03. Études de Cas Sectorielles',
    title: 'Impact Mesuré & Architectures Déployées.',
    subtitle:
      'Quatre réalisations représentatives démontrant notre méthode : Défi métier, Architecture & Direction Artistique, et Impact ROI vérifié.',
    filters: {
      ALL: 'Tous les Pôles',
      BRANDING: 'Pôle 1 · Branding',
      WEB: 'Pôle 2 · Web & SaaS',
      MOBILE_DESKTOP: 'Pôle 3 · Mobile & Offline',
      GROWTH: 'Pôle 4 · Growth & CAPI',
    },
    labels: {
      challenge: 'Défi Métier',
      architecture: 'Architecture & DA',
      impact: 'Impact ROI Mesuré',
      inspectCase: 'Consulter le dossier technique',
      configureSimilar: 'Configurer un projet similaire',
      closeModal: 'Fermer le dossier',
      deliverablesTitle: 'Livrables & Stack Déployée',
    },
    cases: [
      {
        id: 'fintech-uemoa',
        pole: 'MOBILE_DESKTOP',
        poleLabel: 'Pôle 3 · Mobile & Desktop Offline-First',
        sector: 'FinTech & Paiements Transfrontaliers UEMOA',
        location: 'Abidjan · Dakar · Paris',
        title: 'Kauri Settlement — Portefeuille B2B & Terminal Marchand Offline-First',
        clientType: 'Institution de Monnaie Électronique Régionale',
        challenge:
          'Assurer l’encaissement marchand et la réconciliation interbancaire en zone UEMOA malgré les micro-coupures réseau, tout en respectant les exigences de conformité BCEAO.',
        architectureAndDa:
          'Application mobile iOS/Android et terminal Desktop dotés d’une file de transactions cryptée localement (SQLite Offline-First) + Direction Artistique souveraine à haut contraste.',
        roiImpact:
          '+215 % de volume transigé en 6 mois, 99,98 % de disponibilité perçue et réduction de 64 % du temps d’onboarding marchand.',
        metrics: [
          { label: 'Volume Transigé', value: '+215 %' },
          { label: 'Disponibilité Terrain', value: '99,98 %' },
          { label: 'Onboarding Marchand', value: '-64 %' },
        ],
        stack: ['React Native', 'SQLite Offline-First', 'PostgreSQL RLS', 'Design Tokens W3C'],
        deliverables: [
          'Applications iOS, Android & Desktop caisse synchronisées',
          'Système de design souverain & Brand Book institutionnel',
          'API de réconciliation automatisée & alertes temps réel',
        ],
      },
      {
        id: 'immobilier-prestige-abidjan',
        pole: 'BRANDING',
        poleLabel: 'Pôle 1 · Identité & Branding 360°',
        title: 'Riviera Souveraine — Identité Institutionnelle & Portail Investisseurs Diaspora',
        sector: 'Immobilier de Prestige & Promotion Foncière',
        location: 'Abidjan (Cocody Ambassades) · Londres · Dubaï',
        clientType: 'Promoteur Immobilier Haut de Gamme',
        challenge:
          'Positionner un programme résidentiel et diplomatique d’exception auprès d’investisseurs institutionnels et de la diaspora internationale avec une crédibilité immédiate.',
        architectureAndDa:
          'Direction Artistique Executive (Or Souverain & Obsidienne), Brand Book complet, signalétique architecturale et portail digital doté d’une data-room sécurisée multi-devises (XOF/EUR/USD).',
        roiImpact:
          '100 % des lots de la tranche 1 réservés en 11 semaines et +180 % de demandes qualifiées issues de la diaspora.',
        metrics: [
          { label: 'Tranche 1 Réservée', value: '100 %' },
          { label: 'Leads Diaspora Qualifiés', value: '+180 %' },
          { label: 'Cycle de Décision', value: '11 sem.' },
        ],
        stack: ['Brand Book 360°', 'Design Tokens W3C', 'Next.js 15', 'Data-Room Chiffrée'],
        deliverables: [
          'Identité visuelle complète, monographie imprimée & charte signalétique',
          'Portail d’investissement multi-devises (XOF, EUR, USD)',
          'Qualification automatisée des dossiers investisseurs',
        ],
      },
      {
        id: 'agro-industrie-export',
        pole: 'GROWTH',
        poleLabel: 'Pôle 4 · Growth, Paid Media & Visibilité',
        title: 'Ivoire Origin — Acquisition B2B Internationale & Tracking Server-Side CAPI',
        sector: 'Agro-Industrie & Exportation Certifiée (Cacao / Cajou)',
        location: 'San-Pédro · Abidjan · Rotterdam',
        clientType: 'Groupe Agro-Industriel Exportateur',
        challenge:
          'Générer un flux prévisible de contrats d’approvisionnement B2B en Europe et en Amérique du Nord tout en respectant la traçabilité EUDR et le Consent Mode v2.',
        architectureAndDa:
          'Déploiement d’une infrastructure de tracking Server-Side (GTM Server + CAPI), optimisation SEO/GEO multilingue et campagnes LinkedIn/Search ciblant les acheteurs industriels.',
        roiImpact:
          'Coût d’acquisition (CAC) réduit de 42 %, 38 nouveaux comptes importateurs qualifiés en un trimestre et conformité RGPD/ARTCI à 100 %.',
        metrics: [
          { label: 'Réduction du CAC B2B', value: '-42 %' },
          { label: 'Comptes Importateurs', value: '+38' },
          { label: 'Conformité CMP v2', value: '100 %' },
        ],
        stack: ['Server-Side CAPI', 'Consent Mode v2', 'SEO / GEO B2B', 'Automatisation n8n'],
        deliverables: [
          'Architecture GTM Server-Side & gouvernance des consentements ARTCI/RGPD',
          'Pipeline automatisé d’enrichissement et routage CRM via n8n',
          'Tableau de bord exécutif du pipeline commercial multi-devises',
        ],
      },
      {
        id: 'saas-logistique-corridor',
        pole: 'WEB',
        poleLabel: 'Pôle 2 · Développement Web Haute Performance',
        title: 'CorridorFlow — Plateforme SaaS de Gestion de Flotte & Douane Automatisée par IA',
        sector: 'Logistique Portuaire & Transport Corridor',
        location: 'Port d’Abidjan · Ouagadougou · Tema',
        clientType: 'Opérateur Logistique Régional',
        challenge:
          'Digitaliser le suivi de 850 camions et l’extraction des manifestes douaniers qui ralentissaient le passage portuaire et la facturation B2B.',
        architectureAndDa:
          'Plateforme Web SaaS haute performance (LCP 1.1s) couplée à un moteur d’extraction documentaire Gemini Structured Output et des workflows d’alerte n8n.',
        roiImpact:
          'Temps de traitement documentaire divisé par 5, réduction de 39 % des immobilisations au corridor et adoption par 140 transitaires partenaires.',
        metrics: [
          { label: 'Traitement Douanier', value: '÷ 5' },
          { label: 'Immobilisations Flotte', value: '-39 %' },
          { label: 'LCP Plateforme', value: '1,1 s' },
        ],
        stack: ['React 19 / Next.js', 'Gemini Structured JSON', 'n8n Workflows', 'Supabase RLS'],
        deliverables: [
          'Portail Web SaaS temps réel multi-rôles avec isolation RLS',
          'Agent IA d’extraction et validation de manifestes douaniers',
          'Facturation multi-devises automatisée (XOF / EUR / USD)',
        ],
      },
    ] as CaseStudyItem[],
  },
  configurator: {
    sectionKicker: '04. Configurateur de Brief & Estimateur Budgétaire',
    title: 'Calibrez Votre Projet & Obtenez Votre Estimation Contractuelle.',
    subtitle:
      'Sélectionnez vos Pôles d’intervention et options transverses. Les fourchettes et l’échéancier 40 % / 30 % / 30 % se calculent en temps réel dans votre devise.',
    aiPrefillBanner:
      'Diagnostic du Concierge IA appliqué avec succès. Vos Pôles, options et synthèse ont été pré-remplis.',
    steps: [
      { num: '01', label: 'Pôles d’Expertise' },
      { num: '02', label: 'Moteurs & Urgence' },
      { num: '03', label: 'Estimation & Échéancier' },
      { num: '04', label: 'Validation Décisionnaire' },
    ],
    step1: {
      title: 'Étape 1 — Sélectionnez un ou plusieurs Pôles d’intervention',
      hint: 'Une remise automatique de -10 % (Synergie Multi-Pôles) est appliquée dès 2 Pôles sélectionnés simultanément.',
      multiPoleBadge: 'Remise Synergie Multi-Pôles (-10 %) active',
    },
    step2: {
      title: 'Étape 2 — Moteurs Transverses & Cadence de Mobilisation',
      subtitle:
        'Activez nos moteurs d’autorité transverses ou la mobilisation accélérée d’une Guilde Élastique sous 48h.',
      urgencyTitle: 'Cadence de Mobilisation',
      standardLabel: 'Standard — Planification Classique (0 %)',
      standardDesc: 'Démarrage séquentiel selon le calendrier habituel des pôles sélectionnés.',
      fastTrackLabel: 'Fast-Track Guilde Élastique 48h (+15 %)',
      fastTrackDesc:
        'Mobilisation prioritaire d’une guilde senior dédiée sous 48 heures ouvrées avec compression des délais de 25 %.',
    },
    step3: {
      title: 'Étape 3 — Synthèse Budgétaire & Échéancier Contractuel (40 / 30 / 30)',
      currencySwitchLabel: 'Devise d’affichage et de facturation :',
      totalRangeTitle: 'Fourchette d’Investissement Estimée (HT)',
      timelineTitle: 'Délai de Réalisation Estimé',
      baseSumLabel: 'Somme de base des Pôles sélectionnés',
      multiPoleDiscountLabel: 'Remise Synergie Multi-Pôles (-10 %)',
      modifiersAppliedLabel: 'Modificateurs Transverses & Urgence',
      scheduleTitle: 'Décomposition Contractuelle des Paiements (40 % / 30 % / 30 %)',
      milestone1Title: 'Tranche 1 · 40 % à la Signature',
      milestone1Desc: 'Ouverture du dossier, mobilisation du Core et démarrage du cadrage.',
      milestone2Title: 'Tranche 2 · 30 % Validation Design & Architecture',
      milestone2Desc: 'Après validation officielle des maquettes et des spécifications.',
      milestone3Title: 'Tranche 3 · 30 % Recette Finale & Cession PI',
      milestone3Desc: 'À la mise en production et remise intégrale des accès et du code source.',
      governanceNote:
        'Garantie contractuelle : Propriété 100 % client, validation par jalon sous 5 jours ouvrés et confidentialité Zero-Data Retention.',
    },
    step4: {
      title: 'Étape 4 — Coordonnées du Décisionnaire & Transmission du Brief',
      fullNameLabel: 'Nom complet & Fonction *',
      fullNamePlaceholder: 'Ex: Marc-Arthur Konan — Directeur Général',
      companyLabel: 'Entreprise / Institution *',
      companyPlaceholder: 'Ex: Kauri Financial Group',
      emailLabel: 'Email professionnel *',
      emailPlaceholder: 'm.konan@entreprise.ci',
      phoneLabel: 'Téléphone (Format international E.164) *',
      phonePlaceholder: '+2250700000000 ou +33600000000',
      phoneHint: 'Format E.164 requis : signe + suivi de l’indicatif pays et du numéro sans espaces.',
      summaryLabel: 'Synthèse du besoin & Objectifs métier *',
      summaryPlaceholder:
        'Décrivez votre contexte, vos objectifs prioritaires et vos contraintes de calendrier...',
      consentLabel:
        'J’accepte que ces informations soient traitées par Ouest Dynamics dans le strict cadre de l’étude de ce brief, conformément à la Loi n°2013-450 (ARTCI Côte d’Ivoire), au RGPD et à la politique Zero-Data Retention. *',
      submitBtn: 'Transmettre mon Brief Officiel',
      submittingBtn: 'Chiffrement & Enregistrement du Brief...',
      errors: {
        poles: 'Veuillez sélectionner au moins un Pôle d’expertise.',
        fullName: 'Veuillez indiquer votre nom complet (min. 2 caractères).',
        company: 'Veuillez indiquer le nom de votre organisation (min. 2 caractères).',
        email: 'Veuillez saisir une adresse email professionnelle valide.',
        phone:
          'Veuillez saisir un numéro au format international E.164 valide (ex: +2250708091011 ou +33612345678).',
        summary: 'Veuillez détailler votre besoin (minimum 15 caractères).',
        consent: 'Vous devez valider la clause de conformité ARTCI / RGPD pour transmettre le brief.',
      },
      confirmation: {
        badge: 'DOSSIER ENREGISTRÉ · ARCHITECTURE SOUVERAINE',
        title: 'Votre Brief Exécutif a été enregistré avec succès.',
        subtitle:
          'Un Associé Directeur d’Ouest Dynamics examine votre configuration et vous transmettra votre proposition contractuelle sous 24 heures ouvrées.',
        referenceLabel: 'Référence Officielle du Dossier',
        summaryTitle: 'Récapitulatif de la Configuration',
        newBriefBtn: 'Configurer un nouveau brief',
      },
    },
    navButtons: {
      prev: 'Étape précédente',
      next: 'Continuer vers l’étape suivante',
    },
  },
  concierge: {
    drawerTitle: 'Concierge Exécutif IA',
    drawerSubtitle: 'Qualification structurée en 2–3 échanges · Gemini Structured Output (ZDR)',
    welcomeMessage:
      'Bienvenue chez Ouest Dynamics. Je suis votre Concierge Exécutif IA. Décrivez-moi votre projet en quelques mots (secteur, objectifs, délais) : je cartographierai les Pôles requis et pré-remplirai votre Configurateur de Brief.',
    inputPlaceholder:
      'Ex : Nous lançons une fintech à Abidjan et cherchons une identité de marque, une app mobile iOS/Android et une landing page...',
    sendBtn: 'Analyser',
    thinkingLabel: 'Analyse architecturale & cartographie des Pôles en cours...',
    promptsTitle: 'Exemples de diagnostics rapides :',
    samplePrompts: [
      'Nous lançons une fintech à Abidjan : il nous faut une identité de marque, une app mobile iOS/Android et une landing page.',
      'Nous voulons refondre notre site e-commerce B2B en EUR/XOF avec agents IA et tracking Server-Side CAPI en urgence 48h.',
      'Création d’un Brand Book prestige et d’un portail web institutionnel pour un groupe immobilier à Abidjan.',
    ],
    diagnosticCardTitle: 'Diagnostic Structuré du Concierge IA',
    qualificationReadyBadge: 'Qualification Complète',
    qualificationInProgressBadge: 'Qualification en cours',
    recommendedPolesLabel: 'Pôles recommandés :',
    recommendedModifiersLabel: 'Moteurs transverses :',
    urgencyLabel: 'Cadence suggérée :',
    currencyLabel: 'Devise détectée :',
    summaryLabel: 'Synthèse prête pour le Configurateur :',
    followUpLabel: 'Question de précision :',
    applyButton: 'Appliquer ce diagnostic au Configurateur',
    zdrNotice:
      'Politique Zero-Data Retention (ARTCI / RGPD) : Aucune donnée de cet échange n’est utilisée pour entraîner des modèles tiers. Les estimations officielles sont calculées dans le Configurateur.',
  },
  legal: {
    backToPlatform: 'Retour à la plateforme principale',
    portalKicker: 'Portail Juridique & Conformité Réglementaire Unifié',
    portalTitle: 'Gouvernance Légale, Protection des Données & Conditions Contractuelles.',
    portalSubtitle:
      'Conformité stricte à la Loi ivoirienne n°2013-450 (ARTCI), au Règlement Général sur la Protection des Données (RGPD UE 2016/679) et aux standards internationaux de propriété intellectuelle.',
    tabs: {
      privacy: 'Politique de Confidentialité (ARTCI & RGPD)',
      terms: 'Conditions Générales (CGV / CGU)',
      notices: 'Mentions Légales & Éditeur',
    },
    privacy: {
      title: 'Politique de Confidentialité & Protection des Données Personnelles',
      effectiveDate: 'Entrée en vigueur : Janvier 2026 · Référentiel ARTCI & RGPD',
      sections: [
        {
          heading: '1. Cadre Légal Dual : ARTCI (Côte d’Ivoire) & RGPD (Union Européenne)',
          body: 'Ouest Dynamics traite l’ensemble des données personnelles et professionnelles dans le strict respect de la Loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en République de Côte d’Ivoire (sous le contrôle de l’ARTCI) ainsi que du Règlement (UE) 2016/679 (RGPD) pour ses clients et visiteurs internationaux.',
        },
        {
          heading: '2. Minimisation des Données (PII) & Finalités Exclusives',
          body: 'Nous collectons uniquement les données strictement nécessaires à l’établissement de votre brief B2B et à la gestion contractuelle : identité du décisionnaire, entité juridique, adresse email professionnelle, numéro de téléphone au format E.164 et synthèse du besoin. Ces données ne font l’objet d’aucune revente, location ou cession à des courtiers publicitaires.',
        },
        {
          heading: '3. Gouvernance IA & Politique Zero-Data Retention (ZDR)',
          body: 'Les requêtes soumises au Concierge Exécutif IA transitent exclusivement par notre proxy serveur sécurisé avec isolation stricte du contexte. Conformément à notre politique Zero-Data Retention, aucun prompt ni secret d’affaires n’est conservé pour l’entraînement de modèles de langage publics.',
        },
        {
          heading: '4. Conservation, Sécurité & Exercice de vos Droits',
          body: 'Les dossiers de consultation sont chiffrés et conservés pour une durée maximale de 24 mois en l’absence de contractualisation. Vous disposez à tout moment d’un droit d’accès, de rectification, de portabilité et d’effacement immédiat sur simple demande adressée à notre Délégué à la Protection des Données (dpo@ouestdynamics.com).',
        },
      ],
    },
    terms: {
      title: 'Conditions Générales de Vente et d’Utilisation (CGV / CGU)',
      effectiveDate: 'Version Contractuelle V2.0 · Droit OHADA & International',
      sections: [
        {
          heading: '1. Indépendance Souveraine des Actifs Clients',
          body: 'Ouest Dynamics garantit que l’ensemble des actifs d’infrastructure critiques — noms de domaine, comptes d’hébergement Cloud/Supabase, comptes Apple Developer, Google Play Console et gestionnaires publicitaires (Meta/Google/TikTok Business Manager) — sont enregistrés directement au nom du Client. Ouest Dynamics n’exerce aucune rétention technique captive.',
        },
        {
          heading: '2. Échéancier Financier Contractuel (40 % / 30 % / 30 %)',
          body: 'Sauf stipulation particulière au contrat d’application, tout projet est régi par l’échéancier suivant : 40 % d’acompte à la signature pour mobiliser le Core et lancer l’étude ; 30 % à la validation officielle du jalon Direction Artistique & Architecture ; 30 % à la recette finale et mise en production.',
        },
        {
          heading: '3. Mécanisme de Validation par Jalon sous 5 Jours Ouvrés',
          body: 'À la livraison de chaque jalon (Brand Book, maquettes Figma, prototype fonctionnel ou recette), le Client dispose de cinq (5) jours ouvrés pour notifier ses observations consolidées. Passé ce délai sans retour écrit, le jalon est réputé validé tacitement afin de préserver l’intégrité du calendrier de déploiement.',
        },
        {
          heading: '4. Cession Intégrale de Propriété Intellectuelle',
          body: 'Sous réserve du complet paiement du prix convenu (100 % des 3 jalons), Ouest Dynamics cède au Client, à titre exclusif, mondial et définitif, l’intégralité des droits patrimoniaux sur le code source spécifique, les livrables graphiques, les Design Tokens et la documentation technique.',
        },
      ],
    },
    notices: {
      title: 'Mentions Légales & Informations Institutionnelles',
      effectiveDate: 'Siège Social : Abidjan, République de Côte d’Ivoire',
      sections: [
        {
          heading: '1. Éditeur de la Plateforme',
          body: 'Ouest Dynamics — Agence d’Architecture Digitale Souveraine, de Direction Artistique Executive et d’Ingénierie IA 360°. Siège d’exploitation : Abidjan, Cocody, République de Côte d’Ivoire. Opérations : Zone UEMOA, Afrique de l’Ouest, Europe & Amérique du Nord.',
        },
        {
          heading: '2. Direction de la Publication & Contact Officiel',
          body: 'Direction Exécutive Ouest Dynamics. Contact officiel : direction@ouestdynamics.com · Protection des données (DPO / ARTCI) : dpo@ouestdynamics.com.',
        },
        {
          heading: '3. Architecture Technique & Crédits',
          body: 'Plateforme conçue selon le système de design « Architecture Digitale Souveraine » (design-tokens.json W3C), propulsée par React 19, TypeScript strict, Tailwind CSS et l’infrastructure serveur Gemini Structured Output.',
        },
      ],
    },
  },
  cookies: {
    title: 'Gouvernance des Consentements (ARTCI & RGPD — Consent Mode v2)',
    description:
      'Nous appliquons le standard Google Consent Mode v2 et la Loi n°2013-450 (ARTCI). Choisissez librement les catégories autorisées. Un reçu d’audit horodaté est généré localement.',
    acceptAll: 'Tout autoriser',
    essentialOnly: 'Essentiels uniquement',
    customize: 'Personnaliser',
    saveChoices: 'Enregistrer ma sélection',
    auditReceiptPrefix: 'Preuve de consentement horodatée :',
    categories: {
      essential: {
        label: 'Cookies Essentiels & Sécurité (Obligatoires)',
        desc: 'Mémorisation de la langue (FR/EN), de la devise (XOF/EUR/USD) et intégrité du Configurateur.',
      },
      analytics: {
        label: 'Mesure d’Audience Anonymisée (Analytics)',
        desc: 'Métriques de performance Core Web Vitals (LCP, INP, CLS) sans profilage individuel.',
      },
      marketing: {
        label: 'Attribution & Paid Media (Consent Mode v2)',
        desc: 'Signaux d’attribution Server-Side CAPI (désactivés par défaut sans accord explicite).',
      },
      aiConcierge: {
        label: 'Contexte de Session Concierge IA (ZDR)',
        desc: 'Maintien temporaire du diagnostic IA durant votre session pour pré-remplir le brief.',
      },
    },
  },
  footer: {
    tagline:
      'Agence digitale et d’ingénierie IA 360° basée à Abidjan (Côte d’Ivoire) opérant en Afrique de l’Ouest et à l’international. Modèle Core & Elastic Guilds.',
    navigationTitle: 'Architecture',
    legalTitle: 'Portail Juridique Unifié',
    governanceTitle: 'Engagements Souverains',
    governanceBullets: [
      '100 % Propriété Client & Cession PI',
      'Validation par jalon sous 5 jours ouvrés',
      'Échéancier 40 % / 30 % / 30 %',
      'Conformité ARTCI (CI) & RGPD (UE)',
    ],
    manageCookies: 'Gérer mes préférences cookies (CMP v2)',
    copyright: '© 2026 Ouest Dynamics. Tous droits réservés. Architecture Digitale Souveraine.',
  },
};

export type Dictionary = typeof fr;
