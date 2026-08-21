# Frontend Design Skill

## Description

Compétence spécialisée pour l'amélioration UI/UX et le design frontend du portfolio personnel de **Herinjaka Andriamananandro** (Web Developer / Full-Stack JavaScript Developer).

Ce skill respecte l'identité définie dans `ai/PROJECT_SPEC.md` et `ai/PROJECT_RULES.md` — **pas de design générique**, seulement des améliorations cohérentes avec l'existant.

---

## Domaines d'expertise

### Identité visuelle & Design System
- Respect de la palette existante : **sombre par défaut**, accent **indigo `oklch(0.66 0.15 275)`**
- Typographie : **Geist Sans** (UI) + **Geist Mono** (code/technique) — déjà configurées via `next/font`
- Rayons, ombres (`shadow-card`, `shadow-elevated`), tokens CSS dans `globals.css`
- Pas de gradients énormes, pas de glassmorphism excessif, pas d'effet "portfolio hacker" (spec §7)

### Hiérarchie visuelle & Composition
- Structure de page : Hero → About → Skills → Projects → Experience → Services → Contact (ordre validé)
- Grilles responsives : `lg:grid-cols-2`, `lg:grid-cols-4`, `sm:grid-cols-[170px_1fr]` (timeline)
- Eyebrows numérotés `01/02…` sur sections projet (ProjectSection)
- Monogramme **« H. »** cohérent (header + favicon)

### Typographie
- Titres : `text-3xl` → `text-5xl` / `lg:text-[3.4rem]` avec `tracking-tight`, `text-balance`
- Corps : `text-base` → `text-lg`, `leading-relaxed`, `text-muted-foreground`
- Code/mono : `font-mono`, `text-xs`/`text-sm`, uppercase pour eyebrows
- Pas de polices externes — `next/font` avec `display: swap`

### Spacing & Rhythm
- Système basé sur `space-y-*`, `gap-*`, `py-*` cohérents
- Sections : `py-16` / `lg:py-24`, container `max-w-5xl px-4 sm:px-6`
- Cartes : `p-4` / `p-5`, gaps internes `gap-2` / `gap-4`

### Responsive Design
- Breakpoints Tailwind : `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Mobile-first : navigation mobile (Sheet Radix), grilles `sm:grid-cols-2 lg:grid-cols-4`
- Hero : `lg:grid-cols-2` (texte + visuel), stack mobile
- Timeline Experience : `sm:grid-cols-[170px_1fr]`

### Interactions & Micro-interactions
- **Hover cartes** : lift `-translate-y-1`, bordure primaire, zoom image `scale-105`, CTA reveal
- **Boutons** : `focus-visible:ring-3`, `active:translate-y-px`, variants (default/outline/ghost/destructive)
- **Nav desktop** : soulignement animé `after:scale-x-0 → hover:scale-x-100`
- **Nav mobile** : Sheet Radix (focus trap, `aria-label`, bouton fermer)
- **Theme toggle** : ghost icon, `aria-label` dynamique
- **Formulaire** : `aria-invalid`, `aria-describedby`, `role="alert"` erreurs champ par champ

### Animations (Framer Motion / `motion`)
- **Hero** : entrée stagger container/enfants, `ease: [0.22, 1, 0.36, 1]`, durée 0.5s
- **Sections** : `FadeIn` (scroll reveal `whileInView`), `StaggerContainer`/`StaggerItem` (stagger 0.08s)
- **PageTransition** : fade + translate `y: 10 → 0`, durée 0.35s, `key={pathname}` dans layout
- **LazyMotion** + `domAnimation` (tree-shaking) dans `Providers`
- **Reduced motion** : `MotionConfig reducedMotion="user"` + `motion-reduce:transition-none` sur toutes transitions CSS

### Accessibilité (WCAG AA)
- HTML sémantique : `header`, `nav`, `main`, `section`, `footer`, 1 `h1`/page
- Skip link `#contenu`
- `aria-current="page"` nav active, `aria-label` boutons icônes
- Contraste AA vérifié thèmes clair/sombre (tokens ajustés : `--muted-foreground`, `--primary`, `--primary-foreground`)
- Cibles tactiles ≥ 44px (`min-h-[44px] min-w-[44px]` sur Button)
- `prefers-reduced-motion` respecté partout
- Formulaire : labels + `htmlFor`/`id`, erreurs accessibles

