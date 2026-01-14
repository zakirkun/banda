# Framework Integration Guide

Banda is framework-agnostic and can be integrated with React, Next.js, Vue.js, SvelteKit, and other frameworks.

---

## React

### Installation

```bash
# In your React project
npm install banda
# or
bun add banda
```

### Basic Usage

Create a wrapper component that renders Banda elements:

```tsx
// components/BandaButton.tsx
import { useRef, useEffect } from 'react';
import { Button } from 'banda';

interface BandaButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  onClick?: () => void;
}

export function BandaButton({ label, variant = 'primary', onClick }: BandaButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = Button({ label, variant, onClick });
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);
    }

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [label, variant, onClick]);

  return <div ref={containerRef} />;
}
```

### Custom Hook

Create a reusable hook for any Banda component:

```tsx
// hooks/useBanda.ts
import { useRef, useEffect } from 'react';

export function useBanda<T extends HTMLElement>(
  factory: () => T,
  deps: any[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = factory();
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);
    }

    return () => {
      containerRef.current?.replaceChildren();
    };
  }, deps);

  return containerRef;
}

// Usage
function MyComponent() {
  const ref = useBanda(
    () => Button({ label: 'Click', variant: 'primary' }),
    []
  );
  
  return <div ref={ref} />;
}
```

### Using Banda State with React

```tsx
import { useState, useEffect } from 'react';
import { createState } from 'banda';

// Bridge Banda state to React
function useBandaState<T>(bandaState: ReturnType<typeof createState<T>>) {
  const [value, setValue] = useState(bandaState.get());

  useEffect(() => {
    return bandaState.subscribe(setValue);
  }, [bandaState]);

  return [value, bandaState.set] as const;
}

// Usage
const countState = createState(0);

function Counter() {
  const [count, setCount] = useBandaState(countState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### Import CSS

```tsx
// App.tsx or layout.tsx
import 'banda/src/styles/base.css';
import 'banda/src/components/button/button.css';
import 'banda/src/components/card/card.css';
// ... other component CSS
```

---

## Next.js

### Setup

```bash
npm install banda
```

### Client Components

Banda uses DOM APIs, so use the `'use client'` directive:

```tsx
// components/BandaCard.tsx
'use client';

import { useRef, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'banda';

interface Props {
  title: string;
  content: string;
}

export function BandaCard({ title, content }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = Card({
      variant: 'elevated',
      children: [
        CardHeader({ title }),
        CardBody({ children: [document.createTextNode(content)] }),
      ],
    });

    ref.current?.replaceChildren(card);
  }, [title, content]);

  return <div ref={ref} />;
}
```

### Global CSS

```tsx
// app/layout.tsx
import 'banda/src/styles/base.css';
import 'banda/src/components/button/button.css';
import 'banda/src/components/card/card.css';
import 'banda/src/components/modal/modal.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Modal Integration

```tsx
'use client';

import { openModal, closeModal, Button } from 'banda';
import { useEffect, useRef } from 'react';

export function ModalTrigger() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = Button({
      label: 'Open Modal',
      onClick: () => {
        openModal({
          title: 'Hello from Next.js',
          children: [document.createTextNode('Modal content here')],
          footer: [
            Button({ label: 'Close', variant: 'ghost', onClick: closeModal }),
          ],
        });
      },
    });

    ref.current?.replaceChildren(btn);
  }, []);

  return <div ref={ref} />;
}
```

---

## Vue.js

### Installation

```bash
npm install banda
```

### Composable

```typescript
// composables/useBanda.ts
import { ref, onMounted, onUnmounted, watch } from 'vue';

export function useBanda<T extends HTMLElement>(
  factory: () => T,
  deps?: () => any[]
) {
  const containerRef = ref<HTMLElement | null>(null);

  const render = () => {
    if (containerRef.value) {
      containerRef.value.innerHTML = '';
      containerRef.value.appendChild(factory());
    }
  };

  onMounted(render);

  if (deps) {
    watch(deps, render);
  }

  return containerRef;
}
```

### Component Wrapper

