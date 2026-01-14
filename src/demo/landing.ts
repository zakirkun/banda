/**
 * Banda Landing Page — Cyber Elegant
 * 
 * Built with Banda itself.
 */

import { div, span, p, h3, h2 } from '../core/element';
import { mount } from '../core/mount';
import { createState } from '../core/state';
import { Button } from '../components/button/button';
import { Card, CardHeader, CardBody } from '../components/card/card';
import { Input } from '../components/input/input';
import { Badge } from '../components/badge/badge';
import { openModal, closeModal } from '../components/modal/modal';
import { Stack, Inline, Grid } from '../components/layout/layout';
import { Alert, toast, Tooltip } from '../components/feedback/feedback';
import { icons } from './icons';

// ============================================================================
// ICONS HELPER
// ============================================================================

function Icon(name: keyof typeof icons, className: string = 'icon'): HTMLElement {
    const spanEl = span({ className });
    spanEl.innerHTML = icons[name];
    return spanEl;
}

// ============================================================================
// HERO ACTIONS
// ============================================================================

function HeroActions(): HTMLElement {
    return Inline({
        space: 3,
        justify: 'center',
        children: [
            Button({
                label: 'Get Started',
                variant: 'primary',
                size: 'lg',
                icon: Icon('zap', 'icon btn-icon'),
                onClick: () => {
                    window.location.href = '/docs/getting-started.html';
                },
            }),
            Button({
                label: 'View Components',
                variant: 'ghost',
                size: 'lg',
                icon: Icon('layers', 'icon btn-icon'),
                onClick: () => {
                    document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' });
                },
            }),
        ],
    });
}

// ============================================================================
// PHILOSOPHY VALUES
// ============================================================================

function PhilosophyValues(): HTMLElement {
    const values = [
        {
            title: 'Simplicity',
            description: 'No Virtual DOM. No JSX. No illusion. What you write is what runs.',
        },
        {
            title: 'Control',
            description: 'You own the DOM. State flows explicitly. Nothing happens behind your back.',
        },
        {
            title: 'Restraint',
            description: 'Design tokens. Predictable systems. Balance over excess.',
        },
    ];

    return div({
        className: 'philosophy__values',
        children: values.map(({ title, description }) =>
            div({
                className: 'philosophy__value',
                attrs: { tabindex: '0' },
                children: [
                    h3({ text: title }),
                    p({ text: description }),
                ],
            })
        ),
    });
}

// ============================================================================
// FEATURES GRID
// ============================================================================

function FeaturesGrid(): HTMLElement {
    const features = [
        { icon: 'zap', title: 'Zero Dependencies', desc: 'No heavy runtime. No bloat. Just pure, efficient TypeScript code.' },
        { icon: 'shield', title: 'Type Safe', desc: 'First-class TypeScript support with strict typing for all components.' },
        { icon: 'code', title: 'Direct DOM', desc: 'Interact directly with HTMLElements. No abstraction leakage.' },
        { icon: 'box', title: 'Tree Shakable', desc: 'Import only what you need. Dead code elimination by default.' },
        { icon: 'feather', title: 'Lightweight', desc: 'Tiny footprint. Core is just a few KB. Fast logical execution.' },
        { icon: 'check', title: 'Accessible', desc: 'Built-in ARIA support, keyboard navigation, and focus management.' },
    ];

    return div({
        className: 'features__grid',
        children: features.map(f => FeatureCard(f as any))
    });
}

function FeatureCard({ icon, title, desc }: { icon: keyof typeof icons, title: string, desc: string }): HTMLElement {
    return div({
        className: 'feature-card',
        children: [
            div({
                className: 'feature-card__icon',
                children: [Icon(icon)]
            }),
            h3({ text: title }),
            p({ text: desc })
        ]
    });
}

// ============================================================================
// PERFORMANCE SECTION
// ============================================================================

function PerformanceSection(): HTMLElement {
    return Stack({
        space: 6,
        align: 'center',
        children: [
            h2({ text: 'Engineered for Performance' }),
            Grid({
                cols: 3,
                gap: 6,
                children: [
                    StatCard('0', 'Dependencies'),
                    StatCard('100%', 'Control'),
                    StatCard('<5kb', 'Core Size'),
                ]
            })
        ]
    });
}

function StatCard(value: string, label: string): HTMLElement {
    return div({
        className: 'text-center',
        children: [
            div({
                text: value,
                className: 'text-4xl font-bold font-mono mb-2',
                style: { color: 'var(--banda-color-primary)' }
            }),
            div({
                text: label,
                className: 'text-sm text-gray-400 uppercase tracking-widest'
            })
        ]
    });
}

// ============================================================================
// COMPONENT SHOWCASE
// ============================================================================

