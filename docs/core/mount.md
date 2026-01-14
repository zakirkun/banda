# Mount

Lifecycle and DOM manipulation utilities.

## Import

```typescript
import { 
  mount, 
  unmount, 
  registerCleanup,
  show, 
  hide, 
  toggle,
  setText,
  setClass,
  toggleClass 
} from 'banda';
```

## mount

Mounts an element to a container (replaces content).

```typescript
const app = div({ children: [...] });
const container = document.getElementById('app');

mount(app, container);
```

### Example: App Entry Point

```typescript
function App() {
  return div({
    children: [
      Header(),
      Main(),
      Footer(),
    ],
  });
}

// Mount app
mount(App(), document.getElementById('app')!);
```

## unmount

Removes element and runs cleanup handlers.

```typescript
const element = div({ text: 'Hello' });
document.body.appendChild(element);

// Later
unmount(element); // Removes and cleans up
```

## registerCleanup

Registers a cleanup function to run on unmount.

```typescript
function Timer() {
  const display = span({ text: '0' });
  let count = 0;

  const interval = setInterval(() => {
    count++;
    display.textContent = String(count);
  }, 1000);

  // Cleanup when unmounted
  registerCleanup(display, () => {
    clearInterval(interval);
  });

  return display;
}

// When you call unmount(timer), interval is cleared
```

### Example: Event Listeners

```typescript
function Tooltip(text: string) {
  const el = span({ className: 'tooltip', text });

  const handleScroll = () => {
    updatePosition(el);
  };

  window.addEventListener('scroll', handleScroll);

  // Remove listener on unmount
  registerCleanup(el, () => {
    window.removeEventListener('scroll', handleScroll);
  });

  return el;
}
```

## show / hide

Toggle element visibility.

```typescript
const modal = div({ className: 'modal' });

hide(modal); // display: none
show(modal); // display: ''
```

### Example: Loading State

```typescript
const loadingSpinner = Spinner();
const content = div({ children: [...] });

hide(content);
show(loadingSpinner);

await fetchData();

hide(loadingSpinner);
show(content);
```

## toggle

Toggle visibility with optional force.

```typescript
const panel = div({ className: 'panel' });

toggle(panel);         // Toggle current state
toggle(panel, true);   // Force show
toggle(panel, false);  // Force hide

// With boolean condition
toggle(panel, isExpanded);
```

### Example: Accordion

```typescript
function Accordion(title: string, content: HTMLElement) {
  const body = div({ className: 'accordion-body', children: [content] });
  hide(body);

  const header = button({
    text: title,
    onClick: () => toggle(body),
  });

  return div({
    className: 'accordion',
    children: [header, body],
  });
}
```

## setText

Update element text content.

```typescript
const label = span({ text: 'Initial' });

setText(label, 'Updated');
```

### Example: Counter

```typescript
const countLabel = span({ text: '0' });
let count = 0;

button({
  text: '+',
  onClick: () => {
    count++;
    setText(countLabel, String(count));
  },
})
```

## setClass

Replace element classes.

```typescript
const card = div({ className: 'card' });

setClass(card, 'card highlight');
// className is now 'card highlight'
```

## toggleClass

Add or remove a class.

```typescript
const item = li({ className: 'item' });

toggleClass(item, 'selected');        // Toggle
toggleClass(item, 'selected', true);  // Add
toggleClass(item, 'selected', false); // Remove
```

### Example: Tab Selection

```typescript
function selectTab(tabs: HTMLElement[], index: number) {
  tabs.forEach((tab, i) => {
    toggleClass(tab, 'active', i === index);
  });
}
```

## Complete Example

```typescript
import { 
  div, button, span,
  mount, unmount, registerCleanup,
  show, hide, toggle, setText
} from 'banda';

function Counter() {
  let count = 0;
  const label = span({ text: '0' });

  const interval = setInterval(() => {
    count++;
    setText(label, String(count));
  }, 1000);

  registerCleanup(label, () => {
    clearInterval(interval);
    console.log('Counter cleaned up');
  });

  const container = div({
    children: [
      label,
      button({
        text: 'Stop',
        onClick: () => unmount(container),
      }),
    ],
  });

  return container;
}

// Mount
const counter = Counter();
mount(counter, document.getElementById('app')!);

// Later: unmount triggers cleanup
// unmount(counter);
```
