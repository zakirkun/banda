/**
 * Banda Input Component
 * 
 * A flexible text input component with labels, validation, and addons.
 */

import { el, div, input as inputEl, label as labelEl, span } from '../../core/element';
import type { ElementEvents } from '../../core/element';
import { createState, type State } from '../../core/state';

/** Input type options */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

/** Input size options */
export type InputSize = 'sm' | 'md' | 'lg';

/** Input validation state */
export type InputState = 'default' | 'error' | 'success';

/** Input props interface */
export interface InputProps extends ElementEvents {
    /** Input name attribute */
    name?: string;
    /** Input type */
    type?: InputType;
    /** Input placeholder */
    placeholder?: string;
    /** Input value */
    value?: string;
    /** Input size */
    size?: InputSize;
    /** Validation state */
    state?: InputState;
    /** Whether input is disabled */
    disabled?: boolean;
    /** Whether input is required */
    required?: boolean;
    /** Whether input is read-only */
    readonly?: boolean;
    /** Label text */
    label?: string;
    /** Helper text below input */
    helperText?: string;
    /** Error message (overrides helperText when state is error) */
    errorMessage?: string;
    /** Prefix text/element */
    prefix?: string | HTMLElement;
    /** Suffix text/element */
    suffix?: string | HTMLElement;
    /** Left icon element */
    leftIcon?: HTMLElement;
    /** Right icon element */
    rightIcon?: HTMLElement;
    /** Auto-focus on mount */
    autoFocus?: boolean;
    /** Maximum length */
    maxLength?: number;
    /** Pattern for validation */
    pattern?: string;
    /** ARIA label */
    ariaLabel?: string;
    /** Additional class names */
    className?: string;
}

/**
 * Creates an Input component.
 * 
 * @example
 * // Basic input
 * Input({ placeholder: 'Enter your name' })
 * 
 * // With label and validation
 * Input({
 *   label: 'Email',
 *   type: 'email',
 *   required: true,
 *   state: 'error',
 *   errorMessage: 'Please enter a valid email',
 * })
 */
