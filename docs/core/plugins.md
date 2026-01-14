# Plugins

Extensible plugin system.

## Import

```typescript
import { use, inject, definePlugin, getPlugin, hasPlugin, listPlugins, uninstall } from 'banda';
```

## Creating a Plugin

### Basic Plugin

```typescript
const myPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  hooks: {
    install: () => {
      console.log('Plugin installed!');
    },
  },
};

use(myPlugin);
```

### With definePlugin

```typescript
const analyticsPlugin = definePlugin('analytics', () => ({
  version: '1.0.0',
  hooks: {
    onMount: (element) => {
      console.log('Element mounted:', element);
    },
    onUnmount: (element) => {
      console.log('Element unmounted:', element);
    },
  },
  provides: {
    track: (event: string, data?: object) => {
      console.log('Track:', event, data);
    },
  },
}));

use(analyticsPlugin);
```

## Plugin Hooks

### Available Hooks

| Hook | When Called |
|------|-------------|
| `install` | When plugin is installed |
| `onMount` | When an element is mounted |
| `onUnmount` | When an element is unmounted |
| `beforeStateUpdate` | Before state changes |
| `afterStateUpdate` | After state changes |

### Example: Logging Plugin

```typescript
const loggerPlugin = definePlugin('logger', () => ({
  hooks: {
    install: () => console.log('[Logger] Installed'),
    onMount: (el) => console.log('[Logger] Mount:', el.tagName),
    onUnmount: (el) => console.log('[Logger] Unmount:', el.tagName),
    beforeStateUpdate: (old, next) => {
      console.log('[Logger] State:', old, '->', next);
      return next; // Must return value
    },
  },
}));
```

## Providers (inject/provide)

### Providing Values

```typescript
const themePlugin = definePlugin('theme', () => ({
  provides: {
    theme: {
      primary: '#4f46e5',
      secondary: '#64748b',
    },
    setTheme: (name: string) => {
      document.body.className = `theme-${name}`;
    },
  },
}));

use(themePlugin);
```

### Injecting Values

```typescript
// Get provided value
const theme = inject<{ primary: string; secondary: string }>('theme');
console.log(theme?.primary); // '#4f46e5'

const setTheme = inject<(name: string) => void>('setTheme');
setTheme?.('dark');
```

## Plugin Dependencies

```typescript
const basePlugin = definePlugin('base', () => ({
  provides: {
    config: { apiUrl: '/api' },
  },
}));

const apiPlugin = definePlugin('api', () => ({
  dependencies: ['base'], // Requires 'base' plugin
  hooks: {
    install: () => {
      const config = inject<{ apiUrl: string }>('config');
      console.log('API URL:', config?.apiUrl);
    },
  },
}));

use(basePlugin);
use(apiPlugin); // Works - base is installed

// use(apiPlugin); // Error - base not installed yet
```

## Managing Plugins

### Check Installation

```typescript
if (hasPlugin('analytics')) {
  const track = inject<Function>('track');
  track?.('page_view');
}
```

### Get Plugin Info

```typescript
const plugin = getPlugin('analytics');
console.log(plugin?.version); // '1.0.0'
```

### List Plugins

```typescript
const installed = listPlugins();
console.log(installed); // ['analytics', 'theme', ...]
```

### Uninstall

```typescript
uninstall('analytics');
```

## Complete Example: i18n Plugin

```typescript
import { definePlugin, use, inject } from 'banda';

// Define plugin
const i18nPlugin = definePlugin('i18n', () => {
  const translations: Record<string, Record<string, string>> = {
    en: {
      'hello': 'Hello',
      'goodbye': 'Goodbye',
      'welcome': 'Welcome, {name}!',
    },
    es: {
      'hello': 'Hola',
      'goodbye': 'Adiós',
      'welcome': '¡Bienvenido, {name}!',
    },
  };

  let currentLocale = 'en';

  function t(key: string, params?: Record<string, string>): string {
    let text = translations[currentLocale]?.[key] || key;
    
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v);
      }
    }
    
    return text;
  }

  function setLocale(locale: string) {
    currentLocale = locale;
  }

  function getLocale() {
    return currentLocale;
  }

  return {
    hooks: {
      install: () => {
        console.log('i18n plugin installed');
      },
    },
    provides: {
      t,
      setLocale,
      getLocale,
    },
  };
});

// Install
use(i18nPlugin);

// Use in component
function Greeting({ name }: { name: string }) {
  const t = inject<(key: string, params?: Record<string, string>) => string>('t');
  const setLocale = inject<(locale: string) => void>('setLocale');

  return div({
    children: [
      p({ text: t?.('welcome', { name }) || '' }),
      button({
        text: 'Español',
        onClick: () => setLocale?.('es'),
      }),
    ],
  });
}
```

## Plugin Types

```typescript
interface Plugin {
  name: string;
  version?: string;
  dependencies?: string[];
  hooks?: PluginHooks;
  provides?: Record<string, unknown>;
}

interface PluginHooks {
  install?: () => void;
  onMount?: (element: HTMLElement) => void;
  onUnmount?: (element: HTMLElement) => void;
  beforeStateUpdate?: <T>(oldValue: T, newValue: T) => T;
  afterStateUpdate?: <T>(value: T) => void;
}
```