```vue
<!-- components/BandaButton.vue -->
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Button } from 'banda';

const props = defineProps<{
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
}>();

const emit = defineEmits(['click']);

const container = ref<HTMLElement | null>(null);

const render = () => {
  if (!container.value) return;
  
  container.value.innerHTML = '';
  container.value.appendChild(
    Button({
      label: props.label,
      variant: props.variant || 'primary',
      onClick: () => emit('click'),
    })
  );
};

onMounted(render);
watch(() => [props.label, props.variant], render);
</script>

<template>
  <div ref="container"></div>
</template>
```

### Usage

```vue
<script setup lang="ts">
import BandaButton from './components/BandaButton.vue';
</script>

<template>
  <BandaButton 
    label="Click Me" 
    variant="primary" 
    @click="handleClick" 
  />
</template>
```

### Import CSS in main.ts

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';

import 'banda/src/styles/base.css';
import 'banda/src/components/button/button.css';
import 'banda/src/components/card/card.css';

createApp(App).mount('#app');
```

---

## SvelteKit

### Installation

```bash
npm install banda
```

### Component Wrapper

```svelte
<!-- lib/components/BandaButton.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Button } from 'banda';

  export let label: string;
  export let variant: 'primary' | 'secondary' | 'ghost' = 'primary';

  let container: HTMLDivElement;

  function render() {
    if (!container) return;
    container.innerHTML = '';
    container.appendChild(
      Button({ label, variant, onClick: () => dispatch('click') })
    );
  }

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  onMount(render);

  $: label, variant, render();
</script>

<div bind:this={container}></div>
```

### Using Actions

```svelte
<!-- More elegant with Svelte actions -->
<script lang="ts">
  import { Button } from 'banda';

  function bandaButton(node: HTMLElement, props: { label: string; variant?: string }) {
    const element = Button({
      label: props.label,
      variant: props.variant as any || 'primary',
    });
    node.appendChild(element);

    return {
      update(newProps: typeof props) {
        node.innerHTML = '';
        node.appendChild(Button({
          label: newProps.label,
          variant: newProps.variant as any || 'primary',
        }));
      },
      destroy() {
        node.innerHTML = '';
      },
    };
  }
</script>

<div use:bandaButton={{ label: 'Hello', variant: 'primary' }}></div>
```

### Layout CSS

```svelte
<!-- +layout.svelte -->
<script>
  import 'banda/src/styles/base.css';
  import 'banda/src/components/button/button.css';
  import 'banda/src/components/card/card.css';
</script>

<slot />
```

### Modal in SvelteKit

```svelte
<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, openModal, closeModal } from 'banda';

  let trigger: HTMLDivElement;

  onMount(() => {
    trigger.appendChild(
      Button({
        label: 'Open Modal',
        onClick: () => {
          openModal({
            title: 'Hello Svelte',
            children: [document.createTextNode('Content here')],
            footer: [
              Button({ label: 'Close', onClick: closeModal }),
            ],
          });
        },
      })
    );
  });
</script>

<div bind:this={trigger}></div>
```

---

## General Tips

### 1. CSS Import Order

Always import in this order:
```typescript
import 'banda/src/styles/base.css';      // Base styles first
import 'banda/src/components/...';       // Component styles
```

### 2. SSR Considerations

Banda requires DOM access. For SSR frameworks:
- **Next.js**: Use `'use client'` directive
- **SvelteKit**: Use `onMount` for rendering
- **Nuxt**: Use `<ClientOnly>` wrapper

### 3. Bundle Size

Import only what you need:
```typescript
// Good - tree-shakable
import { Button } from 'banda/src/components/button/button';

// Avoid - imports everything
import { Button } from 'banda';
```

### 4. Type Safety

All Banda components have TypeScript types:
```typescript
import type { ButtonProps, CardProps } from 'banda';
```

---

## Example Project Structure

```
my-app/
├── components/
│   ├── BandaButton.tsx    # React/Next wrapper
│   ├── BandaCard.tsx
│   └── BandaModal.tsx
├── hooks/
│   └── useBanda.ts        # Custom hook
└── styles/
    └── banda.css          # Import aggregator
```

### styles/banda.css
```css
@import 'banda/src/styles/base.css';
@import 'banda/src/components/button/button.css';
@import 'banda/src/components/card/card.css';
@import 'banda/src/components/input/input.css';
@import 'banda/src/components/modal/modal.css';
@import 'banda/src/components/layout/layout.css';
@import 'banda/src/components/feedback/feedback.css';
@import 'banda/src/components/tabs/tabs.css';
@import 'banda/src/components/select/select.css';
```
