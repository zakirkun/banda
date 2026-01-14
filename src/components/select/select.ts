/**
 * Banda Select Component
 * 
 * Dropdown select component with search and keyboard support.
 */

import { el, div, button, span, input } from '../../core/element';
import { onClickOutside, onKey, Keys } from '../../core/events';
import { registerCleanup } from '../../core/mount';
import { createState } from '../../core/state';

/** Select option */
export interface SelectOption {
    /** Option value */
    value: string;
    /** Option label */
    label: string;
    /** Whether option is disabled */
    disabled?: boolean;
}

/** Select option group */
export interface SelectOptionGroup {
    /** Group label */
    label: string;
    /** Options in group */
    options: SelectOption[];
}

/** Select size */
export type SelectSize = 'sm' | 'md' | 'lg';

/** Select props */
export interface SelectProps {
    /** Options */
    options: (SelectOption | SelectOptionGroup)[];
    /** Currently selected value */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Select size */
    size?: SelectSize;
    /** Whether select is disabled */
    disabled?: boolean;
    /** Enable search */
    searchable?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** No results text */
    emptyText?: string;
    /** Name attribute (for forms) */
    name?: string;
    /** Change callback */
    onChange?: (value: string) => void;
    /** Additional class names */
    className?: string;
}

/** Check if item is a group */
function isOptionGroup(item: SelectOption | SelectOptionGroup): item is SelectOptionGroup {
    return 'options' in item;
}

/** Flatten options from groups */
function flattenOptions(options: (SelectOption | SelectOptionGroup)[]): SelectOption[] {
    const result: SelectOption[] = [];
    for (const item of options) {
        if (isOptionGroup(item)) {
            result.push(...item.options);
        } else {
            result.push(item);
        }
    }
    return result;
}

/** Chevron down icon */
const CHEVRON_ICON = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';
const CHECK_ICON = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';

/**
 * Creates a Select component.
 * 
 * @example
 * Select({
 *   options: [
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *     { value: 'cherry', label: 'Cherry' },
 *   ],
 *   placeholder: 'Select a fruit',
 *   onChange: (value) => console.log('Selected:', value),
 * })
 */
