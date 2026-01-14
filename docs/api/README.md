# API Reference

Complete API documentation for Banda UI framework.

## Core

- [Core API](./core.md) - Element creation, state, events, lifecycle

## Components

- [Components API](./components.md) - Button, Card, Input, Modal, Layout, Tabs, Select, and more

## Quick Links

### Element Creation
```typescript
import { el, div, button, span } from 'banda';
```

### State Management
```typescript
import { createState, createComputed, createPersistentState, batch } from 'banda';
```

### Lifecycle
```typescript
import { mount, unmount, registerCleanup } from 'banda';
```

### Events
```typescript
import { onKey, Keys, onClickOutside, createFocusTrap, debounce, throttle } from 'banda';
```

### Components
```typescript
import {
  // Basic
  Button, ButtonGroup,
  Card, CardHeader, CardBody, CardFooter,
  Input, Textarea,
  Badge, BadgeGroup,
  
  // Overlay
  openModal, closeModal,
  toast, Tooltip,
  
  // Layout
  Stack, Inline, Grid, Divider, Spacer, Center, Container,
  
  // Feedback
  Alert, Spinner,
  
  // Navigation
  Tabs,
  
  // Form
  Select,
} from 'banda';
```
