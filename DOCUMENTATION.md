# DOCUMENTATION TECHNIQUE COMPLÈTE — OUEST DYNAMICS
**Digital Engineering & Growth Partner · Creative Web & Mobile Studio**

---

## 1. VISION & POSITIONNEMENT DU PROJET

**Ouest Dynamics** est un studio numérique de prestige spécialisé dans l'ingénierie web, le développement d'applications mobiles haut de gamme, le design d'identités remarquables et les stratégies d'acquisition orientées retour sur investissement (ROI).

Le projet a été développé selon les **standards technologiques américains les plus rigoureux**, en garantissant :
1. **Un slogan fort et prestigieux** :
   - *Anglais* : **"Digital Excellence Engineered for Your Growth."**
   - *Français* : **"L'Excellence Numérique au Service de Votre Croissance."**
2. **Une ergonomie sans faille sur tablettes et smartphones** :
   - Zéro déformation visuelle : grilles adaptatives (1 colonne sur mobile, 2 colonnes sur tablette, jusqu'à 4 sur grand écran).
   - Suppression totale des débordements horizontaux (`overflow-x-hidden`, canvas 3D borné en `w-full h-full block`).
   - Cibles tactiles conformes aux standards Apple Human Interface & Google Material (`min-h-[44px]` et `min-h-[50px]`).
3. **Une adaptation automatique et transparente des devises selon la région** :
   - L'utilisateur n'a plus à choisir manuellement sa monnaie via des boutons encombrants (onglets manuels retirés de la navigation et du formulaire).
   - Le système détecte automatiquement la localisation du visiteur par son fuseau horaire et ses paramètres régionaux :
     - **Afrique de l'Ouest (Abidjan, Dakar, etc.)** : Franc CFA (**XOF / F CFA**)
     - **Zone Euro / Europe** : Euro (**EUR / €**)
     - **Royaume-Uni** : Livre Sterling (**GBP / £**)
     - **États-Unis / Reste du Monde** : Dollar Américain (**USD / $**)
4. **Validation du formulaire & Pop-up de Politique de Confidentialité Thématique** :
   - Dès qu'un client remplit et valide le formulaire de demande de devis, les informations sont traitées et enregistrées de manière sécurisée en base de données.
   - Un **pop-up élégant dans le thème du site** s'ouvre automatiquement pour présenter les engagements stricts de confidentialité : accord de non-divulgation immédiat (NDA automatique), absence de revente de données, stockage sécurisé, droit d'accès et d'effacement (RGPD/CCPA), et propriété intellectuelle intégrale garantie à 100% au client.
5. **Réseaux Sociaux Officiels intégrés** :
   - Liens officiels vers **TikTok**, **Facebook** et **Instagram** avec icônes soignées intégrés dans le pied de page (`Footer.tsx`), le menu tiroir mobile (`Navbar.tsx`) et le modal de confidentialité.
6. **Base de Données Solide & Totalement Fonctionnelle** :
   - Moteur backend Express avec stockage persistant typé (`lowdb`) enregistrant chaque demande de projet avec référence unique de suivi (`OD-YYYY-XXXXX`), horodatage et audit trail.

---

## 2. ARCHITECTURE DE LA BASE DE DONNÉES

L'application intègre une architecture full-stack moderne propulsée par Express et une base de données persistante structurée.

### Structure du Fichier de Stockage
- **Emplacement physique** : `./data/database.json`
- **Moteur** : `lowdb` (JSONFilePreset) avec écritures atomiques sécurisées.
- **Sauvegarde** : Les données survivent aux redémarrages du serveur et sont facilement sauvegardables ou exportables.

### Modèle de Données (TypeScript Schema)

```typescript
export interface SubmissionRecord {
  id: string;               // Identifiant unique système (ex: sub_1741234567_a8f9)
  reference: string;        // Numéro de dossier client (ex: OD-2026-84729)
  fullName: string;         // Nom complet du contact
  companyName: string;      // Nom de l'entreprise ou du projet
  email: string;            // Adresse email professionnelle
  service: string;          // Pôle choisi : 'web' | 'mobile' | 'design' | 'growth'
  budget: string;           // Fourchette budgétaire sélectionnée
  currency: string;         // Devise détectée : 'USD' | 'EUR' | 'XOF' | 'GBP'
  description: string;      // Description détaillée du projet
  createdAt: string;        // Date et heure ISO 8601 (ex: 2026-10-15T12:00:00.000Z)
  status: 'received' | 'reviewing' | 'contacted'; // Statut de traitement
  userAgent?: string;       // Navigateur / appareil du visiteur
}

export interface DatabaseSchema {
  submissions: SubmissionRecord[];
  analytics: {
    totalRequests: number;
    lastRequestAt: string | null;
  };
}
```

### Endpoints de l'API RESTful

| Méthode | Route | Description | Exemple de Réponse |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/submissions` | Valide et enregistre une nouvelle demande en base de données. Génère une référence officielle. | `{ "success": true, "reference": "OD-2026-48210", "submission": { ... } }` |
| **GET** | `/api/submissions` | Liste l'ensemble des soumissions enregistrées et les statistiques d'audience. | `{ "total": 12, "submissions": [...], "analytics": { ... } }` |
| **GET** | `/api/submissions/:ref` | Recherche un dossier spécifique par son code de référence. | `{ "submission": { "reference": "OD-2026-48210", ... } }` |
| **GET** | `/api/health` | Vérifie la santé du serveur, l'état de la base de données et le volume d'enregistrements. | `{ "status": "healthy", "database": "lowdb-json-persistent", "totalRecords": 12 }` |

---

## 3. ARBORESCENCE DU CODE SOURCE

```
ouest-dynamics/
├── data/
│   └── database.json              # Fichier physique de la base de données persistante
├── server.ts                      # Serveur full-stack Express + API Database + Middleware Vite
├── index.html                     # Point d'entrée HTML avec balises SEO, OpenGraph et Schema.org
├── metadata.json                  # Métadonnées officielles du projet AI Studio
├── package.json                   # Dépendances et scripts de démarrage full-stack
├── DOCUMENTATION.md               # Cette documentation technique complète
├── GUIDE_MODIFICATION.md          # Guide pratique de modification pas-à-pas
└── src/
    ├── main.tsx                   # Point de montage React
    ├── App.tsx                    # Composant racine, providers et modaux globaux
    ├── index.css                  # Configuration Tailwind CSS moderne
    ├── translations.ts            # Dictionnaire complet bilingue (EN / FR) avec slogan restauré
    ├── context/
    │   ├── LanguageContext.tsx    # Gestion de la langue (EN par défaut, détection FR de l'appareil)
    │   └── CurrencyContext.tsx    # Détection automatique de la monnaie par région
    └── components/
        ├── BrandLogo.tsx          # Logo officiel Ouest Dynamics (géométrie dorée & monogramme)
        ├── Hero.tsx               # Section Hero avec slogan restauré et proof bar responsive
        ├── Hero3DBackground.tsx   # Sculpture cinétique 3D Three.js (Torus titane & maillage or)
        ├── Navbar.tsx             # Barre de navigation capsule (liens, langue, CTA, menu mobile)
        ├── Services.tsx           # Grille éditoriale frameless des 4 pôles d'expertises
        ├── Methodology.tsx        # Parcours en 3 étapes claires avec onglets responsives
        ├── ContactForm.tsx        # Formulaire avec devises auto-adaptées et soumission DB
        ├── PrivacyPolicyModal.tsx # Pop-up thématique de la Politique de Confidentialité
        ├── MobileBottomBar.tsx    # Barre d'actions basse ergonomique pour smartphones
        ├── ProjectModal.tsx       # Modal de cadrage initial de projet
        ├── LoadingScreen.tsx      # Écran de chargement initial fluide
        └── LanguagePromptBanner.tsx # Bannière non-intrusive de proposition de traduction
```

---

## 4. RESPONSIVE DESIGN & CONTRÔLE ERGONOMIQUE

Toutes les déformations visuelles signalées ont été corrigées avec précision :

1. **Section Hero** :
   - La barre d'éléments de réassurance (sur-mesure, monnaie, simplicité, maquette) est désormais organisée sous forme d'une **grille propre 2x2 sur smartphone / 4 colonnes sur tablette et grand écran**, éliminant les séparateurs verticaux orphelins.
   - Les tailles de titres utilisent des classes fluides `text-3xl sm:text-4xl md:text-5xl lg:text-6xl` qui s'ajustent parfaitement sans provoquer de cassures inesthétiques.
2. **Section Services** :
   - Mise en page à 2 colonnes bien équilibrées sur tablette, avec espacement vertical aéré (`gap-10 sm:gap-14 lg:gap-16`).
   - L'alignement bas (bénéfice clé et boutons d'action) a été calibré avec des hauteurs tactiles minimales de `44px`.
3. **Section Méthodologie** :
   - Les 3 étapes utilisent un défilement horizontal fluide sur les écrans étroits (`scrollbar-none`) et une grille nette dès que l'espace le permet, évitant tout tassement du texte.
4. **Formulaire de Contact** :
   - Les champs de saisie disposent d'une taille de police `16px` (`text-base`) sur mobile pour empêcher le zoom intempestif d'iOS Safari, et passent à `text-sm` sur les écrans plus larges.
   - Les boutons de budget sont organisés en grille `grid-cols-2 sm:grid-cols-4` toujours parfaitement symétrique.
5. **Pied de Page (Footer)** :
   - Réorganisation responsive : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-12` pour garantir que chaque bloc (logo, services, méthode, garanties) dispose d'une largeur généreuse sur tablette.

---

## 5. ACCESSIBILITÉ & PHILOSOPHIE ZERO-JARGON

Le vocabulaire du site est spécialement rédigé pour être compris instantanément par n'importe quel porteur de projet, créateur ou dirigeant d'entreprise sans bagage technique :
- Au lieu de termes comme *"Microservices", "SSR", "OWASP"*, le site met en avant des bénéfices réels : **"Votre site s'affiche instantanément sur smartphone"**, **"Vos clients commandent en 2 clics"**, **"Vous validez la maquette avant de coder"**, **"Vous êtes 100% propriétaire de vos créations"**.
- La politique de confidentialité s'adresse directement à l'utilisateur de manière limpide et rassurante.
