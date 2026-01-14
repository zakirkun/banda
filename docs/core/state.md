# State

Lightweight reactive state management.

## Import

```typescript
import { createState, createComputed, createPersistentState, batch } from 'banda';
```

## createState

Creates a reactive state container.

### Basic Usage

```typescript
const count = createState(0);

// Read value
console.log(count.get()); // 0

// Update value
count.set(5);
count.set(n => n + 1); // Functional update

// Subscribe to changes
const unsubscribe = count.subscribe(value => {
  console.log('Count changed:', value);
});

// Later: cleanup
unsubscribe();
```

### With Objects

```typescript
interface User {
  name: string;
  email: string;
}

const user = createState<User>({
  name: 'John',
  email: 'john@example.com',
});

// Update a property
user.set(u => ({ ...u, name: 'Jane' }));

// Subscribe
user.subscribe(u => {
  console.log('User updated:', u.name);
});
```

### Binding to DOM

```typescript
const message = createState('Hello');

const label = span({ text: message.get() });

// Update DOM when state changes
message.subscribe(value => {
  label.textContent = value;
});

// Trigger update
message.set('World');
```

## createComputed

Creates derived state from other states.

```typescript
const price = createState(100);
const quantity = createState(2);
const taxRate = createState(0.1);

// Computed value updates automatically
const total = createComputed(
  [price, quantity, taxRate],
  (p, q, t) => p * q * (1 + t)
);

console.log(total.get()); // 220

// Updates when dependencies change
quantity.set(3);
console.log(total.get()); // 330
```

### Read-only Computed

```typescript
const firstName = createState('John');
const lastName = createState('Doe');

const fullName = createComputed(
  [firstName, lastName],
  (first, last) => `${first} ${last}`
);

// ✅ Read
console.log(fullName.get()); // "John Doe"

// ❌ Cannot set (computed is read-only)
// fullName.set('Jane Smith'); // Error
```

## createPersistentState

State that persists to localStorage.

```typescript
// Saved to localStorage under key 'app-theme'
const theme = createPersistentState('app-theme', 'light');

// Value persists across page reloads
theme.set('dark');

// On next page load:
console.log(theme.get()); // 'dark' (from localStorage)
```

### With Objects

```typescript
interface Settings {
  notifications: boolean;
  language: string;
}

const settings = createPersistentState<Settings>('settings', {
  notifications: true,
  language: 'en',
});

settings.set(s => ({ ...s, language: 'es' }));
```

## batch

Batches multiple state updates.

```typescript
const firstName = createState('');
const lastName = createState('');
const fullName = createComputed(
  [firstName, lastName],
  (f, l) => `${f} ${l}`
);

// Without batch: 2 notifications
firstName.set('John');
lastName.set('Doe');

// With batch: 1 notification after both updates
batch(() => {
  firstName.set('John');
  lastName.set('Doe');
});
```

## API Reference

### State<T>

| Method | Signature | Description |
|--------|-----------|-------------|
| `get()` | `() => T` | Get current value |
| `set(value)` | `(value: T \| (prev: T) => T) => void` | Update value |
| `subscribe(fn)` | `(fn: (value: T) => void) => () => void` | Listen to changes |

## Patterns

### Toggle State

```typescript
const isOpen = createState(false);

function toggle() {
  isOpen.set(open => !open);
}
```

### Counter

```typescript
const count = createState(0);

const increment = () => count.set(n => n + 1);
const decrement = () => count.set(n => n - 1);
const reset = () => count.set(0);
```

### Form State

```typescript
const formData = createState({
  email: '',
  password: '',
  remember: false,
});

function updateField(field: string, value: any) {
  formData.set(data => ({ ...data, [field]: value }));
}
```
