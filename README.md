<div align="center">

# Banda

**A lightweight, elegant TypeScript UI framework**

*Inspired by the Banda Islands — where small things change the world.*

[![npm version](https://img.shields.io/npm/v/banda-ui?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/banda-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-green?style=for-the-badge)](.)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

[Getting Started](#-getting-started) •
[Philosophy](#-philosophy) •
[Documentation](#-documentation) •
[Components](#-components)

</div>

---

## 🌴 Philosophy

**Banda** takes its name from the **Banda Islands** in Maluku, Indonesia — once the heart of the global spice trade. Just as Banda shaped history through something as simple as nutmeg, **we believe small, well-crafted primitives can shape great systems.**

### Core Principles

| Principle | Meaning |
|-----------|---------|
| **Simplicity Is Strength** | No Virtual DOM. No JSX. What you write is what runs. |
| **Control Over Convenience** | You decide how elements, state, and styles work. |
| **Ownership Over Abstraction** | No black boxes. You can read, debug, and replace anything. |
| **Design as System** | Tokens, spacing, and motion are intentional, not decorative. |

> *Read the full [Philosophy Manifesto](./docs/philosophy.md)*

---

## ✨ Features

- 🎯 **Zero Dependencies** — No external runtime libraries
- 🔷 **TypeScript First** — Strict types, excellent developer experience
- 🎨 **Design Tokens** — `--banda-*` CSS variables for theming
- 📦 **Tree-Shakable** — Import only what you need
- ♿ **Accessible** — ARIA, keyboard navigation, focus management
- 🌙 **Dark Mode** — Built-in support via CSS variables
- ⚡ **Lightweight** — Direct DOM manipulation, no overhead
- ✅ **Form Validation** — Built-in rules and form state management
- 🔌 **Plugin System** — Extensible architecture with hooks

---

## 🚀 Getting Started

### Installation

```bash
# npm
npm install banda-ui

# yarn
yarn add banda-ui

# pnpm
pnpm add banda-ui

# bun
bun add banda-ui
```

### Development Setup

To contribute or run the demo locally:

```bash
git clone https://github.com/zakirkun/banda.git
cd banda
bun install
```

### Quick Start

```typescript
import { Button, Card, CardHeader, CardBody, mount } from 'banda';

const app = Card({
  variant: 'elevated',
  children: [
    CardHeader({ title: 'Hello Banda', subtitle: 'Welcome!' }),
    CardBody({
      children: [
        Button({
          label: 'Click Me',
          variant: 'primary',
          onClick: () => alert('Hello from Banda!'),
        }),
      ],
    }),
  ],
});

mount(app, document.getElementById('app')!);
```

### Development

```bash
bun dev          # Start demo server at http://localhost:3000
bun run typecheck # Type validation
bun run build    # Production build
```

---

## 📦 Components

### Form & Input
| Component | Description |
|-----------|-------------|
| **Button** | 5 variants, 4 sizes, loading states |
| **Input** | Labels, validation, prefix/suffix |
| **Select** | Searchable dropdown with groups |
| **DatePicker** | Calendar with date constraints |
| **Textarea** | Multi-line input |
| **FileUpload** | Drag-and-drop, previews, validation |
| **RichTextEditor** | WYSIWYG editor with toolbar |
| **ColorPicker** | Color selection with presets |

### Layout
| Component | Description |
|-----------|-------------|
| **Stack** | Vertical flex with spacing |
| **Inline** | Horizontal flex with wrapping |
| **Grid** | CSS grid with presets |
| **Divider** | Visual separator |
| **Container** | Max-width wrapper |

### Display
| Component | Description |
|-----------|-------------|
| **Card** | Content container with sections |
| **Badge** | Status labels and counts |
| **Tabs** | Tabbed navigation |
| **Table** | Data table with sorting, pagination, selection |

### Feedback
| Component | Description |
|-----------|-------------|
| **Modal** | Dialog with backdrop |
| **Alert** | Inline messages |
| **Toast** | Notifications |
| **Tooltip** | Hover hints |
| **Spinner** | Loading indicator |

### Example: Form

```typescript
import { Stack, Input, Select, Button } from 'banda';

Stack({
  space: 4,
  children: [
    Input({ label: 'Email', type: 'email', required: true }),
    Input({ label: 'Password', type: 'password', required: true }),
    Select({
      placeholder: 'Select role',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
      ],
    }),
    Button({ label: 'Sign Up', variant: 'primary' }),
  ],
})
```

### Example: Layout

```typescript
import { Stack, Inline, Grid, Spacer } from 'banda';

Stack({
  space: 6,
  children: [
    Inline({ children: [Logo(), Spacer(), Nav()] }),
    Grid({ cols: 3, gap: 4, children: productCards }),
  ],
})
```

---

## 🎨 Design Tokens

```css
/* Colors */
--banda-color-primary
--banda-color-success
--banda-color-warning
--banda-color-danger

/* Spacing (4px scale) */
--banda-space-1 to --banda-space-12

/* Typography */
--banda-font-sans
--banda-text-sm, --banda-text-base, --banda-text-lg

/* Effects */
--banda-radius-md
--banda-shadow-lg
--banda-transition-normal
```

> *See [Design Tokens Reference](./docs/design-tokens.md)*

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Getting Started](./docs/getting-started.md) | Installation, first steps, examples |
| [API Reference](./docs/api/README.md) | Core and component APIs |
| [Philosophy](./docs/philosophy.md) | Design principles and inspiration |
| [Architecture](./docs/architecture.md) | System overview |
| [Design Tokens](./docs/design-tokens.md) | CSS variables reference |
| [Accessibility](./docs/accessibility.md) | A11y guidelines |

---

## 📁 Project Structure

```
banda/
├── src/
│   ├── core/           # Element, state, events, mount, validation, plugins
│   ├── styles/         # CSS reset, tokens, typography
│   ├── components/     # UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   ├── badge/
│   │   ├── modal/
│   │   ├── layout/
│   │   ├── feedback/
│   │   ├── tabs/
│   │   ├── select/
│   │   ├── datepicker/
│   │   └── table/
│   └── demo/           # Demo application
├── docs/               # Documentation
└── package.json
```

---

## 🗺️ Roadmap

- [x] Core system (element, state, events, mount)
- [x] CSS design system
- [x] Base components (Button, Card, Input, Badge)
- [x] Modal with focus trap
- [x] Layout primitives (Stack, Inline, Grid)
- [x] Feedback components (Alert, Toast, Tooltip)
- [x] Tabs and Select
- [x] Comprehensive documentation
- [x] Form validation helpers
- [x] Plugin system
- [x] Date picker
- [x] Data table
- [x] Rich text editor
- [x] Color picker
- [ ] File upload improvements
- [ ] Markdown editor
- [x] File upload

---

## 🤝 Contributing

Contributions are welcome! Please read the philosophy first to understand our design principles.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

MIT License — feel free to use in your projects.

---

<div align="center">

**Banda** — *Small primitives, infinite composition.*

Made with ❤️ and TypeScript

*Inspired by the Banda Islands 🌴 Maluku, Indonesia*

</div>
