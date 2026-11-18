# GUIDE DE MODIFICATION & MAINTENANCE — OUEST DYNAMICS V2

## 1. Modifier la Grille Tarifaire & les Taux de Change (`src/utils/pricingEngine.ts`)
- **Parités Officielles** :
  - `XOF` : Devise pivot (`1`)
  - `EUR` : `1 EUR = 655.957 XOF` (parité fixe zone UEMOA)
  - `USD` : `1 USD = 606.06 XOF`
- **Fourchettes des 4 Pôles (en XOF)** :
  - `BRANDING` : `950 000` – `2 400 000 XOF` (10–15 jours ouvrés)
  - `WEB` : `1 500 000` – `4 500 000 XOF` (15–25 jours ouvrés)
  - `MOBILE_DESKTOP` : `2 800 000` – `7 500 000 XOF` (25–40 jours ouvrés)
  - `GROWTH` : `750 000` – `2 000 000 XOF` (7–14 jours ouvrés)
- **Modificateurs & Remises** :
  - `TRANSVERSE_DA` : `+20%`
  - `TRANSVERSE_AI` : `+25%`
  - `FAST_TRACK_48H` : `+15%`
  - Remise multi-pôles : `-10%` automatique dès 2 pôles sélectionnés.

## 2. Modifier les Traductions (`src/i18n/fr.ts` & `src/i18n/en.ts`)
Les textes en français (langue par défaut) et en anglais sont centralisés et typés dans `src/i18n/fr.ts` et `src/i18n/en.ts`. Toute modification de titre, livrable, étude de cas ou texte légal se répercute immédiatement sur l'ensemble des composants.

## 3. Modifier les Jetons de Design (`design-tokens.json` & `src/index.css`)
Les couleurs et typographies respectent le système **« Architecture Digitale Souveraine »** :
- Fond principal : `#0B0D12` (`surface.obsidian`)
- Cartes & surfaces : `#141821` (`surface.elevated`) et `#1B202C` (`surface.elevatedHover`)
- Or souverain : `#D4AF37` (`accent.sovereignGold`) et `#E3C358` (`accent.goldLightHover`)
- Portail légal clair : `#F8F6F1` (`surface.ivory`) avec accent `#8A6D1B` (`accent.goldAccessibleOnLight`)

## 4. Modifier le Concierge IA (`ai-studio-manifest.json` & `server.ts`)
La route serveur `POST /api/chat` dans `server.ts` lit et applique directement le schéma JSON structuré (`response_schema`) et l'instruction système définis dans `/ai-studio-manifest.json`.
