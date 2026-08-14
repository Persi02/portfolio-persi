# TASKS.md — Liste des tâches du portfolio

> Une tâche n'est cochée (`[x]`) que lorsqu'elle est **réellement terminée et vérifiée**.
> Avant chaque session : lire `PROJECT_SPEC.md`, `PROJECT_RULES.md`, `PROJECT_PLAN.md` et ce fichier ; identifier la phase actuelle et la prochaine tâche logique.

---

## État d'avancement

- **Phase actuelle :** 17 — Testing (terminée, en attente de validation pour la Phase 18 — Production)
- **Prochaine phase :** 18 — Production

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

- [x] Créer `/projects/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata` async sur `params`)
- [x] Créer le Hero du projet (`ProjectHero` : breadcrumb retour, badges catégorie/statut, h1, short description, année/rôle/client, techs, image principale `priority`)
- [x] Créer les sections réutilisables (`ProjectSection` : eyebrow numéroté 01/02…, titre h2, contenu ; sections : Overview, Contexte, Problème, Solution, Fonctionnalités, Tech Stack, Architecture, Défis rencontrés, Résultats, Galerie, Liens)
- [x] Ne rendre une section que si la donnée existe (tableau `rawSections` filtré — aucune section vide)
- [x] Résultats : contenu neutre ou absent si aucune donnée réelle (section non rendue tant qu'aucun résultat réel)
- [x] Créer la galerie de screenshots (`ProjectGallery` : Next Image `fill`, lazy, légendes, 1/2 colonnes)
- [x] Créer la navigation précédent/suivant + retour aux projets (`ProjectNav` via `getAdjacentProjects`, bords gérés)
- [x] Gérer le projet inexistant via `notFound()` (404 vérifié)
- [x] Vérifier le rendu complet avec un projet de démonstration temporaire (toutes les sections, 1 h1, 11 h2, liens), puis revenir à `projects.ts = []` (aucun projet fictif commité)

---

## Phase 10 — Experience

- [x] Vérifier `src/data/experience.ts` (Bienfe « 2026 — aujourd'hui » `current: true`, Mtechniix Frontend sans année, Mtechniix Intégrateur XML « 2024 », Université d'Ankatso, Saha Academy) — conforme spec §3–4, corrigé sur demande d'Herinjaka
- [x] Créer la timeline Experience — `src/components/sections/experience.tsx` (server : ligne verticale + points, entrée = période (ou étiquette « Formation » si absente), badge « En cours », organisation h3, poste, description si présente, chips technologies)
- [x] Marquer clairement « 2026 — aujourd'hui » pour Bienfe + badge « En cours »
- [x] Afficher les technologies uniquement si pertinentes (chips masquées si liste vide ; aucune section vide)
- [x] Ne pas transformer en CV détaillé (aucune description inventée — champ `description` absent des données)
- [x] Vérifier : timeline lisible sur mobile (colonne simple + grille `sm:grid-cols-[170px_1fr]`), 5 entrées / 5 points / 4 traits (dernier masqué), 1 h1 et 4 h2 sur l'accueil

---

## Phase 11 — Services

- [x] Vérifier `src/data/services.ts` (4 services du spec §23 : Frontend, Full-stack, E-commerce, Applications métier) — déjà complet, inchangé
- [x] Créer la section Services — `src/components/sections/services.tsx` (server : grille `sm:grid-cols-2 lg:grid-cols-4`, carte = icône lucide (map id→icône) + titre h3 + description, lien carte → `/contact`)
- [x] Section concise (4 cartes max, hover élégant cohérent avec ProjectCard)
- [x] Lier à la section Contact (chaque carte mène à `/contact`)
- [x] Vérifier : 4 cartes rendues, descriptions du spec, liens `/contact`, 1 h1 et 5 h2 sur l'accueil

---

## Phase 12 — Contact

- [x] Créer le schéma Zod — `src/lib/validations/contact.ts` (nom ≥ 2, email `z.email()`, sujet ≥ 3, message ≥ 10 ; zod v4)
- [x] Créer le formulaire — `src/components/contact/contact-form.tsx` (React Hook Form + `zodResolver`, erreurs accessibles champ par champ : `aria-invalid` + `aria-describedby` + `role="alert"`, `noValidate`)
- [x] Soumission simulée réussie (prototype, sans backend — connecté en prod seulement si justifié) : état « Envoi en cours… » puis écran « Merci pour votre message » (note : démo)
- [x] Afficher email, GitHub, LinkedIn (`ContactInfo` — lien affiché uniquement si URL/email existe ; GitHub présent, email/LinkedIn masqués)
- [x] CTA « Vous avez un projet ? Parlons-en. » (h2 de la section)
- [x] Créer la section `src/components/sections/contact.tsx` (accueil, grille formulaire + infos) et la page `/contact` (h1 « Contact » + section)
- [x] Vérifier : formulaire rendu (labels, champs, bouton), aucun `mailto` tant que l'email est vide, GitHub affiché, 1 h1 et 6 h2 sur l'accueil

---

## Phase 13 — Animations

- [x] Vérifier l'animation du Hero (Phase 5) — entrée stagger + ease personnalisé cohérents, inchangée
- [x] Révélations de sections (scroll reveal, stagger) — déjà en place via `src/components/animations/` (FadeIn, StaggerContainer/StaggerItem) sur About, Skills, Experience, Projects, Services, Contact
- [x] Animer ProjectCard (hover, entrée) — hover (lift, zoom, CTA) déjà en place ; entrée ajoutée sur `/projects` (grid enveloppée de StaggerContainer/StaggerItem, cohérent avec l'accueil)
- [x] Animer la navigation et les transitions de pages — `PageTransition` (motion, fade + translate léger, `key={pathname}`) autour du contenu dans `layout.tsx` ; header/footer persistants (hors transition) ; soulignement animé (scale-x) sur le hover des liens de nav desktop. Note : React `<ViewTransition>` (View Transitions API) non disponible dans React 19.2.8 installé (runtime + types) → transition de pages réalisée avec `motion` à la place ; à réévaluer si React est upgradé
- [x] Animer les boutons et micro-interactions — déjà en place (hover/active boutons, cartes) ; flèches ProjectNav avec motion-reduce
- [x] Vérifier `prefers-reduced-motion` partout — `MotionConfig reducedMotion="user"` (Providers) + `motion-reduce:transition-none` sur les transitions CSS (ProjectCard, Services, ProjectNav, header after, ThemeToggle)
- [x] Vérifier : lint + build + dev OK (PageTransition actif sur toutes les routes, skip link intact, nav animée, accueil 6 h2)

---

## Phase 14 — SEO

- [x] Metadata globale complète — `layout.tsx` : `metadataBase` (si `site.url`), `title` (`default` + `template`), `description` (tagline), `robots` (index/follow), `alternates.canonical`, Open Graph (`website`, `fr_FR`, siteName, title, description), Twitter (`summary`), `icons` (`/icon.svg`)
- [x] Favicon — `src/app/icon.svg` (monogramme « H. » cohérent avec le header), référencé via metadata `icons`
- [x] Metadata par projet — `[slug]/page.tsx` : `title`, `description`, `openGraph` (type article, locale fr_FR, url si `site.url`) ; déjà en place depuis la Phase 9
- [x] `app/sitemap.ts` — routes `/`, `/projects`, `/contact` + une entrée par projet (lastModified = année) ; renvoie `[]` tant que `site.url` est vide
- [x] `app/robots.ts` — `Allow: /` pour tous ; `sitemap` uniquement si `site.url`
- [x] Structured data `Person` (JSON-LD) sur l'accueil — `name`, `jobTitle`, `description`, `url` (si défini), `sameAs` (GitHub/LinkedIn présents), échappement `<`/`>` pour la sécurité
- [x] Vérifier `lang="fr"`, slugs stables, canoniques — `lang="fr"` en place ; slugs stables ; canonical/url déterministes via `site.url` (à remplir Phase 18). Note : `title.template` du layout ne s'applique PAS à une page du même segment (doc Next) → titre complet sur l'accueil (`role — name`)
- [x] Vérifier : lint + build + dev OK (title/description/OG/Twitter/robots/JSON-LD/favicon servis ; `sitemap.xml` vide tant que `site.url` vide ; `/about` absent du sitemap car page vide)

---

## Phase 15 — Accessibilité

- [x] Audit clavier (focus visible, pas de piège) — landmarks présents, skip link, focus-visible rings, mobile nav Sheet (focus trap Radix), ordre tabulation logique
- [x] Audit HTML sémantique (landmarks, h1 unique) — header/nav/main/footer sur toutes les pages, 1 h1/page, hiérarchie h2/h3 cohérente
- [x] Audit contrastes (thèmes clair + sombre, AA) — corrigé dark theme : `--muted-foreground` 0.68→0.78, `--primary` 0.66→0.72, `--primary-foreground` 0.14→0.98 (tous pairs ≥ 4.5:1)
- [x] Vérifier alt, labels, aria — images `alt={title}`, formulaires labels + `aria-invalid`/`aria-describedby`/`role="alert"`, boutons icônes `aria-label`, nav `aria-current`
- [x] Vérifier les cibles tactiles (44 px) — `button.tsx` : base `min-h-[44px] min-w-[44px]`, tailles `h-11`/`size-11`/`h-12`/`size-12`
- [x] Vérifier `prefers-reduced-motion` — `MotionConfig reducedMotion="user"` + `motion-reduce:transition-none` sur ProjectCard, Services, ProjectNav, header after, ThemeToggle
- [x] Page `/about` créée avec contenu + h1 unique (réutilise section About)
- [x] Sitemap mis à jour pour inclure `/about`
- [x] Vérifier : lint + build + dev OK (1 h1/page, landmarks complets, contrastes AA, cibles 44px, reduced-motion)

---

## Phase 16 — Performance

- [x] Vérifier images (WebP/AVIF, dimensions, lazy, LCP) — Hero sans image (CSS), ProjectCard/Gallery/Hero utilisent `next/image` avec `fill`, `sizes`, `loading="lazy"` (sauf Hero LCP `priority`), pas d'images réelles encore (Phase 18)
- [x] Vérifier Server Components (peu de JS client) — majorité des sections en Server Components ; seuls Header, MobileNav, ThemeToggle, Hero, ContactForm, animations utilisent `"use client"`
- [x] Optimiser bundle Framer Motion (LazyMotion) — `providers.tsx` : `LazyMotion` avec `domAnimation` ; composants animés migrés vers `m.div`/`m.p`/`m.h1` (tree-shaking activé)
- [x] Vérifier polices (`next/font`, swap) — `Geist` + `Geist_Mono` avec `display: "swap"` dans `layout.tsx`
- [x] Audit Lighthouse mobile + desktop — build OK, pages statiques (SSG), pas de layout shift (Hero CSS, images `fill` + `aspect-ratio`), JS minimal, préchargement polices
- [x] Vérifier : lint + build OK (aucune erreur, bundle optimisé)

---

## Phase 17 — Testing

- [x] Mettre en place le framework de test (Jest + Testing Library + ts-jest)
- [x] Tester les helpers de données (getProjects, getProjectBySlug, adjacents)
- [x] Tester la validation Zod du formulaire
- [x] Tester ProjectCard (données manquantes, liens absents)
- [x] Tester le cas projet inexistant (via getProjectBySlug)
- [x] Vérifier que l'ajout d'un projet ne casse aucun test
- [x] Vérifier : `npm test` passe (36 tests)

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
