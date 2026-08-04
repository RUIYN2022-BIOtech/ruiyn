# AGENTS.md — Ruiyn.com Hugo Site

## Project Overview
Bilingual (EN/FA) Hugo static site for **Ruiyn Pad** — a medical equipment company based at Tabriz University of Medical Sciences, Iran. Theme: `ruiynpad` (custom, in `themes/ruiynpad/`).

**Important:** Farsi (`fa`) is the **default** language. It renders at the site root (`/`); English renders under `/en/`. `defaultContentLanguage = "fa"` and `defaultContentLanguageInSubdir = false` in `hugo.toml`.

## Build / Lint / Test Commands
There is **no test framework, no linter, and no package.json/npm**. Validation is done via the Hugo build itself.

```bash
hugo                     # Build site into public/ (must exit with no warnings/errors)
hugo server -D           # Dev server with drafts at http://localhost:1313
hugo server --minify     # Dev server with minified output
hugo --cleanDestinationDir  # Build after wiping stale public/ output
hugo new content/en/products/p11.md   # Scaffold a new product page (uses archetype)
```

- **"Single test" equivalent:** there are no unit tests. To verify one page, build and inspect its HTML in `public/`:
  ```bash
  hugo && grep -A5 'lang-switcher' public/products/p01/index.html
  ```
- Always run `hugo` after editing templates, assets, or content; treat any warning/error in the output as a failure.
- Use `hugo server -D` + a browser for visual checks (RTL rendering, toggle, responsive layout).

## Repository Structure
```
ruiyn.com/
├── hugo.toml                    # Main config (languages, menus, params)
├── content/en/…, content/fa/…   # Mirrored bilingual content
│   └── products/p01-p10.md      # Product pages
├── themes/ruiynpad/
│   ├── layouts/                 # baseof, home, products/{list,single}, about, contact, _partials
│   ├── assets/css/              # main.css, rtl.css, modules/{base,layout,components,pages}.css
│   ├── assets/js/               # main.js, script.js, contact-form.js
│   └── i18n/                    # (empty; site-level i18n/ is used)
├── i18n/{en,fa}.yaml            # Site-level translation strings
├── static/img/                  # Logos, product images
├── archetypes/                  # Content scaffolding templates
├── layouts/                     # Empty (site-level overrides, unused)
└── public/                      # Generated output (gitignored)
```

## Key Config Facts (`hugo.toml`)
- **Languages:** `fa` (weight 1, `languageDirection = "rtl"`, `contentDir = "content/fa"`) and `en` (weight 2, LTR).
- **Menus:** defined per-language as `[[languages.<lang>.menu.main]]` with `name`, `url`, `weight`, `pre` (FontAwesome icon).
- **Params:** contact block, 3 `features`, 3 `gallery_slides` per language; site-level `[params]`/`[params.contact]` as fallback.
- Content pages should be authored in **both** languages; the language toggle relies on `.Translations` matching.

## Content Model
- **Homepage** (`content/{en,fa}/_index.md`): front matter drives hero, features, gallery, map.
- **Products** (`content/{en,fa}/products/p*.md`): front matter fields — `title`, `description`, `image`, `category`, `badge`, `rating`, `features[]`, `specs[]`, `digikala_link`, `gallery[]`.
- **About / Contact**: simple markdown pages.
- When adding a page, create the paired translation in the other `content/<lang>/` tree.

## Styling Architecture
- CSS entry points: `assets/css/main.css` (imports modules) and `assets/css/rtl.css` (RTL overrides, loaded only for `fa`).
- Pipeline: `resources.Get "css/…" | resources.Concat | minify | fingerprint` in `layouts/_partials/head.html`.
- JS: `resources.Get "js/main.js" | minify | fingerprint` in `baseof.html`; `script.js` loaded via `_partials/scripts.html`.

