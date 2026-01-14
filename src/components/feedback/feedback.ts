/**
 * Banda Feedback Components
 * 
 * Alert, Spinner, Toast, and Tooltip components for user feedback.
 */

import { el, div, span, button } from '../../core/element';
import { registerCleanup } from '../../core/mount';

// ============================================================================
// ALERT
// ============================================================================

/** Alert variant options */
export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

/** Alert props */
export interface AlertProps {
    /** Alert title */
    title?: string;
    /** Alert message */
    message: string;
    /** Alert variant */
    variant?: AlertVariant;
    /** Show close button */
    dismissible?: boolean;
    /** Close callback */
    onClose?: () => void;
    /** Additional class names */
    className?: string;
}

/** SVG icons for alert variants */
const ALERT_ICONS: Record<AlertVariant, string> = {
    info: '<svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 9v4M10 7h.01"/></svg>',
    success: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    warning: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>',
    danger: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
    neutral: '<svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
};

/**
 * Creates an Alert component.
 * 
 * @example
 * Alert({ message: 'Operation successful!', variant: 'success' })
 * Alert({ title: 'Warning', message: 'Check your input', variant: 'warning', dismissible: true })
 */
export function Alert(props: AlertProps): HTMLElement {
    const {
        title,
        message,
        variant = 'info',
        dismissible = false,
        onClose,
        className = '',
    } = props;

    const classes = ['banda-alert', `banda-alert--${variant}`, className]
        .filter(Boolean)
        .join(' ');

    const children: (HTMLElement | string)[] = [
        span({ className: 'banda-alert__icon', html: ALERT_ICONS[variant] }),
        div({
            className: 'banda-alert__content',
            children: [
                title ? div({ className: 'banda-alert__title', text: title }) : null,
                div({ className: 'banda-alert__message', text: message }),
            ].filter(Boolean) as HTMLElement[],
        }),
    ];

    if (dismissible) {
        children.push(
            button({
                className: 'banda-alert__close',
                attrs: { 'aria-label': 'Dismiss', type: 'button' },
                html: '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg>',
                onClick: () => onClose?.(),
            })
        );
    }

    return div({
        className: classes,
        attrs: { role: 'alert' },
        children,
    });
}

// ============================================================================
// SPINNER
// ============================================================================

/** Spinner size options */
export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

/** Spinner color options */
export type SpinnerColor = 'primary' | 'secondary' | 'neutral' | 'current';

/** Spinner props */
export interface SpinnerProps {
    /** Spinner size */
    size?: SpinnerSize;
    /** Spinner color */
    color?: SpinnerColor;
    /** Accessibility label */
    label?: string;
    /** Additional class names */
    className?: string;
}

/**
 * Creates a Spinner/Loader component.
 * 
 * @example
 * Spinner({ size: 'md' })
 * Spinner({ size: 'lg', color: 'primary' })
 */
