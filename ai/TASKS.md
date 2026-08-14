# TASKS.md — Liste des tâches du portfolio

> Une tâche n'est cochée (`[x]`) que lorsqu'elle est **réellement terminée et vérifiée**.
> Avant chaque session : lire `PROJECT_SPEC.md`, `PROJECT_RULES.md`, `PROJECT_PLAN.md` et ce fichier ; identifier la phase actuelle et la prochaine tâche logique.

---

## État d'avancement

- **Phase actuelle :** 8 — Projects (terminée, en attente de validation pour la Phase 9 — Project Detail)
- **Prochaine phase :** 9 — Project Detail

---

## Phase 0 — Base documentaire

- [x] Créer le dossier `ai/` avec les 4 fichiers de documentation
- [x] Rédiger `PROJECT_SPEC.md` (cahier des charges complet)
- [x] Rédiger `PROJECT_RULES.md` (règles permanentes)
- [x] Rédiger `PROJECT_PLAN.md` (plan en 18 phases)
- [x] Rédiger `TASKS.md` (liste des tâches)
- [x] Faire valider le cahier des charges par Herinjaka avant tout développement

---

## Phase 1 — Initialisation

- [x] Créer le projet Next.js (App Router + TypeScript)
- [x] Installer et configurer Tailwind CSS (v4)
- [x] Initialiser shadcn/ui et configurer le thème (style radix-nova, base neutre, variables CSS)
- [x] Installer `lucide-react`, `motion`, `zod`, `react-hook-form`, `@hookform/resolvers`
- [ ] Mettre en place `.gitignore` et initialiser le dépôt Git (sur demande) — `.gitignore` créé ; init Git en attente de demande
- [x] Configurer ESLint et le strict mode TypeScript
- [x] Créer la structure de dossiers `src/` (spec §32 — adaptation : pas de dossier `styles/`, `globals.css` vit dans `src/app/` conformément à la convention Next.js)
- [x] Créer `src/lib/utils.ts` avec `cn` (via shadcn)
- [x] Vérifier : `npm run dev`, `npm run build` sans erreur

---

## Phase 2 — Architecture

- [x] Créer les types (`Project`, `SkillCategoryGroup`, `ExperienceEntry`, `Service`, `SocialLink`) dans `src/types/`
- [x] Créer les fichiers de données typés (`src/data/*.ts` — `projects.ts` vide, skills, experience, services, social-links, site)
- [x] Créer les helpers d'accès aux projets (`src/lib/projects.ts`)
- [x] Préparer les placeholders personnels (EMAIL, GITHUB_URL, LINKEDIN_URL, PHOTO, LOCATION) dans `src/data/site.ts`
- [x] Créer les pages vides des routes (/, /projects, /projects/[slug], /about, /contact)
- [x] Créer `not-found.tsx` et `error.tsx`
- [x] Passer `lang` à `fr` sur `<html>`

---

## Phase 3 — Design System

- [x] Définir la palette sombre (thème principal) + claire dans les variables CSS et Tailwind
- [x] Configurer la typographie avec `next/font` (Geist + Geist Mono, swap) et corriger les variables
- [x] Définir les tokens (rayons, ombres `shadow-card`/`shadow-elevated`, accents de syntaxe `code-*`)
- [x] Créer les primitives UI (Button, Badge, Card, Input, Textarea, Label, Select) — installées en Phase 1, vérifiées sur la palette
- [x] Créer les wrappers d'animation réutilisables (`FadeIn`, `StaggerContainer`, `StaggerItem` — reduced-motion via `MotionConfig`)
- [x] Mettre en place le switch de thème sans flash visuel (sombre par défaut) — script inline + `ThemeProvider` (useSyncExternalStore) + `ThemeToggle`
- [x] Vérifier les deux thèmes sur les primitives + absence de flash (script présent dans le HTML servi)

---

## Phase 4 — Layout / Navigation

