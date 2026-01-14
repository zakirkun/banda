# Components Reference

Banda UI components for building interfaces.

## Components

| Component | Description |
|-----------|-------------|
| [Button](./button.md) | Interactive buttons with variants |
| [Card](./card.md) | Content containers |
| [Input](./input.md) | Text inputs and textareas |
| [Badge](./badge.md) | Labels, tags, and status indicators |
| [Modal](./modal.md) | Dialogs with backdrop |
| [Tabs](./tabs.md) | Tabbed navigation |
| [Select](./select.md) | Dropdown selection |
| [DatePicker](./datepicker.md) | Calendar date picker |
| [Table](./table.md) | Data tables with sorting/pagination |
| [Layout](./layout.md) | Stack, Inline, Grid, Divider |
| [Feedback](./feedback.md) | Alert, Toast, Spinner, Tooltip |

## Quick Reference

### Button

```typescript
import { Button, ButtonGroup } from 'banda';

Button({ label: 'Click', variant: 'primary', onClick: handle })
```

### Card

```typescript
import { Card, CardHeader, CardBody } from 'banda';

Card({
  children: [
    CardHeader({ title: 'Title' }),
    CardBody({ children: [content] }),
  ],
})
```

### Input

```typescript
import { Input, Textarea } from 'banda';

Input({ label: 'Email', type: 'email', state: 'error', errorMessage: '...' })
```

### Layout

```typescript
import { Stack, Inline, Grid } from 'banda';

Stack({ space: 4, children: [...] })
Inline({ space: 2, children: [...] })
Grid({ cols: 3, gap: 4, children: [...] })
```

### Feedback

```typescript
import { Alert, toast, Spinner, Tooltip } from 'banda';

Alert({ title: 'Error', variant: 'danger' })
toast({ message: 'Saved!', variant: 'success' })
Tooltip({ content: 'Hint', children: Button({...}) })
```

### Table

```typescript
import { Table } from 'banda';

Table({
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', render: (v) => Badge({ label: v }) },
  ],
  data: items,
  pagination: { enabled: true, pageSize: 10 },
})
```
