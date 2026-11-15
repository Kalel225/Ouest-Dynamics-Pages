# Ouest Dynamics — Documentation Complète d’Architecture & Base de Données

**Ouest Dynamics** est une plateforme full-stack (React 19 + TypeScript + Tailwind CSS v4 + Express + Base de Données JSON persistante Lowdb + Conseiller IA Gemini) conçue pour une maison d'ingénierie digitale et de croissance sur-mesure.

---

## 1. Identité Visuelle & Direction Artistique

### Palette Chromatique (Atelier Architectural)
L'esthétique s'inspire de l'architecture contemporaine chaleureuse (travertin chaud, terre cuite, bronze doré et ébène torréfié) sans mentionner littéralement ce style dans les textes de l'interface :
- **Pierre Travertin Chaud (`#F7F4EE`)** : Toile de fond principale, lumineuse et apaisante.
- **Calcaire Sablé (`#EFECE6`)** : Cartes secondaires, barre d'outils et surfaces de contraste doux.
- **Ébène Torréfié (`#181512` & `#221E1A`)** : Sections d'ancrage à fort contraste (Galerie Portfolio, Bannière Call-To-Action, En-tête Chatbot IA, Pied de page).
- **Terre Cuite (`#A64B2A` / Hover `#8E3D20`)** : Signature chromatique réservée aux actions principales (CTA), au point du logo et aux indicateurs actifs.
- **Bronze Doré (`#D49B6A`)** : Accents éditoriaux sur fond sombre.
- **Bordures Architecturales (`#E2DDD5` sur fond clair / `#332C26` sur fond sombre)** : Filets structurels de `1px`.

### Système Typographique (3 Polices Google Fonts)
1. **Titres Éditoriaux (`--font-serif` : `'Fraunces'`, serif)** : Utilisée pour le logo `Ouest Dynamics.`, les grands titres H1/H2/H3 et les chiffres clés.
2. **Interface & Corps de Texte (`--font-sans` : `'Plus Jakarta Sans'`, sans-serif)** : Lecture fluide et accessible aux non-initiés comme aux dirigeants.
3. **Données & Chiffres Tabulaires (`--font-mono` : `'IBM Plex Mono'`, monospace)** : Alignement tabulaire (`font-variant-numeric: tabular-nums`) pour les métriques, numéros de référence (`OD-YYYY-XXXXX`) et horodatages.

---

## 2. Fonctionnalités & Composants Clés

### 2.1. Conseiller IA Intégré « Luxury Engineering Partner » (`src/components/AIChatbot.tsx` & `/api/chat`)
- **Widget Interactif Flottant** : Accessible en permanence en bas à droite de l'écran, parfaitement harmonisé avec la palette Terre Cuite & Travertin.
- **Propulsé par Gemini (`@google/genai` — modèle `gemini-4-hydrogen`) côté Serveur** :
  - Adopte la posture éditoriale **« Luxury Engineering Partner »** : ton posé, stratégique, raffiné et sans jargon technique.
  - Connaît l'ensemble des 4 expertises, le processus en 3 temps, les garanties contractuelles (maquette validée avant code, 100% propriété client, 6 mois de garantie technique, NDA automatique) et les paliers d'investissement calibrés en temps réel dans la devise du visiteur (`USD`, `EUR`, `XOF`, `GBP`).
  - Propose des questions de démarrage en un clic et redirige directement vers le configurateur de devis ou le formulaire de consultation, même depuis les pages légales.

### 2.2. Animation d'Introduction Fluide Lettre par Lettre (`src/components/LoadingScreen.tsx` & `src/components/BrandLogo.tsx`)
- **Apparition pure du Logo** : Au chargement initial de la page principale, seul le logo `Ouest Dynamics.` apparaît au centre de l'écran en travertin chaud (`#F7F4EE`).
- **Transition Naturelle Centre-à-Centre (`motion/react`)** : Chaque caractère calcule le vecteur exact entre son centre de départ et le centre de son caractère jumeau dans la barre de navigation (`Navbar.tsx`) ainsi que le ratio de `fontSize`. Pendant le vol fluide, le logo de la barre de navigation reste masqué (`hideLogoDuringIntro`), puis un fondu croisé (`onHandoverLogo`) transfère le relais sans aucun saut visuel.

