# Element

DOM element creation with typed props.

## Import

```typescript
import { el, div, span, button, input, p, h1, h2, h3 } from 'banda';
```

## Basic Usage

### Using `el()`

```typescript
const element = el({
  tag: 'article',
  className: 'card',
  children: [
    el({ tag: 'h2', text: 'Title' }),
    el({ tag: 'p', text: 'Content here' }),
  ],
});
```

### Shorthand Functions

```typescript
div({ className: 'container', children: [...] })
span({ text: 'Label' })
button({ text: 'Click', onClick: handleClick })
input({ attrs: { type: 'email', placeholder: 'Email' } })
p({ text: 'Paragraph' })
h1({ text: 'Heading' })
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `tag` | `keyof HTMLElementTagNameMap` | HTML tag name |
| `className` | `string` | CSS classes |
| `children` | `(HTMLElement \| string)[]` | Child elements |
| `text` | `string` | Text content |
| `html` | `string` | Inner HTML (careful!) |
| `attrs` | `Record<string, any>` | HTML attributes |
| `style` | `CSSStyleDeclaration` | Inline styles |

## Event Handlers

```typescript
button({
  text: 'Submit',
  onClick: (e) => console.log('Clicked!', e),
  onKeyDown: (e) => {
    if (e.key === 'Enter') submit();
  },
})

input({
  attrs: { type: 'text' },
  onInput: (e) => {
    const value = (e.target as HTMLInputElement).value;
    console.log('Input:', value);
  },
  onChange: (e) => console.log('Changed'),
})
```

## Attributes

```typescript
input({
  attrs: {
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
    disabled: false,
    'data-id': '123',
    'aria-label': 'Email address',
  },
})

a({
  text: 'Visit',
  attrs: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener',
  },
})
```

## Inline Styles

```typescript
div({
  style: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
  },
  children: [...],
})
```

## Nesting Elements

```typescript
const card = div({
  className: 'card',
  children: [
    div({
      className: 'card-header',
      children: [
        h2({ text: 'Title' }),
        button({ text: '×', className: 'close' }),
      ],
    }),
    div({
      className: 'card-body',
      children: [
        p({ text: 'Card content goes here.' }),
      ],
    }),
  ],
});
```

## Available Shorthand Functions

| Function | Creates |
|----------|---------|
| `div()` | `<div>` |
| `span()` | `<span>` |
| `button()` | `<button>` |
| `input()` | `<input>` |
| `label()` | `<label>` |
| `a()` | `<a>` |
| `p()` | `<p>` |
| `h1()`, `h2()`, `h3()` | Headings |
| `ul()`, `li()` | Lists |
| `form()` | `<form>` |

## Type Safety

All props are fully typed:

```typescript
// ✅ Correct
button({ text: 'Click', onClick: (e) => {} })

// ❌ TypeScript error - wrong event type
button({ text: 'Click', onClick: (e: KeyboardEvent) => {} })
```
