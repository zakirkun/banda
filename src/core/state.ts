/**
 * Banda Core - Reactive State
 * 
 * Lightweight reactive state management using subscriptions.
 * No external dependencies, minimal overhead.
 */

/** Callback function for state subscriptions */
export type Subscriber<T> = (value: T, prevValue: T) => void;

/** Unsubscribe function returned when subscribing */
export type Unsubscribe = () => void;

/** State interface with getter, setter, and subscribe */
export interface State<T> {
    /** Get current value */
    get: () => T;
    /** Set new value */
    set: (value: T | ((prev: T) => T)) => void;
    /** Subscribe to changes */
    subscribe: (callback: Subscriber<T>) => Unsubscribe;
    /** Get current value (alias for get) */
    readonly value: T;
}

/**
 * Creates a reactive state container.
 * 
 * @example
 * const count = createState(0);
 * 
 * // Subscribe to changes
 * count.subscribe((value, prev) => {
 *   console.log(`Count changed from ${prev} to ${value}`);
 * });
 * 
 * // Update state
 * count.set(1);           // Direct value
 * count.set(n => n + 1);  // Updater function
 * 
 * // Read state
 * console.log(count.get());   // 2
 * console.log(count.value);   // 2
 */
export function createState<T>(initialValue: T): State<T> {
    let value = initialValue;
    const subscribers = new Set<Subscriber<T>>();

    const get = () => value;

    const set = (newValue: T | ((prev: T) => T)) => {
        const prevValue = value;
        value = typeof newValue === 'function'
            ? (newValue as (prev: T) => T)(prevValue)
            : newValue;

        // Only notify if value changed
        if (value !== prevValue) {
            for (const subscriber of subscribers) {
                subscriber(value, prevValue);
            }
        }
    };

    const subscribe = (callback: Subscriber<T>): Unsubscribe => {
        subscribers.add(callback);
        return () => {
            subscribers.delete(callback);
        };
    };

    return {
        get,
        set,
        subscribe,
        get value() {
            return value;
        },
    };
}

/**
 * Creates a computed state that derives from other states.
 * 
 * @example
 * const firstName = createState('John');
 * const lastName = createState('Doe');
 * 
 * const fullName = createComputed(
 *   [firstName, lastName],
 *   (first, last) => `${first} ${last}`
 * );
 * 
 * console.log(fullName.get()); // "John Doe"
 */
export function createComputed<T, D extends readonly State<unknown>[]>(
    dependencies: [...D],
    compute: (...values: { [K in keyof D]: D[K] extends State<infer V> ? V : never }) => T
): Omit<State<T>, 'set'> {
    const getValue = () => {
        const values = dependencies.map(dep => dep.get()) as {
            [K in keyof D]: D[K] extends State<infer V> ? V : never
        };
        return compute(...values);
    };

    let cachedValue = getValue();
    const subscribers = new Set<Subscriber<T>>();

    // Subscribe to all dependencies
    for (const dep of dependencies) {
        dep.subscribe(() => {
            const prevValue = cachedValue;
            cachedValue = getValue();

            if (cachedValue !== prevValue) {
                for (const subscriber of subscribers) {
                    subscriber(cachedValue, prevValue);
                }
            }
        });
    }

    const subscribe = (callback: Subscriber<T>): Unsubscribe => {
        subscribers.add(callback);
        return () => {
            subscribers.delete(callback);
        };
    };

    return {
        get: () => cachedValue,
        subscribe,
        get value() {
            return cachedValue;
        },
    };
}

/**
 * Creates a state that syncs with localStorage.
 * 
 * @example
 * const theme = createPersistentState('theme', 'light');
 * theme.set('dark'); // Automatically saved to localStorage
 */
export function createPersistentState<T>(
    key: string,
    defaultValue: T
): State<T> {
    let initial = defaultValue;

    try {
        const stored = localStorage.getItem(key);
        if (stored !== null) {
            initial = JSON.parse(stored) as T;
        }
    } catch {
        // Use default if parsing fails
    }

    const state = createState(initial);

    // Sync to localStorage on changes
    state.subscribe((value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Ignore storage errors
        }
    });

    return state;
}

/**
 * Batches multiple state updates to prevent excessive re-renders.
 * 
 * @example
 * batch(() => {
 *   count.set(1);
 *   name.set('John');
 *   active.set(true);
 * });
 */
let batchDepth = 0;
let batchQueue: (() => void)[] = [];

export function batch(fn: () => void): void {
    batchDepth++;
    try {
        fn();
    } finally {
        batchDepth--;
        if (batchDepth === 0) {
            const queue = batchQueue;
            batchQueue = [];
            for (const callback of queue) {
                callback();
            }
        }
    }
}

/** Check if currently in a batch */
export function isBatching(): boolean {
    return batchDepth > 0;
}

/** Queue a callback for batch execution */
export function queueBatchCallback(fn: () => void): void {
    if (batchDepth > 0) {
        batchQueue.push(fn);
    } else {
        fn();
    }
}
