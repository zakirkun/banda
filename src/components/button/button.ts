/**
 * Banda Button Component
 * 
 * A versatile button component with multiple variants, sizes, and states.
 */

import { el, button as btnEl } from '../../core/element';
import type { ElementEvents } from '../../core/element';

/** Button variant options */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';

/** Button size options */
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/** Button props interface */
export interface ButtonProps extends ElementEvents {
    /** Button text label */
    label?: string;
    /** Button variant style */
    variant?: ButtonVariant;
    /** Optional icon element */
    icon?: HTMLElement;
    /** Button size */
    size?: ButtonSize;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Show loading spinner */
    loading?: boolean;
    /** Full width button */
    fullWidth?: boolean;
    /** Icon-only button (square aspect) */
    iconOnly?: boolean;
    /** Button type attribute */
    type?: 'button' | 'submit' | 'reset';
    /** ARIA label for accessibility */
    ariaLabel?: string;
    /** Child elements (e.g., icons) */
    children?: (HTMLElement | string)[];
    /** Additional CSS class names */
    className?: string;
}

/**
 * Creates a Button component.
 * 
 * @example
 * // Primary button
 * Button({ label: 'Submit', variant: 'primary' })
 * 
 * // Secondary with icon
 * Button({ 
 *   label: 'Download',
 *   variant: 'secondary',
 *   children: [DownloadIcon()]
 * })
 * 
 * // Loading state
 * Button({ label: 'Saving...', loading: true })
 */
export function Button(props: ButtonProps = {}): HTMLButtonElement {
    const {
        label,
        variant = 'primary',
        size = 'md',
        disabled = false,
        loading = false,
        fullWidth = false,
        iconOnly = false,
        type = 'button',
        ariaLabel,
        icon,
        children = [],
        className = '',
        onClick,
        onKeyDown,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
    } = props;

    // Build class name
    const classes = [
        'banda-button',
        `banda-button--${variant}`,
        size !== 'md' && `banda-button--${size}`,
        disabled && 'banda-button--disabled',
        loading && 'banda-button--loading',
        fullWidth && 'banda-button--full',
        iconOnly && 'banda-button--icon',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // Build children array
    const content: (HTMLElement | string)[] = [...children];

    if (icon) {
        content.unshift(icon);
    }

    if (label && !iconOnly) {
        content.push(label);
    }

    return btnEl({
        className: classes,
        children: content,
        attrs: {
            type,
            disabled: disabled || loading,
            'aria-label': ariaLabel || (iconOnly ? label : undefined) || '',
            'aria-busy': loading,
            'aria-disabled': disabled || loading,
        },
        onClick,
        onKeyDown,
        onFocus,
        onBlur,
        onMouseEnter,
        onMouseLeave,
    });
}

/**
 * Creates a Button Group container.
 * 
 * @example
 * ButtonGroup([
 *   Button({ label: 'Left', variant: 'secondary' }),
 *   Button({ label: 'Center', variant: 'secondary' }),
 *   Button({ label: 'Right', variant: 'secondary' }),
 * ])
 */
export function ButtonGroup(buttons: HTMLButtonElement[]): HTMLElement {
    return el({
        tag: 'div',
        className: 'banda-button-group',
        attrs: { role: 'group' },
        children: buttons,
    });
}

export default Button;
