/**
 * Banda Core - Public API
 */

// Element creation
export {
    el,
    div,
    span,
    button,
    input,
    label,
    a,
    h1,
    h2,
    h3,
    p,
    ul,
    li,
    form,
    type ElementProps,
    type ElementEvents,
    type EventHandler,
} from './element';

// State management
export {
    createState,
    createComputed,
    createPersistentState,
    batch,
    isBatching,
    queueBatchCallback,
    type State,
    type Subscriber,
    type Unsubscribe,
} from './state';

// Event utilities
export {
    Keys,
    onKey,
    delegate,
    onClickOutside,
    createFocusTrap,
    debounce,
    throttle,
    prevent,
    onEscape,
    type KeyName,
} from './events';

// Mount/Render
export {
    mount,
    unmount,
    registerCleanup,
    replace,
    show,
    hide,
    toggle,
    setText,
    setClass,
    toggleClass,
} from './mount';

// Form Validation
export {
    rules,
    createFieldValidator,
    createForm,
    type ValidationResult,
    type ValidationRule,
    type FieldState,
    type FormFieldConfig,
    type FormConfig,
} from './validation';

// Plugin System
export {
    use,
    inject,
    getPlugin,
    hasPlugin,
    listPlugins,
    uninstall,
    definePlugin,
    type Plugin,
    type PluginHooks,
} from './plugins';
