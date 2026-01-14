# Button

Interactive button component with variants.

## Import

```typescript
import { Button, ButtonGroup } from 'banda';
```

## Basic Usage

```typescript
Button({
  label: 'Click Me',
  onClick: () => console.log('Clicked!'),
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Button text |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'outline'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable interaction |
| `loading` | `boolean` | `false` | Show loading state |
| `fullWidth` | `boolean` | `false` | Stretch to container |
| `iconOnly` | `boolean` | `false` | Square button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler |

## Variants

```typescript
Button({ label: 'Primary', variant: 'primary' })
Button({ label: 'Secondary', variant: 'secondary' })
Button({ label: 'Ghost', variant: 'ghost' })
Button({ label: 'Danger', variant: 'danger' })
Button({ label: 'Outline', variant: 'outline' })
```

## Sizes

```typescript
Button({ label: 'Small', size: 'sm' })
Button({ label: 'Medium', size: 'md' })
Button({ label: 'Large', size: 'lg' })
Button({ label: 'Extra Large', size: 'xl' })
```

## States

### Loading

```typescript
Button({
  label: 'Saving...',
  loading: true,
})
```

### Disabled

```typescript
Button({
  label: 'Disabled',
  disabled: true,
})
```

## Full Width

```typescript
Button({
  label: 'Full Width',
  fullWidth: true,
})
```

## ButtonGroup

Group related buttons together.

```typescript
ButtonGroup({
  children: [
    Button({ label: 'Left', variant: 'outline' }),
    Button({ label: 'Center', variant: 'outline' }),
    Button({ label: 'Right', variant: 'outline' }),
  ],
})
```

## Examples

### Form Submit

```typescript
form({
  children: [
    // ... inputs
    Button({
      label: 'Submit',
      type: 'submit',
      variant: 'primary',
    }),
  ],
})
```

### Async Action

```typescript
let loading = false;

Button({
  label: loading ? 'Saving...' : 'Save',
  loading: loading,
  onClick: async () => {
    loading = true;
    await saveData();
    loading = false;
  },
})
```

### Icon Button

```typescript
Button({
  label: '×',
  variant: 'ghost',
  iconOnly: true,
  onClick: () => close(),
})
```
