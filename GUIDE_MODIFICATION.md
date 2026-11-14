# Guide Pratique de Modification & Maintenance — Ouest Dynamics

Ce guide explique comment personnaliser, enrichir et maintenir chaque élément du site **Ouest Dynamics**.

---

## 1. Modifier les Textes, Slogans et Traductions (FR / EN)

Tous les textes bilingues (Français & Anglais) sont centralisés dans :
- **Fichier** : `src/translations.ts`

Le slogan officiel est :
- **Anglais** : `"Digital Excellence Engineered for Your Growth."`
- **Français** : `"L'Excellence Numérique au Service de Votre Croissance."`

---

## 2. Personnaliser l'Animation de Chargement Lettre par Lettre

- **Fichiers** : `src/components/LoadingScreen.tsx`, `src/components/BrandLogo.tsx` et `src/components/Navbar.tsx`
- **Fonctionnement** :
  - `BrandLogo.tsx` attribue un identifiant unique à chaque lettre du logo dans la barre de navigation (`nav-ouest-0` jusqu'à `nav-dot`).
  - Pendant l'introduction, `Navbar.tsx` garde son logo invisible (`hideLogoDuringIntro={true}`) pour éviter tout doublon visuel.
  - `LoadingScreen.tsx` affiche le logo lettre par lettre au centre, mesure le vecteur centre-à-centre et le ratio exact de taille de police vers la barre de navigation, fait glisser chaque lettre avec `motion/react`, puis déclenche `onHandoverLogo()` à l'atterrissage pour un fondu croisé imperceptible.

---

## 3. Modifier la Section Processus en 3 Étapes (Chapitre 03)

- **Fichier** : `src/components/Methodology.tsx`
- Présentée sous forme de 3 lignes éditoriales épurées avec animations d'apparition au scroll (`whileInView`). Les textes des 3 étapes se modifient dans `src/translations.ts` sous la clé `methodology.steps`.

---

## 4. Modifier la Section Questions Fréquentes (FAQ)

- **Fichier** : `src/components/FAQ.tsx`
- Contient le tableau `faqItems` bilingue (Français et Anglais) avec 6 questions-réponses claires et un accordéon animé via `AnimatePresence`. Vous pouvez y ajouter ou modifier des questions directement.

---

## 5. Modifier les Pages Légales (Politique de Confidentialité & CGU)

1. **Page Politique de Confidentialité** : `src/components/PrivacyPolicyPage.tsx` (accessible via `/#politique-de-confidentialite` ou `/privacy`).
2. **Page Conditions Générales d'Utilisation (CGU)** : `src/components/TermsPage.tsx` (accessible via `/#cgu` ou `/terms`).
3. **Modale de Confidentialité Post-Formulaire** : `src/components/PrivacyPolicyModal.tsx`.

---

## 6. Modifier la Validation du Formulaire & l'Anti-Spam

- **Côté Client (`src/components/ContactForm.tsx`)** : Validation en temps réel (`validateField`), champ Honeypot caché (`company_website_url`), délai minimum de soumission (`1200ms`) et défi mathématique humain.
- **Côté Serveur (`server.ts`)** : Vérifie `_honeypot`, `_elapsedMs` (`< 1000ms` rejeté) et limite chaque adresse IP à 8 requêtes par tranche de 10 minutes.
