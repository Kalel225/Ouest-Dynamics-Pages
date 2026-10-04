# DOCUMENTATION TECHNIQUE COMPLÈTE — OUEST DYNAMICS
**Digital Engineering & Growth Partner**

---

## 1. VISION & POSITIONNEMENT DU PROJET

**Ouest Dynamics** est une agence technologique d'élite spécialisée dans l'ingénierie numérique de pointe, le développement web/mobile sur-mesure, les systèmes de design de marque et l'accélération de croissance orientée ROI.

Le projet a été développé selon les standards d'excellence américains (**"US High-Tech & Luxury Standards"**) :
- **Langue par défaut en Anglais (Standard Américain)** : Copywriting institutionnel, percutant et orienté valeur commerciale.
- **Détection automatique de la langue de l'appareil** : Si le terminal de l'utilisateur est configuré en français, un bandeau discret et élégant propose instantanément de basculer l'ensemble de la plateforme en français.
- **Sélecteur de langue universel (EN / FR)** : Intégré dans la barre de navigation et la barre mobile, mémorisant le choix dans `localStorage`.
- **Expérience Mobile-First & Ergonomie Poussée** :
  - Barre d'action basse flottante (`MobileBottomBar.tsx`) positionnée dans la "zone du pouce" (*thumb zone*) pour une réactivité immédiate sans devoir scroller.
  - Cibles tactiles calibrées (`min-h-[44px]` et `min-h-[48px]`).
  - Champs de formulaire optimisés pour éviter le zoom automatique intempestif sur iOS Safari (`text-base`).
  - Défilement fluide sans aucun débordement horizontal (`overflow-x-hidden`).
- **Règle constitutionnelle de design (Refonte Frameless)** :
  - **Éléments arrondis et glassmorphiques appliqués exclusivement** à :
    1. La **Barre de Navigation (`Navbar.tsx`)** : capsule flottante `rounded-full` en verre poli sombre (`backdrop-blur-2xl`).
    2. Le **Formulaire de Contact Exécutif (`ContactForm.tsx`)** : boîte magistrale `rounded-3xl` en verre poli avec inputs arrondis et bouton exécutif signature.
  - **Le reste des éléments n'a aucun cadre (*Frameless*)** :
    - Le Hero (boutons et métriques libres de cadre).
    - Les 4 pôles d'expertises (grille éditoriale aérée sans boîtes ni bordures de cartes).
    - La méthodologie & gouvernance (jalons et protocoles affichés directement sur le canevas sans encadrement rectangulaire).
- **Arrière-plan 3D réintégré uniquement au niveau du Hero** : Sculpture cinétique géométrique en titane obsidienne et maillage or champagne, avec recul de caméra dynamique calibré pour smartphone (`z: 10.8` sur mobile, `z: 8.2` sur desktop).
- **Localisation** : Positionnement stratégique centré sur Abidjan (mentions de Dakar et Paris retirées selon directives).
- **Épuration de l'interface** : Retrait du bouton "Rejouer l'intro" pour une sobriété maximale.

---

## 2. STACK TECHNIQUE & DÉPENDANCES

| Technologie | Version | Rôle dans l'application |
| :--- | :--- | :--- |
| **React** | `^19.0.1` | Bibliothèque UI déclarative moderne, hooks réactifs (`useState`, `useEffect`, `useRef`, `useContext`). |
| **TypeScript** | `^7.0.2` | Typage statique strict, interfaces de données et sécurité à la compilation. |
| **Vite** | `^8.3.0` | Bundler et serveur de développement ultra-rapide (ESM natif). |
| **Tailwind CSS** | `^4.3.3` | Framework utilitaire moderne avec `@tailwindcss/vite` pour la gestion des styles. |
| **Three.js** | `^0.186.1` | Moteur graphique WebGL pour l'animation 3D interactive dans le Hero. |
| **Lucide React** | `^0.546.0` | Bibliothèque d'icônes vectorielles légères et personnalisables. |
| **Motion** | `^12.23.24` | Prise en charge des animations fluides. |

---

## 3. CHARTE GRAPHIQUE & DESIGN SYSTEM

L'identité chromatique repose sur un contraste subtil et anti-fatigue :

