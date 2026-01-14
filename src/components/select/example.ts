/**
 * Select Component Example
 */

import { div, h2, p } from '../../core/element';
import { Stack } from '../layout/layout';
import { Select } from './select';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return Stack({
        space: 4,
        children: [
            h2({ text: title, style: { marginBottom: '0' } }),
            ...children,
        ],
    });
}

export function SelectExamples(): HTMLElement {
    return Stack({
        space: 10,
        children: [
            // Basic Select
            Section('Basic Select', [
                div({
                    style: { maxWidth: '300px' },
                    children: [
                        Select({
                            options: [
                                { value: 'apple', label: 'Apple' },
                                { value: 'banana', label: 'Banana' },
                                { value: 'cherry', label: 'Cherry' },
                                { value: 'date', label: 'Date' },
                                { value: 'elderberry', label: 'Elderberry' },
                            ],
                            placeholder: 'Select a fruit',
                            onChange: (value) => console.log('Selected:', value),
                        }),
                    ],
                }),
            ]),

            // With Default Value
            Section('With Default Value', [
                div({
                    style: { maxWidth: '300px' },
                    children: [
                        Select({
                            options: [
                                { value: 'en', label: 'English' },
                                { value: 'es', label: 'Spanish' },
                                { value: 'fr', label: 'French' },
                                { value: 'de', label: 'German' },
                                { value: 'ja', label: 'Japanese' },
                            ],
                            value: 'en',
                            placeholder: 'Select language',
                        }),
                    ],
                }),
            ]),

            // Searchable
            Section('Searchable Select', [
                div({
                    style: { maxWidth: '300px' },
                    children: [
                        Select({
                            options: [
                                { value: 'us', label: 'United States' },
                                { value: 'uk', label: 'United Kingdom' },
                                { value: 'ca', label: 'Canada' },
                                { value: 'au', label: 'Australia' },
                                { value: 'de', label: 'Germany' },
                                { value: 'fr', label: 'France' },
                                { value: 'jp', label: 'Japan' },
                                { value: 'cn', label: 'China' },
                                { value: 'in', label: 'India' },
                                { value: 'br', label: 'Brazil' },
                            ],
                            placeholder: 'Select country',
                            searchable: true,
                            searchPlaceholder: 'Search countries...',
                        }),
                    ],
                }),
            ]),

            // With Groups
            Section('Grouped Options', [
                div({
                    style: { maxWidth: '300px' },
                    children: [
                        Select({
                            options: [
                                {
                                    label: 'Fruits',
                                    options: [
                                        { value: 'apple', label: 'Apple' },
                                        { value: 'banana', label: 'Banana' },
                                        { value: 'cherry', label: 'Cherry' },
                                    ],
                                },
                                {
                                    label: 'Vegetables',
                                    options: [
                                        { value: 'carrot', label: 'Carrot' },
                                        { value: 'broccoli', label: 'Broccoli' },
                                        { value: 'spinach', label: 'Spinach' },
                                    ],
                                },
                            ],
                            placeholder: 'Select food',
                        }),
                    ],
                }),
            ]),

            // Different Sizes
            Section('Select Sizes', [
                Stack({
                    space: 4,
                    children: [
                        div({
                            style: { maxWidth: '300px' },
                            children: [
                                p({ text: 'Small:', style: { marginBottom: 'var(--banda-space-1)' } }),
                                Select({
                                    size: 'sm',
                                    options: [
                                        { value: '1', label: 'Option 1' },
                                        { value: '2', label: 'Option 2' },
                                    ],
                                    placeholder: 'Small select',
                                }),
                            ],
                        }),
                        div({
                            style: { maxWidth: '300px' },
                            children: [
                                p({ text: 'Medium (default):', style: { marginBottom: 'var(--banda-space-1)' } }),
                                Select({
                                    size: 'md',
                                    options: [
                                        { value: '1', label: 'Option 1' },
                                        { value: '2', label: 'Option 2' },
                                    ],
                                    placeholder: 'Medium select',
                                }),
                            ],
                        }),
                        div({
                            style: { maxWidth: '300px' },
                            children: [
                                p({ text: 'Large:', style: { marginBottom: 'var(--banda-space-1)' } }),
                                Select({
                                    size: 'lg',
                                    options: [
                                        { value: '1', label: 'Option 1' },
                                        { value: '2', label: 'Option 2' },
                                    ],
                                    placeholder: 'Large select',
                                }),
                            ],
                        }),
                    ],
                }),
            ]),

            // With Disabled Option
            Section('With Disabled Option', [
                div({
                    style: { maxWidth: '300px' },
                    children: [
                        Select({
                            options: [
                                { value: 'active', label: 'Active Item' },
                                { value: 'disabled', label: 'Disabled Item', disabled: true },
                                { value: 'another', label: 'Another Item' },
                            ],
                            placeholder: 'Select an item',
                        }),
                    ],
                }),
            ]),

            // Disabled Select
            Section('Disabled Select', [
                div({
                    style: { maxWidth: '300px' },
                    children: [
                        Select({
                            options: [
                                { value: '1', label: 'Option 1' },
                            ],
                            value: '1',
                            disabled: true,
                        }),
                    ],
                }),
            ]),
        ],
    });
}

export default SelectExamples;
