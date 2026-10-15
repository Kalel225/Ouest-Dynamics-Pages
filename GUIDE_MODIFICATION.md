# GUIDE PRATIQUE DE MODIFICATION DU CODE — OUEST DYNAMICS

Ce guide pratique est conçu pour permettre à **n'importe quel collaborateur ou développeur (même débutant)** de modifier les textes, les monnaies, la base de données, les réseaux sociaux et le pop-up de confidentialité.

---

## SOMMAIRE
1. [Comment modifier le Slogan et les Textes](#1-comment-modifier-le-slogan-et-les-textes)
2. [Comment gérer et consulter la Base de Données](#2-comment-gérer-et-consulter-la-base-de-données)
3. [Comment fonctionnent les Devises Automatiques](#3-comment-fonctionnent-les-devises-automatiques)
4. [Comment modifier les Liens des Réseaux Sociaux (TikTok, Facebook, Instagram)](#4-comment-modifier-les-liens-des-réseaux-sociaux)
5. [Comment personnaliser la Politique de Confidentialité](#5-comment-personnaliser-la-politique-de-confidentialité)
6. [Comment tester et déployer l'application](#6-comment-tester-et-déployer-lapplication)

---

## 1. COMMENT MODIFIER LE SLOGAN ET LES TEXTES

Tous les textes affichés sur le site se trouvent dans un fichier unique :
📂 **`src/translations.ts`**

Ce fichier contient deux blocs : `en` (Anglais, version principale) et `fr` (Français).

### Modifier le Slogan du Hero :
Ouvrez `src/translations.ts` et recherchez la clé `hero.title` :

```typescript
// Pour la version anglaise (vers la ligne 165) :
hero: {
  surtitle: 'DIGITAL ENGINEERING & GROWTH PARTNER',
  title: 'Digital Excellence Engineered for Your Growth.', // <-- MODIFIER ICI
  subtitle: 'We design and build bespoke high-performance websites...',
  ...
}

// Pour la version française (vers la ligne 430) :
hero: {
  surtitle: 'INGÉNIERIE DIGITALE & PARTENAIRE DE CROISSANCE',
  title: "L'Excellence Numérique au Service de Votre Croissance.", // <-- MODIFIER ICI
  subtitle: "Nous concevons et développons des sites web d'exception...",
  ...
}
```

*Astuce* : Modifiez toujours les deux versions (anglaise et française) pour garantir la parfaite cohérence du site bilingue.

---

## 2. COMMENT GÉRER ET CONSULTER LA BASE DE DONNÉES

Le site intègre une vraie base de données persistante fonctionnelle dans :
📂 **`server.ts`** et 📂 **`data/database.json`**

### A. Consulter les demandes reçues
Dès qu'un visiteur remplit le formulaire sur le site, ses coordonnées sont automatiquement enregistrées dans le fichier `data/database.json`.

Vous pouvez consulter toutes les demandes à tout moment de deux façons simples :

1. **Directement dans le fichier JSON** :
   Ouvrez le fichier `./data/database.json`. Vous y trouverez la liste de toutes les soumissions avec leur date, nom, email, budget et référence unique :
   ```json
   {
     "submissions": [
       {
         "id": "sub_1741234567_a8f9",
         "reference": "OD-2026-48210",
         "fullName": "Sarah Lawson",
         "companyName": "Aura Luxury",
         "email": "sarah@auraluxury.com",
         "service": "web",
         "budget": "7k-15k",
         "currency": "USD",
         "description": "Nous souhaitons concevoir une boutique de cosmétiques haut de gamme...",
         "createdAt": "2026-10-15T10:30:00.000Z",
         "status": "received"
       }
     ]
   }
   ```

2. **Via l'API REST dans votre navigateur ou via Curl** :
   - Ouvrez dans votre navigateur l'URL : `http://localhost:3000/api/submissions`
   - Pour vérifier l'état de la base de données : `http://localhost:3000/api/health`

### B. Modifier les champs enregistrés en base de données
Si vous souhaitez ajouter un nouveau champ (par exemple un numéro de téléphone) :
1. Dans `server.ts`, ajoutez le champ dans l'interface `SubmissionRecord` et dans la route `app.post('/api/submissions')`.
2. Dans `src/components/ContactForm.tsx`, ajoutez le champ `input` dans le formulaire et intégrez sa valeur dans le payload `fetch('/api/submissions')`.

---

## 3. COMMENT FONCTIONNENT LES DEVISES AUTOMATIQUES

Les devises s'adaptent automatiquement selon la région de connexion du visiteur, sans bouton superflu.

Fichier responsable : 📂 **`src/context/CurrencyContext.tsx`**

### Monnaies prises en charge :
- **USD ($)** : États-Unis, Canada, international par défaut.
- **EUR (€)** : Europe / Union Européenne (France, Belgique, Allemagne, etc.).
- **XOF (F CFA)** : Afrique de l'Ouest et zone Franc CFA (Côte d'Ivoire, Sénégal, etc.).
- **GBP (£)** : Royaume-Uni.

### Modifier les tranches budgétaires d'une monnaie :
Ouvrez `src/context/CurrencyContext.tsx` et modifiez les objets dans `CURRENCIES` :

```typescript
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: {
    code: 'EUR',
    symbol: '€',
    budgets: [
      { id: '3k-7k', label: '3 000 € – 7 000 €' },
      { id: '7k-15k', label: '7 000 € – 15 000 €' },
      { id: '15k-35k', label: '15 000 € – 35 000 €' },
      { id: '35k+', label: '35 000 € +' },
    ],
    ...
  },
  ...
};
```

---

## 4. COMMENT MODIFIER LES LIENS DES RÉSEAUX SOCIAUX

Les liens officiels vers **TikTok**, **Facebook** et **Instagram** sont situés à trois endroits stratégiques :
1. **Dans le pied de page** : 📂 `src/components/Footer.tsx` (vers la ligne 40)
2. **Dans le menu tiroir mobile** : 📂 `src/components/Navbar.tsx` (vers la ligne 185)
3. **Dans le pop-up de confidentialité** : 📂 `src/components/PrivacyPolicyModal.tsx` (vers la ligne 155)

Pour remplacer les URL des comptes officiels, remplacez simplement les liens :
```html
<a href="https://www.tiktok.com/@votre_compte_officiel" ...>
<a href="https://www.facebook.com/votre_page_officielle" ...>
<a href="https://www.instagram.com/votre_compte_officiel" ...>
```

---

## 5. COMMENT PERSONNALISER LA POLITIQUE DE CONFIDENTIALITÉ

Le pop-up de politique de confidentialité thématique s'affiche automatiquement après chaque soumission de projet réussie, et peut également être ouvert depuis le lien en bas de page.

Fichier responsable : 📂 **`src/components/PrivacyPolicyModal.tsx`**

Il contient 5 piliers rédigés en langage clair pour les débutants :
1. **Accord de Non-Divulgation Immédiat (NDA Automatique)**
2. **Zéro Revente de Données & Zéro Spam**
3. **Base de Données Sécurisée & Chiffrée**
4. **Vous Êtes 100% Propriétaire de Vos Réalisations**
5. **Droit d'Accès & Suppression Définitive (RGPD & CCPA)**

Pour ajuster le texte d'un pilier ou changer l'adresse de contact pour la suppression des données (actuellement `privacy@ouestdynamics.com`), modifiez directement le texte dans ce fichier.

---

## 6. COMMENT TESTER ET DÉPLOYER L'APPLICATION

### Lancer le serveur de développement :
```bash
npm run dev
```
Le serveur full-stack démarre sur le port `3000` avec Express et le rechargement à chaud Vite.

### Vérifier la compilation et le typage TypeScript :
```bash
npm run lint
```
Cette commande exécute `tsc --noEmit` et garantit l'absence d'erreurs de syntaxe ou de typage.

### Construire pour la production :
```bash
npm run build
```
Cette commande génère les fichiers optimisés dans le dossier `./dist`. Le serveur `server.ts` servira automatiquement ces fichiers statiques en mode production.
