/**
 * Layout Components Example
 */

import { div, h2, p, span } from '../../core/element';
import { Stack, Inline, Grid, Divider, Spacer, Center, Container } from './layout';
import { Card, CardHeader, CardBody } from '../card/card';
import { Button } from '../button/button';
import { Badge } from '../badge/badge';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return Stack({
        space: 4,
        children: [
            h2({ text: title, style: { marginBottom: '0' } }),
            ...children,
        ],
    });
}

function Box(content: string, color: string = 'var(--banda-color-primary-100)'): HTMLElement {
    return div({
        style: {
            padding: 'var(--banda-space-4)',
            backgroundColor: color,
            borderRadius: 'var(--banda-radius-md)',
            textAlign: 'center',
            fontWeight: '500',
        },
        text: content,
    });
}

export function LayoutExamples(): HTMLElement {
    return Stack({
        space: 10,
        children: [
            // Stack Examples
            Section('Stack (Vertical Layout)', [
                p({ text: 'Use Stack for vertical layouts with consistent spacing.' }),

                div({
                    style: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
                    children: [
                        Card({
                            children: [
                                CardHeader({ title: 'Stack space=2' }),
                                CardBody({
                                    children: [
                                        Stack({
                                            space: 2,
                                            children: [Box('Item 1'), Box('Item 2'), Box('Item 3')],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        Card({
                            children: [
                                CardHeader({ title: 'Stack space=4' }),
                                CardBody({
                                    children: [
                                        Stack({
                                            space: 4,
                                            children: [Box('Item 1'), Box('Item 2'), Box('Item 3')],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        Card({
                            children: [
                                CardHeader({ title: 'Stack space=6' }),
                                CardBody({
                                    children: [
                                        Stack({
                                            space: 6,
                                            children: [Box('Item 1'), Box('Item 2'), Box('Item 3')],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ]),

            Divider({ space: 2 }),

            // Inline Examples
            Section('Inline (Horizontal Layout)', [
                p({ text: 'Use Inline for horizontal layouts with wrapping support.' }),

                Stack({
                    space: 4,
                    children: [
                        div({
                            children: [
                                span({ text: 'space=2, align=center:', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                                Inline({
                                    space: 2,
                                    align: 'center',
                                    children: [
                                        Button({ label: 'Action 1', variant: 'primary' }),
                                        Button({ label: 'Action 2', variant: 'secondary' }),
                                        Button({ label: 'Action 3', variant: 'ghost' }),
                                    ],
                                }),
                            ],
                        }),
                        div({
                            children: [
                                span({ text: 'justify=between:', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                                Inline({
                                    space: 2,
                                    justify: 'between',
                                    align: 'center',
                                    children: [
                                        span({ text: 'Left Content' }),
                                        Spacer(),
                                        Button({ label: 'Right Button', variant: 'primary' }),
                                    ],
                                }),
                            ],
                        }),
                        div({
                            children: [
                                span({ text: 'Wrapping tags:', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                                Inline({
                                    space: 2,
                                    children: [
                                        Badge({ label: 'React', variant: 'primary' }),
                                        Badge({ label: 'TypeScript', variant: 'primary' }),
                                        Badge({ label: 'Banda', variant: 'secondary' }),
                                        Badge({ label: 'CSS', variant: 'success' }),
                                        Badge({ label: 'HTML', variant: 'warning' }),
                                        Badge({ label: 'Design', variant: 'danger' }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ]),

            Divider({ space: 2 }),

            // Grid Examples
            Section('Grid Layout', [
                p({ text: 'Use Grid for multi-column layouts.' }),

                Stack({
                    space: 6,
                    children: [
                        div({
                            children: [
                                span({ text: '3 Columns:', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                                Grid({
                                    cols: 3,
                                    gap: 4,
                                    children: [
                                        Box('1'), Box('2'), Box('3'),
                                        Box('4'), Box('5'), Box('6'),
                                    ],
                                }),
                            ],
                        }),
                        div({
                            children: [
                                span({ text: '4 Columns:', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                                Grid({
                                    cols: 4,
                                    gap: 3,
                                    children: [
                                        Box('A'), Box('B'), Box('C'), Box('D'),
                                        Box('E'), Box('F'), Box('G'), Box('H'),
                                    ],
                                }),
                            ],
                        }),
                        div({
                            children: [
                                span({ text: 'Auto-fit (responsive):', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                                Grid({
                                    cols: 'auto-fit',
                                    minWidth: '150px',
                                    gap: 4,
                                    children: [
                                        Box('Auto 1'), Box('Auto 2'), Box('Auto 3'),
                                        Box('Auto 4'), Box('Auto 5'),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ]),

            Divider({ space: 2 }),

            // Divider Examples
            Section('Dividers', [
                Stack({
                    space: 4,
                    children: [
                        p({ text: 'Content above divider' }),
                        Divider({}),
                        p({ text: 'Solid divider' }),
                        Divider({ variant: 'dashed' }),
                        p({ text: 'Dashed divider' }),
                        Divider({ variant: 'dotted', color: 'dark' }),
                        p({ text: 'Dotted dark divider' }),
                    ],
                }),

                div({
                    style: { marginTop: 'var(--banda-space-4)' },
                    children: [
                        span({ text: 'Vertical Divider:', style: { fontWeight: '500', display: 'block', marginBottom: 'var(--banda-space-2)' } }),
                        Inline({
                            space: 0,
                            align: 'center',
                            children: [
                                span({ text: 'Left' }),
                                Divider({ orientation: 'vertical', space: 4 }),
                                span({ text: 'Center' }),
                                Divider({ orientation: 'vertical', space: 4 }),
                                span({ text: 'Right' }),
                            ],
                        }),
                    ],
                }),
            ]),

            Divider({ space: 2 }),

            // Center Example
            Section('Center', [
                div({
                    style: {
                        height: '150px',
                        border: '1px dashed var(--banda-color-border)',
                        borderRadius: 'var(--banda-radius-md)',
                    },
                    children: [
                        Center({
                            full: true,
                            children: [
                                Stack({
                                    space: 2,
                                    align: 'center',
                                    children: [
                                        span({ text: '🎯', style: { fontSize: '2rem' } }),
                                        span({ text: 'Centered Content', style: { fontWeight: '500' } }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ]),
        ],
    });
}

export default LayoutExamples;
