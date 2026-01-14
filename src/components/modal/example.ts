/**
 * Modal Component Example
 */

import { div, h2, p } from '../../core/element';
import { openModal, closeModal } from './modal';
import { Button } from '../button/button';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return div({
        style: { marginBottom: '2rem' },
        children: [
            h2({ text: title, style: { marginBottom: '1rem' } }),
            div({
                style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap' },
                children,
            }),
        ],
    });
}

export function ModalExamples(): HTMLElement {
    return div({
        children: [
            // Basic Modal
            Section('Basic Modals', [
                Button({
                    label: 'Open Basic Modal',
                    variant: 'primary',
                    onClick: () => {
                        openModal({
                            title: 'Welcome to Banda',
                            description: 'A lightweight UI framework',
                            children: [
                                p({ text: 'This is a basic modal with a title, description, and body content.' }),
                                p({ text: 'Click outside or press ESC to close.' }),
                            ],
                            footer: [
                                Button({ label: 'Close', variant: 'secondary', onClick: closeModal }),
                                Button({ label: 'Got it!', variant: 'primary', onClick: closeModal }),
                            ],
                        });
                    },
                }),
                Button({
                    label: 'Open Large Modal',
                    variant: 'secondary',
                    onClick: () => {
                        openModal({
                            title: 'Large Modal',
                            size: 'lg',
                            children: [
                                p({ text: 'This modal has a larger width for more content.' }),
                                p({ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }),
                                p({ text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }),
                            ],
                            footer: [
                                Button({ label: 'Cancel', variant: 'ghost', onClick: closeModal }),
                                Button({ label: 'Save Changes', variant: 'primary', onClick: closeModal }),
                            ],
                        });
                    },
                }),
            ]),

            // Confirmation Dialog
            Section('Confirmation Dialog', [
                Button({
                    label: 'Delete Item',
                    variant: 'danger',
                    onClick: () => {
                        openModal({
                            title: 'Delete Item?',
                            description: 'This action cannot be undone.',
                            size: 'sm',
                            centered: true,
                            children: [
                                p({ text: 'Are you sure you want to delete this item? All associated data will be permanently removed.' }),
                            ],
                            footer: [
                                Button({ label: 'Cancel', variant: 'secondary', onClick: closeModal }),
                                Button({
                                    label: 'Delete',
                                    variant: 'danger',
                                    onClick: () => {
                                        alert('Item deleted!');
                                        closeModal();
                                    },
                                }),
                            ],
                            footerAlign: 'center',
                        });
                    },
                }),
            ]),

            // Modal without close on backdrop
            Section('Non-dismissible Modal', [
                Button({
                    label: 'Important Notice',
                    variant: 'secondary',
                    onClick: () => {
                        openModal({
                            title: 'Terms of Service',
                            closeOnBackdrop: false,
                            closeOnEscape: false,
                            showCloseButton: false,
                            children: [
                                p({ text: 'Please review and accept our terms of service to continue.' }),
                                p({ text: 'This modal cannot be dismissed by clicking outside or pressing ESC.' }),
                            ],
                            footer: [
                                Button({
                                    label: 'I Accept',
                                    variant: 'primary',
                                    onClick: () => {
                                        alert('Terms accepted!');
                                        closeModal();
                                    },
                                }),
                            ],
                        });
                    },
                }),
            ]),

            // Modal Sizes
            Section('Modal Sizes', [
                Button({
                    label: 'Small',
                    variant: 'ghost',
                    onClick: () => {
                        openModal({
                            title: 'Small Modal',
                            size: 'sm',
                            children: [p({ text: 'This is a small modal.' })],
                            footer: [Button({ label: 'Close', variant: 'primary', onClick: closeModal })],
                        });
                    },
                }),
                Button({
                    label: 'Medium',
                    variant: 'ghost',
                    onClick: () => {
                        openModal({
                            title: 'Medium Modal',
                            size: 'md',
                            children: [p({ text: 'This is a medium modal (default).' })],
                            footer: [Button({ label: 'Close', variant: 'primary', onClick: closeModal })],
                        });
                    },
                }),
                Button({
                    label: 'Large',
                    variant: 'ghost',
                    onClick: () => {
                        openModal({
                            title: 'Large Modal',
                            size: 'lg',
                            children: [p({ text: 'This is a large modal.' })],
                            footer: [Button({ label: 'Close', variant: 'primary', onClick: closeModal })],
                        });
                    },
                }),
                Button({
                    label: 'Extra Large',
                    variant: 'ghost',
                    onClick: () => {
                        openModal({
                            title: 'Extra Large Modal',
                            size: 'xl',
                            children: [p({ text: 'This is an extra large modal.' })],
                            footer: [Button({ label: 'Close', variant: 'primary', onClick: closeModal })],
                        });
                    },
                }),
            ]),
        ],
    });
}

export default ModalExamples;
