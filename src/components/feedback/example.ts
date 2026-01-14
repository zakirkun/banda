/**
 * Feedback Components Example
 */

import { div, h2, p, span } from '../../core/element';
import { Stack, Inline } from '../layout/layout';
import { Button } from '../button/button';
import { Alert, Spinner, toast, Tooltip, configureToast } from './feedback';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return Stack({
        space: 4,
        children: [
            h2({ text: title, style: { marginBottom: '0' } }),
            ...children,
        ],
    });
}

export function FeedbackExamples(): HTMLElement {
    return Stack({
        space: 10,
        children: [
            // Alert Examples
            Section('Alert', [
                Stack({
                    space: 4,
                    children: [
                        Alert({ message: 'This is an informational alert.', variant: 'info' }),
                        Alert({
                            title: 'Success!',
                            message: 'Your changes have been saved successfully.',
                            variant: 'success'
                        }),
                        Alert({
                            title: 'Warning',
                            message: 'Please review your input before submitting.',
                            variant: 'warning',
                            dismissible: true,
                            onClose: () => console.log('Alert dismissed'),
                        }),
                        Alert({
                            title: 'Error',
                            message: 'Something went wrong. Please try again.',
                            variant: 'danger',
                            dismissible: true,
                        }),
                        Alert({ message: 'This is a neutral message.', variant: 'neutral' }),
                    ],
                }),
            ]),

            // Spinner Examples
            Section('Spinner / Loader', [
                Inline({
                    space: 6,
                    align: 'center',
                    children: [
                        Stack({
                            space: 2,
                            align: 'center',
                            children: [
                                Spinner({ size: 'sm' }),
                                span({ text: 'Small', style: { fontSize: 'var(--banda-text-xs)' } }),
                            ],
                        }),
                        Stack({
                            space: 2,
                            align: 'center',
                            children: [
                                Spinner({ size: 'md' }),
                                span({ text: 'Medium', style: { fontSize: 'var(--banda-text-xs)' } }),
                            ],
                        }),
                        Stack({
                            space: 2,
                            align: 'center',
                            children: [
                                Spinner({ size: 'lg' }),
                                span({ text: 'Large', style: { fontSize: 'var(--banda-text-xs)' } }),
                            ],
                        }),
                        Stack({
                            space: 2,
                            align: 'center',
                            children: [
                                Spinner({ size: 'xl', color: 'secondary' }),
                                span({ text: 'XL', style: { fontSize: 'var(--banda-text-xs)' } }),
                            ],
                        }),
                    ],
                }),
            ]),

            // Toast Examples
            Section('Toast Notifications', [
                p({ text: 'Click buttons to show toast notifications:' }),
                Inline({
                    space: 2,
                    children: [
                        Button({
                            label: 'Info Toast',
                            variant: 'secondary',
                            onClick: () => {
                                toast({ message: 'This is an info message', variant: 'info' });
                            },
                        }),
                        Button({
                            label: 'Success Toast',
                            variant: 'secondary',
                            onClick: () => {
                                toast({
                                    title: 'Success!',
                                    message: 'Your action was completed',
                                    variant: 'success'
                                });
                            },
                        }),
                        Button({
                            label: 'Warning Toast',
                            variant: 'secondary',
                            onClick: () => {
                                toast({
                                    title: 'Warning',
                                    message: 'Please check your input',
                                    variant: 'warning'
                                });
                            },
                        }),
                        Button({
                            label: 'Error Toast',
                            variant: 'danger',
                            onClick: () => {
                                toast({
                                    title: 'Error',
                                    message: 'Something went wrong!',
                                    variant: 'danger',
                                    duration: 0, // Won't auto-close
                                });
                            },
                        }),
                    ],
                }),
            ]),

            // Tooltip Examples
            Section('Tooltip', [
                Inline({
                    space: 4,
                    children: [
                        Tooltip({
                            content: 'Tooltip on top',
                            position: 'top',
                            children: Button({ label: 'Top', variant: 'secondary' }),
                        }),
                        Tooltip({
                            content: 'Tooltip on bottom',
                            position: 'bottom',
                            children: Button({ label: 'Bottom', variant: 'secondary' }),
                        }),
                        Tooltip({
                            content: 'Tooltip on left',
                            position: 'left',
                            children: Button({ label: 'Left', variant: 'secondary' }),
                        }),
                        Tooltip({
                            content: 'Tooltip on right',
                            position: 'right',
                            children: Button({ label: 'Right', variant: 'secondary' }),
                        }),
                    ],
                }),
            ]),
        ],
    });
}

export default FeedbackExamples;
