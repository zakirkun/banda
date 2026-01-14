/**
 * Banda Core - Event Helpers
 * 
 * Utilities for handling DOM events, keyboard navigation,
 * and common interaction patterns.
 */

/** Key codes for common keyboard interactions */
export const Keys = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    SPACE: ' ',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    BACKSPACE: 'Backspace',
    DELETE: 'Delete',
} as const;

export type KeyName = (typeof Keys)[keyof typeof Keys];

/**
 * Creates a keyboard event handler for specific keys.
 * 
 * @example
 * const handleKeyDown = onKey({
 *   [Keys.ENTER]: () => submit(),
 *   [Keys.ESCAPE]: () => cancel(),
 * });
 * 
 * element.addEventListener('keydown', handleKeyDown);
 */
export function onKey(
    handlers: Partial<Record<KeyName, (event: KeyboardEvent) => void>>,
    options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
): (event: KeyboardEvent) => void {
    return (event: KeyboardEvent) => {
        const handler = handlers[event.key as KeyName];
        if (handler) {
            if (options.preventDefault) {
                event.preventDefault();
            }
            if (options.stopPropagation) {
                event.stopPropagation();
            }
            handler(event);
        }
    };
}

/**
 * Creates a delegated event listener.
 * 
 * @example
 * // Handle clicks on any button within container
 * delegate(container, 'click', 'button', (event, target) => {
 *   console.log('Button clicked:', target.textContent);
 * });
 */
export function delegate<K extends keyof HTMLElementEventMap>(
    container: HTMLElement,
    eventType: K,
    selector: string,
    handler: (event: HTMLElementEventMap[K], target: HTMLElement) => void
): () => void {
    const listener = (event: HTMLElementEventMap[K]) => {
        const target = (event.target as HTMLElement).closest(selector) as HTMLElement | null;
        if (target && container.contains(target)) {
            handler(event, target);
        }
    };

    container.addEventListener(eventType, listener as EventListener);
    return () => container.removeEventListener(eventType, listener as EventListener);
}

/**
 * Creates a click-outside handler.
 * 
 * @example
 * const cleanup = onClickOutside(modalElement, () => {
 *   closeModal();
 * });
 */
export function onClickOutside(
    element: HTMLElement,
    handler: (event: MouseEvent) => void
): () => void {
    const listener = (event: MouseEvent) => {
        if (!element.contains(event.target as Node)) {
            handler(event);
        }
    };

    // Use setTimeout to prevent immediate triggering
    setTimeout(() => {
        document.addEventListener('click', listener);
    }, 0);

    return () => document.removeEventListener('click', listener);
}

/**
 * Creates a focus trap within an element.
 * Useful for modals and dialogs.
 * 
 * @example
 * const cleanup = createFocusTrap(modalElement);
 * // Later...
 * cleanup();
 */
export function createFocusTrap(element: HTMLElement): () => void {
    const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const getFocusableElements = () =>
        Array.from(element.querySelectorAll<HTMLElement>(focusableSelectors));

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== Keys.TAB) return;

        const focusable = getFocusableElements();
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
        }
    };

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Focus first focusable element
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
        focusable[0]?.focus();
    }

    element.addEventListener('keydown', handleKeyDown);

    return () => {
        element.removeEventListener('keydown', handleKeyDown);
        // Restore focus
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
            previouslyFocused.focus();
        }
    };
}

/**
 * Debounces a function.
 * 
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   performSearch(query);
 * }, 300);
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delay);
    };
}

/**
 * Throttles a function.
 * 
 * @example
 * const throttledScroll = throttle(() => {
 *   handleScroll();
 * }, 100);
 */
export function throttle<T extends (...args: Parameters<T>) => void>(
    fn: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle = false;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            fn(...args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Prevents default behavior and stops propagation.
 */
export function prevent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
}

/**
 * Adds an escape key listener to close something.
 * 
 * @example
 * const cleanup = onEscape(() => closeModal());
 */
export function onEscape(handler: () => void): () => void {
    const listener = (event: KeyboardEvent) => {
        if (event.key === Keys.ESCAPE) {
            handler();
        }
    };

    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
}