## i18n
- Strings live in `i18n/{en,fa}.yaml` as a list of `id` / `translation` pairs (snake_case ids).
- Reference in templates with `{{ i18n "key" }}` (or `T "key"`).
- Keep keys in sync across `en.yaml` and `fa.yaml`.

## Code Style Guidelines

### Hugo templates (`.html` under layouts/)
- Use Go template syntax with single spaces inside delimiters: `{{ .Title }}`, `{{ if .Params.x }}`.
- Compute scoped variables with `{{ $var := … }}`; guard optional fields with `{{ with .Params.x }}…{{ end }}` or `{{ default "…" .Params.x }}`.
- Prefer Hugo built-ins over custom logic: `.Translations`, `where`, `cond`, `absLangURL`, `relLangURL`, `i18n`.
- For multilingual URLs always use `absLangURL`/`relLangURL`/`.RelPermalink` (not hardcoded `/en/` prefixes).
- Partial files live in `layouts/_partials/`; include with `{{ partial "name.html" . }}`.
- Pipe assets through `resources.Get | minify | fingerprint`; never hardcode built asset paths.

### CSS
- Modular: put styles in the right module file — base tokens in `base.css`, header/nav/footer/layout in `layout.css`, components in `components.css`, page-specific in `pages.css`.
- Use CSS custom properties from `:root` in `base.css` (`--primary`, `--bg-light`, `--text-muted`, `--transition`, …). **Never invent new color values inline**; define a token first.
- Class naming: lowercase kebab-case; BEM-ish for parts of a component (`.lang-toggle`, `.lang-toggle-thumb`, `.lang-option-fa`).
- 4-space indentation; one rule per line; group related selectors.
- RTL-specific overrides go only in `rtl.css` (scoped under `.rtl`).
- When changing a component, check both LTR and RTL rendering.

### JavaScript
- Vanilla JS only — no frameworks, no build tooling. ES6+ syntax is fine.
- camelCase for variables/functions; const-first, `let` only when reassigned; descriptive names.
- Wrap DOM wiring that runs at load in `document.addEventListener('DOMContentLoaded', …)`; scripts are loaded at the end of `<body>`.
- Guard every element lookup: `const el = document.getElementById('x'); if (el) { … }`.
- No global pollution beyond what is needed; avoid `var`.
- Keep behavior in `main.js`/`script.js`; do not add JS where a Hugo-rendered link suffices (e.g., the language toggle is intentionally server-rendered — do not reintroduce a JS click handler for it).

### TOML / YAML
- `hugo.toml`: 4-space indent, arrays as `[[section]]` TOML tables, keys snake_case.
- i18n YAML: flat list of `- id:` / `translation:` entries; quote all translations.

### Content markdown
- YAML front matter only (not TOML); keys snake_case; arrays as inline `[ ]`.
- Mirror every page across `content/en` and `content/fa`; keep front matter fields identical so `.Translations` resolve.
- RTL-safe content in Persian; avoid bidi-inverted punctuation unless intentional.

### Error handling
- Templates: silently degrade with `default`/`with`; never emit build errors for missing optional params.
- JS: null-check every DOM lookup; no uncaught exceptions in listeners.
- There is no automated test runner — the `hugo` build is the gate. Run it after every change.

## Common Tasks
| Task | Location |
|------|----------|
| Edit homepage content | `content/en/_index.md` / `content/fa/_index.md` |
| Add product | `content/en/products/pXX.md` + `content/fa/products/pXX.md` |
| Change contact info | `hugo.toml` `[params.contact]` + per-language overrides |
| Modify nav menu | `hugo.toml` `[[languages.en.menu.main]]` / `[[languages.fa.menu.main]]` |
| Edit header / language toggle | `themes/ruiynpad/layouts/_partials/header.html` + `layout.css` |
| Edit styles | `themes/ruiynpad/assets/css/modules/*.css` |
| Edit JS behavior | `themes/ruiynpad/assets/js/main.js` |
| Add translation string | `i18n/{en,fa}.yaml` |

## Deployment
Static files in `public/` — deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.).
