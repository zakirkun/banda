# Modal

Dialog with backdrop and focus trap.

## Import

```typescript
import { openModal, closeModal, isModalOpen, Modal, ModalHeader, ModalBody, ModalFooter } from 'banda';
```

## Basic Usage

```typescript
Button({
  label: 'Open Modal',
  onClick: () => openModal({
    title: 'Hello',
    children: [p({ text: 'Modal content here' })],
  }),
})
```

## openModal Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | `string` | - | Modal title |
| `description` | `string` | - | Subtitle |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Width |
| `centered` | `boolean` | `false` | Vertically center |
| `closeOnBackdrop` | `boolean` | `true` | Click backdrop to close |
| `closeOnEscape` | `boolean` | `true` | ESC key closes |
| `showCloseButton` | `boolean` | `true` | Show X button |
| `children` | `HTMLElement[]` | - | Body content |
| `footer` | `HTMLElement[]` | - | Footer buttons |
| `footerAlign` | `'left' \| 'center' \| 'right' \| 'between'` | `'right'` | Footer alignment |
| `onClose` | `() => void` | - | Close callback |

## Sizes

```typescript
openModal({ size: 'sm', title: 'Small', ... })
openModal({ size: 'md', title: 'Medium', ... })
openModal({ size: 'lg', title: 'Large', ... })
openModal({ size: 'xl', title: 'Extra Large', ... })
openModal({ size: 'full', title: 'Full Screen', ... })
```

## With Footer

```typescript
openModal({
  title: 'Confirm Delete',
  children: [p({ text: 'Are you sure you want to delete this item?' })],
  footer: [
    Button({ label: 'Cancel', variant: 'ghost', onClick: closeModal }),
    Button({ label: 'Delete', variant: 'danger', onClick: handleDelete }),
  ],
})
```

## Footer Alignment

```typescript
// Right (default)
openModal({
  ...
  footer: [...],
  footerAlign: 'right',
})

// Between (space-between)
openModal({
  ...
  footer: [
    Button({ label: 'Back' }),
    Button({ label: 'Next' }),
  ],
  footerAlign: 'between',
})
```

## Centered Content

```typescript
openModal({
  title: 'Success!',
  centered: true,
  children: [
    div({
      style: { textAlign: 'center' },
      children: [
        span({ text: '✓', style: { fontSize: '4rem', color: 'green' } }),
        p({ text: 'Your changes have been saved.' }),
      ],
    }),
  ],
  footer: [Button({ label: 'OK', onClick: closeModal })],
})
```

## Close Handling

```typescript
openModal({
  title: 'Settings',
  closeOnBackdrop: false, // Must click button to close
  closeOnEscape: true,
  showCloseButton: true,
  onClose: () => {
    console.log('Modal closed');
  },
  children: [...],
  footer: [
    Button({ label: 'Close', onClick: closeModal }),
  ],
})
```

## Check If Open

```typescript
if (isModalOpen()) {
  closeModal();
}
```

## Manual Modal Construction

```typescript
const modal = Modal({
  size: 'md',
  children: [
    ModalHeader({ title: 'Custom Modal', showCloseButton: true }),
    ModalBody({ children: [p({ text: 'Content' })] }),
    ModalFooter({ children: [Button({ label: 'Close' })] }),
  ],
});

document.body.appendChild(modal);
```

## Complete Example

```typescript
import { openModal, closeModal, Button, Input, Stack } from 'banda';

function showLoginModal() {
  let email = '';
  let password = '';

  openModal({
    title: 'Login',
    size: 'sm',
    centered: true,
    children: [
      Stack({
        space: 4,
        children: [
          Input({
            label: 'Email',
            type: 'email',
            placeholder: 'you@example.com',
            onInput: (e) => { email = (e.target as HTMLInputElement).value; },
          }),
          Input({
            label: 'Password',
            type: 'password',
            placeholder: '••••••••',
            onInput: (e) => { password = (e.target as HTMLInputElement).value; },
          }),
        ],
      }),
    ],
    footer: [
      Button({
        label: 'Cancel',
        variant: 'ghost',
        onClick: closeModal,
      }),
      Button({
        label: 'Login',
        variant: 'primary',
        onClick: async () => {
          await login(email, password);
          closeModal();
        },
      }),
    ],
  });
}
```

## Accessibility

- Focus is trapped within modal
- ESC closes the modal
- Focus returns to trigger on close
- `role="dialog"` and `aria-modal="true"`
