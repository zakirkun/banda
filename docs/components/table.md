# Table

Data table with sorting, pagination, and selection.

## Import

```typescript
import { Table } from 'banda';
```

## Basic Usage

```typescript
Table({
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ],
  data: [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User' },
  ],
  rowKey: (row) => row.id,
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | - | Column definitions |
| `data` | `T[]` | - | Data rows |
| `rowKey` | `(row, index) => string \| number` | Index | Unique row identifier |
| `selectable` | `boolean` | `false` | Enable row selection |
| `selectedKeys` | `(string \| number)[]` | `[]` | Selected row keys |
| `onSelectionChange` | `(keys) => void` | - | Selection callback |
| `onRowClick` | `(row, index) => void` | - | Row click callback |
| `variant` | `'default' \| 'striped' \| 'compact' \| 'borderless'` | `'default'` | Style variant |
| `loading` | `boolean` | `false` | Show loading state |
| `emptyText` | `string` | `'No data'` | Empty state message |
| `pagination` | `PaginationOptions` | - | Pagination config |
| `onSortChange` | `(sort) => void` | - | Sort callback |

## Column Definition

```typescript
interface TableColumn<T> {
  key: string;           // Property name in data
  label: string;         // Header text
  width?: string;        // Column width
  sortable?: boolean;    // Enable sorting
  align?: 'left' | 'center' | 'right';
  render?: (value, row, index) => HTMLElement | string;
}
```

## Sorting

```typescript
Table({
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'createdAt', label: 'Created', sortable: true },
  ],
  data: users,
  onSortChange: (sort) => {
    console.log('Sort by:', sort.key, sort.direction);
  },
})
```

## Pagination

```typescript
Table({
  columns: [...],
  data: users, // 100 items
  pagination: {
    enabled: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50],
  },
})
```

## Selection

```typescript
const selected = createState<number[]>([]);

Table({
  columns: [...],
  data: users,
  rowKey: (row) => row.id,
  selectable: true,
  selectedKeys: selected.get(),
  onSelectionChange: (keys) => {
    selected.set(keys);
    console.log('Selected:', keys);
  },
})
```

## Custom Renderers

```typescript
Table({
  columns: [
    { key: 'name', label: 'Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => Badge({
        label: value,
        variant: value === 'active' ? 'success' : 'secondary',
      }),
    },
    {
      key: 'id',
      label: 'Actions',
      align: 'right',
      render: (value, row) => Inline({
        space: 2,
        children: [
          Button({ label: 'Edit', size: 'sm', variant: 'ghost' }),
          Button({ label: 'Delete', size: 'sm', variant: 'danger' }),
        ],
      }),
    },
  ],
  data: users,
})
```

## Variants

```typescript
// Striped rows
Table({ variant: 'striped', ... })

// Compact padding
Table({ variant: 'compact', ... })

// No borders
Table({ variant: 'borderless', ... })
```

## Loading & Empty States

```typescript
// Loading
Table({
  columns: [...],
  data: [],
  loading: true,
})

// Empty with custom message
Table({
  columns: [...],
  data: [],
  emptyText: 'No users found. Try adjusting your filters.',
})
```

## Complete Example

```typescript
import { Table, Badge, Button, Inline } from 'banda';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'User', status: 'inactive' },
  // ...
];

const UsersTable = Table({
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      render: (v) => Badge({
        label: v,
        variant: v === 'active' ? 'success' : 'secondary',
        styleType: 'solid',
      }),
    },
    {
      key: 'id',
      label: '',
      align: 'right',
      render: (_, row) => Button({
        label: 'View',
        size: 'sm',
        variant: 'ghost',
        onClick: () => viewUser(row),
      }),
    },
  ],
  data: users,
  rowKey: (row) => row.id,
  selectable: true,
  onSelectionChange: (keys) => console.log('Selected:', keys),
  pagination: { enabled: true, pageSize: 10 },
  onSortChange: (sort) => console.log('Sort:', sort),
});
```
