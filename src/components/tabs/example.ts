/**
 * Tabs Component Example
 */

import { div, h2, p } from '../../core/element';
import { Stack, Inline } from '../layout/layout';
import { Tabs } from './tabs';
import { Card, CardBody } from '../card/card';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return Stack({
        space: 4,
        children: [
            h2({ text: title, style: { marginBottom: '0' } }),
            ...children,
        ],
    });
}

export function TabsExamples(): HTMLElement {
    return Stack({
        space: 10,
        children: [
            // Default Tabs
            Section('Default Tabs', [
                Tabs({
                    items: [
                        {
                            id: 'overview',
                            label: 'Overview',
                            content: Card({
                                children: [
                                    CardBody({
                                        children: [
                                            p({ text: 'This is the Overview tab content. You can put any content here.' }),
                                        ],
                                    }),
                                ],
                            }),
                        },
                        {
                            id: 'features',
                            label: 'Features',
                            content: Card({
                                children: [
                                    CardBody({
                                        children: [
                                            p({ text: 'This is the Features tab content with a list of awesome features.' }),
                                        ],
                                    }),
                                ],
                            }),
                        },
                        {
                            id: 'settings',
                            label: 'Settings',
                            content: Card({
                                children: [
                                    CardBody({
                                        children: [
                                            p({ text: 'Configure your settings here.' }),
                                        ],
                                    }),
                                ],
                            }),
                        },
                    ],
                }),
            ]),

            // Pills Variant
            Section('Pills Variant', [
                Tabs({
                    variant: 'pills',
                    items: [
                        {
                            id: 'all',
                            label: 'All',
                            content: p({ text: 'Showing all items.' }),
                        },
                        {
                            id: 'active',
                            label: 'Active',
                            content: p({ text: 'Showing active items only.' }),
                        },
                        {
                            id: 'completed',
                            label: 'Completed',
                            content: p({ text: 'Showing completed items.' }),
                        },
                    ],
                }),
            ]),

            // Bordered Variant
            Section('Bordered Variant', [
                Tabs({
                    variant: 'bordered',
                    items: [
                        {
                            id: 'tab1',
                            label: 'First Tab',
                            content: p({ text: 'Content for the first tab.' }),
                        },
                        {
                            id: 'tab2',
                            label: 'Second Tab',
                            content: p({ text: 'Content for the second tab.' }),
                        },
                        {
                            id: 'tab3',
                            label: 'Third Tab',
                            content: p({ text: 'Content for the third tab.' }),
                        },
                    ],
                }),
            ]),

            // Tab Sizes
            Section('Tab Sizes', [
                Stack({
                    space: 6,
                    children: [
                        div({
                            children: [
                                p({ text: 'Small:', style: { fontWeight: '500', marginBottom: 'var(--banda-space-2)' } }),
                                Tabs({
                                    size: 'sm',
                                    items: [
                                        { id: 's1', label: 'Tab 1', content: p({ text: 'Small tab content' }) },
                                        { id: 's2', label: 'Tab 2', content: p({ text: 'Small tab content' }) },
                                    ],
                                }),
                            ],
                        }),
                        div({
                            children: [
                                p({ text: 'Large:', style: { fontWeight: '500', marginBottom: 'var(--banda-space-2)' } }),
                                Tabs({
                                    size: 'lg',
                                    items: [
                                        { id: 'l1', label: 'Tab 1', content: p({ text: 'Large tab content' }) },
                                        { id: 'l2', label: 'Tab 2', content: p({ text: 'Large tab content' }) },
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ]),

            // Stretched Tabs
            Section('Full Width Tabs', [
                Tabs({
                    stretch: true,
                    variant: 'pills',
                    items: [
                        { id: 'day', label: 'Day', content: p({ text: 'Daily view' }) },
                        { id: 'week', label: 'Week', content: p({ text: 'Weekly view' }) },
                        { id: 'month', label: 'Month', content: p({ text: 'Monthly view' }) },
                        { id: 'year', label: 'Year', content: p({ text: 'Yearly view' }) },
                    ],
                }),
            ]),

            // With Disabled Tab
            Section('With Disabled Tab', [
                Tabs({
                    items: [
                        { id: 'enabled1', label: 'Enabled', content: p({ text: 'This tab is enabled.' }) },
                        { id: 'disabled', label: 'Disabled', content: p({ text: 'Disabled content' }), disabled: true },
                        { id: 'enabled2', label: 'Also Enabled', content: p({ text: 'This tab is also enabled.' }) },
                    ],
                }),
            ]),
        ],
    });
}

export default TabsExamples;
