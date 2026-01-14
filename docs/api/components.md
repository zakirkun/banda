# Components API Reference

## Button

Interactive button with variants and states.

```typescript
import { Button, ButtonGroup } from 'banda';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Button text |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'outline'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable interaction |
| `loading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Stretch to container |
| `iconOnly` | `boolean` | `false` | Square button for icons |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML type |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler |

### Examples

```typescript
// Basic
Button({ label: 'Click Me', variant: 'primary' })

// Loading state
Button({ label: 'Saving...', loading: true, disabled: true })

// Button group
ButtonGroup({ children: [
  Button({ label: 'Left' }),
  Button({ label: 'Center' }),
  Button({ label: 'Right' }),
]})
```

---

## Card

Container component for content grouping.

```typescript
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from 'banda';
```

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'ghost' \| 'interactive'` | `'default'` | Visual style |
| `padding` | `'default' \| 'compact' \| 'spacious'` | `'default'` | Padding size |
| `interactive` | `boolean` | `false` | Hover effects |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler |

### CardHeader Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Header title |
| `subtitle` | `string` | Subtitle text |
| `action` | `HTMLElement` | Action element (button, icon) |

### Example

```typescript
Card({
  variant: 'elevated',
  children: [
    CardMedia({ src: '/image.jpg', alt: 'Product' }),
    CardHeader({
      title: 'Product Name',
      subtitle: '$49.99',
      action: Button({ label: 'Buy', size: 'sm' }),
    }),
    CardBody({
      children: [p({ text: 'Product description...' })],
    }),
    CardFooter({
      children: [Button({ label: 'Add to Cart' })],
    }),
  ],
})
```

---

## Input

Text input with labels and validation.

```typescript
import { Input, Textarea, createControlledInput } from 'banda';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Input name |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder |
| `value` | `string` | - | Initial value |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validation state |
| `helperText` | `string` | - | Help text below input |
| `errorMessage` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Required field |
| `prefix` | `string` | - | Text before input |
| `suffix` | `string` | - | Text after input |

### Example

```typescript
Input({
  label: 'Email',
  type: 'email',
  placeholder: 'you@example.com',
  helperText: 'We will never share your email',
  required: true,
  state: 'error',
  errorMessage: 'Invalid email address',
})

// Controlled input with state
const email = createState('');
const { element, state } = createControlledInput({
  type: 'email',
  placeholder: 'Email',
});
```

---

## Badge

Small label for status or counts.

```typescript
import { Badge, BadgeGroup, StatusBadge } from 'banda';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Badge text |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color |
| `styleType` | `'subtle' \| 'solid' \| 'outline'` | `'subtle'` | Style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `dot` | `boolean` | `false` | Show dot indicator |
| `dotPulse` | `boolean` | `false` | Animate dot |
| `dismissible` | `boolean` | `false` | Show close button |
| `onDismiss` | `() => void` | - | Dismiss handler |

### Example

```typescript
Badge({ label: 'New', variant: 'primary', styleType: 'solid' })

StatusBadge({ status: 'online' })  // Preset: online, away, busy, offline

