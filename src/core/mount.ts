/**
 * Banda Core - Mount/Render
 * 
 * Functions for mounting and unmounting elements to the DOM.
 */

/** Map to track mounted elements for cleanup */
const mountedElements = new WeakMap<HTMLElement, () => void>();

/**
 * Mounts an element to a container.
 * If the container already has content, it will be cleared.
 * 
 * @example
 * const app = Card({
 *   title: 'Hello',
 *   children: [Button({ label: 'Click' })]
 * });
 * 
 * mount(app, document.getElementById('app')!);
 */
export function mount(
    element: HTMLElement,
    container: HTMLElement,
    options: { append?: boolean } = {}
): void {
    if (!options.append) {
        // Clear existing content
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    container.appendChild(element);
}

/**
 * Unmounts an element from its parent.
 * Runs cleanup if registered.
 * 
 * @example
 * unmount(modalElement);
 */
export function unmount(element: HTMLElement): void {
    // Run cleanup if registered
    const cleanup = mountedElements.get(element);
    if (cleanup) {
        cleanup();
        mountedElements.delete(element);
    }

    // Remove from DOM
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Registers a cleanup function for an element.
 * Called automatically when element is unmounted.
 * 
 * @example
 * const button = Button({ label: 'Click' });
 * registerCleanup(button, () => {
 *   // Clean up event listeners, timers, etc.
 * });
 */
export function registerCleanup(
    element: HTMLElement,
    cleanup: () => void
): void {
    const existing = mountedElements.get(element);
    if (existing) {
        // Compose cleanup functions
        mountedElements.set(element, () => {
            existing();
            cleanup();
        });
    } else {
        mountedElements.set(element, cleanup);
    }
}

/**
 * Replaces an element with another, preserving the position in DOM.
 * 
 * @example
 * replace(oldElement, newElement);
 */
export function replace(
    oldElement: HTMLElement,
    newElement: HTMLElement
): void {
    const parent = oldElement.parentNode;
    if (parent) {
        parent.replaceChild(newElement, oldElement);
    }

    // Transfer cleanup registration
    const cleanup = mountedElements.get(oldElement);
    if (cleanup) {
        mountedElements.delete(oldElement);
        mountedElements.set(newElement, cleanup);
    }
}

/**
 * Shows an element by setting display to its original value.
 */
export function show(element: HTMLElement, display: string = 'block'): void {
    element.style.display = display;
}

/**
 * Hides an element by setting display to none.
 */
export function hide(element: HTMLElement): void {
    element.style.display = 'none';
}

/**
 * Toggles element visibility.
 */
export function toggle(
    element: HTMLElement,
    visible?: boolean,
    display: string = 'block'
): void {
    const isHidden = element.style.display === 'none';
    const shouldShow = visible ?? isHidden;

    if (shouldShow) {
        show(element, display);
    } else {
        hide(element);
    }
}

/**
 * Updates an element's text content efficiently.
 */
export function setText(element: HTMLElement, text: string): void {
    if (element.textContent !== text) {
        element.textContent = text;
    }
}

/**
 * Updates an element's class name efficiently.
 */
export function setClass(element: HTMLElement, className: string): void {
    if (element.className !== className) {
        element.className = className;
    }
}

/**
 * Adds or removes a class based on condition.
 */
export function toggleClass(
    element: HTMLElement,
    className: string,
    condition?: boolean
): void {
    if (condition === undefined) {
        element.classList.toggle(className);
    } else if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}
