# AI_EXPORT_CONTEXT — Ouest Dynamics (Prompt & Contexte d'Architecture Complet)

> **Objectif de ce document** : Ce fichier contient l'intégralité du contexte architectural, esthétique, fonctionnel et technique du projet **Ouest Dynamics**. Vous pouvez le copier-coller directement dans n'importe quelle autre intelligence artificielle (Claude, ChatGPT, Gemini, Cursor, Windsurf, v0, etc.) pour poursuivre le développement ou exporter le projet sans aucune perte de contexte.

---

## 1. Pitch & Positionnement du Projet
- **Nom de l'entreprise** : `Ouest Dynamics` (avec le point final en Terre Cuite `#A64B2A`).
- **Slogan Officiel (Anglais)** : `"Digital Excellence Engineered for Your Growth."`
- **Slogan Officiel (Français)** : `"L'Excellence Numérique au Service de Votre Croissance."`
- **Direction Artistique ("Architectural Monograph & Warm Travertine Atelier")** :
  - L'identité fusionne l'élégance chaleureuse des matières naturelles (travertin `#F7F4EE`, calcaire `#EFECE6`, terre cuite `#A64B2A`, ébène torréfié `#181512`) et la rigueur éditoriale américaine, **uniquement à travers le style visuel et le design** (sans jamais écrire littéralement le terme « ivoiro-américain » dans les textes de l'interface).
- **Accessibilité & Clarté** :
  - Vocabulaire limpide, orienté résultats d'affaires et compréhensible par un dirigeant non-initié à la technologie.

---

## 2. Design System & Tokens CSS (`src/index.css`)

### Polices Google Fonts
- **Display / Titres (`--font-serif`)** : `'Fraunces', Georgia, serif`
- **UI & Corps (`--font-sans`)** : `'Plus Jakarta Sans', -apple-system, sans-serif`
- **Chiffres & Références (`--font-mono`)** : `'IBM Plex Mono', monospace` (`font-variant-numeric: tabular-nums`)

### Palette de Couleurs
- **Fond Principal (Warm Travertine)** : `#F7F4EE`
- **Fond Secondaire (Sandstone Limestone)** : `#EFECE6`
- **Fond Sombre (Roasted Ebony — Portfolio, CTA Banner, Footer)** : `#181512` (surfaces internes `#221E1A`, bordures `#332C26`)
- **Texte Principal (Deep Charcoal Ink)** : `#161412`
- **Texte Secondaire (Warm Graphite)** : `#5C554E`
- **Accent Primaire (Terracotta)** : `#A64B2A` (Hover : `#8E3D20`)
- **Accent Secondaire Sombre (Burnished Gold)** : `#D49B6A`
- **Bordures Claires** : `#E2DDD5`

---

## 3. Architecture Technique & Arborescence des Fichiers

### Stack Technique
- **Frontend** : React 19, TypeScript, Tailwind CSS v4 (`@import "tailwindcss";`), `lucide-react`, `motion/react` (Framer Motion).
- **Backend** : Node.js + Express (`server.ts` exécuté via `tsx server.ts` sur le port `3000`).
- **Base de Données** : `lowdb` (persistance JSON transactionnelle dans `./data/database.json`).

### Liste Complète des Composants (`src/components/`)
1. `BrandLogo.tsx` : Logo typographique `Ouest Dynamics.` où chaque lettre possède un ID DOM unique (`${idPrefix}-ouest-0`, ..., `${idPrefix}-dot`) pour permettre la transition lettre par lettre.
2. `LoadingScreen.tsx` : Écran d'introduction affichant uniquement le logo au centre sur fond `#F7F4EE`, puis animant chaque lettre individuellement (interpolation centre-à-centre + ratio de `fontSize` via `motion/react`) vers la barre de navigation supérieure avec fondu croisé (`onHandoverLogo`).
3. `Navbar.tsx` : Barre de navigation supérieure épurée (Services, Portfolio, Méthodologie, FAQ, Contact, CTA « Démarrer un Projet »).
4. `Hero.tsx` : Grille asymétrique 12 colonnes (7 colonnes éditoriales + 5 colonnes visuel d'atelier avec `fetchPriority="high"`) suivie d'une bande de 4 preuves quantitatives, animée au scroll avec `motion/react`.
5. `Services.tsx` : Grille Bento asymétrique des 4 domaines d'expertise animée au défilement via `motion/react` (`whileInView`).
6. `Portfolio.tsx` : Galerie horizontale interactive sur fond `#181512` avec filtres par catégorie, images optimisées (`loading="lazy" decoding="async"`), animations de scroll et modale d'étude de cas complète.
7. `Methodology.tsx` : Processus en 3 étapes ultra-épuré (liste architecturale en 3 lignes horizontales sans cartes lourdes) + bandeau de garanties contractuelles, animé au scroll.
8. `FAQ.tsx` : Section Questions Fréquentes interactive avec accordéon animé (`AnimatePresence`) et réponses en langage clair (FR / EN).
9. `CTABanner.tsx` : Section Call To Action à fort impact (`#181512`) placée avant le formulaire de contact.
10. `ContactForm.tsx` : Formulaire de consultation avec adaptation automatique de la devise (`USD`, `EUR`, `GBP`, `CAD`, `CHF`, `XOF`), validation en temps réel (`onBlur` + indicateurs `✓`), et protection anti-spam (champ honeypot invisible, contrôle de vélocité `<1200ms`, défi mathématique humain).
11. `PrivacyPolicyPage.tsx` : Page complète dédiée à la Politique de Confidentialité (`/#politique-de-confidentialite` ou `/privacy`).
12. `TermsPage.tsx` : Page complète dédiée aux Conditions Générales d'Utilisation & de Prestation — CGU (`/#cgu` ou `/terms`).
13. `PrivacyPolicyModal.tsx` : Modale de confirmation et charte de confidentialité s'ouvrant après l'envoi d'un dossier (`OD-YYYY-XXXXX`).
14. `CookieBanner.tsx` : Bannière de consentement aux cookies (Accepter tout, Essentiels uniquement, Personnaliser) sauvegardée dans `localStorage` (`od_cookie_consent_v1`).
15. `NotFoundPage.tsx` : Page 404 dans le thème architectural du site.
16. `Footer.tsx` : Pied de page complet avec liens vers les réseaux sociaux officiels (TikTok, Facebook, Instagram), la page Politique de Confidentialité, la page CGU et le Sitemap XML.
