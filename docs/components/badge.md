# Badge

Small labels for status, tags, and counts.

## Import

```typescript
import { Badge, BadgeGroup, StatusBadge } from 'banda';
```

## Basic Usage

```typescript
Badge({ label: 'New' })
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Badge text |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'neutral'` | Color |
| `styleType` | `'subtle' \| 'solid' \| 'outline'` | `'subtle'` | Style type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `dot` | `boolean` | `false` | Show status dot |
| `dotPulse` | `boolean` | `false` | Animate dot |
| `removable` | `boolean` | `false` | Show remove button |
| `onRemove` | `() => void` | - | Remove callback |

## Variants

```typescript
Badge({ label: 'Primary', variant: 'primary' })
Badge({ label: 'Secondary', variant: 'secondary' })
Badge({ label: 'Success', variant: 'success' })
Badge({ label: 'Warning', variant: 'warning' })
Badge({ label: 'Danger', variant: 'danger' })
Badge({ label: 'Neutral', variant: 'neutral' })
```

## Style Types

```typescript
// Subtle (default) - light background
Badge({ label: 'Subtle', styleType: 'subtle' })

// Solid - filled background
Badge({ label: 'Solid', styleType: 'solid', variant: 'primary' })

// Outline - border only
Badge({ label: 'Outline', styleType: 'outline' })
```

## Sizes

```typescript
Badge({ label: 'Small', size: 'sm' })
Badge({ label: 'Medium', size: 'md' })
Badge({ label: 'Large', size: 'lg' })
```

## Status Dot

```typescript
// Static dot
Badge({ label: 'Online', dot: true, variant: 'success' })

// Pulsing dot
Badge({ label: 'Live', dot: true, dotPulse: true, variant: 'success' })
```

## Removable

```typescript
Badge({
  label: 'Tag',
  removable: true,
  onRemove: () => console.log('Removed'),
})
```

## BadgeGroup

```typescript
BadgeGroup([
  Badge({ label: 'React' }),
  Badge({ label: 'TypeScript' }),
  Badge({ label: 'Banda' }),
])
```

## StatusBadge

Shorthand for common status badges.

```typescript
StatusBadge({ status: 'online' })  // Green dot
StatusBadge({ status: 'offline' }) // Gray dot
StatusBadge({ status: 'busy' })    // Red dot
StatusBadge({ status: 'away' })    // Yellow dot
```

## Examples

### Tags

```typescript
Inline({
  space: 2,
  children: [
    Badge({ label: 'JavaScript', styleType: 'outline' }),
    Badge({ label: 'TypeScript', styleType: 'outline' }),
    Badge({ label: 'CSS', styleType: 'outline' }),
  ],
})
```

### Status

```typescript
Inline({
  space: 2,
  children: [
    Badge({ label: 'Active', variant: 'success', dot: true }),
    Badge({ label: 'Pending', variant: 'warning', dot: true }),
    Badge({ label: 'Inactive', variant: 'neutral', dot: true }),
  ],
})
```

### Count Badge

```typescript
Badge({ 
  label: '42', 
  variant: 'danger', 
  styleType: 'solid',
  size: 'sm',
})
```

### In Card Header

```typescript
CardHeader({
  title: 'Dashboard',
  action: Badge({ label: 'New', variant: 'primary', styleType: 'solid' }),
})
```