### Performance visuelle
- **Hero** : pas d'image LCP (visuel CSS pur → LCP = texte h1)
- **Images projets** : `next/image` avec `fill`, `sizes`, `loading="lazy"` (sauf Hero `priority`)
- **Polices** : `next/font` Geist + Geist Mono, `display: "swap"`
- **Bundle Motion** : `LazyMotion` + `domAnimation`, composants `m.*` (tree-shaking)
- **Pas de layout shift** : dimensions explicites, `aspect-[16/10]`, `aspect-[16/9]`

---

## Contraintes strictes (depuis PROJECT_RULES.md)

1. **Server Components par défaut** — `"use client"` uniquement si state/effets/hooks requis
2. **Séparation données/présentation** — données dans `src/data/`, composants dans `src/components/`
3. **Downward data flow** — props uniquement, pas d'import direct `src/data/` hors pages
4. **Colocation** — composant + sous-composants privés dans même dossier
5. **Pas de couleurs hex en dur** — tokens CSS uniquement (`bg-primary`, `text-muted-foreground`, etc.)
6. **Pas de classes dynamiques concaténées** — mappings explicites ou `cn()`
7. **Respect `prefers-reduced-motion`** — animations décoratives désactivées
8. **Aucun contenu inventé** — données manquantes = section non rendue
9. **`src/data/projects.ts` reste `[]`** tant que Herinjaka ne fournit pas les vrais projets

---

## Fichiers clés à connaître

```
src/
├── app/
│   ├── globals.css          # Tokens CSS (light/dark), variables --color-*
│   ├── layout.tsx           # Providers, Header, Footer, PageTransition, metadata
│   ├── page.tsx             # Home (Hero, About, Skills, Projects, Services, Contact)
│   ├── about/page.tsx       # About complet + Experience
│   ├── projects/
│   │   ├── page.tsx         # Liste projets (StaggerContainer)
│   │   └── [slug]/page.tsx  # Détail projet (generateStaticParams, generateMetadata)
│   └── contact/page.tsx     # Contact + formulaire
├── components/
│   ├── ui/                  # Button, Badge, Card, Input, Textarea, Label, Select, Sheet
│   ├── layout/
│   │   ├── header.tsx       # Nav desktop + mobile, theme toggle, monogramme H.
│   │   ├── mobile-nav.tsx   # Sheet Radix
│   │   ├── footer.tsx       # Minimaliste, liens sociaux conditionnels
│   │   └── theme-toggle.tsx
│   ├── sections/
│   │   ├── hero.tsx         # Hero + HeroVisual (motion, stagger, CTAs)
│   │   ├── hero-visual.tsx  # Fenêtre code stylisée (tokens --code-*)
│   │   ├── about.tsx        # About + highlights cards
│   │   ├── skills.tsx       # 5 catégories, priorité React/Next/Node
│   │   ├── projects.tsx     # Selected Projects (featured)
│   │   ├── experience.tsx   # Timeline (ligne + points, badge "En cours")
│   │   ├── services.tsx     # 4 cartes → /contact
│   │   └── contact.tsx      # Form + infos (conditionnel)
│   ├── projects/
│   │   ├── project-card.tsx     # Carte projet (hover, image, CTA, badge)
│   │   ├── project-hero.tsx     # Hero détail (breadcrumb, badges, meta, thumbnail priority)
│   │   ├── project-section.tsx  # Section numérotée (eyebrow 01…)
│   │   ├── project-gallery.tsx  # Galerie lazy, 1/2 colonnes
│   │   └── project-nav.tsx      # Précédent/Suivant + retour
│   ├── contact/
│   │   ├── contact-form.tsx     # RHF + Zod, erreurs accessibles, submit simulé
│   │   └── contact-info.tsx     # Email/GitHub/LinkedIn conditionnels
│   ├── animations/
│   │   ├── fade-in.tsx      # FadeIn (scroll reveal, delay)
│   │   ├── stagger.tsx      # StaggerContainer/StaggerItem
│   │   └── page-transition.tsx # PageTransition (motion, key=pathname)
│   └── icons.tsx            # GitHubIcon, LinkedInIcon (SVG inline, lucide v1)
├── data/
│   ├── site.ts              # name, role, tagline, githubUrl, linkedinUrl, email, photo, location, url
│   ├── projects.ts          # [] (vide jusqu'à vrais projets)
│   ├── skills.ts            # 5 catégories, priority: true sur React/Next/Node
│   ├── experience.ts        # Bienfe, Mtechniix, Ankatso, Saha Academy
│   ├── services.ts          # Frontend, Full-stack, E-commerce, Applications métier
│   └── navigation.ts        # Items nav (Accueil, Projets, À propos, Contact)
├── lib/
│   ├── projects.ts          # getProjects, getProjectBySlug, getFeaturedProjects, getAdjacentProjects, getCategoryLabel, getStatusLabel
│   ├── validations/contact.ts # Zod schema (name≥2, email, subject≥3, message≥10)
│   └── utils.ts             # cn()
��── types/
    ├── project.ts           # Project, ProjectCategory, ProjectStatus, ProjectImage, ProjectCaseStudy
    ├── experience.ts
    ├── skill.ts
    ├── service.ts
    └── social-link.ts
```

