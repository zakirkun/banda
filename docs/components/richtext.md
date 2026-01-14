# Rich Text Editor

A lightweight WYSIWYG editor using contenteditable.

## Import

```typescript
import { RichTextEditor } from 'banda';
```

## Basic Usage

```typescript
RichTextEditor({
  placeholder: 'Write something...',
  onChange: (html) => console.log('Content:', html),
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Initial HTML content |
| `placeholder` | `string` | `'Start typing...'` | Placeholder text |
| `toolbar` | `ToolbarAction[]` | All actions | Toolbar buttons to show |
| `minHeight` | `string` | `'200px'` | Minimum editor height |
| `maxHeight` | `string` | `'500px'` | Maximum editor height |
| `disabled` | `boolean` | `false` | Disable editing |
| `onChange` | `(html: string) => void` | - | Content change callback |
| `onBlur` | `() => void` | - | Blur callback |

## Toolbar Actions

Available toolbar actions:

- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underlined text
- `strikethrough` - Strikethrough text
- `h1`, `h2`, `h3` - Headings
- `ul` - Unordered list
- `ol` - Ordered list
- `link` - Insert link
- `code` - Code block
- `quote` - Blockquote
- `clear` - Remove formatting

## Custom Toolbar

```typescript
RichTextEditor({
  toolbar: ['bold', 'italic', 'underline', 'link'],
  onChange: (html) => handleChange(html),
})
```

## Initial Content

```typescript
RichTextEditor({
  value: '<p>Hello <strong>world</strong>!</p>',
  onChange: (html) => save(html),
})
```

## Controlled Height

```typescript
RichTextEditor({
  minHeight: '300px',
  maxHeight: '600px',
})
```

## Disabled State

```typescript
RichTextEditor({
  value: '<p>Read-only content</p>',
  disabled: true,
})
```

## Methods

The component exposes methods via the returned element:

```typescript
const editor = RichTextEditor({ onChange: handleChange });

// Get current HTML
const html = (editor as any).getValue();

// Set content
(editor as any).setValue('<p>New content</p>');

// Focus editor
(editor as any).focus();

// Clear content
(editor as any).clear();
```

## Complete Example

```typescript
import { RichTextEditor, Button, Stack } from 'banda';

function BlogEditor() {
  let content = '';

  const editor = RichTextEditor({
    placeholder: 'Write your blog post...',
    toolbar: ['bold', 'italic', 'h2', 'h3', 'ul', 'ol', 'link', 'quote', 'code'],
    minHeight: '400px',
    onChange: (html) => {
      content = html;
    },
  });

  return Stack({
    space: 4,
    children: [
      editor,
      Button({
        label: 'Publish',
        variant: 'primary',
        onClick: () => {
          console.log('Publishing:', content);
        },
      }),
    ],
  });
}
```

## Keyboard Shortcuts

The editor supports standard keyboard shortcuts:

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