- [x] Créer le Header (logo monogramme H., nom, nav, bouton thème) — sticky avec blur subtil
- [x] Créer la navigation mobile accessible (Sheet Radix : focus trap intégré, bouton fermer accessible, focus visible) — `aria-label="Ouvrir le menu de navigation"`, `SheetTitle` sr-only
- [x] Créer le Footer minimaliste (spec §25) — nom, rôle, nav, liens sociaux (icônes marques en SVG inline car retirées de lucide v1), copyright, sans lien si donnée absente
- [x] Intégrer Header/Footer dans `layout.tsx` + skip link « Aller au contenu » vers `#contenu`
- [x] Gérer l'état actif de la navigation (util `isPathActive`, `aria-current="page"`, soulignement primaire desktop, fond `bg-muted` mobile)
- [x] Vérifier navigation desktop + mobile complète (lint + build + HTML servi : header, footer, skip link, état actif, labels FR vérifiés)

---

## Phase 5 — Hero

- [x] Rédiger le texte du Hero (h1 « Web Developer / Full-Stack JavaScript Developer », slash primaire, phrase forte courte = `site.tagline`) — `src/components/sections/hero.tsx`
- [x] Créer le visuel abstrait de développeur (fenêtre de code stylisée `herinjaka.ts` avec tokens de syntaxe `--code-*`, glow subtil, pas une capture d'écran) — `src/components/sections/hero-visual.tsx`
- [x] Ajouter les CTAs (Voir les projets → `/projects`, Me contacter → `/contact`, GitHub affiché uniquement si `site.githubUrl` fourni)
- [x] Animer l'entrée du Hero (Framer Motion `initial`/`animate` avec stagger, `ease` personnalisé, respecté par `MotionConfig reducedMotion="user"`)
- [x] Optimiser l'image LCP — pas d'image : le visuel est 100 % CSS/HTML, le LCP est le texte du h1 (pas de layout shift, `overflow-hidden` sur le glow) ; note : précharger `site.photo` si elle est ajoutée (Phase 18)
- [x] Vérifier le message clé visible immédiatement (h1 unique rendu dans le premier paint, animation d'entrée courte)

---

## Phase 6 — About

- [x] Rédiger le texte About (identité, philosophie de travail, spécialisation) — `src/components/sections/about.tsx` (2 paragraphes courts, pas un CV)
- [x] Créer la section About (eyebrow « À propos », h2 « Un profil frontend & full-stack », 3 cartes mises en avant, CTA → `/about`)
- [x] Mettre en avant la spécialisation frontend/full-stack (React/Next.js/Node.js, SQL & NoSQL)
- [x] Vérifier qu'aucune expérience n'est inventée (uniquement Bienfe, Mtechniix, formations du spec ; reveal animé FadeIn/Stagger, reduced-motion OK)

---

## Phase 7 — Skills

- [x] Vérifier `src/data/skills.ts` (5 catégories du spec §21, `priority: true` sur React / Next.js / Node.js) — déjà complet, inchangé
- [x] Créer la section Skills — `src/components/sections/skills.tsx` (server component, cartes par catégorie, layout varié `lg:grid-cols-6` : Frontend/Backend larges, Database/Tools/CMS fines)
- [x] Mettre React / Next.js / Node.js en priorité visuelle (tri stable priorités en tête, pastille primaire + `text-foreground font-medium`, les autres en muted)
- [x] Vérifier l'absence de sections vides (filtre `skills.length > 0`, section masquée si aucune catégorie)

---

## Phase 8 — Projects

- [x] Vérifier `src/types/project.ts` (complet) et `src/data/projects.ts` (initialisé `[]` — aucun projet fictif)
- [x] Gérer proprement l'affichage d'une liste de projets vide (état neutre `ProjectsEmpty` : « Bientôt disponible », CTA Contact + GitHub)
- [x] Créer `ProjectCard` (preview/placeholder, badge catégorie, titre, description, stack, année, CTA ; hover élégant : lift, bordure primaire, zoom image, apparition CTA — reduced-motion OK)
- [x] Créer la section « Selected Projects » (`src/components/sections/projects.tsx`, `featured`) sur l'accueil
- [x] Créer la page `/projects` (liste complète `getProjects()` + metadata FR, état vide géré)
- [x] Préparer `public/projects/project-01…05/` (dossiers + `.gitkeep`, consigne WebP/AVIF à venir)
- [x] Vérifier : l'ajout d'un projet = modification des données uniquement (les composants lisent `src/data/projects.ts`)

---

## Phase 9 — Project Detail

- [ ] Créer `/projects/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`)
- [ ] Créer le Hero du projet
- [ ] Créer les sections (Overview, Context, Problem, Solution, Features, Tech Stack, Architecture, Challenges, Results, Gallery, Links)
- [ ] Ne rendre une section que si la donnée existe (pas de section vide)
- [ ] Résultats : contenu neutre ou absent si aucune donnée réelle
- [ ] Créer la galerie de screenshots
- [ ] Créer la navigation précédent/suivant + retour aux projets
- [ ] Gérer le projet inexistant via `notFound()`

---

## Phase 10 — Experience

- [ ] Créer `src/data/experience.ts` (Bienfe, Mtechniix, Junior Dev, formations)
- [ ] Créer la timeline Experience (entreprise, poste, période, description, technologies)
- [ ] Marquer « 2026 — aujourd'hui » pour Bienfe
- [ ] Vérifier qu'aucune information n'est inventée

---

## Phase 11 — Services

- [ ] Créer `src/data/services.ts` (Frontend, Full-stack, E-commerce, Applications métier)
- [ ] Créer la section Services (concise, 4 cartes max)

---

## Phase 12 — Contact

- [ ] Créer le schéma Zod (nom, email, sujet, message)
- [ ] Créer le formulaire (React Hook Form + Zod resolver) avec erreurs accessibles
- [ ] Mettre en place la soumission (prototype simulé tant qu'aucun backend n'est justifié)
- [ ] Afficher email, GitHub, LinkedIn (si les URLs existent)
- [ ] Afficher le CTA « Vous avez un projet ? Parlons-en. »

---

## Phase 13 — Animations

- [ ] Vérifier/soigner l'animation du Hero
- [ ] Ajouter les révélations de sections (scroll reveal, stagger)
- [ ] Animer ProjectCard (hover, entrée)
- [ ] Animer navigation et transitions de pages
- [ ] Animer boutons et micro-interactions
- [ ] Vérifier `prefers-reduced-motion` partout

---

## Phase 14 — SEO

- [ ] Metadata globale (title template, description, OG, canonical, icons)
- [ ] `generateMetadata` par projet
- [ ] Créer `sitemap.ts` et `robots.ts`
- [ ] Ajouter le structured data `Person` (JSON-LD)
- [ ] Vérifier `lang="fr"` et slugs stables

---

## Phase 15 — Accessibilité

- [ ] Audit clavier (focus visible, pas de piège)
- [ ] Audit HTML sémantique (landmarks, h1 unique)
- [ ] Audit contrastes (thèmes clair + sombre, AA)
- [ ] Vérifier alt, labels, aria
- [ ] Vérifier les cibles tactiles (44 px)
- [ ] Vérifier `prefers-reduced-motion`

---

## Phase 16 — Performance

- [ ] Vérifier images (WebP/AVIF, dimensions, lazy, LCP)
- [ ] Vérifier les Server Components (peu de JS client)
- [ ] Optimiser le bundle Framer Motion si nécessaire
- [ ] Vérifier les polices (`next/font`, swap)
- [ ] Audit Lighthouse mobile + desktop (≥ 90 sur toutes les catégories)

---

## Phase 17 — Testing

- [ ] Mettre en place le framework de test (Vitest + Testing Library)
- [ ] Tester les helpers de données (getProjects, getProjectBySlug, adjacents)
- [ ] Tester la validation Zod du formulaire
- [ ] Tester ProjectCard (données manquantes, liens absents)
- [ ] Tester le cas projet inexistant
- [ ] Vérifier que l'ajout d'un projet ne casse aucun test

---

## Phase 18 — Production

- [ ] Renseigner les vraies données (email, GitHub, LinkedIn, photo, location)
- [ ] Ajouter les vrais projets fournis par Herinjaka (informations + screenshots)
- [ ] Configurer le déploiement (Vercel recommandé)
- [ ] Vérifier `npm run build` de production
- [ ] Vérifier les métadatas finales (URLs de production)
- [ ] Test final Lighthouse + navigation complète

---

## Règles d'utilisation

1. Cocher une case uniquement quand la tâche est réellement terminée **et vérifiée** (voir checklist de fin de tâche dans `PROJECT_RULES.md` §16).
2. Une tâche en cours est marquée manuellement par l'agent pendant la session ; une tâche bloquée reste non cochée avec une note.
3. Toute modification de périmètre met à jour ce fichier et, si nécessaire, `PROJECT_SPEC.md` / `PROJECT_PLAN.md`.
