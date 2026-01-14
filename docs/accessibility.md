# Accessibility

Banda components are built with accessibility in mind.

## ARIA Support

### Buttons
```typescript
Button({
  label: 'Submit',
  ariaLabel: 'Submit form',  // Screen reader text
  disabled: true,            // Sets aria-disabled
})
```

### Modals
- `role="dialog"` with `aria-modal="true"`
- Focus trapped inside modal
- ESC key closes modal
- Focus restored on close

### Alerts
- `role="alert"` for screen reader announcements
- SVG icons have proper `aria-hidden`

### Tabs
- `role="tablist"` on container
- `role="tab"` on each button
- `aria-selected` indicates active tab
- `aria-controls` links to panel

### Select
- `aria-haspopup="listbox"`
- `aria-expanded` reflects open state
- `role="option"` on each item
- `aria-selected` for current value

## Keyboard Navigation

| Component | Keys |
|-----------|------|
| Button | Enter, Space - Activate |
| Modal | Escape - Close |
| Tabs | Arrow keys - Navigate |
| Select | Escape - Close, Arrows - Navigate |
| Tooltip | Focus triggers show |

## Focus Management

### Focus Visible
All focusable elements have visible focus styles:
```css
:focus-visible {
  outline: none;
  box-shadow: var(--banda-shadow-focus);
}
```

### Focus Trapping
Modals trap focus using `createFocusTrap()`:
- Tab cycles through focusable elements
- Shift+Tab cycles backwards
- Focus returns to trigger on close

## Screen Reader Support

### Labels
- Form inputs have associated labels
- Icon-only buttons have `aria-label`
- Loading states announce via `role="status"`

### Hidden Content
```typescript
// Screen reader only
<span className="banda-sr-only">Loading...</span>

// Hidden from screen readers
<span aria-hidden="true">🎸</span>
```

## Reduced Motion

Animations respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Accessibility

Run with screen readers:
- **macOS**: VoiceOver (Cmd + F5)
- **Windows**: NVDA or Narrator
- **Browser**: Chrome DevTools Accessibility panel

Automated testing:
```bash
# Lighthouse audit
npx lighthouse http://localhost:3000 --view
```
