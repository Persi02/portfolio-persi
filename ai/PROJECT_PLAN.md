# PROJECT_PLAN.md — Plan détaillé du portfolio

> Plan en 18 phases. Chaque phase définit un objectif, des tâches, les fichiers concernés, ses dépendances et ses critères de validation.
> Avant chaque session : lire `PROJECT_SPEC.md`, `PROJECT_RULES.md`, `PROJECT_PLAN.md`, `TASKS.md`, identifier la phase actuelle et choisir la prochaine tâche logique.

---

## Dépendances d'ensemble

```text
Phase 1 ─► Phase 2 ─► Phase 3 ─► Phase 4 ─► Phase 5/6/7/8/10/11/12 ─► Phase 9/13 ─► 14/15/16 ─► 17 ─► 18
```

- Phase 2 (architecture) dépend de la Phase 1 (initialisation).
- Phase 3 (design system) dépend de la Phase 2.
- Phase 4 (layout/navigation) dépend de la Phase 3.
- Phases 5, 6, 7, 8, 10, 11, 12 (sections) dépendent de la Phase 4 et de la Phase 3. Elles peuvent être développées dans l'ordre logique (5 → 6 → 7 → 8 → 10 → 11 → 12).
- Phase 9 (project detail) dépend de la Phase 8 (données + ProjectCard).
- Phase 13 (animations) s'intègre en continu sur les phases précédentes.
- Phases 14, 15, 16 (SEO, a11y, perf) s'appliquent en finition sur l'ensemble.
- Phase 17 (testing) après stabilisation.
- Phase 18 (production) en dernier.

---

## Phase 1 — Initialisation

**Objectif :** initialiser le projet Next.js avec la stack définie, versionnée et opérationnelle.

### Tâches

1. Créer le projet Next.js (App Router) + TypeScript via `create-next-app`.
2. Installer et configurer Tailwind CSS.
3. Installer shadcn/ui (init + thème).
4. Installer les dépendances : `lucide-react`, `framer-motion` (ou `motion`), `zod`, `react-hook-form`, `@hookform/resolvers`.
5. Mettre en place `.gitignore` (node_modules, .next, etc.) et initialiser le dépôt Git si demandé.
6. Configurer ESLint et le strict mode TypeScript.
7. Créer la structure de dossiers `src/` du cahier des charges.
8. Mettre en place `src/lib/utils.ts` (fonction `cn`).

### Fichiers concernés

