# Getting Started with Banda

## Installation

```bash
# Clone the repository
git clone https://github.com/zakirkun/banda.git
cd banda

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

---

## Your First Component

### 1. Import Core Functions

```typescript
import { div, button, h1 } from 'banda';
import { mount } from 'banda';
```

### 2. Create Elements

```typescript
const greeting = div({
  className: 'greeting',
  children: [
    h1({ text: 'Hello, Banda!' }),
    button({
      text: 'Click me',
      onClick: () => alert('Welcome to Banda!'),
    }),
  ],
});
```

### 3. Mount to DOM

```typescript
mount(greeting, document.getElementById('app')!);
```

---

## Using Components

### Buttons

```typescript
import { Button } from 'banda';

Button({
  label: 'Submit',
  variant: 'primary',  // 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size: 'md',          // 'sm' | 'md' | 'lg' | 'xl'
  onClick: () => handleSubmit(),
})
```

### Cards

```typescript
import { Card, CardHeader, CardBody, CardFooter } from 'banda';

Card({
  variant: 'elevated',
  children: [
    CardHeader({ title: 'Settings', subtitle: 'Manage your preferences' }),
    CardBody({ children: [/* your content */] }),
    CardFooter({ children: [Button({ label: 'Save' })] }),
  ],
})
```

### Forms

```typescript
import { Input, Select, Button, Stack } from 'banda';

Stack({
  space: 4,
  children: [
    Input({
      label: 'Email',
      type: 'email',
      placeholder: 'you@example.com',
      required: true,
    }),
    Input({
      label: 'Password',
      type: 'password',
      required: true,
    }),
    Select({
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ],
      placeholder: 'Select role',
    }),
    Button({ label: 'Sign Up', variant: 'primary' }),
  ],
})
```

---

## State Management

### Creating State

```typescript
import { createState } from 'banda';

const count = createState(0);

// Read value
console.log(count.get()); // 0

// Update value
count.set(5);
count.set(n => n + 1); // Functional update

// Subscribe to changes
count.subscribe(value => {
  console.log('Count changed:', value);
});
```

### Computed State

```typescript
import { createState, createComputed } from 'banda';

const price = createState(100);
const quantity = createState(2);

const total = createComputed(
  [price, quantity],
  (p, q) => p * q
);

console.log(total.get()); // 200
```

### Persistent State

```typescript
import { createPersistentState } from 'banda';

// Saved to localStorage automatically
const theme = createPersistentState('theme', 'light');
```

---

## Layout Primitives

### Stack (Vertical)

```typescript
import { Stack } from 'banda';

Stack({
  space: 4,          // Gap between children (4 = 16px)
  align: 'center',   // Cross-axis alignment
  children: [A(), B(), C()],
})
```

### Inline (Horizontal)

```typescript
import { Inline, Spacer } from 'banda';

Inline({
  space: 2,
  align: 'center',
  children: [
    Logo(),
    Spacer(),  // Pushes remaining items to right
    NavButtons(),
  ],
})
```

### Grid

```typescript
import { Grid } from 'banda';

// Fixed columns
Grid({ cols: 3, gap: 4, children: cards })

// Responsive auto-fit
Grid({ cols: 'auto-fit', minWidth: '250px', gap: 4, children: cards })
```

---

## Modals

```typescript
import { openModal, closeModal, Button } from 'banda';

Button({
  label: 'Open Modal',
  onClick: () => {
    openModal({
      title: 'Confirm Action',
      children: [p({ text: 'Are you sure?' })],
      footer: [
        Button({ label: 'Cancel', variant: 'ghost', onClick: closeModal }),
        Button({ label: 'Confirm', variant: 'primary', onClick: handleConfirm }),
      ],
    });
  },
})
```

---

## Notifications

### Toast

```typescript
import { toast } from 'banda';

// Show toast
toast({ message: 'File saved!', variant: 'success' });

// With title and longer duration
toast({
  title: 'Error',
  message: 'Something went wrong',
  variant: 'danger',
  duration: 0,  // Won't auto-close
});
```

### Alert

```typescript
import { Alert } from 'banda';

Alert({
  title: 'Warning',
  message: 'Please review your input',
  variant: 'warning',
  dismissible: true,
})
```

---

## Tabs

```typescript
import { Tabs } from 'banda';

Tabs({
  variant: 'pills',  // 'default' | 'pills' | 'bordered'
  items: [
    { id: 'tab1', label: 'Overview', content: OverviewPanel() },
    { id: 'tab2', label: 'Settings', content: SettingsPanel() },
    { id: 'tab3', label: 'Analytics', content: AnalyticsPanel(), disabled: true },
  ],
  onChange: (tabId) => console.log('Switched to:', tabId),
})
```

---

## Styling

### Using Design Tokens

```css
.my-component {
  padding: var(--banda-space-4);
  background: var(--banda-color-surface);
  border-radius: var(--banda-radius-md);
  box-shadow: var(--banda-shadow-md);
}

.my-component:hover {
  box-shadow: var(--banda-shadow-lg);
  transition: var(--banda-transition-shadow);
}
```

### Dark Mode

```css
/* Automatic */
@media (prefers-color-scheme: dark) {
  :root {
    --banda-color-surface: #1a1a1a;
  }
}

/* Manual toggle */
document.body.classList.add('banda-dark');
```

---

## Event Handling

### Keyboard Events

```typescript
import { onKey, Keys } from 'banda';

element.addEventListener('keydown', onKey({
  [Keys.ENTER]: () => submit(),
  [Keys.ESCAPE]: () => cancel(),
  [Keys.ARROW_DOWN]: () => selectNext(),
}));
```

### Click Outside

```typescript
import { onClickOutside } from 'banda';

const cleanup = onClickOutside(dropdown, () => {
  closeDropdown();
});

// Later: cleanup();
```

---

## Next Steps

- Read the [API Reference](./api/README.md)
- Explore [Design Tokens](./design-tokens.md)
- Review [Accessibility](./accessibility.md)
- Understand the [Philosophy](./philosophy.md)
