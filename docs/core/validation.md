# Validation

Form validation utilities with built-in rules.

## Import

```typescript
import { rules, createFieldValidator, createForm } from 'banda';
```

## Built-in Rules

### required

```typescript
rules.required()
rules.required('Custom message')
```

### minLength / maxLength

```typescript
rules.minLength(8)
rules.minLength(8, 'Password must be at least 8 characters')

rules.maxLength(100)
rules.maxLength(100, 'Too long')
```

### email

```typescript
rules.email()
rules.email('Please enter a valid email')
```

### url

```typescript
rules.url()
rules.url('Please enter a valid URL')
```

### numeric

```typescript
rules.numeric()
rules.numeric('Must be a number')
```

### min / max

```typescript
rules.min(18, 'Must be at least 18')
rules.max(100, 'Must be at most 100')
```

### pattern

```typescript
rules.pattern(/^[A-Z]{2}\d{4}$/, 'Format: XX0000')
```

### matches

```typescript
const passwordField = createState('');

rules.matches('password', () => passwordField.get(), 'Passwords must match')
```

### custom

```typescript
rules.custom(
  (value) => value.startsWith('banda-'),
  'Must start with "banda-"'
)
```

## createFieldValidator

Creates a single field validator.

```typescript
const emailValidator = createFieldValidator({
  rules: [rules.required(), rules.email()],
  validateOnChange: true,
  validateOnBlur: true,
});

// Use with input
const emailInput = input({
  onInput: (e) => {
    emailValidator.setValue((e.target as HTMLInputElement).value);
  },
  onBlur: () => emailValidator.touch(),
});

// Check state
emailValidator.state.subscribe(state => {
  if (!state.valid && state.touched) {
    showErrors(state.errors);
  }
});
```

### API

| Method | Description |
|--------|-------------|
| `setValue(value)` | Set value and validate |
| `touch()` | Mark as touched |
| `validate()` | Force validation, returns boolean |
| `reset()` | Reset to initial state |
| `getErrors()` | Get current errors |
| `isValid()` | Check if valid |

## createForm

Creates a form validator with multiple fields.

### Basic Usage

```typescript
const form = createForm({
  email: {
    rules: [rules.required(), rules.email()],
  },
  password: {
    rules: [rules.required(), rules.minLength(8)],
  },
  name: {
    rules: [rules.required()],
    initialValue: 'John',
  },
});

// Set values
form.setValue('email', 'user@example.com');
form.setValue('password', 'secret123');

// Validate all
if (form.validate()) {
  console.log('Form is valid!');
  const data = form.getValues();
  // { email: '...', password: '...', name: '...' }
}
```

### With Form Element

```typescript
const loginForm = createForm({
  email: { rules: [rules.required(), rules.email()] },
  password: { rules: [rules.required()] },
});

const formElement = form({
  onSubmit: prevent(async () => {
    if (loginForm.validate()) {
      const data = loginForm.getValues();
      await login(data.email, data.password);
    }
  }),
  children: [
    input({
      attrs: { type: 'email', placeholder: 'Email' },
      onInput: (e) => loginForm.setValue('email', (e.target as HTMLInputElement).value),
      onBlur: () => loginForm.touchField('email'),
    }),
    input({
      attrs: { type: 'password', placeholder: 'Password' },
      onInput: (e) => loginForm.setValue('password', (e.target as HTMLInputElement).value),
      onBlur: () => loginForm.touchField('password'),
    }),
    button({ text: 'Login', attrs: { type: 'submit' } }),
  ],
});
```

### handleSubmit

Async submission with loading state.

```typescript
const form = createForm({
  email: { rules: [rules.required(), rules.email()] },
});

button({
  text: 'Submit',
  onClick: async () => {
    const result = await form.handleSubmit(async (values) => {
      const response = await api.submit(values);
      return response;
    });

    if (result) {
      console.log('Success!', result);
    }
  },
})

// Check loading state
form.isSubmitting(); // true during submission
```

### API

| Method | Description |
|--------|-------------|
| `setValue(field, value)` | Set field value |
| `getValue(field)` | Get field value |
| `getValues()` | Get all values |
| `touchField(field)` | Mark field as touched |
| `getFieldErrors(field)` | Get field errors |
| `isFieldValid(field)` | Check if field is valid |
| `getFieldState(field)` | Get full field state |
| `subscribeToField(field, fn)` | Subscribe to field changes |
| `validate()` | Validate all, returns boolean |
| `isValid()` | Check if form is valid |
| `reset()` | Reset form |
| `handleSubmit(fn)` | Async submit handler |
| `isSubmitting()` | Check if submitting |

## Complete Example

```typescript
import { form, div, input, button, p, prevent } from 'banda';
import { createForm, rules } from 'banda';

function RegistrationForm() {
  const formValidator = createForm({
    name: {
      rules: [rules.required('Name is required')],
    },
    email: {
      rules: [
        rules.required('Email is required'),
        rules.email('Invalid email format'),
      ],
    },
    password: {
      rules: [
        rules.required('Password is required'),
        rules.minLength(8, 'Password must be at least 8 characters'),
        rules.pattern(/[A-Z]/, 'Must contain uppercase letter'),
        rules.pattern(/[0-9]/, 'Must contain number'),
      ],
    },
  });

  function createField(name: string, type: string, placeholder: string) {
    const errorDisplay = p({ className: 'error', text: '' });

    formValidator.subscribeToField(name, (state) => {
      if (state.touched && state.errors.length > 0) {
        errorDisplay.textContent = state.errors[0];
        errorDisplay.style.display = 'block';
      } else {
        errorDisplay.style.display = 'none';
      }
    });

    return div({
      className: 'form-group',
      children: [
        input({
          attrs: { type, placeholder },
          onInput: (e) => formValidator.setValue(name, (e.target as HTMLInputElement).value),
          onBlur: () => formValidator.touchField(name),
        }),
        errorDisplay,
      ],
    });
  }

  return form({
    onSubmit: prevent(async () => {
      const result = await formValidator.handleSubmit(async (values) => {
        return await api.register(values);
      });
      
      if (result) {
        showSuccess('Registration complete!');
      }
    }),
    children: [
      createField('name', 'text', 'Full Name'),
      createField('email', 'email', 'Email'),
      createField('password', 'password', 'Password'),
      button({
        text: 'Register',
        attrs: { type: 'submit' },
      }),
    ],
  });
}
```