export function Select(props: SelectProps): HTMLElement {
    const {
        options,
        value: initialValue = '',
        placeholder = 'Select...',
        size = 'md',
        disabled = false,
        searchable = false,
        searchPlaceholder = 'Search...',
        emptyText = 'No results found',
        name,
        onChange,
        className = '',
    } = props;

    const isOpen = createState(false);
    const selectedValue = createState(initialValue);
    const searchQuery = createState('');
    const focusedIndex = createState(-1);

    const allOptions = flattenOptions(options);

    const getSelectedOption = () =>
        allOptions.find(opt => opt.value === selectedValue.get());

    // Build classes
    const selectClasses = [
        'banda-select',
        size !== 'md' && `banda-select--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // Create trigger button
    const selectedOption = getSelectedOption();
    const triggerContent = selectedOption
        ? span({ className: 'banda-select__value', text: selectedOption.label })
        : span({ className: 'banda-select__value banda-select__placeholder', text: placeholder });

    const trigger = button({
        className: 'banda-select__trigger',
        attrs: {
            type: 'button',
            'aria-haspopup': 'listbox',
            'aria-expanded': isOpen.get(),
            disabled,
        },
        children: [
            triggerContent,
            span({ className: 'banda-select__icon', html: CHEVRON_ICON }),
        ],
        onClick: () => {
            if (disabled) return;
            isOpen.set(!isOpen.get());
            updateUI();
        },
    });

    // Filter options based on search
    function getFilteredOptions(): (SelectOption | SelectOptionGroup)[] {
        const query = searchQuery.get().toLowerCase();
        if (!query) return options;

        return options.reduce<(SelectOption | SelectOptionGroup)[]>((acc, item) => {
            if (isOptionGroup(item)) {
                const filteredOpts = item.options.filter(opt =>
                    opt.label.toLowerCase().includes(query)
                );
                if (filteredOpts.length > 0) {
                    acc.push({ ...item, options: filteredOpts });
                }
            } else if (item.label.toLowerCase().includes(query)) {
                acc.push(item);
            }
            return acc;
        }, []);
    }

    // Create option element
    function createOptionElement(option: SelectOption): HTMLElement {
        const isSelected = option.value === selectedValue.get();
        const optClasses = [
            'banda-select__option',
            isSelected && 'banda-select__option--selected',
            option.disabled && 'banda-select__option--disabled',
        ]
            .filter(Boolean)
            .join(' ');

        return button({
            className: optClasses,
            attrs: {
                type: 'button',
                role: 'option',
                'aria-selected': isSelected,
                'data-value': option.value,
            },
            children: [
                span({ className: 'banda-select__option-check', html: CHECK_ICON }),
                option.label,
            ],
            onClick: () => {
                if (option.disabled) return;
                selectedValue.set(option.value);
                isOpen.set(false);
                onChange?.(option.value);
                updateUI();
            },
        });
    }

    // Build dropdown
    function buildDropdown(): HTMLElement[] {
        const filtered = getFilteredOptions();
        const elements: HTMLElement[] = [];

        if (searchable) {
            const searchInput = input({
                className: 'banda-select__search-input',
                attrs: {
                    type: 'text',
                    placeholder: searchPlaceholder,
                },
                onInput: (e) => {
                    searchQuery.set((e.target as HTMLInputElement).value);
                    updateOptions();
                },
            });
            elements.push(div({ className: 'banda-select__search', children: [searchInput] }));
        }

        const optionsContainer = div({ className: 'banda-select__options' });

        if (filtered.length === 0) {
            optionsContainer.appendChild(div({ className: 'banda-select__empty', text: emptyText }));
        } else {
            for (const item of filtered) {
                if (isOptionGroup(item)) {
                    optionsContainer.appendChild(
                        div({ className: 'banda-select__group-label', text: item.label })
                    );
                    for (const opt of item.options) {
                        optionsContainer.appendChild(createOptionElement(opt));
                    }
                } else {
                    optionsContainer.appendChild(createOptionElement(item));
                }
            }
        }

        elements.push(optionsContainer);
        return elements;
    }

    const dropdown = div({
        className: 'banda-select__dropdown',
        attrs: { role: 'listbox' },
        children: buildDropdown(),
    });

    function updateOptions() {
        const optionsContainer = dropdown.querySelector('.banda-select__options');
        if (!optionsContainer) return;

        // Clear and rebuild
        optionsContainer.innerHTML = '';
        const filtered = getFilteredOptions();

        if (filtered.length === 0) {
            optionsContainer.appendChild(div({ className: 'banda-select__empty', text: emptyText }));
        } else {
            for (const item of filtered) {
                if (isOptionGroup(item)) {
                    optionsContainer.appendChild(
                        div({ className: 'banda-select__group-label', text: item.label })
                    );
                    for (const opt of item.options) {
                        optionsContainer.appendChild(createOptionElement(opt));
                    }
                } else {
                    optionsContainer.appendChild(createOptionElement(item));
                }
            }
        }
    }

    function updateUI() {
        const open = isOpen.get();
        trigger.classList.toggle('banda-select__trigger--open', open);
        trigger.setAttribute('aria-expanded', String(open));
        dropdown.classList.toggle('banda-select__dropdown--open', open);

        // Update trigger text
        const option = getSelectedOption();
        const valueSpan = trigger.querySelector('.banda-select__value') as HTMLElement;
        if (valueSpan) {
            if (option) {
                valueSpan.textContent = option.label;
                valueSpan.classList.remove('banda-select__placeholder');
            } else {
                valueSpan.textContent = placeholder;
                valueSpan.classList.add('banda-select__placeholder');
            }
        }

        // Focus search input when opened
        if (open && searchable) {
            setTimeout(() => {
                const searchInput = dropdown.querySelector('.banda-select__search-input') as HTMLInputElement;
                searchInput?.focus();
            }, 50);
        }
    }

    // Build container
    const container = div({
        className: selectClasses,
        children: [trigger, dropdown],
    });

    // Click outside to close
    const cleanupClickOutside = onClickOutside(container, () => {
        if (isOpen.get()) {
            isOpen.set(false);
            updateUI();
        }
    });

    // Keyboard navigation
    container.addEventListener('keydown', onKey({
        [Keys.ESCAPE]: () => {
            isOpen.set(false);
            updateUI();
            trigger.focus();
        },
        [Keys.ARROW_DOWN]: () => {
            if (!isOpen.get()) {
                isOpen.set(true);
                updateUI();
            }
        },
        [Keys.ARROW_UP]: () => {
            if (!isOpen.get()) {
                isOpen.set(true);
                updateUI();
            }
        },
    }));

    // Cleanup
    registerCleanup(container, cleanupClickOutside);

    // Hidden input for form submission
    if (name) {
        const hiddenInput = input({
            attrs: { type: 'hidden', name, value: selectedValue.get() },
        });
        container.appendChild(hiddenInput);

        selectedValue.subscribe((val) => {
            hiddenInput.setAttribute('value', val);
        });
    }

    return container;
}

export default Select;