BadgeGroup({ children: [
  Badge({ label: 'React' }),
  Badge({ label: 'TypeScript' }),
]})
```

---

## Modal

Dialog with backdrop and focus management.

```typescript
import { openModal, closeModal, isModalOpen } from 'banda';
```

### openModal Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | - | Modal title |
| `description` | `string` | - | Subtitle |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Width |
| `centered` | `boolean` | `false` | Center content |
| `closeOnBackdrop` | `boolean` | `true` | Click backdrop to close |
| `closeOnEscape` | `boolean` | `true` | ESC key closes |
| `showCloseButton` | `boolean` | `true` | Show X button |
| `children` | `HTMLElement[]` | - | Body content |
| `footer` | `HTMLElement[]` | - | Footer buttons |
| `footerAlign` | `'left' \| 'center' \| 'right' \| 'between'` | `'right'` | Footer alignment |
| `onClose` | `() => void` | - | Close callback |

### Example

```typescript
openModal({
  title: 'Delete Item?',
  description: 'This action cannot be undone.',
  size: 'sm',
  centered: true,
  children: [p({ text: 'Are you sure?' })],
  footer: [
    Button({ label: 'Cancel', variant: 'ghost', onClick: closeModal }),
    Button({ label: 'Delete', variant: 'danger', onClick: handleDelete }),
  ],
});
```

---

## Layout

### Stack

Vertical layout with spacing.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `space` | `0-12` | `4` | Gap size |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | - | Cross-axis |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | - | Main-axis |

### Inline

Horizontal layout with wrapping.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `space` | `0-12` | `2` | Gap size |
| `nowrap` | `boolean` | `false` | Prevent wrapping |
| `align` | `'start' \| 'center' \| 'end' \| 'baseline'` | - | Alignment |

### Grid

CSS grid layout.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1-6 \| 12 \| 'auto-fit' \| 'auto-fill'` | `1` | Columns |
| `gap` | `0-12` | `4` | Gap size |
| `minWidth` | `string` | `'200px'` | Min column width (auto modes) |

### Example

```typescript
Stack({ space: 6, children: [
  Inline({ space: 2, justify: 'between', children: [Logo(), Nav()] }),
  Grid({ cols: 3, gap: 4, children: cards }),
  Divider({}),
  Footer(),
]})
```

---

## Feedback

### Alert

```typescript
Alert({
  title: 'Error',
  message: 'Something went wrong',
  variant: 'danger',  // 'info' | 'success' | 'warning' | 'danger' | 'neutral'
  dismissible: true,
  onClose: () => {},
})
```

### Spinner

```typescript
Spinner({
  size: 'md',     // 'sm' | 'md' | 'lg' | 'xl'
  color: 'primary', // 'primary' | 'secondary' | 'neutral'
  label: 'Loading...',
})
```

### Toast

```typescript
import { toast, dismissToast, dismissAllToasts, configureToast } from 'banda';

// Configure position (once)
configureToast({ position: 'top-right' });

// Show toast
const id = toast({
  title: 'Success',
  message: 'File uploaded',
  variant: 'success',
  duration: 5000,  // ms, 0 = no auto-close
});

// Dismiss
dismissToast(id);
dismissAllToasts();
```

### Tooltip

```typescript
Tooltip({
  content: 'Helpful hint',
  position: 'top',  // 'top' | 'bottom' | 'left' | 'right'
  delay: 200,       // ms before showing
  children: Button({ label: 'Hover me' }),
})
```

---

## Tabs

Tabbed interface.

```typescript
import { Tabs } from 'banda';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | - | Tab definitions |
| `defaultTab` | `string` | First tab | Initial active tab |
| `variant` | `'default' \| 'pills' \| 'bordered'` | `'default'` | Style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `stretch` | `boolean` | `false` | Full width tabs |
| `onChange` | `(tabId: string) => void` | - | Tab change handler |

### TabItem

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Tab label |
| `content` | `HTMLElement \| () => HTMLElement` | Panel content |
| `disabled` | `boolean` | Disable tab |

### Example

```typescript
Tabs({
  variant: 'pills',
  stretch: true,
  items: [
    { id: 'overview', label: 'Overview', content: OverviewPanel() },
    { id: 'settings', label: 'Settings', content: () => SettingsPanel() },
  ],
  onChange: (id) => console.log('Tab:', id),
})
```

---

## Select

Dropdown with search support.

```typescript
import { Select } from 'banda';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[] \| SelectOptionGroup[]` | - | Options |
| `value` | `string` | - | Selected value |
| `placeholder` | `string` | `'Select...'` | Placeholder |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | Disable select |
| `searchable` | `boolean` | `false` | Enable search |
| `onChange` | `(value: string) => void` | - | Selection handler |

### Example

```typescript
Select({
  placeholder: 'Choose country',
  searchable: true,
  options: [
    { label: 'North America', options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
    ]},
    { label: 'Europe', options: [
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
    ]},
  ],
  onChange: (value) => console.log('Selected:', value),
})
```