function ComponentShowcase(): HTMLElement {
    return Grid({
        cols: 2,
        gap: 6,
        children: [
            // Buttons
            ShowcaseCard({
                title: 'Buttons',
                content: Stack({
                    space: 4,
                    children: [
                        Inline({
                            space: 3,
                            children: [
                                Button({ label: 'Primary', variant: 'primary', icon: Icon('zap') }),
                                Button({ label: 'Secondary', variant: 'secondary' }),
                                Button({ label: 'Ghost', variant: 'ghost' }),
                            ],
                        }),
                        Inline({
                            space: 3,
                            children: [
                                Button({ label: 'Loading...', variant: 'primary', loading: true }),
                                Button({ label: 'Disabled', variant: 'secondary', disabled: true }),
                            ],
                        }),
                    ],
                }),
            }),

            // Inputs
            ShowcaseCard({
                title: 'Inputs',
                content: Stack({
                    space: 4,
                    children: [
                        Input({
                            placeholder: 'Enter your email...',
                            type: 'email',
                        }),
                        Input({
                            placeholder: 'With error',
                            state: 'error',
                            errorMessage: 'Invalid input',
                        }),
                    ],
                }),
            }),

            // Cards
            ShowcaseCard({
                title: 'Cards',
                content: Card({
                    variant: 'elevated',
                    children: [
                        CardHeader({
                            title: 'Nested Card',
                            subtitle: 'Cards can contain anything',
                        }),
                        CardBody({
                            children: [
                                Inline({
                                    space: 2,
                                    children: [
                                        Badge({ label: 'Active', variant: 'success', dot: true }),
                                        Badge({ label: 'v0.1.0', variant: 'primary', styleType: 'outline' }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),

            // Interactions
            ShowcaseCard({
                title: 'Interactions',
                content: Stack({
                    space: 4,
                    children: [
                        Inline({
                            space: 3,
                            children: [
                                Button({
                                    label: 'Toast',
                                    variant: 'secondary',
                                    onClick: () => toast({
                                        message: 'Action completed ✓',
                                        variant: 'success',
                                    }),
                                }),
                                Button({
                                    label: 'Modal',
                                    variant: 'secondary',
                                    onClick: () => openModal({
                                        title: 'Modal Dialog',
                                        size: 'sm',
                                        centered: true,
                                        children: [
                                            p({ text: 'Focus trap and ESC key support built-in.' }),
                                        ],
                                        footer: [
                                            Button({ label: 'Close', variant: 'primary', onClick: closeModal }),
                                        ],
                                    }),
                                }),
                                Tooltip({
                                    content: 'Helpful hint',
                                    position: 'top',
                                    children: Button({ label: 'Tooltip', variant: 'outline' }),
                                }),
                            ],
                        }),
                    ],
                }),
            }),
        ],
    });
}

function ShowcaseCard({ title, content }: { title: string; content: HTMLElement }): HTMLElement {
    return div({
        className: 'showcase__card',
        children: [
            h3({ text: title }),
            content,
        ],
    });
}

// ============================================================================
// DESIGN TOKENS DEMO
// ============================================================================

function TokensDemo(): HTMLElement {
    const colors = [
        { name: 'Primary', color: 'var(--banda-color-primary)' },
        { name: 'Success', color: 'var(--banda-color-success)' },
        { name: 'Secondary', color: 'var(--banda-color-secondary)' },
        { name: 'Surface', color: 'var(--banda-color-surface)' },
    ];

    return Grid({
        cols: 4,
        gap: 4,
        children: colors.map(({ name, color }) =>
            div({
                className: 'token-card',
                children: [
                    div({
                        className: 'color-swatch',
                        style: { background: color, width: '100%', height: '60px', marginBottom: '1rem', borderRadius: '8px' },
                    }),
                    div({
                        className: 'token-card__label',
                        children: [span({ text: name })],
                    }),
                ],
            })
        ),
    });
}

// ============================================================================
// CTA ACTIONS
// ============================================================================

function CTAActions(): HTMLElement {
    return Inline({
        space: 3,
        justify: 'center',
        children: [
            Button({
                label: 'Read Documentation',
                variant: 'primary',
                icon: Icon('book', 'icon btn-icon'),
                onClick: () => {
                    window.location.href = '/docs/getting-started.html';
                },
            }),
            Button({
                label: 'View on GitHub',
                variant: 'ghost',
                icon: Icon('github', 'icon btn-icon'),
                onClick: () => {
                    window.open('https://github.com/zakirkun/banda', '_blank');
                },
            }),
        ],
    });
}

// ============================================================================
// INIT
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const mounts = [
        { id: 'hero-actions', component: HeroActions },
        { id: 'philosophy-values', component: PhilosophyValues },
        { id: 'features-grid', component: FeaturesGrid },
        { id: 'performance-content', component: PerformanceSection },
        { id: 'component-showcase', component: ComponentShowcase },
        { id: 'tokens-demo', component: TokensDemo },
        { id: 'cta-actions', component: CTAActions },
    ];

    mounts.forEach(({ id, component }) => {
        const el = document.getElementById(id);
        if (el) mount(component(), el);
    });
});
