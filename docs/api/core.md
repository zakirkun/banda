# Core API Reference

## Element Creation

### `el(props)`

Creates an HTML element with typed props.

```typescript
function el<K extends keyof HTMLElementTagNameMap>(
  props: ElementProps & { tag: K }
): HTMLElementTagNameMap[K]
```

#### Parameters

| Prop | Type | Description |
|------|------|-------------|
| `tag` | `keyof HTMLElementTagNameMap` | HTML tag name (default: `'div'`) |
| `className` | `string` | CSS class name(s) |
| `children` | `(HTMLElement \| string)[]` | Child elements or text |
| `attrs` | `Record<string, string \| boolean \| number>` | HTML attributes |
| `style` | `Partial<CSSStyleDeclaration>` | Inline styles |
| `text` | `string` | Text content |
| `html` | `string` | Inner HTML (use with caution) |
| `onClick` | `(e: MouseEvent) => void` | Click handler |
| `onKeyDown` | `(e: KeyboardEvent) => void` | Keydown handler |
| `onInput` | `(e: Event) => void` | Input handler |
| `onChange` | `(e: Event) => void` | Change handler |

#### Example

```typescript
import { el } from 'banda';

const card = el({
  tag: 'article',
  className: 'card',
  attrs: { 'data-id': '123' },
  style: { padding: '1rem' },
  children: [
    el({ tag: 'h2', text: 'Title' }),
    el({ tag: 'p', text: 'Description' }),
  ],
});
```

### Shorthand Functions

| Function | Equivalent |
|----------|------------|
| `div(props)` | `el({ ...props, tag: 'div' })` |
| `span(props)` | `el({ ...props, tag: 'span' })` |
| `button(props)` | `el({ ...props, tag: 'button' })` |
| `input(props)` | `el({ ...props, tag: 'input' })` |
| `label(props)` | `el({ ...props, tag: 'label' })` |
| `a(props)` | `el({ ...props, tag: 'a' })` |
| `h1(props)` | `el({ ...props, tag: 'h1' })` |
| `h2(props)` | `el({ ...props, tag: 'h2' })` |
| `h3(props)` | `el({ ...props, tag: 'h3' })` |
| `p(props)` | `el({ ...props, tag: 'p' })` |
| `ul(props)` | `el({ ...props, tag: 'ul' })` |
| `li(props)` | `el({ ...props, tag: 'li' })` |
| `form(props)` | `el({ ...props, tag: 'form' })` |

---

## State Management

### `createState<T>(initial)`

Creates a reactive state container.

```typescript
function createState<T>(initialValue: T): State<T>
```

#### Returns: `State<T>`

| Method | Signature | Description |
|--------|-----------|-------------|
| `get()` | `() => T` | Get current value |
| `set(value)` | `(value: T \| (prev: T) => T) => void` | Update value |
| `subscribe(fn)` | `(fn: (value: T) => void) => () => void` | Listen to changes |

#### Example

```typescript
import { createState } from 'banda';

const count = createState(0);

// Subscribe (returns cleanup function)
const unsubscribe = count.subscribe(v => console.log(v));

// Update
count.set(5);
count.set(n => n + 1);

// Read
console.log(count.get()); // 6

// Cleanup
unsubscribe();
```

---

### `createComputed(deps, fn)`

Creates derived state from other states.

```typescript
function createComputed<T, D extends State<any>[]>(
  deps: D,
  compute: (...values: StateValues<D>) => T
): State<T>
```

#### Example

```typescript
const firstName = createState('John');
const lastName = createState('Doe');

const fullName = createComputed(
  [firstName, lastName],
  (first, last) => `${first} ${last}`
);

console.log(fullName.get()); // "John Doe"
```

---

### `createPersistentState(key, initial)`

Creates state that persists to localStorage.

```typescript
function createPersistentState<T>(
  key: string,
  initialValue: T
): State<T>
```

#### Example

```typescript
const theme = createPersistentState('app-theme', 'light');
theme.set('dark'); // Saved to localStorage
```

---

### `batch(fn)`

Batches multiple state updates into one notification cycle.

```typescript
function batch(fn: () => void): void
```

#### Example

```typescript
batch(() => {
  count.set(1);
  name.set('Alice');
  // Subscribers called once after batch completes
});
```

---

## Mount & Lifecycle

### `mount(element, container)`

Mounts an element to a DOM container (replaces content).

```typescript
function mount(element: HTMLElement, container: Element): void
```

### `unmount(element)`

Removes element and runs cleanup handlers.

```typescript
function unmount(element: Element): void
```

### `registerCleanup(element, fn)`

Registers a cleanup function to run on unmount.

```typescript
function registerCleanup(element: Element, cleanup: () => void): void
```

#### Example

```typescript
const timer = setInterval(() => tick(), 1000);

registerCleanup(element, () => {
  clearInterval(timer);
});
```

---

## DOM Utilities

### `show(element)` / `hide(element)`

```typescript
show(element);  // display: ''
hide(element);  // display: 'none'
```

### `toggle(element, visible?)`

```typescript
toggle(element);         // Toggle current state
toggle(element, true);   // Force show
toggle(element, false);  // Force hide
```

### `setText(element, text)`

```typescript
setText(label, 'New text');
```

### `setClass(element, className)`

```typescript
setClass(element, 'active highlighted');
```

### `toggleClass(element, className, force?)`

```typescript
toggleClass(element, 'active');        // Toggle
toggleClass(element, 'active', true);  // Add
toggleClass(element, 'active', false); // Remove
```

---

## Event Utilities

### `onKey(handlers)`

Returns a keyboard event handler.

```typescript
function onKey(
  handlers: Partial<Record<string, () => void>>
): (event: KeyboardEvent) => void
```

#### Example

```typescript
import { onKey, Keys } from 'banda';

element.addEventListener('keydown', onKey({
  [Keys.ENTER]: () => submit(),
  [Keys.ESCAPE]: () => cancel(),
  [Keys.ARROW_DOWN]: () => selectNext(),
}));
```

### `Keys` Constants

```typescript
Keys.ENTER      // 'Enter'
Keys.ESCAPE     // 'Escape'
Keys.SPACE      // ' '
Keys.TAB        // 'Tab'
Keys.ARROW_UP   // 'ArrowUp'
Keys.ARROW_DOWN // 'ArrowDown'
Keys.ARROW_LEFT // 'ArrowLeft'
Keys.ARROW_RIGHT// 'ArrowRight'
```

---

### `onClickOutside(element, handler)`

Detects clicks outside an element.

```typescript
function onClickOutside(
  element: Element,
  handler: () => void
): () => void  // Returns cleanup function
```

---

### `createFocusTrap(element)`

Traps focus within an element (for modals).

```typescript
function createFocusTrap(element: HTMLElement): () => void
```

---

### `onEscape(handler)`

Global ESC key listener.

```typescript
function onEscape(handler: () => void): () => void
```

---

### `debounce(fn, wait)` / `throttle(fn, wait)`

```typescript
const search = debounce((query) => fetchResults(query), 300);
const scroll = throttle(() => updatePosition(), 100);
```

---

### `prevent(handler)`

Wraps handler with `preventDefault()`.

```typescript
form.addEventListener('submit', prevent(() => {
  handleSubmit();
}));
```
