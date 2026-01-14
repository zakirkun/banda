# Layout

Layout primitives for composing interfaces.

## Import

```typescript
import { Stack, Inline, Grid, Divider, Spacer, Center, Container } from 'banda';
```

## Stack

Vertical layout with consistent spacing.

```typescript
Stack({
  space: 4,
  children: [
    div({ text: 'Item 1' }),
    div({ text: 'Item 2' }),
    div({ text: 'Item 3' }),
  ],
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `space` | `0-12` | `4` | Gap between children |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | - | Cross-axis alignment |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | - | Main-axis alignment |

### Examples

```typescript
// Centered items
Stack({ space: 4, align: 'center', children: [...] })

// Space between
Stack({ space: 4, justify: 'between', children: [...] })
```

---

## Inline

Horizontal layout with wrapping.

```typescript
Inline({
  space: 2,
  children: [
    Button({ label: 'One' }),
    Button({ label: 'Two' }),
    Button({ label: 'Three' }),
  ],
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `space` | `0-12` | `2` | Gap between children |
| `align` | `'start' \| 'center' \| 'end' \| 'baseline'` | - | Alignment |
| `nowrap` | `boolean` | `false` | Prevent wrapping |

### Examples

```typescript
// Header with logo and nav
Inline({
  space: 4,
  justify: 'between',
  align: 'center',
  children: [
    Logo(),
    Nav(),
  ],
})

// Tags
Inline({
  space: 2,
  children: tags.map(tag => Badge({ label: tag })),
})
```

---

## Grid

CSS grid layout.

```typescript
Grid({
  cols: 3,
  gap: 4,
  children: cards,
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cols` | `1-6 \| 12 \| 'auto-fit' \| 'auto-fill'` | `1` | Columns |
| `gap` | `0-12` | `4` | Gap size |
| `minWidth` | `string` | `'200px'` | Min column width (auto modes) |

### Examples

```typescript
// Fixed 3 columns
Grid({ cols: 3, gap: 4, children: [...] })

// Responsive auto-fit
Grid({ cols: 'auto-fit', minWidth: '250px', gap: 4, children: [...] })

// Auto-fill
Grid({ cols: 'auto-fill', minWidth: '300px', children: [...] })
```

---

## Divider

Visual separator.

```typescript
Stack({
  space: 4,
  children: [
    Section1(),
    Divider({}),
    Section2(),
  ],
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `variant` | `'subtle' \| 'strong'` | `'subtle'` | Style |

### Examples

```typescript
// Horizontal (default)
Divider({})

// Vertical in Inline
Inline({
  space: 4,
  children: [
    span({ text: 'Left' }),
    Divider({ orientation: 'vertical' }),
    span({ text: 'Right' }),
  ],
})

// Strong divider
Divider({ variant: 'strong' })
```

---

## Spacer

Flexible space that expands.

```typescript
Inline({
  children: [
    Logo(),
    Spacer(), // Pushes nav to right
    Nav(),
  ],
})
```

### Examples

```typescript
// Header layout
Inline({
  align: 'center',
  children: [
    h1({ text: 'Title' }),
    Spacer(),
    Button({ label: 'Action' }),
  ],
})

// Card footer
CardFooter({
  children: [
    span({ text: 'Status: Active' }),
    Spacer(),
    Button({ label: 'Edit' }),
  ],
})
```

---

## Center

Centers content.

```typescript
Center({
  children: [
    Spinner({ size: 'lg' }),
  ],
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minHeight` | `string` | - | Minimum height |

### Examples

```typescript
// Loading state
Center({
  minHeight: '200px',
  children: [Spinner()],
})

// Hero section
Center({
  minHeight: '80vh',
  children: [HeroContent()],
})
```

---

## Container

Max-width wrapper.

```typescript
Container({
  children: [
    Header(),
    Main(),
    Footer(),
  ],
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'lg'` | Max width |

### Examples

```typescript
// Narrow content
Container({ size: 'sm', children: [...] }) // 640px

// Wide content
Container({ size: 'xl', children: [...] }) // 1280px

// Full width
Container({ size: 'full', children: [...] }) // 100%
```

---

## Complete Example

```typescript
import { Container, Stack, Inline, Grid, Divider, Spacer, Center } from 'banda';

function PageLayout() {
  return Container({
    children: [
      Stack({
        space: 8,
        children: [
          // Header
          Inline({
            align: 'center',
            children: [
              h1({ text: 'Dashboard' }),
              Spacer(),
              Button({ label: 'Settings' }),
            ],
          }),

          Divider({}),

          // Stats Grid
          Grid({
            cols: 'auto-fit',
            minWidth: '200px',
            gap: 4,
            children: [
              StatCard({ title: 'Users', value: '1,234' }),
              StatCard({ title: 'Revenue', value: '$45,678' }),
              StatCard({ title: 'Orders', value: '567' }),
            ],
          }),

          // Content
          Grid({
            cols: 2,
            gap: 6,
            children: [
              MainContent(),
              Sidebar(),
            ],
          }),
        ],
      }),
    ],
  });
}
```
