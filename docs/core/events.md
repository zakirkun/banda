# Events

Event handling utilities.

## Import

```typescript
import { 
  onKey, 
  Keys, 
  onClickOutside, 
  createFocusTrap, 
  onEscape,
  debounce, 
  throttle, 
  prevent, 
  delegate 
} from 'banda';
```

## onKey

Keyboard event handler factory.

```typescript
const input = document.querySelector('input');

input.addEventListener('keydown', onKey({
  Enter: () => submit(),
  Escape: () => cancel(),
  ArrowDown: () => selectNext(),
  ArrowUp: () => selectPrev(),
}));
```

### With Keys Constants

```typescript
import { onKey, Keys } from 'banda';

element.addEventListener('keydown', onKey({
  [Keys.ENTER]: () => submit(),
  [Keys.ESCAPE]: () => close(),
  [Keys.TAB]: () => focusNext(),
  [Keys.SPACE]: () => toggle(),
  [Keys.ARROW_UP]: () => moveUp(),
  [Keys.ARROW_DOWN]: () => moveDown(),
}));
```

### Available Keys

| Constant | Value |
|----------|-------|
| `Keys.ENTER` | `'Enter'` |
| `Keys.ESCAPE` | `'Escape'` |
| `Keys.SPACE` | `' '` |
| `Keys.TAB` | `'Tab'` |
| `Keys.ARROW_UP` | `'ArrowUp'` |
| `Keys.ARROW_DOWN` | `'ArrowDown'` |
| `Keys.ARROW_LEFT` | `'ArrowLeft'` |
| `Keys.ARROW_RIGHT` | `'ArrowRight'` |

## onClickOutside

Detects clicks outside an element.

```typescript
const dropdown = document.querySelector('.dropdown');

const cleanup = onClickOutside(dropdown, () => {
  closeDropdown();
});

// Later: remove listener
cleanup();
```

### Example: Dropdown

```typescript
function createDropdown() {
  const container = div({ className: 'dropdown' });
  let cleanup: (() => void) | null = null;

  function open() {
    container.classList.add('open');
    cleanup = onClickOutside(container, close);
  }

  function close() {
    container.classList.remove('open');
    cleanup?.();
  }

  return container;
}
```

## createFocusTrap

Traps focus within an element (for modals).

```typescript
const modal = document.querySelector('.modal');

// Enable trap
const releaseTrap = createFocusTrap(modal);

// Tab cycles through modal elements
// Shift+Tab cycles backwards

// Later: release
releaseTrap();
```

### Modal Example

```typescript
function openModal(content: HTMLElement) {
  const modal = div({
    className: 'modal',
    children: [content],
  });
  
  document.body.appendChild(modal);
  
  // Trap focus
  const releaseTrap = createFocusTrap(modal);
  
  // Close on ESC
  const removeEsc = onEscape(() => {
    releaseTrap();
    removeEsc();
    modal.remove();
  });
}
```

## onEscape

Global ESC key listener.

```typescript
const cleanup = onEscape(() => {
  closeModal();
});

// Later
cleanup();
```

## debounce

Delays execution until pause in calls.

```typescript
const search = debounce((query: string) => {
  fetchResults(query);
}, 300);

input.addEventListener('input', (e) => {
  search((e.target as HTMLInputElement).value);
});
```

### Example: Search Input

```typescript
const searchInput = input({
  attrs: { type: 'search', placeholder: 'Search...' },
  onInput: debounce((e) => {
    const query = (e.target as HTMLInputElement).value;
    performSearch(query);
  }, 300),
});
```

## throttle

Limits execution frequency.

```typescript
const handleScroll = throttle(() => {
  updateScrollPosition();
}, 100);

window.addEventListener('scroll', handleScroll);
```

### Example: Scroll Tracking

```typescript
const trackScroll = throttle(() => {
  const percent = (window.scrollY / document.body.scrollHeight) * 100;
  progressBar.style.width = `${percent}%`;
}, 50);

window.addEventListener('scroll', trackScroll);
```

## prevent

Wraps handler with `preventDefault()`.

```typescript
form({
  onSubmit: prevent((e) => {
    // Form won't reload page
    handleSubmit();
  }),
  children: [...],
})
```

### Example: Link Handler

```typescript
a({
  text: 'Click Me',
  attrs: { href: '#' },
  onClick: prevent(() => {
    // Won't navigate to #
    doSomething();
  }),
})
```

## delegate

Event delegation for dynamic elements.

```typescript
const list = ul({ className: 'todo-list' });

// Handle clicks on any .delete-btn, even added later
delegate(list, 'click', '.delete-btn', (e, target) => {
  const item = target.closest('li');
  item?.remove();
});
```

### Example: Todo List

```typescript
const todoList = ul({ className: 'todos' });

// Delegate to all current and future items
delegate(todoList, 'click', '.todo-item', (e, target) => {
  target.classList.toggle('completed');
});

delegate(todoList, 'click', '.delete', (e, target) => {
  target.closest('li')?.remove();
});
```

## Complete Example

```typescript
import { 
  div, button, input,
  onKey, Keys, onClickOutside, createFocusTrap, debounce
} from 'banda';

function SearchModal() {
  const modal = div({ className: 'search-modal' });
  
  const searchInput = input({
    attrs: { placeholder: 'Search...' },
    onInput: debounce((e) => {
      search((e.target as HTMLInputElement).value);
    }, 300),
    onKeyDown: onKey({
      [Keys.ESCAPE]: () => close(),
      [Keys.ARROW_DOWN]: () => focusFirstResult(),
    }),
  });

  modal.appendChild(searchInput);

  // Focus management
  const releaseTrap = createFocusTrap(modal);
  const cleanupOutside = onClickOutside(modal, close);

  function close() {
    releaseTrap();
    cleanupOutside();
    modal.remove();
  }

  return modal;
}
```
