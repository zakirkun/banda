/**
 * Banda Color Picker Component
 * 
 * A color selection component with presets and custom input.
 */

import { div, input as inputEl, span, label as labelEl } from '../../core/element';
import { onClickOutside, onEscape } from '../../core/events';
import type { ElementEvents } from '../../core/element';

/** Color picker props */
export interface ColorPickerProps {
    /** Current color value (hex) */
    value?: string;
    /** Label text */
    label?: string;
    /** Preset colors */
    presets?: string[];
    /** Show alpha slider */
    showAlpha?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Size */
    size?: 'sm' | 'md' | 'lg';
    /** Called when color changes */
    onChange?: (color: string) => void;
    /** Additional CSS class */
    className?: string;
}

const defaultPresets = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#000000', '#374151', '#6b7280', '#9ca3af', '#d1d5db',
    '#ffffff',
];

/**
 * Creates a Color Picker component.
 */
export function ColorPicker(props: ColorPickerProps = {}): HTMLElement {
    const {
        value = '#3b82f6',
        label,
        presets = defaultPresets,
        disabled = false,
        size = 'md',
        onChange,
        className = '',
    } = props;

    let currentColor = value;
    let isOpen = false;

    // Color preview/trigger
    const preview = div({
        className: `banda-color-picker__preview banda-color-picker__preview--${size}`,
        attrs: {
            tabindex: disabled ? '-1' : '0',
            role: 'button',
            'aria-label': 'Select color',
        },
    });
    preview.style.backgroundColor = currentColor;

    // Hidden native input for hex
    const hexInput = inputEl({
        className: 'banda-color-picker__hex-input',
        attrs: {
            type: 'text',
            maxlength: '7',
            placeholder: '#000000',
            value: currentColor,
        },
    }) as HTMLInputElement;

    // Native color input (hidden, used for picker)
    const nativeInput = inputEl({
        className: 'banda-color-picker__native',
        attrs: {
            type: 'color',
            value: currentColor,
        },
    }) as HTMLInputElement;

    // Preset swatches
    const swatches = div({
        className: 'banda-color-picker__swatches',
        children: presets.map(color => {
            const swatch = div({
                className: 'banda-color-picker__swatch',
                attrs: {
                    tabindex: '0',
                    role: 'button',
                    'aria-label': `Select ${color}`,
                },
            });
            swatch.style.backgroundColor = color;

            swatch.addEventListener('click', () => {
                setColor(color);
            });

            swatch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setColor(color);
                }
            });

            return swatch;
        }),
    });

    // Dropdown panel
    const dropdown = div({
        className: 'banda-color-picker__dropdown',
        children: [
            div({
                className: 'banda-color-picker__section',
                children: [
                    span({ text: 'Presets', className: 'banda-color-picker__section-title' }),
                    swatches,
                ],
            }),
            div({
                className: 'banda-color-picker__section',
                children: [
                    span({ text: 'Custom', className: 'banda-color-picker__section-title' }),
                    div({
                        className: 'banda-color-picker__custom',
                        children: [nativeInput, hexInput],
                    }),
                ],
            }),
        ],
    });

    // Set color helper
    const setColor = (color: string) => {
        currentColor = color;
        preview.style.backgroundColor = color;
        hexInput.value = color;
        nativeInput.value = color;
        onChange?.(color);
    };

    // Event handlers
    nativeInput.addEventListener('input', () => {
        setColor(nativeInput.value);
    });

    hexInput.addEventListener('input', () => {
        const val = hexInput.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            setColor(val);
        }
    });

    hexInput.addEventListener('blur', () => {
        hexInput.value = currentColor;
    });

    // Toggle dropdown
    const toggle = () => {
        if (disabled) return;
        isOpen = !isOpen;
        dropdown.classList.toggle('banda-color-picker__dropdown--open', isOpen);
    };

    const close = () => {
        isOpen = false;
        dropdown.classList.remove('banda-color-picker__dropdown--open');
    };

    preview.addEventListener('click', toggle);
    preview.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });

    // Container
    const container = div({
        className: `banda-color-picker ${disabled ? 'banda-color-picker--disabled' : ''} ${className}`.trim(),
        children: label
            ? [
                labelEl({
                    className: 'banda-color-picker__label',
                    children: [span({ text: label })],
                }),
                div({
                    className: 'banda-color-picker__wrapper',
                    children: [preview, dropdown],
                }),
            ]
            : [
                div({
                    className: 'banda-color-picker__wrapper',
                    children: [preview, dropdown],
                }),
            ],
    });

    // Click outside to close
    onClickOutside(container, close);
    onEscape(close);

    // Expose methods
    (container as any).getValue = () => currentColor;
    (container as any).setValue = (color: string) => setColor(color);

    return container;
}

export default ColorPicker;
