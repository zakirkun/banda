# Input

Text input with validation and styling.

## Import

```typescript
import { Input, Textarea, createControlledInput } from 'banda';
```

## Basic Usage

```typescript
Input({
  label: 'Email',
  type: 'email',
  placeholder: 'you@example.com',
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Input name |
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `label` | `string` | - | Label text |
| `placeholder` | `string` | - | Placeholder |
| `value` | `string` | - | Initial value |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `state` | `'default' \| 'error' \| 'success'` | `'default'` | Validation state |
| `helperText` | `string` | - | Help text |
| `errorMessage` | `string` | - | Error message |
| `disabled` | `boolean` | `false` | Disable input |
| `required` | `boolean` | `false` | Required field |
| `prefix` | `string` | - | Text before input |
| `suffix` | `string` | - | Text after input |

## Input Types

```typescript
Input({ type: 'text', placeholder: 'Name' })
Input({ type: 'email', placeholder: 'Email' })
Input({ type: 'password', placeholder: 'Password' })
Input({ type: 'number', placeholder: 'Age' })
Input({ type: 'tel', placeholder: 'Phone' })
Input({ type: 'url', placeholder: 'Website' })
Input({ type: 'search', placeholder: 'Search...' })
```

## Sizes

```typescript
Input({ size: 'sm', placeholder: 'Small' })
Input({ size: 'md', placeholder: 'Medium' })
Input({ size: 'lg', placeholder: 'Large' })
```

## Validation States

```typescript
// Default
Input({ label: 'Name' })

// Error
Input({
  label: 'Email',
  state: 'error',
  errorMessage: 'Invalid email address',
})

// Success
Input({
  label: 'Username',
  state: 'success',
  helperText: 'Username is available',
})
```

## Prefix and Suffix

```typescript
// Prefix
Input({
  prefix: '$',
  placeholder: '0.00',
})

// Suffix
Input({
  suffix: '.com',
  placeholder: 'yoursite',
})

// Both
Input({
  prefix: 'https://',
  suffix: '.io',
  placeholder: 'yourapp',
})
```

## Helper Text

```typescript
Input({
  label: 'Password',
  type: 'password',
  helperText: 'Must be at least 8 characters',
})
```

## Required

```typescript
Input({
  label: 'Email',
  required: true, // Shows asterisk
})
```

## Disabled

```typescript
Input({
  label: 'Locked',
  value: 'Cannot change',
  disabled: true,
})
```

## Textarea

```typescript
Textarea({
  label: 'Message',
  placeholder: 'Type your message...',
  rows: 4,
})
```

## Controlled Input

```typescript
const { element, state } = createControlledInput({
  type: 'email',
  placeholder: 'Email',
});

// Listen to changes
state.subscribe(value => {
  console.log('Input value:', value);
});

// Get current value
const value = state.get();

// Set value programmatically
state.set('test@example.com');
```

## Complete Example

```typescript
import { form, Input, Textarea, Button, Stack } from 'banda';

function ContactForm() {
  return form({
    onSubmit: (e) => {
      e.preventDefault();
      // Handle submit
    },
    children: [
      Stack({
        space: 4,
        children: [
          Input({
            label: 'Name',
            required: true,
            placeholder: 'Your full name',
          }),
          Input({
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'you@example.com',
            helperText: 'We will never share your email',
          }),
          Input({
            label: 'Phone',
            type: 'tel',
            prefix: '+1',
            placeholder: '(555) 123-4567',
          }),
          Textarea({
            label: 'Message',
            placeholder: 'How can we help?',
            rows: 4,
            required: true,
          }),
          Button({
            label: 'Send Message',
            type: 'submit',
            fullWidth: true,
          }),
        ],
      }),
    ],
  });
}
```
