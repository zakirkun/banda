# Design Tokens

All Banda tokens use the `--banda-` prefix. Import via:
```css
@import 'banda/src/styles/tokens.css';
```

## Colors

### Primary Palette
| Token | Value | Use |
|-------|-------|-----|
| `--banda-color-primary-50` | Light tint | Backgrounds |
| `--banda-color-primary-500` | Base | Default state |
| `--banda-color-primary-600` | Darker | Hover state |
| `--banda-color-primary` | Alias for 500 | Shorthand |

Same pattern for: `secondary`, `success`, `warning`, `danger`, `neutral`

### Semantic Colors
```css
--banda-color-surface        /* Card backgrounds */
--banda-color-background     /* Page background */
--banda-color-border         /* Default borders */
--banda-color-text-primary   /* Main text */
--banda-color-text-secondary /* Muted text */
--banda-color-text-tertiary  /* Hints/placeholders */
```

## Spacing

Consistent 4px scale:

| Token | Value |
|-------|-------|
| `--banda-space-1` | 4px |
| `--banda-space-2` | 8px |
| `--banda-space-3` | 12px |
| `--banda-space-4` | 16px |
| `--banda-space-6` | 24px |
| `--banda-space-8` | 32px |
| `--banda-space-12` | 48px |

Semantic aliases: `--banda-space-xs`, `--banda-space-sm`, `--banda-space-md`, `--banda-space-lg`, `--banda-space-xl`

## Border Radius

| Token | Value |
|-------|-------|
| `--banda-radius-sm` | 4px |
| `--banda-radius-md` | 8px |
| `--banda-radius-lg` | 12px |
| `--banda-radius-xl` | 16px |
| `--banda-radius-full` | 9999px |

## Shadows

| Token | Use |
|-------|-----|
| `--banda-shadow-sm` | Subtle elevation |
| `--banda-shadow-md` | Cards |
| `--banda-shadow-lg` | Dropdowns |
| `--banda-shadow-xl` | Modals |
| `--banda-shadow-focus` | Focus rings |

## Typography

### Font Families
```css
--banda-font-sans   /* Inter, system fonts */
--banda-font-mono   /* Code fonts */
```

### Font Sizes
| Token | Size |
|-------|------|
| `--banda-text-xs` | 12px |
| `--banda-text-sm` | 14px |
| `--banda-text-base` | 16px |
| `--banda-text-lg` | 18px |
| `--banda-text-xl` | 20px |
| `--banda-text-2xl` | 24px |

### Font Weights
```css
--banda-weight-normal    /* 400 */
--banda-weight-medium    /* 500 */
--banda-weight-semibold  /* 600 */
--banda-weight-bold      /* 700 */
```

## Transitions

| Token | Duration |
|-------|----------|
| `--banda-transition-fast` | 150ms |
| `--banda-transition-normal` | 200ms |
| `--banda-transition-slow` | 300ms |

## Z-Index

| Token | Value | Use |
|-------|-------|-----|
| `--banda-z-dropdown` | 100 | Select menus |
| `--banda-z-modal-backdrop` | 200 | Modal overlay |
| `--banda-z-modal` | 210 | Modal content |
| `--banda-z-tooltip` | 300 | Tooltips/toasts |

## Dark Mode

Tokens automatically adjust in dark mode:
```css
@media (prefers-color-scheme: dark) { ... }
.banda-dark { ... }
```

Override any token in your CSS:
```css
:root {
  --banda-color-primary: #your-brand-color;
}
```
