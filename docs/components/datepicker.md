# DatePicker

Calendar date picker component.

## Import

```typescript
import { DatePicker } from 'banda';
```

## Basic Usage

```typescript
DatePicker({
  placeholder: 'Select a date',
  onChange: (date) => console.log('Selected:', date),
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Date \| null` | `null` | Selected date |
| `placeholder` | `string` | `'Select date'` | Placeholder text |
| `formatDate` | `(date: Date) => string` | Localized | Date format function |
| `firstDayOfWeek` | `0 \| 1` | `0` | 0=Sunday, 1=Monday |
| `minDate` | `Date` | - | Minimum selectable date |
| `maxDate` | `Date` | - | Maximum selectable date |
| `disabledDates` | `Date[]` | - | Specific dates to disable |
| `showTodayButton` | `boolean` | `true` | Show "Today" button |
| `clearable` | `boolean` | `true` | Show "Clear" button |
| `disabled` | `boolean` | `false` | Disable picker |
| `onChange` | `(date: Date \| null) => void` | - | Change callback |

## Date Constraints

### Minimum Date

```typescript
DatePicker({
  minDate: new Date(), // Can't select past dates
  placeholder: 'Future dates only',
})
```

### Maximum Date

```typescript
DatePicker({
  maxDate: new Date(), // Can't select future dates
  placeholder: 'Past dates only',
})
```

### Date Range

```typescript
const today = new Date();
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

DatePicker({
  minDate: today,
  maxDate: nextMonth,
  placeholder: 'Next 30 days',
})
```

### Disabled Dates

```typescript
const holidays = [
  new Date(2024, 11, 25), // Christmas
  new Date(2024, 0, 1),   // New Year
];

DatePicker({
  disabledDates: holidays,
  placeholder: 'Select (holidays excluded)',
})
```

## Custom Format

```typescript
// ISO format
DatePicker({
  formatDate: (date) => date.toISOString().split('T')[0],
  // Shows: 2024-01-15
})

// Long format
DatePicker({
  formatDate: (date) => date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  // Shows: Monday, January 15, 2024
})

// Custom
DatePicker({
  formatDate: (date) => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  },
  // Shows: 15/01/2024
})
```

## Week Start Day

```typescript
// Monday first (default: Sunday)
DatePicker({
  firstDayOfWeek: 1,
})
```

## Initial Value

```typescript
DatePicker({
  value: new Date(2024, 0, 15),
  onChange: (date) => console.log(date),
})
```

## Without Clear Button

```typescript
DatePicker({
  clearable: false,
  showTodayButton: true,
})
```

## Complete Example

```typescript
import { DatePicker, Stack, p } from 'banda';
import { createState } from 'banda';

function BookingForm() {
  const checkIn = createState<Date | null>(null);
  const checkOut = createState<Date | null>(null);

  return Stack({
    space: 4,
    children: [
      div({
        children: [
          p({ text: 'Check-in Date' }),
          DatePicker({
            placeholder: 'Select check-in',
            minDate: new Date(),
            onChange: (date) => {
              checkIn.set(date);
              // Reset checkout if before checkin
              if (checkOut.get() && date && checkOut.get()! < date) {
                checkOut.set(null);
              }
            },
          }),
        ],
      }),
      div({
        children: [
          p({ text: 'Check-out Date' }),
          DatePicker({
            placeholder: 'Select check-out',
            minDate: checkIn.get() || new Date(),
            disabled: !checkIn.get(),
            onChange: (date) => checkOut.set(date),
          }),
        ],
      }),
    ],
  });
}
```

## Keyboard Support

| Key | Action |
|-----|--------|
| `Escape` | Close calendar |
| `Tab` | Navigate buttons |
| Arrow keys | Navigate calendar (future) |
