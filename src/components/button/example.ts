/**
 * Button Component Example
 * 
 * Demonstrates various Button configurations.
 */

import { el, div, h2, p } from '../../core/element';
import { Button, ButtonGroup } from './button';

/** Creates a section with title and content */
function Section(title: string, children: HTMLElement[]): HTMLElement {
    return div({
        className: 'example-section',
        style: { marginBottom: '2rem' },
        children: [
            h2({ text: title, style: { marginBottom: '1rem' } }),
            div({
                className: 'banda-flex',
                style: { gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' },
                children
            }),
        ],
    });
}

/**
 * Creates a complete Button examples showcase.
 */
export function ButtonExamples(): HTMLElement {
    return div({
        children: [
            // Variants
            Section('Button Variants', [
                Button({ label: 'Primary', variant: 'primary' }),
                Button({ label: 'Secondary', variant: 'secondary' }),
                Button({ label: 'Ghost', variant: 'ghost' }),
                Button({ label: 'Danger', variant: 'danger' }),
                Button({ label: 'Outline', variant: 'outline' }),
            ]),

            // Sizes
            Section('Button Sizes', [
                Button({ label: 'Small', variant: 'primary', size: 'sm' }),
                Button({ label: 'Medium', variant: 'primary', size: 'md' }),
                Button({ label: 'Large', variant: 'primary', size: 'lg' }),
                Button({ label: 'Extra Large', variant: 'primary', size: 'xl' }),
            ]),

            // States
            Section('Button States', [
                Button({ label: 'Disabled', variant: 'primary', disabled: true }),
                Button({ label: 'Loading', variant: 'primary', loading: true }),
                Button({ label: 'Disabled Secondary', variant: 'secondary', disabled: true }),
            ]),

            // Full Width
            Section('Full Width', [
                div({
                    style: { width: '100%' },
                    children: [
                        Button({ label: 'Full Width Button', variant: 'primary', fullWidth: true }),
                    ],
                }),
            ]),

            // Button Group
            Section('Button Group', [
                ButtonGroup([
                    Button({ label: 'Left', variant: 'secondary' }),
                    Button({ label: 'Center', variant: 'secondary' }),
                    Button({ label: 'Right', variant: 'secondary' }),
                ]),
            ]),

            // With Click Handler
            Section('Interactive', [
                Button({
                    label: 'Click Me!',
                    variant: 'primary',
                    onClick: () => alert('Button clicked!'),
                }),
            ]),
        ],
    });
}

export default ButtonExamples;