export function Input(props: InputProps = {}): HTMLElement {
    const {
        name,
        type = 'text',
        placeholder,
        value = '',
        size = 'md',
        state = 'default',
        disabled = false,
        required = false,
        readonly = false,
        label,
        helperText,
        errorMessage,
        prefix,
        suffix,
        leftIcon,
        rightIcon,
        autoFocus = false,
        maxLength,
        pattern,
        ariaLabel,
        className = '',
        onInput,
        onChange,
        onFocus,
        onBlur,
        onKeyDown,
    } = props;

    const inputId = `banda-input-${Math.random().toString(36).slice(2, 9)}`;

    // Build container classes
    const containerClasses = [
        'banda-input-container',
        size !== 'md' && `banda-input-container--${size}`,
        state !== 'default' && `banda-input-container--${state}`,
        disabled && 'banda-input-container--disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // Build input attributes
    const inputAttrs: Record<string, string | boolean | number> = {
        type,
        id: inputId,
        'aria-label': ariaLabel || label || placeholder || '',
    };

    if (name) inputAttrs.name = name;
    if (placeholder) inputAttrs.placeholder = placeholder;
    if (value) inputAttrs.value = value;
    if (disabled) inputAttrs.disabled = true;
    if (required) inputAttrs.required = true;
    if (readonly) inputAttrs.readonly = true;
    if (autoFocus) inputAttrs.autofocus = true;
    if (maxLength) inputAttrs.maxlength = maxLength;
    if (pattern) inputAttrs.pattern = pattern;
    if (state === 'error') inputAttrs['aria-invalid'] = true;

    // Build content
    const containerChildren: (HTMLElement | string)[] = [];

    // Prefix
    if (prefix) {
        containerChildren.push(
            typeof prefix === 'string'
                ? span({ className: 'banda-input-prefix', text: prefix })
                : el({ tag: 'div', className: 'banda-input-prefix', children: [prefix] })
        );
    }

    // Left icon
    if (leftIcon) {
        containerChildren.push(
            div({ className: 'banda-input-icon banda-input-icon--left', children: [leftIcon] })
        );
    }

    // Input element
    containerChildren.push(
        inputEl({
            className: 'banda-input',
            attrs: inputAttrs,
            onInput,
            onChange,
            onFocus,
            onBlur,
            onKeyDown,
        })
    );

    // Right icon
    if (rightIcon) {
        containerChildren.push(
            div({ className: 'banda-input-icon banda-input-icon--right', children: [rightIcon] })
        );
    }

    // Suffix
    if (suffix) {
        containerChildren.push(
            typeof suffix === 'string'
                ? span({ className: 'banda-input-suffix', text: suffix })
                : el({ tag: 'div', className: 'banda-input-suffix', children: [suffix] })
        );
    }

    // Input container
    const inputContainer = div({
        className: containerClasses,
        children: containerChildren,
    });

    // If no label or helper, just return the input container
    if (!label && !helperText && !errorMessage) {
        return inputContainer;
    }

    // Full wrapper with label and helper
    const wrapperChildren: (HTMLElement | string)[] = [];

    // Label
    if (label) {
        const labelClasses = [
            'banda-input-label',
            required && 'banda-input-label--required',
        ]
            .filter(Boolean)
            .join(' ');

        wrapperChildren.push(
            labelEl({
                className: labelClasses,
                text: label,
                attrs: { for: inputId },
            })
        );
    }

    // Input container
    wrapperChildren.push(inputContainer);

    // Helper or error text
    const displayHelper = state === 'error' && errorMessage ? errorMessage : helperText;
    if (displayHelper) {
        const helperClasses = [
            'banda-input-helper',
            state === 'error' && 'banda-input-helper--error',
            state === 'success' && 'banda-input-helper--success',
        ]
            .filter(Boolean)
            .join(' ');

        wrapperChildren.push(span({ className: helperClasses, text: displayHelper }));
    }

    return div({
        className: 'banda-input-wrapper',
        children: wrapperChildren,
    });
}

/**
 * Creates a controlled Input with reactive state.
 */
export function createControlledInput(
    props: InputProps = {}
): { element: HTMLElement; state: State<string> } {
    const state = createState(props.value || '');

    const element = Input({
        ...props,
        onInput: (e) => {
            const value = (e.target as HTMLInputElement).value;
            state.set(value);
            props.onInput?.(e);
        },
    });

    return { element, state };
}

/**
 * Creates a Textarea component.
 */
export function Textarea(props: {
    name?: string;
    placeholder?: string;
    value?: string;
    rows?: number;
    disabled?: boolean;
    state?: InputState;
    label?: string;
    helperText?: string;
    className?: string;
} & ElementEvents = {}): HTMLElement {
    const {
        name,
        placeholder,
        value = '',
        rows = 4,
        disabled = false,
        state = 'default',
        label,
        helperText,
        className = '',
        onInput,
        onChange,
        onFocus,
        onBlur,
    } = props;

    const textareaId = `banda-textarea-${Math.random().toString(36).slice(2, 9)}`;

    const textareaClasses = [
        'banda-textarea',
        state === 'error' && 'banda-textarea--error',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const attrs: Record<string, string | boolean | number> = { id: textareaId, rows };
    if (name) attrs.name = name;
    if (placeholder) attrs.placeholder = placeholder;
    if (disabled) attrs.disabled = true;

    const textarea = el({
        tag: 'textarea',
        className: textareaClasses,
        text: value,
        attrs,
        onInput,
        onChange,
        onFocus,
        onBlur,
    });

    if (!label && !helperText) {
        return textarea;
    }

    const children: (HTMLElement | string)[] = [];
    if (label) {
        children.push(labelEl({ className: 'banda-input-label', text: label, attrs: { for: textareaId } }));
    }
    children.push(textarea);
    if (helperText) {
        children.push(span({ className: 'banda-input-helper', text: helperText }));
    }

    return div({ className: 'banda-input-wrapper', children });
}

export default Input;
