import { PoleId, TransverseModifierId } from '../utils/pricingEngine';

export interface CaseStudy {
  id: string;
  pole: PoleId;
  client: string;
  sector: string;
  city: string;
  metric: { value: string; label: string };
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  figures: { value: string; label: string }[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export const fr = {
  nav: {
    work: 'Projets',
    process: 'Approche',
    estimate: 'Configurer',
    concierge: 'Assistant',
    start: 'Démarrer',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    language: 'Langue',
    home: 'Ouest Dynamics, retour en haut',
  },

  hero: {
    clock: (time: string) => `Abidjan, ${time}`,
    title: 'Design de marque, ingénierie web et IA sur mesure.',
    subtitle:
      'Un studio senior indépendant. Des tarifs transparents, une exécution directe, et l’entière propriété de vos actifs à la livraison.',
    primary: 'Configurer un projet',
    secondary: 'Décrire votre besoin à l’IA',
  },

  services: {
    title: 'Composez votre projet.',
    intro: 'Sélectionnez les expertises nécessaires pour obtenir une estimation immédiate.',
    from: (price: string) => `dès ${price}`,
    currency: 'Devise',
    items: [
      {
        id: 'BRANDING' as PoleId,
        name: 'Identité de marque',
        line: 'Positionnement, système visuel et Brand Book.',
      },
      {
        id: 'WEB' as PoleId,
        name: 'Web & Plateformes',
        line: 'Sites sur mesure, e-commerce et applications SaaS.',
      },
      {
        id: 'MOBILE_DESKTOP' as PoleId,
        name: 'Apps Mobile & Desktop',
        line: 'iOS, Android et logiciels terrain hors-ligne.',
      },
      {
        id: 'GROWTH' as PoleId,
        name: 'Acquisition & Data',
        line: 'Paid Media, SEO/GEO et tracking Server-Side.',
      },
    ],
  },

  options: {
    items: [
      {
        id: 'TRANSVERSE_DA' as TransverseModifierId,
        name: 'Direction artistique',
        line: 'Design system W3C et prototypes haute fidélité.',
        rate: '+20 %',
      },
      {
        id: 'TRANSVERSE_AI' as TransverseModifierId,
        name: 'Ingénierie IA & n8n',
        line: 'Agents qualificateurs et automatisations métier.',
        rate: '+25 %',
      },
    ],
    fastTrack: {
      name: 'Mobilisation 48h',
      line: 'Démarrage prioritaire, délais réduits de 25 %.',
      rate: '+15 %',
    },
  },

  work: {
    title: 'Travaux choisis.',
    intro: 'Quatre réalisations récentes en Afrique de l’Ouest et à l’international.',
    read: 'Dossier',
    similar: 'Estimer un projet similaire',
    challenge: 'Contexte',
    solution: 'Architecture déployée',
    result: 'Impact mesuré',
    close: 'Fermer',
    cases: [
      {
        id: 'fintech-uemoa',
        pole: 'MOBILE_DESKTOP',
        client: 'Kauri Settlement',
        sector: 'Paiement mobile',
        city: 'Abidjan & Dakar',
        metric: { value: '+215 %', label: 'volume en 6 mois' },
        summary: 'Application d’encaissement marchand conçue pour fonctionner sans interruption réseau.',
        challenge:
          'Les commerçants perdaient des ventes lors des coupures réseau et effectuaient le rapprochement bancaire manuellement.',
        solution:
          'Application iOS/Android et terminal Desktop avec file de transactions chiffrée hors-ligne et synchronisation automatique.',
        result:
          'Volume de transactions multiplié par trois en six mois et temps d’onboarding réduit de 64 %.',
        figures: [
          { value: '+215 %', label: 'transactions' },
          { value: '99,98 %', label: 'disponibilité' },
          { value: '−64 %', label: 'onboarding' },
        ],
      },
      {
        id: 'immobilier-riviera',
        pole: 'BRANDING',
        client: 'Riviera Souveraine',
        sector: 'Immobilier',
        city: 'Abidjan',
        metric: { value: '100 %', label: 'vendu en 11 semaines' },
        summary: 'Identité institutionnelle et portail d’investissement multi-devises pour la diaspora.',
        challenge:
          'Convaincre des acquéreurs basés à Londres ou Dubaï sans visite physique préalable.',
        solution:
          'Direction artistique sobre, monographie imprimée et data-room immobilière en FCFA, euros et dollars.',
        result:
          'Commercialisation complète de la première tranche en onze semaines et demandes qualifiées quasi triplées.',
        figures: [
          { value: '100 %', label: 'tranche 1 vendue' },
          { value: '+180 %', label: 'demandes diaspora' },
          { value: '11 sem.', label: 'cycle de vente' },
        ],
      },
      {
        id: 'agro-export',
        pole: 'GROWTH',
        client: 'Ivoire Origin',
        sector: 'Agro-industrie',
        city: 'San-Pédro',
        metric: { value: '−42 %', label: 'coût d’acquisition' },
        summary: 'Infrastructure d’acquisition B2B vers les acheteurs européens et nord-américains.',
        challenge:
          'Forte dépendance aux intermédiaires et absence de mesure fiable des campagnes vers les contrats signés.',
        solution:
          'Tracking Server-Side conforme RGPD/ARTCI, SEO multilingue et campagnes ciblées vers les importateurs.',
        result:
          'Trente-huit nouveaux comptes importateurs signés sur le trimestre avec un coût d’acquisition abaissé de 42 %.',
        figures: [
          { value: '−42 %', label: 'coût client' },
          { value: '+38', label: 'importateurs' },
          { value: '100 %', label: 'conformité' },
        ],
      },
      {
        id: 'saas-logistique',
        pole: 'WEB',
        client: 'CorridorFlow',
        sector: 'Logistique',
        city: 'Abidjan & Ouagadougou',
        metric: { value: '5×', label: 'vitesse de dédouanement' },
        summary: 'Plateforme SaaS de suivi de 850 camions et lecture automatisée des manifestes.',
        challenge:
          'La saisie manuelle des documents portuaires bloquait la facturation et immobilisait les flottes.',
        solution:
          'Portail temps réel couplé à un extracteur IA structuré vérifiant automatiquement les manifestes douaniers.',
        result:
          'Traitement documentaire cinq fois plus rapide et immobilisation des camions réduite de 39 %.',
        figures: [
          { value: '5×', label: 'traitement' },
          { value: '−39 %', label: 'immobilisation' },
          { value: '140', label: 'transitaires' },
        ],
      },
    ] as CaseStudy[],
  },

  process: {
    title: 'Méthode directe.',
    steps: [
      {
        title: 'Cadrage',
        duration: 'Semaine 1',
        text: 'Alignement sur les objectifs, la direction créative et l’architecture avant la première ligne de code.',
      },
      {
        title: 'Production',
        duration: 'Sprints hebdomadaires',
        text: 'Équipe senior dédiée, accès continu à l’environnement de test et revues chaque semaine.',
      },
      {
        title: 'Transfert',
        duration: 'Livraison',
        text: 'Mise en production, formation de vos équipes et cession intégrale du code et des comptes.',
      },
    ],
    guaranteesToggle: 'Engagements contractuels',
    guarantees: [
      'Domaines, serveurs et comptes Stores ouverts exclusivement à votre nom.',
      'Cession complète du code source et des maquettes dès le solde réglé.',
      'Paiement jalonné : 40 % signature, 30 % validation maquettes, 30 % livraison.',
      'Conformité stricte ARTCI (Côte d’Ivoire), RGPD et Zero-Data Retention IA.',
    ],
  },

  estimate: {
    services: 'Expertises',
    options: 'Options',
    result: 'Estimation indicative',
    empty: 'Sélectionnez au moins une expertise ci-dessus.',
    duration: (min: number, max: number) => `${min} à ${max} jours ouvrés`,
    discount: 'Remise multi-expertises −10 % appliquée',
    schedule: '40 % signature · 30 % design · 30 % livraison',
    next: 'Finaliser la demande',
    prefilled: 'Pré-rempli par l’assistant IA. Modifiable à tout moment.',
    contact: {
      title: 'Vos coordonnées',
      intro: 'Réponse et proposition détaillée sous 24 heures ouvrées.',
      back: 'Modifier la sélection',
      name: 'Nom complet',
      namePh: 'Awa Koné',
      company: 'Entreprise',
      companyPh: 'Organisation',
      email: 'Email professionnel',
      emailPh: 'awa@entreprise.ci',
      phone: 'Téléphone',
      phonePh: '+2250700000000',
      phoneHint: 'Format international avec indicatif (ex. +2250700000000).',
      message: 'Contexte du projet',
      messagePh: 'Objectifs, contraintes, calendrier souhaité…',
      consentBefore: 'J’accepte le traitement de ces données selon la ',
      consentLink: 'politique de confidentialité',
      consentAfter: '.',
      submit: 'Transmettre le brief',
      submitting: 'Envoi…',
      errors: {
        name: 'Indiquez votre nom complet.',
        company: 'Indiquez votre entreprise.',
        email: 'Adresse email invalide.',
        phone: 'Format international requis (ex. +2250700000000).',
        message: 'Décrivez votre projet en 15 caractères minimum.',
        consent: 'Validation requise pour envoyer.',
        network: 'Erreur réseau. Vérifiez votre connexion et réessayez.',
        rateLimit: 'Trop de tentatives. Patientez quelques minutes.',
        server: 'Envoi refusé. Vérifiez vos informations.',
      },
    },
    done: {
      title: (name: string) => (name ? `Merci, ${name}.` : 'Brief enregistré.'),
      text: 'Un associé examine votre configuration et vous répond sous 24 heures ouvrées.',
      reference: 'Référence',
      again: 'Nouvelle estimation',
    },
  },

  concierge: {
    open: 'Assistant IA',
    title: 'Assistant de cadrage',
    intro:
      'Décrivez votre projet librement : secteur, objectif, délai. L’assistant identifie les expertises et pré-remplit le configurateur.',
    placeholder: 'Ex : plateforme de paiement B2B à Abidjan avec app mobile…',
    send: 'Envoyer',
    thinking: 'Analyse en cours…',
    examplesTitle: 'Exemples',
    examples: [
      'Lancement d’une fintech à Abidjan : identité de marque, app iOS/Android et site.',
      'Refonte d’un e-commerce en FCFA/EUR avec automatisation IA sous 48h.',
      'Brand Book et portail immobilier pour la diaspora.',
    ],
    resultTitle: 'Diagnostic proposé',
    servicesLabel: 'Expertises',
    optionsLabel: 'Options',
    followUp: 'Précision',
    apply: 'Appliquer au configurateur',
    unavailable: 'L’assistant est temporairement indisponible.',
    estimateDirect: 'Configurer manuellement',
    privacy: 'Politique Zero-Data Retention (ARTCI / RGPD).',
    close: 'Fermer',
    you: 'Vous',
  },

  legal: {
    title: 'Informations légales',
    close: 'Retour au studio',
    tabs: {
      privacy: 'Confidentialité',
      terms: 'Conditions',
      notices: 'Mentions légales',
    },
    privacy: {
      title: 'Politique de confidentialité',
      updated: 'Janvier 2026 · ARTCI & RGPD',
      sections: [
        {
          heading: 'Cadre légal',
          body: 'Ouest Dynamics traite vos données conformément à la loi ivoirienne n°2013-450 (ARTCI) et au Règlement (UE) 2016/679 (RGPD).',
        },
        {
          heading: 'Données collectées',
          body: 'Uniquement les informations nécessaires à l’étude de votre brief : identité, entreprise, email, téléphone et synthèse projet. Aucune cession ni revente.',
        },
        {
          heading: 'Assistant IA',
          body: 'Les échanges transitent par notre proxy serveur sous politique Zero-Data Retention et ne servent jamais à entraîner des modèles tiers.',
        },
        {
          heading: 'Droits et conservation',
          body: 'Conservation maximale de 24 mois sans contractualisation. Demandes d’accès ou d’effacement : dpo@ouestdynamics.com.',
        },
      ],
    } as LegalDoc,
    terms: {
      title: 'Conditions générales',
      updated: 'Version 2.0 · Droit OHADA',
      sections: [
        {
          heading: 'Indépendance des actifs',
          body: 'Domaines, hébergements Cloud, comptes Apple/Google et Business Managers sont ouverts directement au nom du client.',
        },
        {
          heading: 'Échéancier 40 / 30 / 30',
          body: '40 % à la signature, 30 % à la validation design/architecture, 30 % à la recette finale.',
        },
        {
          heading: 'Validation sous 5 jours',
          body: 'Chaque jalon livré dispose de 5 jours ouvrés de revue. Sans retour écrit passé ce délai, le jalon est réputé validé.',
        },
        {
          heading: 'Propriété intellectuelle',
          body: 'Cession intégrale et exclusive des droits patrimoniaux sur le code et les créations après complet paiement.',
        },
      ],
    } as LegalDoc,
    notices: {
      title: 'Mentions légales',
      updated: 'Abidjan, Côte d’Ivoire',
      sections: [
        {
          heading: 'Éditeur',
          body: 'Ouest Dynamics — Studio d’architecture digitale et d’ingénierie IA. Cocody, Abidjan, Côte d’Ivoire.',
        },
        {
          heading: 'Contact',
          body: 'Direction : direction@ouestdynamics.com · DPO : dpo@ouestdynamics.com.',
        },
      ],
    } as LegalDoc,
  },

  cookies: {
    text: 'Cookies de mesure d’audience uniquement avec votre accord.',
    accept: 'Accepter',
    refuse: 'Refuser',
    customize: 'Options',
    save: 'Enregistrer',
    policy: 'Confidentialité',
    essential: {
      label: 'Essentiels',
      desc: 'Langue et devise actives.',
    },
    analytics: {
      label: 'Audience',
      desc: 'Mesure anonyme de performance.',
    },
    marketing: {
      label: 'Attribution',
      desc: 'Suivi publicitaire (désactivé par défaut).',
    },
  },

  footer: {
    place: 'Ouest Dynamics · Abidjan',
    email: 'direction@ouestdynamics.com',
    cookies: 'Cookies',
  },
};

export type Dictionary = typeof fr;
