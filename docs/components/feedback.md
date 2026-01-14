# Feedback

Alert, Toast, Spinner, and Tooltip components.

## Import

```typescript
import { 
  Alert, 
  Spinner, 
  toast, dismissToast, dismissAllToasts, configureToast,
  Tooltip 
} from 'banda';
```

---

## Alert

Inline feedback message.

```typescript
Alert({
  title: 'Success',
  message: 'Your changes have been saved.',
  variant: 'success',
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Alert title |
| `message` | `string` | - | Alert message |
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger' \| 'neutral'` | `'info'` | Style |
| `dismissible` | `boolean` | `false` | Show close button |
| `onClose` | `() => void` | - | Close callback |

### Variants

```typescript
Alert({ variant: 'info', title: 'Info', message: 'Informational message' })
Alert({ variant: 'success', title: 'Success', message: 'Operation completed' })
Alert({ variant: 'warning', title: 'Warning', message: 'Please review' })
Alert({ variant: 'danger', title: 'Error', message: 'Something went wrong' })
Alert({ variant: 'neutral', title: 'Note', message: 'Additional context' })
```

### Dismissible

```typescript
Alert({
  title: 'Tip',
  message: 'You can dismiss this alert',
  dismissible: true,
  onClose: () => console.log('Dismissed'),
})
```

---

## Spinner

Loading indicator.

```typescript
Spinner({ size: 'md' })
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size |
| `color` | `'primary' \| 'secondary' \| 'neutral'` | `'primary'` | Color |
| `label` | `string` | - | Screen reader label |

### Sizes

```typescript
Spinner({ size: 'sm' }) // 16px
Spinner({ size: 'md' }) // 24px
Spinner({ size: 'lg' }) // 32px
Spinner({ size: 'xl' }) // 48px
```

### In Button

```typescript
Button({
  label: loading ? 'Loading...' : 'Submit',
  children: loading ? [Spinner({ size: 'sm' })] : undefined,
  disabled: loading,
})
```

### Full Page Loading

```typescript
Center({
  minHeight: '100vh',
  children: [
    Stack({
      space: 4,
      align: 'center',
      children: [
        Spinner({ size: 'xl' }),
        p({ text: 'Loading...' }),
      ],
    }),
  ],
})
```

---

## Toast

Notification system.

### Show Toast

```typescript
toast({
  message: 'File saved successfully',
  variant: 'success',
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | Toast title |
| `message` | `string` | - | Toast message |
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | `'info'` | Style |
| `duration` | `number` | `5000` | Auto-dismiss (ms), 0 = manual |
| `closable` | `boolean` | `true` | Show close button |

### With Title

```typescript
toast({
  title: 'Upload Complete',
  message: 'Your file has been uploaded.',
  variant: 'success',
})
```

### No Auto-Close

```typescript
toast({
  message: 'Action required',
  variant: 'warning',
  duration: 0, // Won't auto-close
})
```

### Configure Position

```typescript
// Run once at app start
configureToast({
  position: 'top-right', // 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
});

toast({ message: 'Appears in top-right' });
```

### Dismiss Toasts

```typescript
// Dismiss specific toast
const id = toast({ message: 'Hello' });
dismissToast(id);

// Dismiss all
dismissAllToasts();
```

### Common Patterns

```typescript
// Success
toast({ message: 'Saved!', variant: 'success' });

// Error
toast({ title: 'Error', message: 'Something went wrong', variant: 'danger', duration: 0 });

// Warning
toast({ message: 'Unsaved changes', variant: 'warning' });

// Info
toast({ message: 'New update available', variant: 'info' });
```

---

## Tooltip

Hover hint.

```typescript
Tooltip({
  content: 'Helpful hint',
  children: Button({ label: 'Hover me' }),
})
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | - | Tooltip text |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `delay` | `number` | `200` | Delay before showing (ms) |
| `children` | `HTMLElement` | - | Trigger element |

### Position

```typescript
Tooltip({ content: 'Above', position: 'top', children: target })
Tooltip({ content: 'Below', position: 'bottom', children: target })
Tooltip({ content: 'Left', position: 'left', children: target })
Tooltip({ content: 'Right', position: 'right', children: target })
```

### Delay

```typescript
Tooltip({
  content: 'Shows after 500ms',
  delay: 500,
  children: target,
})
```

### Icon Button Tooltip

```typescript
Tooltip({
  content: 'Settings',
  position: 'bottom',
  children: Button({
    label: '⚙️',
    variant: 'ghost',
    iconOnly: true,
  }),
})
```

---

## Complete Example

```typescript
import { Stack, Alert, Spinner, toast, Tooltip, Button } from 'banda';

function FeedbackDemo() {
  return Stack({
    space: 6,
    children: [
      // Alert
      Alert({
        title: 'Welcome!',
        message: 'You are now signed in.',
        variant: 'success',
        dismissible: true,
      }),

      // Buttons with tooltips
      Inline({
        space: 2,
        children: [
          Tooltip({
            content: 'Save changes',
            children: Button({
              label: '💾',
              iconOnly: true,
              onClick: () => {
                toast({ message: 'Saved!', variant: 'success' });
              },
            }),
          }),
          Tooltip({
            content: 'Delete item',
            children: Button({
              label: '🗑️',
              iconOnly: true,
              variant: 'danger',
              onClick: () => {
                toast({ message: 'Deleted', variant: 'danger' });
              },
            }),
          }),
        ],
      }),

      // Loading state
      Button({
        label: 'Load Data',
        onClick: async () => {
          const spinner = Center({ children: [Spinner({ size: 'lg' })] });
          // Show loading...
          await fetchData();
          toast({ message: 'Data loaded', variant: 'success' });
        },
      }),
    ],
  });
}
```
