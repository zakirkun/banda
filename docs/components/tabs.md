# Tabs

Tabbed navigation component.

## Import

```typescript
import { Tabs, createControlledTabs } from 'banda';
```

## Basic Usage

```typescript
Tabs({
  items: [
    { id: 'tab1', label: 'Overview', content: OverviewPanel() },
    { id: 'tab2', label: 'Settings', content: SettingsPanel() },
    { id: 'tab3', label: 'Analytics', content: AnalyticsPanel() },
  ],
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `TabItem[]` | - | Tab definitions |
| `defaultTab` | `string` | First item | Initial active tab |
| `variant` | `'default' \| 'pills' \| 'bordered'` | `'default'` | Style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `stretch` | `boolean` | `false` | Full width tabs |
| `onChange` | `(tabId: string) => void` | - | Tab change callback |

## TabItem

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Tab label |
| `content` | `HTMLElement \| () => HTMLElement` | Panel content |
| `disabled` | `boolean` | Disable tab |

## Variants

```typescript
// Default underline
Tabs({ variant: 'default', items: [...] })

// Pill buttons
Tabs({ variant: 'pills', items: [...] })

// Bordered cards
Tabs({ variant: 'bordered', items: [...] })
```

## Sizes

```typescript
Tabs({ size: 'sm', items: [...] })
Tabs({ size: 'md', items: [...] })
Tabs({ size: 'lg', items: [...] })
```

## Stretch

```typescript
Tabs({
  stretch: true, // Tabs fill available width
  items: [...],
})
```

## Disabled Tab

```typescript
Tabs({
  items: [
    { id: 'tab1', label: 'Active', content: Content1() },
    { id: 'tab2', label: 'Disabled', content: Content2(), disabled: true },
    { id: 'tab3', label: 'Another', content: Content3() },
  ],
})
```

## Default Tab

```typescript
Tabs({
  defaultTab: 'settings', // Start on settings tab
  items: [
    { id: 'overview', label: 'Overview', content: ... },
    { id: 'settings', label: 'Settings', content: ... },
  ],
})
```

## Lazy Content

```typescript
Tabs({
  items: [
    { 
      id: 'heavy', 
      label: 'Heavy', 
      content: () => HeavyComponent(), // Created when tab is selected
    },
  ],
})
```

## Change Handler

```typescript
Tabs({
  items: [...],
  onChange: (tabId) => {
    console.log('Switched to:', tabId);
    // Update URL, analytics, etc.
    window.history.pushState(null, '', `#${tabId}`);
  },
})
```

## Controlled Tabs

```typescript
const { element, setActiveTab, getActiveTab } = createControlledTabs({
  items: [
    { id: 'tab1', label: 'One', content: Content1() },
    { id: 'tab2', label: 'Two', content: Content2() },
  ],
});

// Programmatically switch tabs
Button({
  label: 'Go to Tab 2',
  onClick: () => setActiveTab('tab2'),
})
```

## Complete Example

```typescript
import { Tabs, Stack, Grid, Card, Button } from 'banda';

function ProductDetails() {
  return Tabs({
    variant: 'bordered',
    items: [
      {
        id: 'description',
        label: 'Description',
        content: Stack({
          space: 4,
          children: [
            p({ text: 'Product description goes here...' }),
            p({ text: 'More details about the product.' }),
          ],
        }),
      },
      {
        id: 'specs',
        label: 'Specifications',
        content: Grid({
          cols: 2,
          gap: 4,
          children: [
            div({ text: 'Weight: 2.5 kg' }),
            div({ text: 'Dimensions: 10x20x30 cm' }),
            div({ text: 'Material: Aluminum' }),
            div({ text: 'Color: Silver' }),
          ],
        }),
      },
      {
        id: 'reviews',
        label: 'Reviews (42)',
        content: () => ReviewsList(), // Lazy load
      },
    ],
    onChange: (tab) => {
      analytics.track('tab_view', { tab });
    },
  });
}
```

## Keyboard Support

| Key | Action |
|-----|--------|
| `ArrowLeft` | Previous tab |
| `ArrowRight` | Next tab |
| `Home` | First tab |
| `End` | Last tab |
