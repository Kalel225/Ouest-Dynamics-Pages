# Ouest Dynamics — Documentation Complète d’Architecture & Base de Données

**Ouest Dynamics** est une plateforme full-stack (React 19 + TypeScript + Tailwind CSS v4 + Express + Base de Données JSON persistante Lowdb) conçue pour une maison d'ingénierie digitale et de croissance sur-mesure.

---

## 1. Identité Visuelle & Direction Artistique

### Palette Chromatique (Atelier Architectural)
L'esthétique s'inspire de l'architecture contemporaine chaleureuse (travertin chaud, terre cuite, bronze doré et ébène torréfié) sans mentionner littéralement ce style dans les textes de l'interface :
- **Pierre Travertin Chaud (`#F7F4EE`)** : Toile de fond principale, lumineuse et apaisante.
- **Calcaire Sablé (`#EFECE6`)** : Cartes secondaires, barre d'outils et surfaces de contraste doux.
- **Ébène Torréfié (`#181512` & `#221E1A`)** : Sections d'ancrage à fort contraste (Galerie Portfolio, Bannière Call-To-Action, Pied de page).
- **Terre Cuite (`#A64B2A` / Hover `#8E3D20`)** : Signature chromatique réservée aux actions principales (CTA), au point du logo et aux indicateurs actifs.
- **Bronze Doré (`#D49B6A`)** : Accents éditoriaux sur fond sombre.
- **Bordures Architecturales (`#E2DDD5` sur fond clair / `#332C26` sur fond sombre)** : Filets structurels de `1px`.

### Système Typographique (3 Polices Google Fonts)
1. **Titres Éditoriaux (`--font-serif` : `'Fraunces'`, serif)** : Utilisée pour le logo `Ouest Dynamics.`, les grands titres H1/H2/H3 et les chiffres clés.
2. **Interface & Corps de Texte (`--font-sans` : `'Plus Jakarta Sans'`, sans-serif)** : Lecture fluide et accessible aux non-initiés comme aux dirigeants.
3. **Données & Chiffres Tabulaires (`--font-mono` : `'IBM Plex Mono'`, monospace)** : Alignement tabulaire (`font-variant-numeric: tabular-nums`) pour les métriques, numéros de référence (`OD-YYYY-XXXXX`) et horodatages.

---

## 2. Fonctionnalités & Composants Clés

### 2.1. Animation d'Introduction Fluide Lettre par Lettre (`src/components/LoadingScreen.tsx` & `src/components/BrandLogo.tsx`)
- **Apparition pure du Logo** : Au chargement initial de la page principale, seul le logo `Ouest Dynamics.` apparaît au centre de l'écran en travertin chaud (`#F7F4EE`), révélé lettre par lettre avec un fondu progressif.
- **Transition Naturelle Centre-à-Centre (`motion/react`)** : Chaque caractère calcule le vecteur exact entre son centre de départ et le centre de son caractère jumeau dans la barre de navigation (`Navbar.tsx`), ainsi que le ratio exact de taille de police (`fontSize`). Pendant le vol fluide des lettres, le logo de la barre de navigation reste masqué (`hideLogoDuringIntro`), le rideau `#F7F4EE` se dissout progressivement, puis un fondu croisé (`onHandoverLogo`) transfère le relais au logo de la barre de navigation sans aucun saut visuel.

### 2.2. Processus Simplifié en 3 Lignes Éditoriales (`src/components/Methodology.tsx`)
- Conçu sous forme d'une liste architecturale épurée à 3 lignes horizontales séparées par de fins filets (`1px`) au lieu de cartes denses côte à côte.
- Chaque étape présente l'essentiel d'un seul coup d'œil : numéro et délai (`01`, `02`, `03`), titre et explication claire, ainsi que le livrable concret obtenu.

### 2.3. Section FAQ Interactive (`src/components/FAQ.tsx`)
- Accordéon fluide animé avec `AnimatePresence` (`motion/react`) répondant en langage simple (FR / EN) aux 6 questions essentielles : autonomie sans compétence technique, garantie maquette avant code, paiement échelonné en 3 jalons (40% / 30% / 30%), propriété intellectuelle à 100%, délais de livraison et garantie technique de 6 mois.

### 2.4. Animations au Défilement (`Scroll Animations` via `motion/react`)
- Toutes les sections principales (`Hero`, `Services`, `Portfolio`, `Methodology`, `FAQ`, `CTABanner`) intègrent des animations d'entrée au scroll (`whileInView`) fluides et progressives (`cubic-bezier(0.22, 1, 0.36, 1)`).

### 2.5. Pages Légales Dédiées : Politique de Confidentialité & CGU
1. **Page Politique de Confidentialité (`src/components/PrivacyPolicyPage.tsx`)** : Accessible via `/#politique-de-confidentialite` ou `/privacy`.
2. **Page Conditions Générales d'Utilisation & de Prestation — CGU (`src/components/TermsPage.tsx`)** : Accessible via `/#cgu` ou `/terms`.
3. **Modale Post-Validation (`src/components/PrivacyPolicyModal.tsx`)** : S'ouvre automatiquement après la validation réussie du formulaire avec le numéro de dossier officiel (`OD-2026-XXXXX`).

### 2.6. Bannière de Gestion des Cookies (`src/components/CookieBanner.tsx`)
- Conforme RGPD / CCPA, permettant d'**Accepter tout**, de choisir **Essentiels uniquement**, ou de **Personnaliser** les catégories, avec persistance dans `localStorage` (`od_cookie_consent_v1`).

### 2.7. Validation Temps Réel du Formulaire & Protection Anti-Spam Multi-Couches (`src/components/ContactForm.tsx` & `server.ts`)
- **Validation Temps Réel** : Vérification `onBlur` et en direct, coches vertes `✓` et compteur de caractères.
- **Protection Anti-Spam en 4 Couches** : Champ Honeypot invisible (`company_website_url`), contrôle de vélocité (`< 1200ms` bloqué), défi mathématique humain, et limitation de débit par IP (`Rate Limiting` dans `server.ts`).

### 2.8. Sitemap XML, `robots.txt` & Optimisation de la Vitesse de Chargement
- **SEO Technique** : Routes dynamiques `/sitemap.xml` et `/robots.txt` dans `server.ts` et fichiers statiques dans `public/`.
- **Performance** : `fetchPriority="high"` sur l'image Hero, `loading="lazy" decoding="async"` sur la galerie Portfolio, et en-têtes de cache HTTP sur les ressources statiques.

---

## 3. Architecture de la Base de Données (`server.ts` + `./data/database.json`)

| Route API | Méthode | Description |
| :--- | :--- | :--- |
| `/api/submissions` | `POST` | Valide les champs, filtre le spam (honeypot, vélocité, rate-limit IP) et enregistre un dossier (`OD-YYYY-XXXXX`) dans `./data/database.json`. |
| `/api/submissions` | `GET` | Retourne la liste complète des dossiers enregistrés et les statistiques globales. |
| `/api/submissions/:reference` | `GET` | Recherche un dossier précis via sa référence unique. |
| `/api/health` | `GET` | Vérifie l'état de santé du serveur et de la base de données. |
| `/robots.txt` | `GET` | Directives d'indexation pour les moteurs de recherche. |
| `/sitemap.xml` | `GET` | Plan du site XML dynamique pour Google, Bing et autres moteurs. |