export function Spinner(props: SpinnerProps = {}): HTMLElement {
    const { size = 'md', color = 'primary', label = 'Loading', className = '' } = props;

    const classes = [
        'banda-spinner',
        `banda-spinner--${size}`,
        color !== 'current' && `banda-spinner--${color}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return div({
        className: classes,
        attrs: {
            role: 'status',
            'aria-label': label,
        },
    });
}

// ============================================================================
// TOAST
// ============================================================================

/** Toast position */
export type ToastPosition =
    | 'top-right' | 'top-left' | 'top-center'
    | 'bottom-right' | 'bottom-left' | 'bottom-center';

/** Toast variant */
export type ToastVariant = 'info' | 'success' | 'warning' | 'danger';

/** Toast options */
export interface ToastOptions {
    /** Toast title */
    title?: string;
    /** Toast message */
    message: string;
    /** Toast variant */
    variant?: ToastVariant;
    /** Duration in ms (0 = no auto-close) */
    duration?: number;
    /** Show close button */
    closable?: boolean;
    /** Close callback */
    onClose?: () => void;
}

/** Toast state */
interface ToastState {
    container: HTMLElement | null;
    position: ToastPosition;
    toasts: Map<string, { element: HTMLElement; timeoutId?: ReturnType<typeof setTimeout> }>;
}

const toastState: ToastState = {
    container: null,
    position: 'top-right',
    toasts: new Map(),
};

/** Toast icons */
const TOAST_ICONS: Record<ToastVariant, string> = {
    info: '<svg viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M10 9v4M10 7h.01"/></svg>',
    success: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>',
    warning: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92z" clip-rule="evenodd"/></svg>',
    danger: '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>',
};

function getOrCreateToastContainer(): HTMLElement {
    if (toastState.container && document.body.contains(toastState.container)) {
        return toastState.container;
    }

    const container = div({
        className: `banda-toast-container banda-toast-container--${toastState.position}`,
    });
    document.body.appendChild(container);
    toastState.container = container;
    return container;
}

function removeToast(id: string): void {
    const toast = toastState.toasts.get(id);
    if (!toast) return;

    toast.element.classList.add('banda-toast--closing');

    setTimeout(() => {
        if (toast.timeoutId) clearTimeout(toast.timeoutId);
        toast.element.remove();
        toastState.toasts.delete(id);

        // Remove container if empty
        if (toastState.toasts.size === 0 && toastState.container) {
            toastState.container.remove();
            toastState.container = null;
        }
    }, 150);
}

/**
 * Shows a toast notification.
 * 
 * @example
 * toast({ message: 'File saved successfully', variant: 'success' })
 * toast({ title: 'Error', message: 'Something went wrong', variant: 'danger' })
 */
export function toast(options: ToastOptions): string {
    const {
        title,
        message,
        variant = 'info',
        duration = 5000,
        closable = true,
        onClose,
    } = options;

    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const container = getOrCreateToastContainer();

    const children: (HTMLElement | string)[] = [
        span({ className: 'banda-toast__icon', html: TOAST_ICONS[variant] }),
        div({
            className: 'banda-toast__content',
            children: [
                title ? div({ className: 'banda-toast__title', text: title }) : null,
                div({ className: 'banda-toast__message', text: message }),
            ].filter(Boolean) as HTMLElement[],
        }),
    ];

    if (closable) {
        children.push(
            button({
                className: 'banda-toast__close',
                attrs: { 'aria-label': 'Close', type: 'button' },
                html: '<svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/></svg>',
                onClick: () => {
                    removeToast(id);
                    onClose?.();
                },
            })
        );
    }

    const toastElement = div({
        className: `banda-toast banda-toast--${variant}`,
        attrs: { role: 'alert', 'aria-live': 'polite' },
        children,
    });

    container.appendChild(toastElement);

    const timeoutId = duration > 0
        ? setTimeout(() => {
            removeToast(id);
            onClose?.();
        }, duration)
        : undefined;

    toastState.toasts.set(id, { element: toastElement, timeoutId });

    return id;
}

/**
 * Dismiss a specific toast by ID.
 */
export function dismissToast(id: string): void {
    removeToast(id);
}

/**
 * Dismiss all toasts.
 */
export function dismissAllToasts(): void {
    for (const id of toastState.toasts.keys()) {
        removeToast(id);
    }
}

/**
 * Configure toast position.
 */
export function configureToast(options: { position?: ToastPosition }): void {
    if (options.position) {
        toastState.position = options.position;
        if (toastState.container) {
            toastState.container.className = `banda-toast-container banda-toast-container--${options.position}`;
        }
    }
}

// ============================================================================
// TOOLTIP
// ============================================================================

/** Tooltip position */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Tooltip props */
export interface TooltipProps {
    /** Tooltip content */
    content: string;
    /** Position */
    position?: TooltipPosition;
    /** The element to wrap */
    children: HTMLElement;
    /** Delay before showing (ms) */
    delay?: number;
}

/**
 * Creates a Tooltip wrapper.
 * 
 * @example
 * Tooltip({
 *   content: 'This is a tooltip',
 *   children: Button({ label: 'Hover me' }),
 * })
 */
export function Tooltip(props: TooltipProps): HTMLElement {
    const { content, position = 'top', children, delay = 200 } = props;

    const tooltip = div({
        className: `banda-tooltip banda-tooltip--${position}`,
        text: content,
        attrs: { role: 'tooltip' },
    });

    const wrapper = div({
        className: 'banda-tooltip-wrapper',
        children: [children, tooltip],
    });

    let showTimeout: ReturnType<typeof setTimeout> | null = null;

    const showTooltip = () => {
        showTimeout = setTimeout(() => {
            tooltip.classList.add('banda-tooltip--visible');
        }, delay);
    };

    const hideTooltip = () => {
        if (showTimeout) {
            clearTimeout(showTimeout);
            showTimeout = null;
        }
        tooltip.classList.remove('banda-tooltip--visible');
    };

    wrapper.addEventListener('mouseenter', showTooltip);
    wrapper.addEventListener('mouseleave', hideTooltip);
    wrapper.addEventListener('focus', showTooltip, true);
    wrapper.addEventListener('blur', hideTooltip, true);

    // Cleanup
    registerCleanup(wrapper, () => {
        if (showTimeout) clearTimeout(showTimeout);
    });

    return wrapper;
}

export default { Alert, Spinner, toast, Tooltip };
