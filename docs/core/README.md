# Core API Reference

Banda's core utilities for DOM creation, state management, events, and lifecycle.

## Modules

| Module | Purpose |
|--------|---------|
| [element](./element.md) | DOM element creation with typed props |
| [state](./state.md) | Reactive state and computed values |
| [events](./events.md) | Event handling, keyboard, focus traps |
| [mount](./mount.md) | Lifecycle and DOM manipulation |
| [validation](./validation.md) | Form validation with built-in rules |
| [plugins](./plugins.md) | Plugin system for extensibility |

## Quick Reference

### Element Creation

```typescript
import { div, span, button, input, p, h1 } from 'banda';

const card = div({
  className: 'card',
  children: [
    h1({ text: 'Title' }),
    p({ text: 'Content' }),
  ],
});
```

### State Management

```typescript
import { createState, createComputed, batch } from 'banda';

const count = createState(0);
count.subscribe(v => console.log('Count:', v));
count.set(n => n + 1);
```

### Event Handling

```typescript
import { onKey, Keys, onClickOutside, debounce } from 'banda';

element.addEventListener('keydown', onKey({
  [Keys.ENTER]: submit,
  [Keys.ESCAPE]: cancel,
}));
```

### Mount & Cleanup

```typescript
import { mount, unmount, registerCleanup } from 'banda';

mount(App(), document.getElementById('app')!);

registerCleanup(element, () => {
  // Cleanup when unmounted
});
```

### Form Validation

```typescript
import { createForm, rules } from 'banda';

const form = createForm({
  email: { rules: [rules.required(), rules.email()] },
  password: { rules: [rules.minLength(8)] },
});
```

### Plugin System

```typescript
import { use, inject, definePlugin } from 'banda';

use(definePlugin('analytics', () => ({
  provides: { track: (event) => send(event) },
})));

const track = inject('track');
```
