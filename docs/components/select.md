# Select

Dropdown select component with search.

## Import

```typescript
import { Select } from 'banda';
```

## Basic Usage

```typescript
Select({
  options: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ],
  placeholder: 'Select fruit',
  onChange: (value) => console.log('Selected:', value),
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[] \| SelectOptionGroup[]` | - | Options |
| `value` | `string` | - | Selected value |
| `placeholder` | `string` | `'Select...'` | Placeholder |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | Disable select |
| `searchable` | `boolean` | `false` | Enable search |
| `onChange` | `(value: string) => void` | - | Change callback |

## Option Types

### Simple Options

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

### Option Groups

```typescript
interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}
```

## Searchable

```typescript
Select({
  searchable: true,
  options: countries,
  placeholder: 'Search country...',
})
```

## Grouped Options

```typescript
Select({
  placeholder: 'Select country',
  options: [
    {
      label: 'North America',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'mx', label: 'Mexico' },
      ],
    },
    {
      label: 'Europe',
      options: [
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
      ],
    },
  ],
  onChange: (value) => console.log('Country:', value),
})
```

## Sizes

```typescript
Select({ size: 'sm', options: [...] })
Select({ size: 'md', options: [...] })
Select({ size: 'lg', options: [...] })
```

## Disabled

```typescript
Select({
  disabled: true,
  options: [...],
  value: 'preset',
})
```

## Disabled Option

```typescript
Select({
  options: [
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise (Contact us)', disabled: true },
  ],
})
```

## Initial Value

```typescript
Select({
  value: 'banana',
  options: [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ],
})
```

## Form Integration

```typescript
import { form, Select, Input, Button, Stack } from 'banda';

let formData = { name: '', country: '' };

form({
  onSubmit: (e) => {
    e.preventDefault();
    submitForm(formData);
  },
  children: [
    Stack({
      space: 4,
      children: [
        Input({
          label: 'Name',
          onInput: (e) => { formData.name = (e.target as HTMLInputElement).value },
        }),
        div({
          children: [
            label({ text: 'Country' }),
            Select({
              options: countries,
              placeholder: 'Select country',
              onChange: (value) => { formData.country = value },
            }),
          ],
        }),
        Button({ label: 'Submit', type: 'submit' }),
      ],
    }),
  ],
})
```

## Complete Example

```typescript
import { Select, Stack, p } from 'banda';
import { createState } from 'banda';

function LanguageSelector() {
  const language = createState('en');
  const display = p({ text: 'Current: English' });

  const languages = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'es', label: '🇪🇸 Español' },
    { value: 'fr', label: '🇫🇷 Français' },
    { value: 'de', label: '🇩🇪 Deutsch' },
    { value: 'ja', label: '🇯🇵 日本語' },
  ];

  return Stack({
    space: 4,
    children: [
      Select({
        options: languages,
        value: language.get(),
        searchable: true,
        onChange: (value) => {
          language.set(value);
          const lang = languages.find(l => l.value === value);
          display.textContent = `Current: ${lang?.label}`;
        },
      }),
      display,
    ],
  });
}
```

## Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close dropdown |
| `ArrowDown` | Next option |
| `ArrowUp` | Previous option |
| `Enter` | Select option |
| Type | Filter options (searchable) |
