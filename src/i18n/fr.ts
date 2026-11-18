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
    services: 'Services',
    work: 'Projets',
    process: 'Méthode',
    estimate: 'Estimation',
    start: 'Démarrer un projet',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    language: 'Langue',
    home: 'Ouest Dynamics, retour en haut de page',
  },

  hero: {
    clock: (time: string) => `Il est ${time} à Abidjan`,
    title: 'Marques, sites et applications. Conçus à Abidjan.',
    subtitle:
      'Pour les entreprises d’Afrique de l’Ouest et celles qui veulent y grandir. Une équipe senior, des prix annoncés à l’avance, et tout vous appartient à la livraison.',
    primary: 'Estimer mon projet',
    secondary: 'Décrire mon projet à l’assistant',
  },

  services: {
    title: 'Quatre métiers, une seule équipe.',
    intro: 'Sélectionnez ce dont vous avez besoin. L’estimation se met à jour plus bas.',
    from: (price: string) => `dès ${price}`,
    currency: 'Prix en',
    seeEstimate: (n: number) =>
      n > 1 ? `Voir l’estimation pour ${n} services` : 'Voir l’estimation',
    items: [
      {
        id: 'BRANDING' as PoleId,
        name: 'Identité de marque',
        line: 'Nom, logo, charte graphique et supports : ce qui rend votre entreprise reconnaissable.',
      },
      {
        id: 'WEB' as PoleId,
        name: 'Sites et plateformes',
        line: 'Sites vitrines, boutiques en ligne et plateformes sur mesure, rapides et simples à gérer.',
      },
      {
        id: 'MOBILE_DESKTOP' as PoleId,
        name: 'Applications',
        line: 'Applications iOS, Android et ordinateur qui continuent de fonctionner quand le réseau coupe.',
      },
      {
        id: 'GROWTH' as PoleId,
        name: 'Croissance',
        line: 'Publicité en ligne, référencement et suivi des résultats, du premier clic jusqu’à la vente.',
      },
    ],
  },

  options: {
    items: [
      {
        id: 'TRANSVERSE_DA' as TransverseModifierId,
        name: 'Direction artistique dédiée',
        line: 'Un directeur artistique senior veille à la cohérence de chaque écran et de chaque support.',
        rate: '+20\u00A0%',
      },
      {
        id: 'TRANSVERSE_AI' as TransverseModifierId,
        name: 'Intelligence artificielle',
        line: 'Assistants et automatisations branchés sur vos outils existants.',
        rate: '+25\u00A0%',
      },
    ],
    fastTrack: {
      name: 'Démarrage sous 48 heures',
      line: 'Une équipe mobilisée en deux jours et des délais réduits d’environ un quart.',
      rate: '+15\u00A0%',
    },
  },

  work: {
    title: 'Projets récents.',
    intro: 'Quatre projets, quatre résultats mesurés.',
    read: 'Lire le projet',
    similar: 'Estimer un projet similaire',
    challenge: 'Le besoin',
    solution: 'Ce que nous avons fait',
    result: 'Le résultat',
    close: 'Fermer',
    cases: [
      {
        id: 'fintech-uemoa',
        pole: 'MOBILE_DESKTOP',
        client: 'Kauri Settlement',
        sector: 'Paiement mobile',
        city: 'Abidjan et Dakar',
        metric: { value: '+215\u00A0%', label: 'de transactions en six mois' },
        summary:
          'Une application d’encaissement pour commerçants qui continue de fonctionner quand le réseau coupe.',
        challenge:
          'Les commerçants perdaient des ventes à chaque coupure de réseau, et le rapprochement bancaire se faisait à la main.',
        solution:
          'Une application mobile et une caisse sur ordinateur qui enregistrent les paiements hors connexion, puis les synchronisent dès que le réseau revient.',
        result:
          'Le volume de transactions a triplé en six mois et l’inscription d’un nouveau commerçant prend deux fois moins de temps.',
        figures: [
          { value: '+215\u00A0%', label: 'de transactions' },
          { value: '99,98\u00A0%', label: 'de disponibilité' },
          { value: '−64\u00A0%', label: 'de temps d’inscription' },
        ],
      },
      {
        id: 'immobilier-riviera',
        pole: 'BRANDING',
        client: 'Riviera Souveraine',
        sector: 'Immobilier résidentiel',
        city: 'Abidjan',
        metric: { value: '100\u00A0%', label: 'des lots vendus en 11 semaines' },
        summary:
          'L’identité et le site d’un programme résidentiel haut de gamme, pensés pour les acheteurs de la diaspora.',
        challenge:
          'Un programme neuf devait inspirer confiance à des acheteurs vivant à Londres ou à Dubaï, sans visite préalable.',
        solution:
          'Une identité visuelle complète, une signalétique de chantier et un site présentant les lots et les prix en francs CFA, euros et dollars.',
        result:
          'La première tranche s’est vendue en onze semaines et les demandes venues de la diaspora ont presque triplé.',
        figures: [
          { value: '100\u00A0%', label: 'de la tranche 1 vendue' },
          { value: '+180\u00A0%', label: 'de demandes diaspora' },
          { value: '11', label: 'semaines' },
        ],
      },
      {
        id: 'agro-export',
        pole: 'GROWTH',
        client: 'Ivoire Origin',
        sector: 'Export de cacao et de cajou',
        city: 'San-Pédro',
        metric: { value: '−42\u00A0%', label: 'de coût par nouveau client' },
        summary:
          'Une stratégie d’acquisition pour trouver des acheteurs professionnels en Europe et en Amérique du Nord.',
        challenge:
          'L’exportateur dépendait de quelques intermédiaires et ne savait pas quelles campagnes produisaient de vrais contrats.',
        solution:
          'Un suivi précis des conversions, un site traduit et optimisé pour la recherche, et des campagnes ciblant les acheteurs industriels.',
        result:
          'Trente-huit nouveaux importateurs en un trimestre, pour un coût d’acquisition réduit de 42 %.',
        figures: [
          { value: '−42\u00A0%', label: 'de coût d’acquisition' },
          { value: '+38', label: 'importateurs' },
          { value: '1', label: 'trimestre' },
        ],
      },
      {
        id: 'saas-logistique',
        pole: 'WEB',
        client: 'CorridorFlow',
        sector: 'Transport et logistique',
        city: 'Abidjan et Ouagadougou',
        metric: { value: '÷5', label: 'sur le traitement des documents de douane' },
        summary:
          'Une plateforme web qui suit 850 camions et lit automatiquement les documents de douane.',
        challenge:
          'La saisie manuelle des manifestes ralentissait le passage au port et retardait la facturation.',
        solution:
          'Une plateforme de suivi de flotte en temps réel, avec un assistant qui extrait et vérifie les données des documents douaniers.',
        result:
          'Les documents sont traités cinq fois plus vite et les camions restent 39 % moins longtemps immobilisés.',
        figures: [
          { value: '÷5', label: 'de temps de traitement' },
          { value: '−39\u00A0%', label: 'd’immobilisation' },
          { value: '140', label: 'transitaires équipés' },
        ],
      },
    ] as CaseStudy[],
  },

  process: {
    title: 'Comment nous travaillons.',
    steps: [
      {
        title: 'Cadrage',
        duration: 'Première semaine',
        text: 'Nous clarifions vos objectifs, votre budget et la direction créative. Rien n’est produit avant votre accord.',
      },
      {
        title: 'Production',
        duration: 'Selon le projet',
        text: 'Une équipe senior réunie en 48 heures, un point chaque semaine et une version de test que vous suivez en direct.',
      },
      {
        title: 'Livraison',
        duration: 'Dernière semaine',
        text: 'Mise en ligne, formation de vos équipes et remise de tous les accès, codes et fichiers.',
      },
    ],
    guaranteesTitle: 'Écrit dans chaque contrat',
    guarantees: [
      'Noms de domaine, serveurs et comptes sont ouverts à votre nom.',
      'Le code et les fichiers vous appartiennent une fois le projet réglé.',
      'Paiement en trois fois : 40 % à la signature, 30 % aux maquettes, 30 % à la livraison.',
      'Vos données sont protégées selon la loi ivoirienne (ARTCI) et le RGPD.',
    ],
  },

  estimate: {
    title: 'Estimez votre projet.',
    intro: 'Un prix indicatif en quelques secondes, sans inscription.',
    services: 'Services',
    options: 'Options',
    currency: 'Devise',
    result: 'Votre estimation',
    empty: 'Choisissez au moins un service pour voir une estimation.',
    duration: (min: number, max: number) => `Livré en ${min} à ${max} jours ouvrés`,
    discount: 'Remise de 10 % incluse pour plusieurs services',
    schedule: 'Échéancier de paiement',
    milestones: ['À la signature, 40 %', 'Aux maquettes, 30 %', 'À la livraison, 30 %'],
    note: 'Hors taxes. Le prix final est confirmé après un premier échange.',
    next: 'Recevoir une proposition détaillée',
    prefilled: 'L’assistant a préparé cette estimation. Ajustez-la si besoin.',
    edit: 'Modifier',
    contact: {
      title: 'Où vous envoyer la proposition ?',
      intro: 'Nous répondons sous 24 heures ouvrées.',
      back: 'Modifier l’estimation',
      name: 'Nom et prénom',
      namePh: 'Awa Koné',
      company: 'Entreprise',
      companyPh: 'Nom de votre entreprise',
      email: 'E-mail',
      emailPh: 'awa@entreprise.ci',
      phone: 'Téléphone',
      phonePh: '+225 07 00 00 00 00',
      phoneHint: 'Avec l’indicatif du pays.',
      message: 'Votre projet en quelques lignes',
      messagePh: 'Objectifs, délais, ce qui existe déjà…',
      consentBefore: 'J’accepte qu’Ouest Dynamics utilise ces informations pour répondre à ma demande, selon sa ',
      consentLink: 'politique de confidentialité',
      consentAfter: '.',
      submit: 'Envoyer ma demande',
      submitting: 'Envoi en cours…',
      errors: {
        name: 'Indiquez votre nom.',
        company: 'Indiquez le nom de votre entreprise.',
        email: 'Cette adresse e-mail semble incomplète.',
        phone: 'Ajoutez l’indicatif du pays, par exemple +225 07 00 00 00 00.',
        message: 'Ajoutez quelques détails, 15 caractères au minimum.',
        consent: 'Cochez cette case pour envoyer votre demande.',
        network: 'La demande n’a pas pu être envoyée. Vérifiez votre connexion et réessayez.',
        rateLimit: 'Trop de demandes envoyées. Réessayez dans quelques minutes.',
        server: 'La demande a été refusée. Vérifiez les champs puis réessayez.',
      },
    },
    done: {
      title: (name: string) => (name ? `Merci, ${name}.` : 'Merci.'),
      text: 'Votre demande est bien arrivée. Nous vous répondons sous 24 heures ouvrées.',
      reference: 'Référence de votre demande',
      again: 'Faire une nouvelle estimation',
    },
  },

  concierge: {
    open: 'Décrire mon projet',
    title: 'Décrivez votre projet',
    intro:
      'Quelques phrases suffisent : votre secteur, ce que vous voulez construire, votre délai. L’assistant propose les services utiles et prépare votre estimation.',
    placeholder: 'Par exemple : une application de livraison à Abidjan, lancement en mars…',
    send: 'Envoyer',
    thinking: 'L’assistant réfléchit…',
    examplesTitle: 'Ou partez d’un exemple',
    examples: [
      'Nous lançons une fintech à Abidjan et avons besoin d’une marque, d’une application mobile et d’un site.',
      'Nous voulons refaire notre boutique en ligne avec paiement en francs CFA et en euros, au plus vite.',
      'Un logo et un site pour un groupe immobilier qui vend à la diaspora.',
    ],
    resultTitle: 'Proposition de l’assistant',
    servicesLabel: 'Services suggérés',
    optionsLabel: 'Options',
    followUp: 'Pour affiner',
    apply: 'Utiliser cette estimation',
    unavailable: 'L’assistant ne répond pas pour le moment.',
    estimateDirect: 'Estimer sans l’assistant',
    privacy: 'Vos messages ne servent pas à entraîner des modèles d’intelligence artificielle.',
    close: 'Fermer l’assistant',
    you: 'Vous',
  },

  legal: {
    title: 'Informations légales',
    close: 'Fermer',
    tabs: {
      privacy: 'Confidentialité',
      terms: 'Conditions générales',
      notices: 'Mentions légales',
    },
    privacy: {
      title: 'Politique de confidentialité',
      updated: 'Mise à jour en janvier 2026',
      sections: [
        {
          heading: 'Le cadre',
          body: 'Ouest Dynamics traite vos données conformément à la loi ivoirienne n° 2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel, sous le contrôle de l’ARTCI, et au Règlement européen 2016/679 (RGPD) pour les visiteurs et clients internationaux.',
        },
        {
          heading: 'Ce que nous collectons',
          body: 'Uniquement ce qui sert à répondre à votre demande : votre nom, votre entreprise, votre adresse e-mail, votre numéro de téléphone et la description de votre projet. Ces données ne sont jamais vendues ni louées.',
        },
        {
          heading: 'L’assistant',
          body: 'Les messages envoyés à l’assistant passent par notre serveur. Ils ne sont pas conservés pour entraîner des modèles d’intelligence artificielle.',
        },
        {
          heading: 'Durée de conservation et vos droits',
          body: 'Sans contrat signé, vos données sont conservées 24 mois au plus. Vous pouvez y accéder, les corriger, les exporter ou les faire supprimer en écrivant à dpo@ouestdynamics.com.',
        },
      ],
    } as LegalDoc,
    terms: {
      title: 'Conditions générales',
      updated: 'Version 2.0, droit OHADA',
      sections: [
        {
          heading: 'Vos comptes restent les vôtres',
          body: 'Noms de domaine, hébergements, comptes Apple Developer et Google Play, gestionnaires publicitaires : tout est ouvert directement au nom du client. Ouest Dynamics ne conserve aucun accès exclusif.',
        },
        {
          heading: 'Paiement en trois fois',
          body: 'Sauf mention contraire au contrat, chaque projet est réglé en trois échéances : 40 % à la signature, 30 % à la validation des maquettes et de l’architecture, 30 % à la livraison finale.',
        },
        {
          heading: 'Cinq jours pour valider chaque étape',
          body: 'À chaque livraison intermédiaire, le client dispose de cinq jours ouvrés pour transmettre ses remarques. Sans retour écrit dans ce délai, l’étape est considérée comme validée afin de préserver le calendrier.',
        },
        {
          heading: 'Propriété intellectuelle',
          body: 'Une fois le prix intégralement réglé, Ouest Dynamics cède au client, à titre exclusif, mondial et définitif, l’ensemble des droits sur le code spécifique, les créations graphiques et la documentation.',
        },
      ],
    } as LegalDoc,
    notices: {
      title: 'Mentions légales',
      updated: 'Siège à Abidjan, Côte d’Ivoire',
      sections: [
        {
          heading: 'Éditeur',
          body: 'Ouest Dynamics, studio de design et d’ingénierie numérique. Siège : Cocody, Abidjan, République de Côte d’Ivoire.',
        },
        {
          heading: 'Contact',
          body: 'Direction de la publication : direction@ouestdynamics.com. Protection des données : dpo@ouestdynamics.com.',
        },
        {
          heading: 'Réalisation',
          body: 'Site conçu et développé par Ouest Dynamics avec React, TypeScript et Tailwind CSS.',
        },
      ],
    } as LegalDoc,
  },

  cookies: {
    text: 'Nous utilisons quelques cookies pour mesurer l’audience du site. Vous pouvez les refuser.',
    accept: 'Accepter',
    refuse: 'Refuser',
    customize: 'Choisir',
    save: 'Enregistrer mes choix',
    policy: 'En savoir plus',
    essential: {
      label: 'Nécessaires',
      desc: 'Langue, devise et fonctionnement du site. Toujours actifs.',
    },
    analytics: {
      label: 'Mesure d’audience',
      desc: 'Statistiques de visite anonymes.',
    },
    marketing: {
      label: 'Publicité',
      desc: 'Mesure de l’efficacité de nos campagnes.',
    },
  },

  footer: {
    pitch: 'Un projet en tête ?',
    pitchCta: 'Estimer mon projet',
    write: 'Ou écrivez-nous :',
    email: 'direction@ouestdynamics.com',
    explore: 'Explorer',
    legal: 'Légal',
    cookies: 'Cookies',
    studio: 'Studio',
    place: 'Cocody, Abidjan',
    country: 'Côte d’Ivoire',
    rights: '© 2026 Ouest Dynamics',
  },
};

export type Dictionary = typeof fr;
