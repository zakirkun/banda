/**
 * Banda Landing Page
 * 
 * An elegant experience built with Banda.
 */

import { div, span, p, h3 } from '../core/element';
import { mount } from '../core/mount';
import { createState } from '../core/state';
import { Button } from '../components/button/button';
import { Card, CardHeader, CardBody } from '../components/card/card';
import { Input } from '../components/input/input';
import { Badge } from '../components/badge/badge';
import { openModal, closeModal } from '../components/modal/modal';
import { Stack, Inline, Grid } from '../components/layout/layout';
import { Alert, Spinner, toast, Tooltip } from '../components/feedback/feedback';

// ============================================================================
// SCROLL REVEAL ANIMATION
// ============================================================================

function initScrollReveal() {
    const lines = document.querySelectorAll('.philosophy-line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50px',
    });

    lines.forEach(line => observer.observe(line));
}

// ============================================================================
// COMPONENT SHOWCASE — "Crafted Moments"
// ============================================================================

function ComponentShowcase(): HTMLElement {
    return Stack({
        space: 8,
        children: [
            // Button Moment
            ComponentMoment({
                title: 'Button',
                demo: Stack({
                    space: 4,
                    children: [
                        Inline({
                            space: 3,
                            align: 'center',
                            children: [
                                Button({ label: 'Primary', variant: 'primary' }),
                                Button({ label: 'Secondary', variant: 'secondary' }),
                                Button({ label: 'Ghost', variant: 'ghost' }),
                                Button({ label: 'Outline', variant: 'outline' }),
                            ],
                        }),
                        Inline({
                            space: 3,
                            align: 'center',
                            children: [
                                Button({ label: 'Hover me', variant: 'primary' }),
                                Button({ label: 'Loading...', variant: 'secondary', loading: true }),
                                Button({ label: 'Disabled', variant: 'secondary', disabled: true }),
                            ],
                        }),
                    ],
                }),
            }),

            // Card Moment
            ComponentMoment({
                title: 'Card',
                demo: Grid({
                    cols: 2,
                    gap: 4,
                    children: [
                        Card({
                            variant: 'default',
                            children: [
                                CardHeader({ title: 'Clean Structure', subtitle: 'Elevation matters' }),
                                CardBody({
                                    children: [
                                        p({ text: 'Cards that breathe. Spacing rhythm that feels natural.' }),
                                    ],
                                }),
                            ],
                        }),
                        Card({
                            variant: 'elevated',
                            children: [
                                CardHeader({
                                    title: 'With Action',
                                    actions: [
                                        Badge({ label: 'New', variant: 'primary', styleType: 'solid' }),
                                    ],
                                }),
                                CardBody({
                                    children: [
                                        p({ text: 'Every shadow has purpose. Every border has meaning.' }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            }),

            // Input Moment
            ComponentMoment({
                title: 'Input',
                demo: Grid({
                    cols: 2,
                    gap: 4,
                    children: [
                        Input({
                            label: 'Focus clarity',
                            placeholder: 'Type something...',
                        }),
                        Input({
                            label: 'With validation',
                            state: 'error',
                            value: 'Invalid',
                            errorMessage: 'Subtle, not aggressive',
                        }),
                    ],
                }),
            }),

            // Interactive Moment
            ComponentMoment({
                title: 'Interactions',
                demo: Stack({
                    space: 4,
                    children: [
                        Alert({
                            title: 'Feedback that respects',
                            message: 'Alerts inform without demanding attention.',
                            variant: 'info',
                        }),
                        Inline({
                            space: 3,
                            children: [
                                Button({
                                    label: 'Toast',
                                    variant: 'secondary',
                                    onClick: () => toast({
                                        message: 'Calm notification ✓',
                                        variant: 'success'
                                    }),
                                }),
                                Button({
                                    label: 'Modal',
                                    variant: 'secondary',
                                    onClick: () => openModal({
                                        title: 'Focus Trap',
                                        size: 'sm',
                                        centered: true,
                                        children: [
                                            p({ text: 'Modal with proper focus management and escape key support.' }),
                                        ],
                                        footer: [
                                            Button({ label: 'Close', variant: 'primary', onClick: closeModal }),
                                        ],
                                    }),
                                }),
                                Tooltip({
                                    content: 'Helpful, not intrusive',
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

function ComponentMoment({ title, demo }: { title: string; demo: HTMLElement }): HTMLElement {
    return div({
        className: 'component-moment',
        children: [
            h3({ text: title }),
            demo,
        ],
    });
}

// ============================================================================
// THEME DEMO
// ============================================================================

function ThemeDemo(): HTMLElement {
    const currentTheme = createState('light');

    const themes = ['light', 'dark', 'spice'];

    const preview = Card({
        children: [
            CardHeader({ title: 'Theme Preview', subtitle: 'Live component' }),
            CardBody({
                children: [
                    Inline({
                        space: 2,
                        children: [
                            Button({ label: 'Action', variant: 'primary' }),
                            Badge({ label: 'Status', variant: 'success', dot: true }),
                        ],
                    }),
                ],
            }),
        ],
    });

    const buttons = Inline({
        space: 2,
        justify: 'center',
        children: themes.map(theme =>
            Button({
                label: theme.charAt(0).toUpperCase() + theme.slice(1),
                variant: currentTheme.get() === theme ? 'primary' : 'outline',
                onClick: () => {
                    currentTheme.set(theme);
                    applyTheme(theme);
                },
            })
        ),
    });

    function applyTheme(theme: string) {
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--bg', '#0d0d0d');
            document.documentElement.style.setProperty('--text', '#f5f5f5');
            document.documentElement.style.setProperty('--surface', '#1a1a1a');
        } else if (theme === 'spice') {
            document.documentElement.style.setProperty('--bg', '#1a1510');
            document.documentElement.style.setProperty('--text', '#f5f0e8');
            document.documentElement.style.setProperty('--accent', '#c4a77d');
            document.documentElement.style.setProperty('--surface', '#2a2015');
        } else {
            document.documentElement.style.setProperty('--bg', '#faf9f7');
            document.documentElement.style.setProperty('--text', '#1a1a1a');
            document.documentElement.style.setProperty('--accent', '#2c5545');
            document.documentElement.style.setProperty('--surface', '#ffffff');
        }
    }

    return Stack({
        space: 6,
        children: [
            buttons,
            div({
                className: 'theme-preview',
                children: [preview],
            }),
        ],
    });
}

// ============================================================================
// INIT
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal
    initScrollReveal();

    // Component showcase
    const showcaseContainer = document.getElementById('component-showcase');
    if (showcaseContainer) {
        mount(ComponentShowcase(), showcaseContainer);
    }

    // Theme demo
    const themeContainer = document.getElementById('theme-demo');
    if (themeContainer) {
        mount(ThemeDemo(), themeContainer);
    }
});
