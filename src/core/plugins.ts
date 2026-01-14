/**
 * Banda Plugin System
 * 
 * Extensible architecture for adding functionality to Banda.
 */

// ============================================================================
// PLUGIN TYPES
// ============================================================================

/** Plugin lifecycle hooks */
export interface PluginHooks {
    /** Called when plugin is installed */
    install?: () => void;
    /** Called when an element is mounted */
    onMount?: (element: HTMLElement) => void;
    /** Called when an element is unmounted */
    onUnmount?: (element: HTMLElement) => void;
    /** Called before state update */
    beforeStateUpdate?: <T>(oldValue: T, newValue: T) => T;
    /** Called after state update */
    afterStateUpdate?: <T>(value: T) => void;
}

/** Plugin definition */
export interface Plugin {
    /** Unique plugin name */
    name: string;
    /** Plugin version */
    version?: string;
    /** Plugin hooks */
    hooks?: PluginHooks;
    /** Plugin provides (utilities, components) */
    provides?: Record<string, unknown>;
    /** Dependencies on other plugins */
    dependencies?: string[];
}

/** Plugin manager state */
interface PluginManagerState {
    plugins: Map<string, Plugin>;
    provides: Map<string, unknown>;
}

// ============================================================================
// PLUGIN MANAGER
// ============================================================================

const state: PluginManagerState = {
    plugins: new Map(),
    provides: new Map(),
};

const hookSubscribers: {
    onMount: Array<(el: HTMLElement) => void>;
    onUnmount: Array<(el: HTMLElement) => void>;
    beforeStateUpdate: Array<(<T>(old: T, val: T) => T)>;
    afterStateUpdate: Array<(<T>(val: T) => void)>;
} = {
    onMount: [],
    onUnmount: [],
    beforeStateUpdate: [],
    afterStateUpdate: [],
};

/**
 * Install a plugin.
 * 
 * @example
 * const myPlugin: Plugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   hooks: {
 *     install: () => console.log('Plugin installed'),
 *     onMount: (el) => console.log('Element mounted:', el),
 *   },
 *   provides: {
 *     formatDate: (date) => date.toLocaleDateString(),
 *   },
 * };
 * 
 * use(myPlugin);
 */
export function use(plugin: Plugin): void {
    if (state.plugins.has(plugin.name)) {
        console.warn(`Plugin "${plugin.name}" is already installed.`);
        return;
    }

    // Check dependencies
    if (plugin.dependencies) {
        for (const dep of plugin.dependencies) {
            if (!state.plugins.has(dep)) {
                throw new Error(`Plugin "${plugin.name}" requires plugin "${dep}" to be installed first.`);
            }
        }
    }

    // Register plugin
    state.plugins.set(plugin.name, plugin);

    // Register hooks
    if (plugin.hooks) {
        if (plugin.hooks.onMount) {
            hookSubscribers.onMount.push(plugin.hooks.onMount);
        }
        if (plugin.hooks.onUnmount) {
            hookSubscribers.onUnmount.push(plugin.hooks.onUnmount);
        }
        if (plugin.hooks.beforeStateUpdate) {
            hookSubscribers.beforeStateUpdate.push(plugin.hooks.beforeStateUpdate);
        }
        if (plugin.hooks.afterStateUpdate) {
            hookSubscribers.afterStateUpdate.push(plugin.hooks.afterStateUpdate);
        }
    }

    // Register provides
    if (plugin.provides) {
        for (const [key, value] of Object.entries(plugin.provides)) {
            if (state.provides.has(key)) {
                console.warn(`Provider "${key}" from plugin "${plugin.name}" overwrites existing provider.`);
            }
            state.provides.set(key, value);
        }
    }

    // Call install hook
    plugin.hooks?.install?.();

    console.log(`Plugin "${plugin.name}"${plugin.version ? ` v${plugin.version}` : ''} installed.`);
}

/**
 * Get a provided value from plugins.
 * 
 * @example
 * const formatDate = inject<(date: Date) => string>('formatDate');
 * const formatted = formatDate?.(new Date());
 */
export function inject<T>(key: string): T | undefined {
    return state.provides.get(key) as T | undefined;
}

/**
 * Get an installed plugin.
 */
export function getPlugin(name: string): Plugin | undefined {
    return state.plugins.get(name);
}

/**
 * Check if a plugin is installed.
 */
export function hasPlugin(name: string): boolean {
    return state.plugins.has(name);
}

/**
 * List all installed plugins.
 */
export function listPlugins(): string[] {
    return Array.from(state.plugins.keys());
}

/**
 * Uninstall a plugin.
 */
export function uninstall(name: string): boolean {
    const plugin = state.plugins.get(name);
    if (!plugin) return false;

    // Remove provides
    if (plugin.provides) {
        for (const key of Object.keys(plugin.provides)) {
            state.provides.delete(key);
        }
    }

    // Remove hooks (simplified - in production would need proper cleanup)
    state.plugins.delete(name);

    console.log(`Plugin "${name}" uninstalled.`);
    return true;
}

// ============================================================================
// HOOK TRIGGERS (for internal use)
// ============================================================================

/** Trigger mount hooks */
export function triggerMount(element: HTMLElement): void {
    for (const hook of hookSubscribers.onMount) {
        try {
            hook(element);
        } catch (e) {
            console.error('Error in onMount hook:', e);
        }
    }
}

/** Trigger unmount hooks */
export function triggerUnmount(element: HTMLElement): void {
    for (const hook of hookSubscribers.onUnmount) {
        try {
            hook(element);
        } catch (e) {
            console.error('Error in onUnmount hook:', e);
        }
    }
}

/** Apply beforeStateUpdate hooks */
export function applyBeforeStateUpdate<T>(oldValue: T, newValue: T): T {
    let result = newValue;
    for (const hook of hookSubscribers.beforeStateUpdate) {
        try {
            result = hook(oldValue, result);
        } catch (e) {
            console.error('Error in beforeStateUpdate hook:', e);
        }
    }
    return result;
}

/** Trigger afterStateUpdate hooks */
export function triggerAfterStateUpdate<T>(value: T): void {
    for (const hook of hookSubscribers.afterStateUpdate) {
        try {
            hook(value);
        } catch (e) {
            console.error('Error in afterStateUpdate hook:', e);
        }
    }
}

// ============================================================================
// BUILT-IN PLUGIN HELPERS
// ============================================================================

/**
 * Create a simple plugin.
 */
export function definePlugin(
    name: string,
    setup: () => Partial<Omit<Plugin, 'name'>>
): Plugin {
    return {
        name,
        ...setup(),
    };
}

export default {
    use,
    inject,
    getPlugin,
    hasPlugin,
    listPlugins,
    uninstall,
    definePlugin,
};
