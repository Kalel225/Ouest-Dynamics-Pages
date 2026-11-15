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

## 2. Configurer le Chatbot IA (« Luxury Engineering Partner »)

- **Interface Frontend** : `src/components/AIChatbot.tsx`
- **Endpoint Backend Gemini** : `POST /api/chat` dans `server.ts` (SDK `@google/genai`, modèle `gemini-4-hydrogen`).
- **Personnalisation du Prompt Système** :
  - Dans `server.ts`, modifiez la variable `systemInstruction` (Français et Anglais) pour ajuster le ton *Luxury Engineering Partner*, les délais ou les arguments commerciaux présentés par l'assistant.
  - La clé API Gemini est gérée automatiquement côté serveur via `process.env.GEMINI_API_KEY` (ne jamais l'exposer côté client).

---

## 3. Personnaliser l'Animation de Chargement Lettre par Lettre

- **Fichiers** : `src/components/LoadingScreen.tsx`, `src/components/BrandLogo.tsx` et `src/components/Navbar.tsx`
- **Fonctionnement** :
  - `BrandLogo.tsx` attribue un identifiant unique à chaque lettre du logo dans la barre de navigation (`nav-ouest-0` jusqu'à `nav-dot`).
  - Pendant l'introduction, `Navbar.tsx` garde son logo invisible (`hideLogoDuringIntro={true}`) pour éviter tout doublon visuel.
  - `LoadingScreen.tsx` mesure le vecteur centre-à-centre et le ratio exact de taille de police vers la barre de navigation, anime chaque lettre avec `motion/react`, puis déclenche `onHandoverLogo()` à l'atterrissage.

---

## 4. Modifier la Section Processus (Chapitre 03) & la FAQ (Chapitre 04)

- **Méthodologie (`src/components/Methodology.tsx`)** : Liste éditoriale en 3 lignes épurées dont les textes sont dans `src/translations.ts` (`methodology.steps`).
- **FAQ (`src/components/FAQ.tsx`)** : Tableau `faqItems` bilingue avec 6 questions-réponses claires et accordéon animé via `AnimatePresence`.

---

## 5. Modifier les Pages Légales (Politique de Confidentialité & CGU)

1. **Page Politique de Confidentialité** : `src/components/PrivacyPolicyPage.tsx` (`/#politique-de-confidentialite` ou `/privacy`).
2. **Page Conditions Générales d'Utilisation (CGU)** : `src/components/TermsPage.tsx` (`/#cgu` ou `/terms`).
3. **Modale de Confidentialité Post-Formulaire** : `src/components/PrivacyPolicyModal.tsx`.

---

## 6. Modifier la Validation du Formulaire & l'Anti-Spam

- **Côté Client (`src/components/ContactForm.tsx`)** : Validation temps réel (`validateField`), champ Honeypot caché (`company_website_url`), délai minimum de soumission (`1200ms`) et défi mathématique humain.
- **Côté Serveur (`server.ts`)** : Vérifie `_honeypot`, `_elapsedMs` (`< 1000ms` rejeté) et limite chaque adresse IP à 8 requêtes par tranche de 10 minutes.