```css
:root {
  --color-obsidian: #0B0B0B;   /* Fond principal - True Dark Mode anti-fatigue */
  --color-pearl: #F4F4F6;      /* Gris Perle - Paragraphes et corps de texte */
  --color-gold: #D4AF37;       /* Or Champagne - Accent, CTA et détails de distinction */
  --color-gold-hover: #E2C255; /* Or Champagne clair pour les états de survol */
  --color-tech-gray: #262626;  /* Gris Technique pour les hairlines ultra-fines */
  --color-white: #FFFFFF;      /* Blanc Pur - Titres majeurs H1, H2, H3 */
}
```

### Typographie
- **Titres (H1, H2, H3, H4)** : `Plus Jakarta Sans`, sans-serif géométrique, moderne et autoritaire (`font-display`).
- **Corps de texte** : `Inter`, sans-serif ultra-lisible optimisée pour les écrans haute densité (`font-body`).
- **Indices & Chiffres** : `JetBrains Mono` / monospace pour les labels techniques, métriques clés et statuts de sécurité (`font-mono`).

---

## 4. ARCHITECTURE DU SYSTÈME MULTILINGUE (I18N)

Le système de traduction est géré par deux fichiers clés :

### A. `src/translations.ts`
Contient l'intégralité du dictionnaire bilingue anglais/français :
- Navigation (`nav`)
- Hero (`hero`)
- Expertises (`services`)
- Méthodologie & Gouvernance (`methodology`)
- Formulaire Exécutif (`contact`)
- Modale de Cadrage (`projectModal`)
- Pied de page (`footer`)
- Messages de détection de langue (`langPrompt`)
- Barre mobile ergonomique (`mobileBar`)

### B. `src/context/LanguageContext.tsx`
Provider React encapsulant l'application :
- Détecte automatiquement la langue du navigateur (`navigator.language`).
- Sauvegarde le choix utilisateur dans `localStorage` (`od_lang`).
- Propose un bandeau de basculement non-intrusif si un terminal francophone est détecté (`LanguagePromptBanner.tsx`).

---

## 5. ARCHITECTURE DES COMPOSANTS

```text
src/
├── main.tsx                         # Point d'ancrage ReactDOM
├── index.css                        # Styles globaux, polices et variables
├── App.tsx                          # Orchestrateur racine avec LanguageProvider
├── translations.ts                  # Dictionnaire bilingue EN / FR
├── context/
│   └── LanguageContext.tsx          # Contexte de langue et détection automatique
└── components/
    ├── BrandLogo.tsx                # Logo vectoriel OUEST DYNAMICS synchronisé
    ├── LoadingScreen.tsx            # Écran d'ouverture cinématique avec synchronisation
    ├── LanguagePromptBanner.tsx     # Toast de proposition de traduction selon l'appareil
    ├── MobileBottomBar.tsx          # Barre d'action ergonomique basse (Thumb Zone smartphone)
    ├── Navbar.tsx                   # Barre de navigation flottante glassmorphique avec toggle EN/FR
    ├── Hero.tsx                     # Section Hero standard US avec typographie fluide
    ├── Hero3DBackground.tsx         # Scène WebGL Three.js d'arrière-plan 3D optimisée mobile
    ├── Services.tsx                 # Les 4 expertises en format éditorial frameless
    ├── Methodology.tsx              # Gouvernance et jalons méthodologiques 100% frameless
    ├── ContactForm.tsx              # Formulaire exécutif rounded-3xl & glassmorphique
    ├── ProjectModal.tsx             # Modale de cadrage express
    └── Footer.tsx                   # Pied de page international (Abidjan)
```

---

## 6. EXPÉRIENCE MOBILE-FIRST & ERGONOMIE POUSSÉE

1. **Barre de Navigation Basse Flottante (`MobileBottomBar.tsx`)** :
   - Visible uniquement sur petits écrans (`sm:hidden`).
   - Accès direct au sélecteur de langue `[EN | FR]`.
   - Bouton de contact direct.
   - Bouton d'action principal *Thumb-Friendly* pour lancer un projet immédiatement.
2. **Menu Tiroir Mobile de Haute Facture** :
   - Écran de navigation plein écran avec effet verre sombre (`backdrop-blur-2xl`).
   - Cibles de frappe larges avec indicateurs numérotés (`01`, `02`, `03`, `04`).
   - Fermeture automatique au clic sur un lien et verrouillage du défilement d'arrière-plan.
3. **Optimisation 3D pour Smartphones** :
   - Adaptation dynamique du champ de vision et de la distance de caméra (`z: 10.8`).
   - Pixel ratio plafonné à `1.5` sur mobile pour économiser la batterie.
   - Écouteurs d'événements passifs (`{ passive: true }`) pour ne jamais bloquer le scroll natif.
