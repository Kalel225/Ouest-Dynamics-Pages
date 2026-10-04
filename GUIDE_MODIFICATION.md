# GUIDE PRATIQUE DE MODIFICATION DU CODE — OUEST DYNAMICS

Ce guide vous accompagne pas-à-pas pour personnaliser, mettre à jour et faire évoluer facilement les éléments clés de la plateforme web **Ouest Dynamics**.

---

## SOMMAIRE
1. [Gestion du Système Bilingue & Textes (Anglais / Français)](#1-gestion-du-système-bilingue--textes-anglais--français)
2. [Modifier la Palette de Couleurs (Design System)](#2-modifier-la-palette-de-couleurs)
3. [Gérer les Domaines d'Expertise (Ajouter / Modifier un Service)](#3-gérer-les-domaines-dexpertise)
4. [Modifier les Jalons de la Méthodologie](#4-modifier-les-jalons-de-la-méthodologie)
5. [Ajuster ou Personnaliser l'Arrière-Plan 3D du Hero (Desktop & Mobile)](#5-ajuster-ou-personnaliser-larrière-plan-3d-du-hero-desktop--mobile)
6. [Personnaliser la Barre d'Action Mobile (Thumb Zone)](#6-personnaliser-la-barre-daction-mobile-thumb-zone)
7. [Configurer le Bandeau de Détection de Langue de l'Appareil](#7-configurer-le-bandeau-de-détection-de-langue-de-lappareil)
8. [Connecter le Formulaire de Contact à un Vrai E-mail ou API](#8-connecter-le-formulaire-de-contact-à-un-vrai-e-mail-ou-api)
9. [Modifier les Villes et Coordonnées du Footer](#9-modifier-les-villes-et-coordonnées-du-footer)
10. [Commandes de Compilation et Déploiement](#10-commandes-de-compilation-et-déploiement)

---

## 1. GESTION DU SYSTÈME BILINGUE & TEXTES (ANGLAIS / FRANÇAIS)

Le site applique par défaut le **standard américain (page en anglais)** tout en intégrant une version française complète et un système de bascule automatique selon la langue du terminal.

- **Fichier central des textes** : `src/translations.ts`

Tous les textes sont centralisés dans deux blocs `en` et `fr` :
```typescript
export const translations: Record<Language, Translations> = {
  en: {
    hero: {
      title: 'Digital Excellence Engineered for Your Growth.',
      subtitle: 'We architect high-performance custom web and mobile platforms...',
      // ...
    },
    // ...
  },
  fr: {
    hero: {
      title: "L'Excellence Numérique au Service de votre Croissance.",
      subtitle: "Nous concevons des plateformes web et mobiles sur-mesure...",
      // ...
    },
    // ...
  }
};
```

> **Pour modifier un texte** : Ouvrez `src/translations.ts` et modifiez simultanément la clé sous `en` et sous `fr`. Le site mettra instantanément à jour l'affichage selon la langue active sélectionnée par l'utilisateur.

---

## 2. MODIFIER LA PALETTE DE COULEURS

Toutes les variables fondamentales de couleur sont déclarées dans `src/index.css`.

- **Fichier** : `src/index.css`
```css
@layer base {
  :root {
    --color-obsidian: #0B0B0B;   /* Fond principal - True Dark Mode */
    --color-pearl: #F4F4F6;      /* Couleur de texte des paragraphes */
    --color-gold: #D4AF37;       /* Or Champagne signature */
    --color-gold-hover: #E2C255; /* Couleur de survol des boutons dorés */
    --color-tech-gray: #262626;  /* Gris technique pour bordures subtiles */
  }
}
```

---

## 3. GÉRER LES DOMAINES D'EXPERTISE

Les 4 pôles d'excellence sont déclarés dans le tableau `services.items` de `src/translations.ts`.

- **Fichier** : `src/translations.ts`

### Exemple : Modifier un service existant
```typescript
{
  id: 'web',
  number: '01',
  title: 'Web & E-Commerce Infrastructure',
  subtitle: 'High-Performance Architectures & Hybrid Global Payments',
  description: 'Your custom description...',
  deliverables: [
    'Deliverable 1',
    'Deliverable 2',
    'Deliverable 3'
  ],
  keyMetric: '< 650ms',
  metricLabel: 'Global Average Page Load Time',
  techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe API']
}
```
*Pensez à mettre à jour la traduction équivalente dans la section `fr`.*

---

## 4. MODIFIER LES JALONS DE LA MÉTHODOLOGIE

- **Fichier** : `src/translations.ts`
- **Clé** : `methodology.steps` et `methodology.pillars`

Chaque jalon contient :
- `number` : Numéro d'étape (`'01'`, `'02'`, `'03'`).
- `title` : Intitulé du jalon.
- `tagline` : Résumé exécutif.
- `description` : Explication du processus.
- `checkpoints` : Tableau contenant les vérifications de conformité.
- `deliverable` : Livrable remis au client.
- `delay` : Délai contractuel estimé.

---

## 5. AJUSTER OU PERSONNALISER L'ARRIÈRE-PLAN 3D DU HERO (DESKTOP & MOBILE)

Le composant WebGL Three.js est situé dans `src/components/Hero3DBackground.tsx`.

### A. Distance de caméra selon l'écran (Mobile vs Desktop)
Vers la ligne 18 :
```typescript
const isMobile = width < 640;
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
// z: 10.8 sur smartphone pour reculer l'objet et dégager le texte
// z: 8.2 sur grand écran
camera.position.set(0, 0, isMobile ? 10.8 : 8.2);
```

### B. Vitesse de rotation autonome
Dans la fonction `animate()` (vers la ligne 140) :
```typescript
mainMesh.rotation.y = elapsedTime * 0.12; // Vitesse de rotation horizontale
mainMesh.rotation.x = elapsedTime * 0.08; // Vitesse de rotation verticale
```

### C. Sensibilité au mouvement du curseur / doigt
Dans `handleMouseMove` (vers la ligne 105) :
```typescript
targetRotationY = mouseX * 0.45; // Axe horizontal
targetRotationX = mouseY * 0.35; // Axe vertical
```

---

## 6. PERSONNALISER LA BARRE D'ACTION MOBILE (THUMB ZONE)

Pour offrir une ergonomie optimale sur smartphone, la barre basse flottante est isolée dans `src/components/MobileBottomBar.tsx`.

- **Affichage** : Visible uniquement sur smartphone (`sm:hidden`).
- **Composants** :
  - Toggle rapide de langue `[EN | FR]`.
  - Bouton icône pour sauter immédiatement au formulaire de contact.
  - Bouton large doré pour lancer le formulaire de cadrage d'un geste du pouce.

---

## 7. CONFIGURER LE BANDEAU DE DÉTECTION DE LANGUE DE L'APPAREIL

- **Fichier** : `src/context/LanguageContext.tsx` et `src/components/LanguagePromptBanner.tsx`

La détection repose sur `navigator.language` :
- Si l'appareil d'un visiteur est configuré en français, le site s'ouvre par défaut en anglais (standard américain) et affiche immédiatement un élégant bandeau flottant :
  *"Langue détectée : Votre appareil est en français. Souhaitez-vous basculer le site en français ?"*
- En cliquant sur "Passer en Français", la préférence est mémorisée dans le navigateur (`localStorage.getItem('od_lang')`).

---

## 8. CONNECTER LE FORMULAIRE DE CONTACT À UN VRAI E-MAIL OU API

Le formulaire actuel simule la réception d'un dossier avec génération d'une référence sécurisée (`OD-2026-XXXX`).

- **Fichier** : `src/components/ContactForm.tsx`
- **Fonction** : `handleSubmit` (vers la ligne 45)

### Exemple de branchement API REST / Webhook
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    const response = await fetch('https://api.votre-domaine.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, companyName, email, service, budget, description })
    });

    if (response.ok) {
      const data = await response.json();
      setDossierRef(data.referenceId || `OD-${new Date().getFullYear()}-001`);
      setSubmitted(true);
    }
  } catch (err) {
    console.error('Erreur lors de la transmission', err);
  } finally {
    setLoading(false);
  }
};
```

---

## 9. MODIFIER LES VILLES ET COORDONNÉES DU FOOTER

Conformément aux directives, les mentions de Dakar et Paris ont été retirées du site pour ne conserver qu'**Abidjan**.

- **Fichier** : `src/components/Footer.tsx` (vers la ligne 30) et `src/translations.ts` sous `footer.location`.

Pour modifier la localisation :
```typescript
// Dans src/translations.ts :
footer: {
  // ...
  location: 'Abidjan', // Modifiez ici si vous souhaitez changer le siège
}
```

---

## 10. COMMANDES DE COMPILATION ET DÉPLOIEMENT

### Développement Local
```bash
npm run dev
# Démarre le serveur local sur http://localhost:3000
```

### Contrôle de Type TypeScript
```bash
npm run lint
# Exécute tsc --noEmit
```

### Compilation pour la Production
```bash
npm run build
# Génère les fichiers optimisés dans /dist
```

### Hébergement
Le dossier `/dist` est 100% statique et peut être déployé immédiatement sur **Vercel**, **Netlify**, **Cloud Run**, ou un serveur Nginx/Apache.
