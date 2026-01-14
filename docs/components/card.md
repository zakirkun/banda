# Card

Container component for content grouping.

## Import

```typescript
import { Card, CardHeader, CardBody, CardFooter, CardMedia } from 'banda';
```

## Basic Usage

```typescript
Card({
  children: [
    CardHeader({ title: 'Card Title' }),
    CardBody({ children: [p({ text: 'Card content...' })] }),
  ],
})
```

## Props

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined' \| 'ghost' \| 'interactive'` | `'default'` | Visual style |
| `padding` | `'default' \| 'compact' \| 'spacious'` | `'default'` | Padding size |
| `interactive` | `boolean` | `false` | Hover effects |
| `onClick` | `(e: MouseEvent) => void` | - | Click handler |

### CardHeader

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Header title |
| `subtitle` | `string` | Subtitle text |
| `action` | `HTMLElement` | Action element |

### CardBody

| Prop | Type | Description |
|------|------|-------------|
| `children` | `HTMLElement[]` | Body content |

### CardFooter

| Prop | Type | Description |
|------|------|-------------|
| `children` | `HTMLElement[]` | Footer content |
| `align` | `'left' \| 'center' \| 'right'` | Content alignment |

### CardMedia

| Prop | Type | Description |
|------|------|-------------|
| `src` | `string` | Image source |
| `alt` | `string` | Alt text |

## Variants

```typescript
Card({ variant: 'default', children: [...] })
Card({ variant: 'elevated', children: [...] })
Card({ variant: 'outlined', children: [...] })
Card({ variant: 'ghost', children: [...] })
```

## Examples

### Product Card

```typescript
Card({
  variant: 'elevated',
  children: [
    CardMedia({
      src: '/product.jpg',
      alt: 'Product Image',
    }),
    CardHeader({
      title: 'Product Name',
      subtitle: '$99.99',
    }),
    CardBody({
      children: [
        p({ text: 'Product description here...' }),
      ],
    }),
    CardFooter({
      children: [
        Button({ label: 'Add to Cart', variant: 'primary' }),
      ],
    }),
  ],
})
```

### With Header Action

```typescript
Card({
  children: [
    CardHeader({
      title: 'Settings',
      subtitle: 'Manage your preferences',
      action: Button({
        label: '⚙️',
        variant: 'ghost',
        iconOnly: true,
      }),
    }),
    CardBody({ children: [...] }),
  ],
})
```

### Interactive Card

```typescript
Card({
  variant: 'interactive',
  onClick: () => navigateTo('/details'),
  children: [
    CardHeader({ title: 'Click Me' }),
    CardBody({ children: [p({ text: 'This card is clickable' })] }),
  ],
})
```

### Compact Card

```typescript
Card({
  padding: 'compact',
  children: [
    CardBody({
      children: [
        Inline({
          space: 2,
          children: [
            Badge({ label: 'New' }),
            span({ text: 'Notification message' }),
          ],
        }),
      ],
    }),
  ],
})
```
