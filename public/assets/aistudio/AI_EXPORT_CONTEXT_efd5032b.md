# AI_EXPORT_CONTEXT — OUEST DYNAMICS PLATFORM (V2)

## 1. Identité du Projet
- **Nom** : Ouest Dynamics — Plateforme Officielle & Configurateur de Brief B2B
- **Entité** : Ouest Dynamics (Abidjan, Côte d'Ivoire — Rayonnement Afrique de l'Ouest & International)
- **Modèle Opérationnel** : 4 Pôles d'expertise (Branding, Web, Mobile/Desktop, Growth/Visibilité) pilotés par 2 Moteurs Transverses (Direction Artistique Executive & Ingénierie IA/Automatisation) selon l'architecture *Core & Elastic Guilds*.

## 2. Objectif du Reprototypage dans Google AI Studio
Corriger les dettes structurelles de la V1 :
1. Remplacer la vitrine générique par une plateforme de conversion B2B incarnant la gouvernance réelle d'Ouest Dynamics.
2. Supprimer `LoadingScreen.tsx` et les 6 Mo d'images `.jpg` non compressées au profit d'un rendu instantané et d'actifs vectoriels/optimisés.
3. Remplacer le formulaire de contact monolithique par un **Configurateur de Brief en 4 étapes** connecté au moteur tarifaire multi-devises (`XOF`, `EUR`, `USD`) et couplé au **Concierge IA (Structured Output)** capable de pré-remplir le brief.
4. Unifier les surfaces juridiques (ARTCI Côte d'Ivoire / RGPD) et éliminer toute duplication entre modales et pages légales.

## 3. Règles Métier Critiques à Respecter dans le Code
- **Devises** : `XOF` (devise pivot, format `1 500 000 FCFA`), `EUR` (`1 EUR = 655.957 XOF`), `USD` (`1 USD = 606.06 XOF`).
- **Tarification Indicative** : Basée sur des fourchettes réalistes d'agence internationale intégrant une marge brute cible de 45 % à 55 % et l'échéancier contractuel `40 % signature / 30 % jalon design-archi / 30 % recette`.
- **Sécurité IA** : L'assistant IA ne doit jamais inventer de remises commerciales ni d'engagements juridiques hors cadre ; il oriente systématiquement vers le Configurateur de Brief.