---

## Patterns d'amélioration autorisés

| Type | Exemple | Validation |
|------|---------|------------|
| **Spacing** | Ajuster `gap-4` → `gap-5` sur grille cartes | Cohérence globale vérifiée |
| **Typographie** | Modifier `tracking-tight` → `tracking-normal` sur h2 | Hiérarchie préservée |
| **Couleurs** | Utiliser `bg-primary/10` au lieu de `bg-muted` pour accent subtil | Token CSS existant |
| **Micro-interaction** | Ajouter `transition-opacity` sur focus badge | `motion-reduce` respecté |
| **Responsive** | Changer `sm:grid-cols-2` → `md:grid-cols-2` | Test mobile/desktop |
| **Animation** | Réduire `duration: 0.5` → `0.4` sur StaggerItem | `prefers-reduced-motion` OK |
| **Accessibilité** | Ajouter `aria-describedby` manquant | Test clavier + lecteur d'écran |

---

## Patterns INTERDITS

| Interdiction | Raison |
|--------------|--------|
| Ajouter gradients/backgrounds décoratifs | Spec §7 — pas de "portfolio hacker" |
| Changer palette indigo → autre couleur | Identité fixée (spec §1, §6) |
| Remplacer Geist par autre police | Spec §8, `next/font` configuré |
| Ajouter composants UI non-shadcn | Design system existant (Button, Badge, Card, etc.) |
| Mettre contenu en dur dans composants | Règle données/présentation |
| Inventer projets/données | `projects.ts = []` jusqu'à validation Herinjaka |
| Supprimer `motion-reduce` | Accessibilité WCAG |
| Réduire cibles tactiles < 44px | WCAG AA |

---

## Utilisation

### Chargement explicite
```bash
opencode skill load frontend-design
```

### Détection automatique
OpenCode détecte les skills locaux dans `.opencode/skills/**/SKILL.md` au démarrage.

### Vérification fonctionnement
1. Demander une revue UI/UX : *"Analyse l'accessibilité du formulaire contact"*
2. Demander une amélioration : *"Améliore le hover des cartes projets sur mobile"*
3. Le skill répondra en respectant les contraintes ci-dessus.

---

## Notes pour l'agent

- **Toujours lire** `ai/PROJECT_SPEC.md` + `ai/PROJECT_RULES.md` avant toute proposition
- **Ne pas modifier** sans validation explicite de l'utilisateur
- **Privilégier** les améliorations incrémentales (spacing, micro-interactions, contraste)
- **Documenter** chaque changement dans `ai/TASKS.md` si validé