# Design Decisions

## Philosophy

### 1. No Virtual DOM
**Decision**: Direct DOM manipulation instead of VDOM diffing.

**Rationale**: 
- Simpler mental model
- Zero overhead for small apps
- Full control over when updates happen
- Better performance for targeted updates

### 2. No JSX
**Decision**: Functional component API with typed props.

**Rationale**:
- No build step required for basic usage
- Full TypeScript inference
- More explicit than template strings
- IDE support without plugins

```typescript
// Instead of JSX
Button({ label: 'Click', variant: 'primary', onClick: handler })
```

### 3. CSS Custom Properties Only
**Decision**: Design tokens via CSS variables, no CSS-in-JS.

**Rationale**:
- Zero runtime overhead
- Native browser support
- Easy theme switching (just update variables)
- Inspectable in DevTools
- Works with any tooling

### 4. Co-located Component Files
**Decision**: Each component has `.ts`, `.css`, and `example.ts` together.

**Rationale**:
- Easy to find all related code
- Self-documenting via examples
- Clear ownership
- Simple to add/remove components

## Tradeoffs

### Reactivity
**Tradeoff**: Manual subscriptions vs. automatic tracking.

We chose explicit `state.subscribe()` over automatic dependency tracking because:
- Predictable behavior
- No proxy magic
- Clear cleanup paths
- Works with any DOM operation

### Component Composition
**Tradeoff**: Props drilling vs. context/providers.

We chose props passing because:
- Explicit data flow
- No hidden dependencies
- TypeScript knows everything
- Simpler debugging

### Styling
**Tradeoff**: Pre-built components vs. unstyled primitives.

We chose styled components because:
- Immediately usable
- Consistent design language
- Still customizable via CSS variables
- Examples show intended usage

## API Stability

### Stable APIs (v1.0 candidates)
- `el()` and shorthand functions
- `createState()`, `subscribe()`, `set()`
- `mount()`, `unmount()`
- CSS token naming (`--banda-*`)
- Component prop interfaces

### Experimental APIs
- `createComputed()` - May change signature
- `batch()` - Needs more testing
- Plugin system - Not yet implemented

## Performance Guidelines

1. **Create once**: Build DOM trees at mount time
2. **Update targeted**: Use `setText()`, `setClass()` for updates
3. **Cleanup always**: Register cleanup handlers for subscriptions
4. **Lazy load**: Import components individually for tree-shaking
