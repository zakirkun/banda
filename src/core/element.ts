/**
 * Banda Core - Element Creation
 * 
 * DOM abstraction layer for creating typed HTML elements
 * with a clean, functional API.
 */

/** Event handler type for DOM events */
export type EventHandler<K extends keyof HTMLElementEventMap> = (
    event: HTMLElementEventMap[K]
) => void;

/** Common event handlers interface */
export interface ElementEvents {
    onClick?: EventHandler<'click'>;
    onMouseEnter?: EventHandler<'mouseenter'>;
    onMouseLeave?: EventHandler<'mouseleave'>;
    onFocus?: EventHandler<'focus'>;
    onBlur?: EventHandler<'blur'>;
    onKeyDown?: EventHandler<'keydown'>;
    onKeyUp?: EventHandler<'keyup'>;
    onInput?: EventHandler<'input'>;
    onChange?: EventHandler<'change'>;
    onSubmit?: EventHandler<'submit'>;
}

/** Props for creating elements */
export interface ElementProps extends ElementEvents {
    /** HTML tag name, defaults to 'div' */
    tag?: keyof HTMLElementTagNameMap;
    /** CSS class name(s) */
    className?: string;
    /** Child elements or text content */
    children?: (HTMLElement | string | null | undefined)[];
    /** HTML attributes */
    attrs?: Record<string, string | boolean | number>;
    /** Inline styles */
    style?: Partial<CSSStyleDeclaration>;
    /** Inner HTML (use with caution) */
    html?: string;
    /** Text content */
    text?: string;
}

/** Map of event prop names to DOM event names */
const EVENT_MAP: Record<string, keyof HTMLElementEventMap> = {
    onClick: 'click',
    onMouseEnter: 'mouseenter',
    onMouseLeave: 'mouseleave',
    onFocus: 'focus',
    onBlur: 'blur',
    onKeyDown: 'keydown',
    onKeyUp: 'keyup',
    onInput: 'input',
    onChange: 'change',
    onSubmit: 'submit',
};

/**
 * Creates an HTML element with the given props.
 * 
 * @example
 * const button = el({
 *   tag: 'button',
 *   className: 'banda-button',
 *   text: 'Click Me',
 *   onClick: () => console.log('Clicked!')
 * });
 */
export function el<K extends keyof HTMLElementTagNameMap>(
    props: ElementProps & { tag: K }
): HTMLElementTagNameMap[K];
export function el(props: ElementProps): HTMLElement;
export function el(props: ElementProps = {}): HTMLElement {
    const {
        tag = 'div',
        className,
        children,
        attrs,
        style,
        html,
        text,
        ...events
    } = props;

    // Create element
    const element = document.createElement(tag);

    // Set class name
    if (className) {
        element.className = className;
    }

    // Set attributes
    if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
            if (value === false) {
                element.removeAttribute(key);
            } else if (value === true) {
                element.setAttribute(key, '');
            } else {
                element.setAttribute(key, String(value));
            }
        }
    }

    // Set inline styles
    if (style) {
        for (const [key, value] of Object.entries(style)) {
            if (value !== undefined && value !== null) {
                // Convert camelCase to kebab-case for setProperty
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                element.style.setProperty(cssKey, String(value));
            }
        }
    }

    // Set text content
    if (text !== undefined) {
        element.textContent = text;
    }

    // Set inner HTML (overrides text)
    if (html !== undefined) {
        element.innerHTML = html;
    }

    // Append children
    if (children) {
        for (const child of children) {
            if (child === null || child === undefined) {
                continue;
            }
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        }
    }

    // Attach event listeners
    for (const [propName, handler] of Object.entries(events)) {
        const eventName = EVENT_MAP[propName];
        if (eventName && typeof handler === 'function') {
            element.addEventListener(eventName, handler as EventListener);
        }
    }

    return element;
}

/**
 * Shorthand for creating common elements
 */
export const div = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'div' });

export const span = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'span' });

export const button = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'button' });

export const input = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'input' }) as HTMLInputElement;

export const label = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'label' });

export const a = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'a' });

export const h1 = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'h1' });

export const h2 = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'h2' });

export const h3 = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'h3' });

export const p = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'p' });

export const ul = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'ul' });

export const li = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'li' });

export const form = (props: Omit<ElementProps, 'tag'> = {}) =>
    el({ ...props, tag: 'form' });
