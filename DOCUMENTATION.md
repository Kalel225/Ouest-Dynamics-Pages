# DOCUMENTATION TECHNIQUE & FONCTIONNELLE — OUEST DYNAMICS PLATFORM (V2)

## 1. Vue d'Ensemble & Identité (« Architecture Digitale Souveraine »)
- **Nom** : Ouest Dynamics — Plateforme Officielle & Configurateur de Brief B2B (V2)
- **Entité** : Ouest Dynamics (Abidjan, Côte d'Ivoire — Rayonnement Afrique de l'Ouest & International)
- **Modèle Opérationnel** : 4 Pôles d'expertise (`BRANDING`, `WEB`, `MOBILE_DESKTOP`, `GROWTH`) pilotés par 2 Moteurs Transverses (`TRANSVERSE_DA` Direction Artistique Executive & `TRANSVERSE_AI` Ingénierie IA/Automatisation) selon l'architecture *Core & Elastic Guilds*.

## 2. Documents de Spécification Intégrés à la Racine
- `/AI_EXPORT_CONTEXT.md` : Contexte d'export, objectifs du reprototypage V2 et règles métier critiques.
- `/SPEC.md` : Contrat fonctionnel et technique, catalogue du moteur tarifaire (`pricing-engine`), User Stories (`US-01`, `US-02`, `US-03`) et clauses de gouvernance.
- `/BUILD_PROMPT.md` : Prompt maître d'architecture, contraintes de performance (zéro `LoadingScreen`, médias vectoriels SVG haute précision) et sections obligatoires.
- `/design-tokens.json` : Jetons W3C Design Tokens (`#0B0D12` Obsidian, `#141821` Elevated, `#D4AF37` Sovereign Gold, `#F8F6F1` Ivory, typographies `Plus Jakarta Sans`, `Inter`, `JetBrains Mono`).
- `/ai-studio-manifest.json` : Manifeste de l'agent IA *« Ouest Dynamics — Concierge Exécutif & Qualificateur de Brief »* avec `response_schema` JSON strict et politique `zero_data_retention`.

## 3. Architecture Modulaire (`src/`)
- `src/i18n/fr.ts` & `src/i18n/en.ts` : Dictionnaires bilingues séparés par module (`fr` par défaut, bascule instantanée sans bannière intrusive).
- `src/context/LanguageContext.tsx` : Contexte de langue (`fr` | `en`).
- `src/context/CurrencyContext.tsx` : Contexte multi-devises temps réel (`XOF` par défaut, `EUR` avec `1 EUR = 655.957 XOF`, `USD` avec `1 USD = 606.06 XOF`).
- `src/utils/pricingEngine.ts` : Moteur de calcul des fourchettes budgétaires, modificateurs transverses (`+20%` DA, `+25%` IA, `+15%` Fast-Track 48h), remise multi-pôles (`-10%` dès 2 pôles) et échéancier `40 % / 30 % / 30 %`.
- `src/components/Navbar.tsx` : Logo géométrique SVG Ouest Dynamics, navigation fluide, sélecteurs compacts Langue (`FR | EN`) + Devise (`XOF | EUR | USD`) et CTA doré *« Démarrer un projet »*.
- `src/components/Hero.tsx` : Positionnement d'autorité (Abidjan • International), composition architecturale SVG, double CTA (*« Configurer mon brief »* et *« Parler au Concierge IA »*) et indicateurs de gouvernance.
- `src/components/PolesMatrix.tsx` : Bande supérieure des 2 Moteurs Transverses + Grille Bento interactive des 4 Pôles.
- `src/components/Methodology.tsx` : Modèle *Core & Elastic Guilds* + 4 engagements contractuels.
- `src/components/PortfolioSection.tsx` : 4 études de cas sectorielles chiffrées (FinTech UEMOA, Immobilier Prestige Abidjan, Agro-Industrie Export, SaaS Logistique) avec filtres par Pôle et modale détaillée.
- `src/components/BriefConfigurator.tsx` : Configurateur de Brief & Estimateur Budgétaire en 4 étapes connecté au moteur tarifaire et au Concierge IA.
- `src/components/AIConciergeDrawer.tsx` : Drawer latéral connecté à `POST /api/chat` (Structured Output JSON selon `ai-studio-manifest.json`) avec bouton **« Appliquer ce diagnostic au Configurateur »** (`Pré-remplir mon brief`).
- `src/components/LegalPortal.tsx` : Portail légal unifié sur fond éditorial clair `#F8F6F1` (*Politique de Confidentialité ARTCI Loi n°2013-450 & RGPD*, *CGV/CGU*, *Mentions Légales*).
- `src/components/CookieConsentBanner.tsx` : Bannière CMP Consent Mode v2 granulaire (Essentiels, Analytics, Marketing, Assistant IA) avec horodatage d'audit dans `localStorage`.
- `src/components/Footer.tsx` : Navigation vers les sections, accès au Portail Légal Unifié et réouverture de la CMP Cookies.