`package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `src/lib/utils.ts`, `.gitignore`.

### Dépendances

Aucune (démarre sur le repo vide).

### Critères de validation

- `npm run dev` fonctionne et affiche une page vide.
- `npm run build` passe sans erreur.
- Structure `src/` conforme au spec.
- `cn` importable et fonctionnel.

---

## Phase 2 — Architecture

**Objectif :** poser les fondations de données typées et la structure de navigation.

### Tâches

1. Créer les types : `Project` (§10 du spec) dans `src/types/project.ts`, puis `skill.ts`, `experience.ts`, `service.ts`, `social-link.ts`.
2. Créer les fichiers de données vides/typés : `src/data/projects.ts`, `skills.ts`, `experience.ts`, `services.ts`, `social-links.ts`.
3. Créer les helpers d'accès : `getProjects()`, `getProjectBySlug(slug)`, `getFeaturedProjects()`, `getAdjacentProjects(slug)` dans `src/lib/projects.ts`.
4. Préparer les placeholders de données personnelles (EMAIL, GITHUB_URL, LINKEDIN_URL, PHOTO, LOCATION) dans `src/data/site.ts`.
5. Définir les routes : `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`.
6. Créer les pages vides correspondantes + `not-found.tsx` et `error.tsx`.

### Fichiers concernés

`src/types/*`, `src/data/*`, `src/lib/projects.ts`, `src/app/page.tsx`, `src/app/projects/*`, `src/app/about/*`, `src/app/contact/*`, `src/app/not-found.tsx`, `src/app/error.tsx`.

### Dépendances

Phase 1.

### Critères de validation

- Les types et données compilent en strict mode.
- Les 5 routes répondent (pages vides).
- L'ajout d'un projet ne nécessite aucune modification de composant (vérifié sur les helpers).

---

## Phase 3 — Design System

**Objectif :** créer l'identité visuelle (tokens, thème sombre/clair, typographie) conforme au concept technique premium.

### Tâches

1. Définir la palette de couleurs sombre (thème principal) et claire dans les variables CSS + `tailwind.config.ts` (cohérente avec shadcn/ui).
2. Définir la typographie avec `next/font` (titres + texte), `display: swap`.
3. Définir les tokens : rayons, ombres, espacements, transitions.
4. Créer les primitives UI de base : `Button`, `Badge`, `Card`, `Input`, `Textarea`, `Label`, `Select` (via shadcn/ui).
5. Créer les wrappers d'animation réutilisables dans `src/components/animations/` (reveal, stagger, reduced-motion aware).
6. Mettre en place le switch de thème (sombre par défaut) sans flash visuel (script inline + classe sur `<html>`).
7. Définir les règles visuelles anti-générique (pas de gradients énormes, pas d'effet hacker) dans `globals.css`.

### Fichiers concernés

`src/app/globals.css`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/providers.tsx` (theme), `src/components/ui/*`, `src/components/animations/*`, `src/lib/theme*`.

### Dépendances

Phase 2.

### Critères de validation

- Les deux thèmes (sombre par défaut + clair) s'affichent correctement sur les primitives.
- Aucun flash de thème au chargement/au changement de page.
- `prefers-reduced-motion` respecté par les wrappers d'animation.
- Les primitives sont réutilisées sur toutes les pages vides (boutons, badges).

---

## Phase 4 — Layout / Navigation

**Objectif :** créer le shell du site : header, navigation (desktop + mobile), footer.

### Tâches

1. Créer le `Header` (logo/nom, nav : Accueil, Projets, À propos, Contact ; bouton thème).
2. Créer la navigation mobile (menu accessible au clavier, focus visible, pas de piège).
3. Créer le `Footer` minimaliste (nom, Web Developer, navigation, GitHub, LinkedIn, email, copyright).
4. Intégrer Header et Footer dans `app/layout.tsx`.
5. Gérer l'état actif de la navigation selon la route.

### Fichiers concernés

`src/components/layout/header.tsx`, `src/components/layout/mobile-nav.tsx`, `src/components/layout/footer.tsx`, `src/app/layout.tsx`, `src/data/navigation.ts` (éventuel).

### Dépendances

Phase 3.

### Critères de validation

- Navigation complète sur desktop et mobile (clavier + tactile).
- Footer conforme au spec (§25) sans informations inventées.
- La route active est correctement mise en évidence.
- Pas de JavaScript inutile côté client pour le rendu statique du header.

---

## Phase 5 — Hero

**Objectif :** créer le Hero principal (titre, phrase forte, CTAs) avec une identité visuelle de développeur professionnelle et abstraite.

### Tâches

1. Rédiger le texte du Hero : titre « Web Developer / Full-Stack JavaScript Developer », phrase forte sur les applications Web modernes, court.
2. Créer le visuel abstrait inspiré du code/terminal/architecture (interface stylisée, pas une capture d'écran).
3. Ajouter les CTAs : Projects, Contact, GitHub (si l'URL est fournie).
4. Ajouter l'animation d'entrée (Framer Motion, respect de `prefers-reduced-motion`).
5. Optimiser l'image LCP du Hero.

### Fichiers concernés

`src/components/sections/hero.tsx`, `src/components/sections/hero-visual.tsx`, `src/data/site.ts`, `src/app/page.tsx`.

### Dépendances

Phases 3 et 4.

### Critères de validation

- Le message clé du spec est visible immédiatement.
- Le visuel est professionnel et original (pas de « portfolio hacker »).
- Les CTAs mènent aux bonnes routes.
- LCP rapide et animation fluide.

---

## Phase 6 — About

**Objectif :** créer la section About (identité, parcours, philosophie, spécialisation) sans recopier un CV.

### Tâches

1. Rédiger le texte About court : qui est Herinjaka, comment il travaille, sa spécialisation full-stack.
2. Créer la section About dans `src/components/sections/about.tsx`.
3. Mettre en évidence la spécialisation (frontend + full-stack) et la philosophie de travail.
4. Respecter la règle d'honnêteté (aucune expérience inventée).

### Fichiers concernés

`src/components/sections/about.tsx`, `src/data/site.ts` (texte), `src/app/page.tsx`.

### Dépendances

Phase 4.

### Critères de validation

- Texte court, honnête, raconte le développeur (pas une liste de dates).
- Section lisible et cohérente avec le design system.

---

## Phase 7 — Skills

**Objectif :** afficher les compétences par catégories avec priorités visuelles.

### Tâches

1. Créer `src/data/skills.ts` typé avec les 5 catégories du spec (§21).
2. Créer `src/components/sections/skills.tsx` (regroupement par catégorie).
3. Mettre React, Next.js et Node.js en priorité visuelle (mise en avant, plus grande, en tête de catégorie).
4. Afficher uniquement les catégories/compétences présentes dans les données (pas de section vide).

### Fichiers concernés

`src/data/skills.ts`, `src/types/skill.ts`, `src/components/sections/skills.tsx`.

### Dépendances

Phase 3 (primitives) et Phase 4.

### Critères de validation

- Les 5 catégories affichées avec les compétences listées.
- Hiérarchie visuelle respectée (React/Next/Node prioritaires).
- Aucune section vide.

---

## Phase 8 — Projects

**Objectif :** créer la section « Selected Projects » (ProjectCard) pilotée par les données, prête pour 3–5 projets.

### Tâches

1. Finaliser `src/types/project.ts` et créer `src/data/projects.ts` **initialisé vide** (`[]`) — la structure est prête à recevoir les vrais projets sans modification des composants. Aucun projet fictif n'est ajouté.
2. Créer `ProjectCard` (preview, titre, catégorie, description, stack, année, CTA ; hover élégant : mouvement subtil, animation image, apparition CTA).
3. Créer la section Projects (`src/components/sections/projects.tsx`) affichant les projets `featured`.
4. Créer la page `/projects` listant tous les projets.
5. Préparer les dossiers d'images `public/projects/project-01/…project-05/` avec consigne WebP/AVIF.
6. Gérer les liens live/GitHub uniquement s'ils existent.

### Fichiers concernés

`src/types/project.ts`, `src/data/projects.ts`, `src/components/projects/project-card.tsx`, `src/components/sections/projects.tsx`, `src/app/projects/page.tsx`, `public/projects/*`.

### Dépendances

Phases 3, 4, 7 (cohérence).

### Critères de validation

- Les cartes sont pilotées par les données (aucun contenu en dur).
- Hover élégant conforme au spec (§14).
- L'ajout d'un projet (données + images) ne touche aucun composant.
- Une liste de projets vide est gérée proprement (état neutre, aucune carte fictive affichée).
- Page `/projects` fonctionnelle et responsive.

---

## Phase 9 — Project Detail

**Objectif :** créer la page `/projects/[slug]` entièrement pilotée par les données.

### Tâches

1. Créer `src/app/projects/[slug]/page.tsx` avec `generateStaticParams` et `generateMetadata`.
2. Composer les sections dans l'ordre : Hero, Overview, Context, Problem, Solution, Features, Tech Stack, Architecture, Challenges, Results, Gallery, Links.
3. Afficher chaque section uniquement si les données correspondantes existent (champ null/missing = pas de section).
4. Section Results : contenu neutre ou absente si aucune donnée réelle.
5. Créer la galerie de screenshots (Next Image, lazy, lightbox éventuelle).
6. Ajouter la navigation projet précédent/suivant + retour aux projets + CTA « View all projects ».
7. Gérer le cas projet inexistant via `notFound()`.

### Fichiers concernés

`src/app/projects/[slug]/page.tsx`, `src/components/projects/project-hero.tsx`, `project-section.tsx`, `project-gallery.tsx`, `project-nav.tsx`, `src/lib/projects.ts`.

### Dépendances

Phases 3, 4, 8.

### Critères de validation

- Chaque route `/projects/[slug]` se génère depuis les données.
- Aucune section vide affichée.
- Les métadatas par projet sont spécifiques.
- Navigation précédent/suivant correcte aux extrémités de la liste.

---

## Phase 10 — Experience

**Objectif :** créer la timeline des expériences et formations.

### Tâches

1. Créer `src/data/experience.ts` avec les expériences du spec (§3) et les formations (§4) — sans invention.
2. Créer `src/components/sections/experience.tsx` (timeline élégante : entreprise, poste, période, description, technologies).
3. Marquer clairement « 2026 — aujourd'hui » pour Bienfe.
4. Afficher les technologies uniquement si pertinentes pour l'expérience.

### Fichiers concernés

`src/data/experience.ts`, `src/types/experience.ts`, `src/components/sections/experience.tsx`.

### Dépendances

Phase 3, 4.

### Critères de validation

- Timeline cohérente, lisible sur mobile.
- Aucune information inventée.
- Technologies affichées sans section vide.

---

## Phase 11 — Services

**Objectif :** présenter brièvement les types de projets réalisables.

### Tâches

1. Créer `src/data/services.ts` (Frontend, Full-stack, E-commerce, Applications métier).
2. Créer `src/components/sections/services.tsx` (concise, 4 cartes max).
3. Lier éventuellement à la section Contact.

### Fichiers concernés

`src/data/services.ts`, `src/types/service.ts`, `src/components/sections/services.tsx`.

### Dépendances

Phase 3, 4.

### Critères de validation

- Section concise (4 services max).
- Design cohérent, aucun contenu en dur.

---

## Phase 12 — Contact

**Objectif :** créer la section/page contact avec formulaire validé Zod.

### Tâches

1. Créer le schéma Zod (`src/lib/validations/contact.ts`) : nom, email, sujet, message.
2. Créer le formulaire avec React Hook Form + Zod resolver (états d'erreur accessibles champ par champ).
3. À la phase initiale : soumission simulée réussie (prototype) — la connecter à un backend/email uniquement si justifié (règle spec §8).
4. Afficher email, GitHub, LinkedIn (seulement si les URLs existent).
5. CTA : « Vous avez un projet ? Parlons-en. »

### Fichiers concernés

`src/lib/validations/contact.ts`, `src/components/sections/contact.tsx`, `src/app/contact/page.tsx`, `src/data/social-links.ts`.

### Dépendances

Phases 3, 4.

### Critères de validation

- Validation Zod opérationnelle (messages clairs, accessibles).
- Soumission gérée sans plantage ; comportement documenté (prototype vs réel).
- Liens affichés uniquement si disponibles.

---

## Phase 13 — Animations

**Objectif :** soigner les animations globales (Framer Motion) sans les rendre dominantes.

### Tâches

1. Animer le Hero (entrée) — déjà fait en Phase 5, vérifier cohérence.
2. Ajouter les révélations de sections (scroll reveal, stagger) via `src/components/animations/`.
3. Animer ProjectCard (hover, entrée).
4. Animer la navigation et les transitions de pages.
5. Animer les boutons et micro-interactions.
6. Vérifier `prefers-reduced-motion` sur toutes les animations.

### Fichiers concernés

`src/components/animations/*`, `src/components/sections/*`, `src/components/projects/*`.

### Dépendances

Phases 5–12 (s'applique sur les sections existantes).

### Critères de validation

- Animations fluides, légères, sans layout shift.
- `prefers-reduced-motion` respecté.
- L'animation renforce l'expérience, ne domine pas le contenu.

---

## Phase 14 — SEO

**Objectif :** compléter le référencement.

### Tâches

1. Metadata globale complète (title template, description, OG, canonical, icons).
2. `generateMetadata` par projet (vérifier Phase 9).
3. `app/sitemap.ts` et `app/robots.ts`.
4. Structured data `Person` (JSON-LD) sur la page d'accueil.
5. Vérifier `lang="fr"`, slugs stables, URL canoniques.

### Fichiers concernés

`src/app/layout.tsx`, `src/app/projects/[slug]/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/page.tsx`.

### Dépendances

Phases 5–12 (contenu en place).

### Critères de validation

- Chaque page/projet a title et description uniques.
- Sitemap et robots générés avec les bonnes URLs.
- OG correctement configuré (images incluses).

---

## Phase 15 — Accessibilité

**Objectif :** auditer et corriger l'accessibilité de l'ensemble.

### Tâches

1. Audit clavier (tabulation, focus visible, pas de piège).
2. Audit HTML sémantique (landmarks, h1 unique par page).
3. Audit contrastes (thèmes clair et sombre, AA).
4. Vérifier alt, labels de formulaires, aria des composants interactifs.
5. Vérifier `prefers-reduced-motion`.
6. Vérifier les cibles tactiles (44 px).

### Fichiers concernés

Tous les composants interactifs et sections.

### Dépendances

Phases 4–13.

### Critères de validation

- Navigation complète au clavier.
- Contrastes AA sur les deux thèmes.
- Formulaires et composants accessibles (aria corrects).

---

## Phase 16 — Performance

**Objectif :** obtenir un excellent score Lighthouse.

### Tâches

1. Vérifier les images (formats WebP/AVIF, dimensions, lazy, LCP).
2. Vérifier les Server Components (peu de JS client).
3. Vérifier le bundle Framer Motion (LazyMotion si pertinent).
4. Vérifier les polices (`next/font`, swap).
5. Auditer Lighthouse (mobile + desktop) et corriger les points faibles.

### Fichiers concernés

Ensemble du code.

### Dépendances

Phases 4–13.

### Critères de validation

- Lighthouse ≥ 90 sur Performance, Accessibilité, Bonnes pratiques, SEO (mobile + desktop).

---

## Phase 17 — Testing

**Objectif :** mettre en place les tests pertinents.

### Tâches

1. Tester les helpers de données (`getProjects`, `getProjectBySlug`, adjacents).
2. Tester la validation Zod du formulaire de contact.
3. Tester le rendu de ProjectCard (données manquantes, liens absents).
4. Tester le cas projet inexistant (not-found).
5. Vérifier que l'ajout d'un projet ne casse aucun test.

### Fichiers concernés

`src/lib/projects.test.ts`, `src/lib/validations/contact.test.ts`, `src/components/projects/project-card.test.tsx` (selon le framework choisi : Vitest + Testing Library).

### Dépendances

Phases 8, 9, 12.

### Critères de validation

- Tests passants via `npm test`.
- Couverture des cas d'absence de données.

---

## Phase 18 — Production

**Objectif :** préparer le déploiement et la livraison.

### Tâches

1. Renseigner les vraies données personnelles (email, GitHub, LinkedIn, photo, location).
2. Ajouter les vrais projets fournis par Herinjaka (titre, description, rôle, année, technologies, fonctionnalités, screenshots, cover/preview, lien Live, lien GitHub si disponible, étude de cas) — aucun projet publié sans validation.
3. Configurer le déploiement (Vercel recommandé).
4. Vérifier build de production (`npm run build`), env variables.
5. Vérifier les métadatas finales (nom, URLs de production).
6. Test final Lighthouse + navigation complète.

### Fichiers concernés

`src/data/*`, `next.config.ts`, variables d'environnement, plateforme de déploiement.

### Dépendances

Toutes les phases précédentes.

### Critères de validation

- Site déployé et accessible en production.
- Aucune donnée placeholder ni contenu non vérifié.
- Build de production sans erreur.
