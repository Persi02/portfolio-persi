# PROJECT_RULES.md — Règles permanentes du projet

> Ce document contient les règles permanentes du portfolio. Chaque session de développement commence par la lecture de ce fichier, de `PROJECT_SPEC.md`, de `PROJECT_PLAN.md` et de `TASKS.md`. Les règles doivent être suivies sans interprétation excessive.

---

## Table des matières

1. [Règles générales](#1-règles-générales)
2. [Conventions de nommage](#2-conventions-de-nommage)
3. [TypeScript](#3-typescript)
4. [Architecture](#4-architecture)
5. [React](#5-react)
6. [Next.js](#6-nextjs)
7. [Tailwind CSS](#7-tailwind-css)
8. [shadcn/ui](#8-shadcnui)
9. [Données](#9-données)
10. [Accessibilité](#10-accessibilité)
11. [Performance](#11-performance)
12. [SEO](#12-seo)
13. [Gestion des erreurs](#13-gestion-des-erreurs)
14. [Sécurité](#14-sécurité)
15. [Git](#15-git)
16. [Checklist de fin de tâche](#16-checklist-de-fin-de-tâche)

---

## 1. Règles générales

1. Toute décision importante est évaluée selon la question de la règle fondamentale du cahier des charges (voir `PROJECT_SPEC.md`).
2. Ne jamais inventer de contenu : pas de client, chiffre, expérience, résultat, témoignage, projet ou compétence non vérifiée.
3. Ne jamais afficher une information vide. Si un champ de données est absent ou null, la section correspondante n'est pas rendue.
4. La documentation `ai/` est mise à jour après chaque changement de périmètre : `TASKS.md` obligatoirement, `PROJECT_SPEC.md` / `PROJECT_PLAN.md` si l'architecture ou le périmètre évolue.
5. La langue du contenu du portfolio et des commentaires de code est le français. Le code (identifiants, chaînes techniques) reste en anglais.
6. Aucun exemple de structure de projet ne doit apparaître dans le rendu du portfolio. Seuls les projets réellement fournis et validés par Herinjaka sont affichés.

---

## 2. Conventions de nommage

| Élément | Convention | Exemple |
|---|---|---|
| Fichiers et dossiers (hors composants) | `kebab-case` | `src/components/layout/header.tsx` |
| Fichiers de composants React | `PascalCase` | `ProjectCard.tsx` |
| Composants React | `PascalCase` | `ProjectCard` |
| Fonctions et variables | `camelCase` | `getProjects()` |
| Constantes globales | `UPPER_SNAKE_CASE` | `EMAIL` |
| Types et interfaces | `PascalCase` (préfixe `I` interdit) | `Project`, `ProjectCategory` |
| Énumérations / unions de catégories | `PascalCase` pour les types, valeurs de catégorie en `kebab-case` | `type Category = "full-stack"` |
| Hooks personnalisés | `use` + `PascalCase` | `useScrollProgress` |
| Props de composants | `PascalCase` + suffixe `Props` | `ProjectCardProps` |
| Variables CSS | `--kebab-case` | `--color-background` |
| Dossiers d'images de projets | `project-XX` (XX = numéro sur 2 chiffres) | `project-01` |
| Slugs de projets | `kebab-case` | `gestion-plaintes` |

Autres règles de nommage :

- Le dossier d'un composant porte le même nom que le composant (colocation).
- Un fichier contient un seul composant principal exporté en `export function` (pas de composant par défaut sauf exception documentée).
- Pas d'abréviations cryptiques (`btn`, `el`). Préférer `button`, `element`.

---

## 3. TypeScript

1. Le strict mode est activé dans `tsconfig.json`. Toute erreur TypeScript est bloquante.
2. Type explicite requis pour : les données (`Project`, `Experience`, etc.), les props de composants, les retours de fonctions utilitaires.
3. `any` est interdit. Utiliser `unknown` puis un type guard si nécessaire.
4. Ne pas utiliser `@ts-ignore`, `@ts-expect-error` sans justification écrite.
5. Le type `Project` (voir `PROJECT_SPEC.md` §10) vit dans `src/types/project.ts`. Les autres domaines (skills, experience, services, social) ont leurs types dans `src/types/`.
6. Toutes les données statiques sont typées via leur type dédié : `Project[]`, `SkillCategory[]`, `Experience[]`, `Service[]`.
7. Utiliser des unions discriminées pour les états/statuts quand pertinent.
8. Lire les types de `process.env` via `zod` (`lib/env.ts`) si des variables d'environnement sont utilisées.
9. Les champs optionnels sont déclarés `field?: string | null` et leur affichage est conditionnel.

---

## 4. Architecture

1. **Server Components par défaut.** Un composant est `"use client"` uniquement s'il a besoin de state, d'effets, d'événements ou de hooks (Framer Motion, theme, formulaire).
2. Séparation stricte **données / présentation** : les données vivent dans `src/data/`, les composants UI dans `src/components/`. Un composant ne contient jamais de données projet en dur.
3. Règle du « downward data flow » : les données descendent via les props. Aucun composant n'importe directement `src/data/` sauf les pages (`app/`) ou les composants de section d'agrégation.
4. Colocation : un composant et ses sous-composants privés vivent dans le même dossier.
5. Structure cible (voir `PROJECT_SPEC.md` §32) :
   - `src/app/` : pages, layouts, route handlers, metadata.
   - `src/components/ui/` : composants shadcn/ui et primitives.
   - `src/components/layout/` : header, nav, footer.
   - `src/components/sections/` : sections de la page d'accueil (Hero, About, Skills, Projects, Experience, Services, Contact).
   - `src/components/projects/` : ProjectCard, ProjectGallery, etc.
   - `src/components/animations/` : wrappers Framer Motion réutilisables.
   - `src/data/` : données typées.
   - `src/lib/` : utilitaires, validation, configuration.
   - `src/types/` : types partagés.
5. Exporter les composants privés avec préfixe `_` si nécessaire, ou les garder non exportés.
6. Ne pas créer de dépendances circulaires entre modules.

---

## 5. React

1. Composants définis en **fonctions**, `"use client"` explicite en haut de fichier quand requis.
2. Hooks : respecter les règles des hooks (pas de hooks dans des conditions, pas de hooks dans des boucles).
3. Ne pas créer de nouveaux hooks génériques s'il en existe déjà un dans le projet (`src/hooks/`).
4. Props : typer avec `type XProps = { ... }`. Utiliser `React.ComponentProps<"button">` (ou équivalent) pour étendre des éléments HTML.
5. Éviter le `useEffect` inutile. Calculer pendant le rendu ou au besoin dans les gestionnaires d'événements. Les effets servent à la synchronisation avec l'extérieur.
6. Utiliser des clés stables et uniques dans les listes (`id` ou `slug`, jamais l'index quand la liste est stable par identifiant).
7. Ne pas importer React par défaut (`import React` inutile avec le JSX transform).
8. `useMemo` / `useCallback` uniquement quand il y a un coût de rendu réel.

---

## 6. Next.js

1. **App Router uniquement.** Pas de pages router.
2. Images : utiliser **toujours** `next/image` avec `width`/`height` (ou `fill` dans un conteneur dimensionné), `alt` descriptif obligatoire, `loading="lazy"` sauf pour l'image LCP du Hero, `sizes` renseigné pour les images responsive.
3. Liens : utiliser **toujours** `next/link` pour la navigation interne.
4. Metadata : définir dans `app/layout.tsx` la metadata globale (title template, description, Open Graph, icons) et une `generateMetadata` par page de projet (voir SEO §12).
5. Pages dynamiques de projets : utiliser `generateStaticParams` et `generateMetadata` depuis les données de `src/data/projects.ts`.
6. Le rendu est statique (SSG) par défaut. Éviter le rendu dynamique sauf justification.
7. Fonts : utiliser `next/font` avec `display: "swap"`. Aucune police chargée via réseau externe.
8. Pas de JavaScript dans le layout global si possible : le switch de thème est géré par un script inline avant hydratation pour éviter le flash (voir §30 du spec).
9. `not-found.tsx` et `error.tsx` couvrent les routes globales et les routes projets.

---

## 7. Tailwind CSS

1. Utiliser les tokens du design system définis dans le thème (`globals.css` + `tailwind.config.ts`) : couleurs via les variables CSS, `rounded-*`, `shadow-*` cohérents. Ne pas utiliser de couleurs hexadécimales en dur dans les classes.
2. Interdire les classes dynamiques construites (concaténation de chaînes). Utiliser des mappings explicites (`Record<Status, string>`) ou `cn()`.
3. Réutiliser des classes communes via les composants du design system, pas via `@apply` abusif. `@apply` est toléré uniquement dans les composants shadcn/ui.
4. Les breakpoints sont ceux de Tailwind (`sm`, `md`, `lg`, `xl`). Tester chaque composant sur mobile, tablette et desktop.
5. Respecter `prefers-reduced-motion` : les animations décoratives sont désactivées lorsque l'utilisateur le demande.
6. Chaque nouvelle classe de style doit rester cohérente avec l'identité visuelle du spec (pas de gradient énorme, pas d'effet hacker, pas de glassmorphism excessif).

---

## 8. shadcn/ui

1. Les composants shadcn/ui utilisés sont installés dans `src/components/ui/` et restent modifiables uniquement pour des raisons de thème/accessibilité.
2. Utiliser `cn()` (depuis `lib/utils.ts`) pour la composition de classes dans les composants du design system.
3. Respecter la structure Radix des composants (primitive racine avec props spreadées, slots). Ne pas simplifier au point de casser l'accessibilité.
4. Pour les composants interactifs réutilisables, privilégier les primitives shadcn/ui déjà présentes (button, input, textarea, select, dialog…) plutôt que réinventer.
5. Le thème de shadcn/ui suit le design system global (sombre par défaut).

---

## 9. Données

1. Toutes les données projets vivent dans `src/data/projects.ts` typées `Project[]`.
2. L'ajout d'un 6ᵉ projet ne doit nécessiter **aucune** modification des composants (`ProjectCard`, page Projects, page `/projects/[slug]`).
3. Un champ manquant ou null = section non affichée (règle générale n°3).
4. Ne jamais copier de contenu réel non vérifié depuis ce repository vers le code : les placeholders `EMAIL`, `GITHUB_URL`, `LINKEDIN_URL`, `PHOTO`, `LOCATION` restent vides tant que Herinjaka ne les fournit pas.
5. Aucun projet n'est publié ni affiché tant qu'il n'a pas été fourni et validé par Herinjaka (informations + screenshots). `src/data/projects.ts` reste vide (`[]`) ou ne contient que des projets validés. Les exemples de structure (commentaires, fichiers d'exemple) ne sont jamais rendus.

---

## 10. Accessibilité

1. HTML sémantique : `header`, `nav`, `main`, `section`, `article`, `footer`, `h1` unique par page.
2. Images : `alt` obligatoire et descriptif. Images décoratives : `alt=""`.
3. Formulaires : `<label>` relié à chaque champ (`htmlFor` / `id`), `aria-invalid` et `aria-describedby` pour les erreurs de validation.
4. Boutons/liens : libellé accessible. Icônes seules accompagnées de `aria-label` (ex. liens sociaux).
5. Navigation clavier : focus visible (style `focus-visible`), ordre logique de tabulation, pas de piège au clavier dans la nav mobile.
6. Contraste : texte conforme WCAG AA minimum sur fond du thème (clair et sombre).
7. `prefers-reduced-motion` : désactiver ou réduire les animations décoratives (CSS et Framer Motion).
8. Cibles tactiles : au moins 44×44 px pour les éléments interactifs.
9. États : ne pas communiquer uniquement par la couleur (hover, erreurs, statuts).

---

## 11. Performance

1. Objectif : excellent score Lighthouse (90+ sur toutes les catégories).
2. Images : WebP/AVIF, dimensions déclarées, `loading="lazy"`, LCP optimisée (preload / fetchPriority). 
3. Peu de JavaScript côté client : les sections statiques restent des Server Components.
4. Framer Motion : importer uniquement ce qui est nécessaire (`motion/react` pour les composants, `LazyMotion` avec `domAnimation` pour réduire le bundle si pertinent).
5. Polices : via `next/font`, pas de blocs de rendu.
6. Pas de librairie JS lourde inutile (moment, lodash, etc.) : privilégier les APIs natives.
7. Aucun layout shift : dimensions explicites pour images et médias.
8. Réduire le nombre de requêtes réseau (pas de dépendance à des CDN externes).

---

## 12. SEO

1. `app/layout.tsx` : metadata base avec `metadataBase`, `title` (template), `description`, Open Graph (type, url, title, description, images), icons, `alternates.canonical`.
2. Chaque projet : `generateMetadata` avec title et description spécifiques basés sur les données du projet. `generateStaticParams` alimente le canonical de la page.
3. Fichiers : `app/sitemap.ts` et `app/robots.ts` générés dynamiquement.
4. Structured data (`JSON-LD`) si pertinent : `Person` sur la page d'accueil.
5. Les slugs, URL et titles de projets doivent être stables et descriptifs.
6. Langage déclaré : `lang="fr"` sur `<html>`.

---

## 13. Gestion des erreurs

1. Pages : `not-found.tsx` global (avec CTA retour accueil) et gestion du cas projet inexistant (`notFound()` dans la page `/projects/[slug]`).
2. `error.tsx` : composant d'erreur global avec bouton de rechargement. Aucune erreur technique brute affichée à l'utilisateur.
3. Données : les fonctions d'accès aux données (`getProjectBySlug`, etc.) retournent `null`/gèrent l'absence au lieu de lever des erreurs inattendues.
4. Formulaire : erreurs de validation affichées champ par champ, message d'échec/confirmation accessible.
5. Pas de `console.log` laissé dans le code de production. Les logs de debug sont retirés avant commit.

---

## 14. Sécurité

1. Aucun secret ni information personnelle ne doit être commité dans le repository.
2. Les variables d'environnement sont validées via Zod (`lib/env.ts`). Ne jamais exposer `process.env.*` côté client sans préfixe `NEXT_PUBLIC_` et sans nécessité.
3. HTML : échappement automatique React (ne pas utiliser `dangerouslySetInnerHTML` sauf justification).
4. Formulaires : jamais de stockage de données sensibles côté client. Anti-spam/rate limiting uniquement côté backend si le formulaire est connecté.
5. Liens externes : `rel="noopener noreferrer"` sur les `target="_blank"`.
6. Ne pas implémenter de backend tant que le cahier des charges ne le justifie pas.

---

## 15. Git

1. Commiter uniquement sur demande explicite de l'utilisateur.
2. Messages de commit conventionnels : `type(scope): description`. Types : `feat`, `fix`, `docs`, `refactor`, `style`, `chore`, `test`, `perf`, `a11y`, `seo`.
3. Commits atomiques : un commit = une unité logique.
4. Ne pas commiter de fichiers générés (`node_modules`, `.next`, dist) — respecter le `.gitignore`.
5. Les fichiers de documentation `ai/` évoluent dans des commits dédiés (`docs:`).
6. Avant chaque commit : vérifier `git status` et `git diff` ; ne staging que les fichiers intentionnels.

---

## 16. Checklist de fin de tâche

Avant de déclarer une tâche terminée et de cocher sa case dans `TASKS.md` :

- [ ] Le code compile sans erreur TypeScript (`npm run build` ou `tsc --noEmit`).
- [ ] Le lint passe (`npm run lint`) si configuré.
- [ ] Le rendu est vérifié en local dans les deux thèmes (sombre par défaut + clair).
- [ ] Le composant/page est responsive (mobile, tablette, desktop).
- [ ] L'accessibilité de base est respectée (alt, labels, focus, contrastes).
- [ ] Les données affichées proviennent des fichiers `src/data/` (aucun contenu en dur).
- [ ] Aucune section vide n'est rendue (champs null/missing gérés).
- [ ] `TASKS.md` est mis à jour (tâche cochée uniquement après vérification réelle).
