# PROMPT MAÎTRE — REPROTOTYPAGE OUEST DYNAMICS (GOOGLE AI STUDIO BUILD MODE)

Agis en tant que Staff Frontend Engineer et Executive Art Director pour **Ouest Dynamics** (agence digitale et d'automatisation IA 360° basée à Abidjan, Côte d'Ivoire, opérant en Afrique de l'Ouest et à l'international).

Construis une application web React + TypeScript + Tailwind CSS ultra-performante, modulaire et prête pour la production, en t'appuyant strictement sur les fichiers de spécification joints (`SPEC.md`, `design-tokens.json`, `AI_EXPORT_CONTEXT.md`, `ai-studio-manifest.json`).

## 1. CONTRAINTES D'ARCHITECTURE & PERFORMANCE (RÈGLES STRICTES)
- **Zéro écran de chargement artificiel** : Ne crée AUCUN composant `LoadingScreen`. L'interface doit s'afficher instantanément.
- **Médias légers** : N'intègre AUCUNE image lourde codée en dur. Utilise des compositions géométriques SVG architecturales haute précision, des dégradés radiaux subtils et des emplacements médias optimisés (`aspect-video`, `loading="lazy"`).
- **Architecture modulaire** : Découpe l'application en composants propres et atomiques (`Navbar`, `Hero`, `PolesMatrix`, `Methodology`, `PortfolioSection`, `BriefConfigurator`, `AIConciergeDrawer`, `LegalPortal`, `CookieConsentBanner`, `Footer`).
- **i18n structuré (FR / EN)** : Sépare les dictionnaires de traduction par module (`src/i18n/fr.ts` et `src/i18n/en.ts`) avec français par défaut et bascule instantanée sans bannière intrusive.
- **Multi-devises temps réel (`XOF`, `EUR`, `USD`)** : Intègre un `CurrencyContext` avec `XOF` (FCFA) par défaut, conversion exacte basée sur la parité officielle `1 EUR = 655.957 XOF` et `1 USD = 606.06 XOF`, et affichage en chiffres tabulaires (`tabular-nums`).

## 2. DIRECTION ARTISTIQUE (« ARCHITECTURE DIGITALE SOUVERAINE »)
- Applique exactement les valeurs de `design-tokens.json` :
  - Fond principal sombre : `#0B0D12` (`surface.obsidian`)
  - Surfaces & cartes Bento : `#141821` (`surface.elevated`) avec bordures fines `1px solid rgba(212, 175, 55, 0.18)`
  - Accent souverain : `#D4AF37` (`accent.sovereignGold`) pour les CTA primaires, filets d'autorité et métriques clés
  - Fond éditorial clair (pages légales) : `#F8F6F1` (`surface.ivory`) avec accent `#8A6D1B`
  - Typographies : `Plus Jakarta Sans` (titres), `Inter` (corps & UI avec `tabular-nums`), `JetBrains Mono` (badges techniques & références).

## 3. SECTIONS & FONCTIONNALITÉS OBLIGATOIRES
1. **Navbar Unifiée** : Logo géométrique SVG Ouest Dynamics, navigation fluide, sélecteur compact Langue (`FR | EN`) + Devise (`XOF | EUR | USD`), et bouton CTA doré *« Démarrer un projet »*.
2. **Hero Section** : Positionnement d'autorité d'Ouest Dynamics (Abidjan • International), proposition de valeur 360°, double CTA (*« Configurer mon brief »* et *« Parler au Concierge IA »*), et indicateurs clés de gouvernance (Propriété client 100%, Validation 5j, Conformité ARTCI/RGPD).
3. **Matrice des 4 Pôles + 2 Moteurs Transverses** :
   - Bande supérieure dédiée aux **2 Moteurs Transverses** : *Direction Artistique Executive* & *Ingénierie IA & Automatisation (Gemini / n8n)*.
   - Grille Bento interactive des **4 Pôles** :
     - **Pôle 1 — Identité & Branding 360°** (Stratégie de marque, Brand Book, Design Tokens, Packaging)
     - **Pôle 2 — Développement Web Haute Performance** (Sites institutionnels, E-Commerce, SaaS, SEO/GEO)
     - **Pôle 3 — Applications Mobile & Desktop** (iOS, Android, Windows/macOS, Architecture Offline-First)
     - **Pôle 4 — Growth, Paid Media & Visibilité** (Meta/TikTok/Google Ads, Tracking Server-Side CAPI, CRO)
4. **Méthodologie & Garanties de Gouvernance** : Présentation du modèle *Core & Elastic Guilds* (Noyau interne + Guildes seniors mobilisables sous 48h) et des 4 engagements contractuels (Indépendance des actifs clients, Cession intégrale de PI, Validation tacite sous 5 jours ouvrés, Échéancier 40% / 30% / 30%).
5. **Portfolio & Études de Cas Sectorielles (Filtres par Pôle)** : 4 études de cas réalistes et chiffrées (FinTech UEMOA, Immobilier Prestige Abidjan, Agro-Industrie Export, SaaS Logistique) affichant *Défi -> Architecture/DA -> Impact ROI mesuré* et ouverture d'une modale détaillée.
6. **Configurateur de Brief & Estimateur Budgétaire (4 Étapes)** :
   - **Étape 1** : Sélection multi-choix des Pôles (Branding, Web, Mobile/Desktop, Growth).
   - **Étape 2** : Options transverses (Direction Artistique Senior, Agents IA / Automatisation n8n, Fast-Track Guilde 48h).
   - **Étape 3** : Estimation budgétaire transparente calculée dynamiquement dans la devise sélectionnée (`XOF`, `EUR` ou `USD`) avec décomposition de l'échéancier (40% acompte, 30% validation maquettes/architecture, 30% recette).
   - **Étape 4** : Formulaire décisionnaire (Nom, Entreprise, Email, Téléphone E.164, Résumé du projet, Consentement ARTCI/RGPD) avec validation stricte, génération d'un numéro de référence (`OD-2026-XXXX`) et écran de confirmation récapitulatif.
7. **Concierge IA Qualificateur de Brief (Drawer Latéral)** :
   - Interface conversationnelle branchée sur `@google/genai` (`gemini-2.5-flash`) utilisant `system_instruction` et `responseSchema` définis dans `ai-studio-manifest.json`.
   - Permet de diagnostiquer le besoin du visiteur et inclut un bouton d'action directe **« Appliquer ce diagnostic au Configurateur »** qui pré-remplit automatiquement les étapes 1, 2 et 4 du Configurateur de Brief.
8. **Portail Légal Unifié & CMP Consent Mode v2** :
   - Vues dédiées accessibles depuis le Footer sans duplication de modales : *Politique de Confidentialité (ARTCI Loi n°2013-450 & RGPD)*, *Conditions Générales de Vente & d'Utilisation (CGV/CGU)*, *Mentions Légales*.
   - Bannière de gestion des cookies granulaire (Essentiels, Analytics, Marketing, Assistant IA) enregistrant le choix dans le `localStorage` et affichant un horodatage de preuve.
