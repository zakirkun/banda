# Color Picker

A color selection component with presets and custom input.

## Import

```typescript
import { ColorPicker } from 'banda';
```

## Basic Usage

```typescript
ColorPicker({
  value: '#3b82f6',
  onChange: (color) => console.log('Selected:', color),
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `'#3b82f6'` | Current color (hex) |
| `label` | `string` | - | Label text |
| `presets` | `string[]` | Default palette | Preset color swatches |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Preview size |
| `disabled` | `boolean` | `false` | Disable picker |
| `onChange` | `(color: string) => void` | - | Color change callback |

## With Label

```typescript
ColorPicker({
  label: 'Background Color',
  value: '#22c55e',
  onChange: (color) => setBackground(color),
})
```

## Custom Presets

```typescript
ColorPicker({
  presets: [
    '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff',
  ],
  onChange: (color) => handleColor(color),
})
```

## Size Variants

```typescript
ColorPicker({ size: 'sm', value: '#ef4444' })
ColorPicker({ size: 'md', value: '#3b82f6' })
ColorPicker({ size: 'lg', value: '#22c55e' })
```

## Disabled State

```typescript
ColorPicker({
  value: '#6366f1',
  disabled: true,
})
```

## Methods

The component exposes methods via the returned element:

```typescript
const picker = ColorPicker({ onChange: handleChange });

// Get current color
const color = (picker as any).getValue();

// Set color programmatically
(picker as any).setValue('#ff0000');
```

## Form Integration

```typescript
import { ColorPicker, Input, Button, Stack } from 'banda';

function ThemeForm() {
  let primary = '#3b82f6';
  let secondary = '#6366f1';

  return Stack({
    space: 4,
    children: [
      ColorPicker({
        label: 'Primary Color',
        value: primary,
        onChange: (c) => { primary = c; },
      }),
      ColorPicker({
        label: 'Secondary Color',
        value: secondary,
        onChange: (c) => { secondary = c; },
      }),
      Button({
        label: 'Apply Theme',
        variant: 'primary',
        onClick: () => {
          document.documentElement.style.setProperty('--primary', primary);
          document.documentElement.style.setProperty('--secondary', secondary);
        },
      }),
    ],
  });
}
```

## Complete Example

```typescript
import { ColorPicker, Card, CardBody, Stack, p } from 'banda';

function ColorDemo() {
  const preview = p({ text: 'Preview text' });

  return Card({
    children: [
      CardBody({
        children: [
          Stack({
            space: 4,
            children: [
              ColorPicker({
                label: 'Text Color',
                value: '#1e293b',
                onChange: (color) => {
                  preview.style.color = color;
                },
              }),
              preview,
            ],
          }),
        ],
      }),
    ],
  });
}
```

## Keyboard Support

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open/close dropdown |
| `Escape` | Close dropdown |
| `Tab` | Navigate swatches |
