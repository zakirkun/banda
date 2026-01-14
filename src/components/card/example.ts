/**
 * Card Component Example
 */

import { div, h2, p } from '../../core/element';
import { Card, CardHeader, CardBody, CardFooter } from './card';
import { Button } from '../button/button';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return div({
        style: { marginBottom: '2rem' },
        children: [
            h2({ text: title, style: { marginBottom: '1rem' } }),
            div({
                className: 'banda-grid-cols-3',
                style: { gap: '1.5rem' },
                children,
            }),
        ],
    });
}

export function CardExamples(): HTMLElement {
    return div({
        children: [
            // Card Variants
            Section('Card Variants', [
                Card({
                    variant: 'default',
                    children: [
                        CardHeader({ title: 'Default Card' }),
                        CardBody({
                            children: [p({ text: 'This is a default card with subtle border.' })],
                        }),
                    ],
                }),
                Card({
                    variant: 'elevated',
                    children: [
                        CardHeader({ title: 'Elevated Card' }),
                        CardBody({
                            children: [p({ text: 'This card has a prominent shadow.' })],
                        }),
                    ],
                }),
                Card({
                    variant: 'outlined',
                    children: [
                        CardHeader({ title: 'Outlined Card' }),
                        CardBody({
                            children: [p({ text: 'This card has only a border.' })],
                        }),
                    ],
                }),
            ]),

            // Card with Header Actions
            Section('Card with Actions', [
                Card({
                    variant: 'elevated',
                    children: [
                        CardHeader({
                            title: 'Settings',
                            subtitle: 'Manage your preferences',
                            actions: [
                                Button({ label: 'Edit', variant: 'ghost', size: 'sm' }),
                            ],
                        }),
                        CardBody({
                            children: [
                                p({ text: 'Configure your account settings and preferences here.' }),
                            ],
                        }),
                        CardFooter({
                            children: [
                                Button({ label: 'Cancel', variant: 'ghost' }),
                                Button({ label: 'Save', variant: 'primary' }),
                            ],
                        }),
                    ],
                }),
                Card({
                    variant: 'elevated',
                    children: [
                        CardHeader({ title: 'Notifications', subtitle: '3 unread messages' }),
                        CardBody({
                            children: [
                                p({ text: 'You have new notifications waiting for your attention.' }),
                            ],
                        }),
                        CardFooter({
                            align: 'between',
                            children: [
                                Button({ label: 'Dismiss All', variant: 'ghost' }),
                                Button({ label: 'View All', variant: 'primary' }),
                            ],
                        }),
                    ],
                }),
                Card({
                    variant: 'default',
                    interactive: true,
                    onClick: () => alert('Card clicked!'),
                    children: [
                        CardHeader({ title: 'Interactive Card' }),
                        CardBody({
                            children: [p({ text: 'Click anywhere on this card!' })],
                        }),
                    ],
                }),
            ]),
        ],
    });
}

export default CardExamples;
