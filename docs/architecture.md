# Banda Architecture

## Overview

Banda is a lightweight TypeScript UI framework built on three pillars:
1. **Core utilities** - DOM manipulation, state, events
2. **Design tokens** - CSS custom properties for theming
3. **Components** - Composable UI primitives

```
┌─────────────────────────────────────────────────────────┐
│                    Application                          │
├─────────────────────────────────────────────────────────┤
│  Components (Button, Card, Modal, Tabs, etc.)          │
├─────────────────────────────────────────────────────────┤
│  Layout Primitives (Stack, Inline, Grid)               │
├─────────────────────────────────────────────────────────┤
│  Core (element, state, events, mount)                  │
├─────────────────────────────────────────────────────────┤
│  CSS Design System (tokens, reset, typography)         │
└─────────────────────────────────────────────────────────┘
```

## Core Modules

### `element.ts`
DOM factory with typed props:
```typescript
el({ tag: 'div', className: 'card', children: [...], onClick: handler })
```
Shorthand functions: `div()`, `button()`, `span()`, `input()`, etc.

### `state.ts`
Lightweight reactive state:
```typescript
const count = createState(0);
count.subscribe(val => console.log(val));
count.set(n => n + 1);
```
Also: `createComputed()`, `createPersistentState()`, `batch()`

### `events.ts`
Event utilities:
- `onKey()` - Keyboard handling
- `createFocusTrap()` - Modal focus management
- `onClickOutside()` - Dismiss handlers
- `debounce()`, `throttle()` - Performance

### `mount.ts`
Lifecycle management:
```typescript
mount(component, container);  // Render
registerCleanup(el, fn);      // Cleanup on unmount
unmount(el);                  // Remove + cleanup
```

## Component Pattern

Every component follows this structure:

```typescript
interface ComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children?: (HTMLElement | string)[];
  className?: string;
  // Event handlers
  onClick?: EventHandler<'click'>;
}

function Component(props: ComponentProps): HTMLElement {
  const { variant = 'primary', size = 'md', ...rest } = props;
  
  const classes = [
    'banda-component',
    `banda-component--${variant}`,
    `banda-component--${size}`,
  ].filter(Boolean).join(' ');
  
  return div({ className: classes, ...rest });
}
```

## CSS Architecture

### Token-based Design
All values use CSS custom properties with `--banda-` prefix:
- Colors: `--banda-color-primary`, `--banda-color-danger-500`
- Spacing: `--banda-space-4` (16px)
- Radius: `--banda-radius-md`
- Shadows: `--banda-shadow-lg`

### Component Styles
Each component has co-located CSS:
```
components/
  button/
    button.ts      # Component logic
    button.css     # Styles
    example.ts     # Demo usage
```

### BEM Naming
```css
.banda-button { }              /* Block */
.banda-button--primary { }     /* Modifier */
.banda-button__icon { }        /* Element */
```

## Data Flow

```
User Action → Event Handler → State Update → UI Re-render
     ↑                              ↓
     └──────── DOM Mutation ────────┘
```

Components create their DOM once. Updates happen via:
1. Direct DOM manipulation (`setText()`, `setClass()`)
2. State subscriptions that modify elements
3. Re-mounting with new props

## File Structure

```
src/
├── core/           # Framework primitives
├── styles/         # CSS design system
├── components/     # UI components
│   ├── button/
│   ├── card/
│   ├── input/
│   ├── badge/
│   ├── modal/
│   ├── layout/
│   ├── feedback/
│   ├── tabs/
│   └── select/
├── demo/           # Demo application
└── index.ts        # Public API
```
