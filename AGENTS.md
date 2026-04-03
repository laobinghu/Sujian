# AGENTS.md - Sujian Theme Development Guide

## Build & Dev Commands

```bash
pnpm dev              # Dev server on http://localhost:3000
pnpm dev --open       # Dev server + open browser
pnpm build            # Production build
pnpm preview          # Preview production build
pnpm lint             # ESLint on entire codebase
pnpm lint --fix       # Auto-fix linting issues
pnpm lint -- <file>   # Lint single file (e.g. pnpm lint -- app/pages/index.vue)
pnpm typecheck        # TypeScript type checking via nuxt typecheck
pnpm install          # Install dependencies
```

**Testing**: No test framework configured. To add: `pnpm add -D vitest @vue/test-utils happy-dom`
Run single test: `pnpm vitest run -- MyComponent.test.ts`

## Project Stack

- **Framework**: Nuxt 4 + Vue 3 Composition API
- **UI**: Nuxt UI v4 (components only, custom styling)
- **Styling**: Tailwind CSS v4 + `--sujian-*` CSS variables
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm (v10+)
- **Linting**: ESLint with @nuxt/eslint
- **Other**: @nuxtjs/seo, @nuxt/image, @vueuse/nuxt, @mx-space/api-client, @nuxtjs/i18n (zh-cn, no_prefix)

## Code Style

### Vue Components

- Use `<script setup lang="ts">` exclusively (no Options API)
- Component names: PascalCase (`SujianCard.vue`)
- Use kebab-case in templates
- Scoped CSS only

```vue
<script setup lang="ts">
interface Props { title: string; count?: number }
const props = withDefaults(defineProps<Props>(), { count: 0 })
const emit = defineEmits<{ update: [value: string] }>()
const isOpen = ref(false)
</script>

<template>
  <div class="sujian-card"><h2>{{ title }}</h2><slot /></div>
</template>

<style scoped>
/* Scoped styles only */
</style>
```

### Imports

- Explicit imports only (no wildcards)
- Order: 1) Vue/core, 2) external libs, 3) internal (`~/`)
- Use `~/` alias for app directory

```typescript
import { ref, computed } from 'vue'
import type { MyType } from '~/types'
import { useMyStore } from '~/stores/myStore'
```

### TypeScript

- Always define types for props, emits, stores
- Prefer `interface` for object shapes, `type` for unions
- Use `unknown` over `any`
- Export shared types from `/types`

### Naming Conventions

- **Components**: PascalCase (`SujianCard.vue`)
- **Composables**: camelCase starting with `use` (`useSujianTheme.ts`)
- **Stores**: PascalCase ending with `Store` (`UserStore.ts`)
- **Types/Interfaces**: PascalCase (`ArticleMetadata`)
- **Functions/Methods**: camelCase (`formatDate()`)
- **CSS Classes**: kebab-case (`sujian-card__title`)
- **Files**: PascalCase for components, kebab-case for pages

### CSS & Styling

- Use scoped CSS, Tailwind utilities when possible
- Custom CSS variables: `--sujian-*` (paper, ink, cinnabar, cyan, shadows)
- Mobile-first responsive design (breakpoint: 768px)
- Color contrast ≥ 4.5:1

### Error Handling

- Use try-catch for async operations
- Throw typed errors, provide user-friendly Chinese messages
- Avoid `console.error` in production

### Sujian Theme Specifics

- **Noise Effect**: `filter: url(#sujian-noise)` — bg: 0.03, card: 0.08, content: 0.15
- **Typography**: `var(--font-serif)` or `var(--font-sans)`
- **Colors**: `--sujian-ink-primary`, `--sujian-ink-secondary`, `--sujian-cinnabar`, `--sujian-cyan`
- **Shadows**: `--sujian-shadow-sm/md/lg`

## Project Structure

```
app/
├── assets/css/main.css    # Global styles & CSS variables
├── components/            # Vue components (global/, features/, root-level)
├── composables/           # Vue composables (use*)
├── layouts/               # Page layouts
├── pages/                 # Route-based pages (file-system routing)
├── plugins/               # Nuxt plugins
├── public/                # Static assets
├── stores/                # Pinia stores
├── types/                 # TypeScript type definitions
└── app.vue                # Root component
```

## Git & Commits

- Conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Never commit secrets or `.env` files

## Important Notes

1. Chinese-inspired **Sujian** (素笺) design system — follow `PLAN.md`
2. Font: 霞鹜文楷 (LxgwWenkai) + 系统黑体 fallback，via `localStorage` key `sujian-font-pref`
3. Performance target: Lighthouse Performance > 90
4. ESLint config: stylistic with `commaDangle: 'never'`, `braceStyle: '1tbs'`