### 2.3. Processus Simplifié en 3 Lignes Éditoriales (`src/components/Methodology.tsx`)
- Liste architecturale épurée à 3 lignes horizontales séparées par de fins filets (`1px`) au lieu de cartes denses côte à côte, accompagnée d'une bande synthétique des garanties incluses.

### 2.4. Section FAQ Interactive (`src/components/FAQ.tsx`)
- Accordéon fluide animé avec `AnimatePresence` répondant en langage clair (FR / EN) aux 6 questions essentielles (autonomie, garantie maquette avant code, paiement en 3 jalons, propriété 100% client, délais et garantie de 6 mois).

### 2.5. Animations au Défilement & Couches d'Affichage Cohérentes
- Animations `whileInView` harmonisées sur `Hero`, `Services`, `Portfolio`, `Methodology`, `FAQ` et `CTABanner`.
- Hiérarchie `z-index` auditée et sans chevauchement : `LoadingScreen` (`z-[100]`), Modales (`z-[70]`), `Navbar` (`z-50`), `CookieBanner` (`z-[45]`), `AIChatbot` & `LanguagePromptBanner` (positionné sous la navbar en haut à droite à `z-40`) & `MobileBottomBar` (`z-40`).

### 2.6. Pages Légales Dédiées : Politique de Confidentialité & CGU
1. **Page Politique de Confidentialité (`src/components/PrivacyPolicyPage.tsx`)** : `/#politique-de-confidentialite` ou `/privacy`.
2. **Page Conditions Générales d'Utilisation — CGU (`src/components/TermsPage.tsx`)** : `/#cgu` ou `/terms`.
3. **Modale Post-Validation (`src/components/PrivacyPolicyModal.tsx`)** : S'ouvre automatiquement après la validation réussie du formulaire avec la référence officielle (`OD-YYYY-XXXXX`).

### 2.7. Bannière Cookies, Formulaire Validé & Anti-Spam Multi-Couches
- **Bannière Cookies (`src/components/CookieBanner.tsx`)** : Conforme RGPD / CCPA, persistée dans `localStorage` (`od_cookie_consent_v1`).
- **Validation & Anti-Spam (`src/components/ContactForm.tsx` & `server.ts`)** : Validation `onBlur` en direct, coches vertes `✓`, champ Honeypot invisible, contrôle de vélocité (`< 1200ms`), défi mathématique humain, et limitation de débit par IP (`Rate Limiting` côté serveur).

### 2.8. Sitemap XML, `robots.txt` & Optimisation de Chargement
- Routes dynamiques `/robots.txt` et `/sitemap.xml` (incluant `#faq`) dans `server.ts` et fichiers statiques dans `public/`.
- `fetchPriority="high"` sur l'image Hero, `loading="lazy" decoding="async"` sur la galerie Portfolio, et cache HTTP sur les images statiques.

---

## 3. Architecture Backend & API (`server.ts` + `./data/database.json`)

| Route API | Méthode | Description |
| :--- | :--- | :--- |
| `/api/chat` | `POST` | Conseiller IA Gemini (`gemini-4-hydrogen`) avec persona *Luxury Engineering Partner* et contexte devise/langue. |
| `/api/submissions` | `POST` | Valide les champs, filtre le spam (honeypot, vélocité, rate-limit IP) et enregistre un dossier (`OD-YYYY-XXXXX`) dans `./data/database.json`. |
| `/api/submissions` | `GET` | Retourne la liste complète des dossiers enregistrés et les statistiques globales. |
| `/api/submissions/:reference` | `GET` | Recherche un dossier précis via sa référence unique. |
| `/api/health` | `GET` | Vérifie l'état de santé du serveur et de la base de données. |
| `/robots.txt` | `GET` | Directives d'indexation pour les moteurs de recherche. |
| `/sitemap.xml` | `GET` | Plan du site XML dynamique pour Google, Bing et autres moteurs. |
