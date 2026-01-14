/**
 * Banda Modal Component
 * 
 * A dialog/modal component with backdrop, focus trapping, and keyboard support.
 */

import { el, div, h2, p, button } from '../../core/element';
import { mount, unmount, registerCleanup } from '../../core/mount';
import { onEscape, createFocusTrap, onClickOutside } from '../../core/events';
import type { ElementEvents } from '../../core/element';

/** Modal size options */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Modal props interface */
export interface ModalProps {
    /** Modal title */
    title?: string;
    /** Modal description/subtitle */
    description?: string;
    /** Modal size */
    size?: ModalSize;
    /** Whether clicking backdrop closes the modal */
    closeOnBackdrop?: boolean;
    /** Whether pressing ESC closes the modal */
    closeOnEscape?: boolean;
    /** Show close button in header */
    showCloseButton?: boolean;
    /** Whether modal is centered (for confirmation dialogs) */
    centered?: boolean;
    /** Callback when modal is closed */
    onClose?: () => void;
    /** Header content (overrides title/description) */
    header?: HTMLElement;
    /** Body content */
    children?: (HTMLElement | string)[];
    /** Footer content */
    footer?: HTMLElement[];
    /** Footer alignment */
    footerAlign?: 'left' | 'center' | 'right' | 'between';
    /** Additional class names */
    className?: string;
}

/** Active modal instance for cleanup */
let activeModal: { element: HTMLElement; cleanup: () => void } | null = null;

/**
 * Creates a Modal component.
 * Note: Use openModal() to display the modal.
 * 
 * @example
 * openModal({
 *   title: 'Confirm Action',
 *   description: 'Are you sure you want to proceed?',
 *   children: [p({ text: 'This action cannot be undone.' })],
 *   footer: [
 *     Button({ label: 'Cancel', variant: 'ghost', onClick: closeModal }),
 *     Button({ label: 'Confirm', variant: 'danger', onClick: handleConfirm }),
 *   ],
 * });
 */
export function Modal(props: ModalProps): HTMLElement {
    const {
        title,
        description,
        size = 'md',
        showCloseButton = true,
        centered = false,
        header,
        children = [],
        footer,
        footerAlign = 'right',
        className = '',
        onClose,
    } = props;

    const modalClasses = [
        'banda-modal',
        `banda-modal--${size}`,
        centered && 'banda-modal--centered',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const sections: HTMLElement[] = [];

    // Header
    if (header || title || showCloseButton) {
        const headerContent: HTMLElement[] = [];

        if (header) {
            headerContent.push(header);
        } else if (title || description) {
            headerContent.push(
                div({
                    className: 'banda-modal__header-content',
                    children: [
                        title ? h2({ className: 'banda-modal__title', text: title }) : null,
                        description ? p({ className: 'banda-modal__description', text: description }) : null,
                    ].filter(Boolean) as HTMLElement[],
                })
            );
        }

        if (showCloseButton) {
            headerContent.push(
                button({
                    className: 'banda-modal__close',
                    attrs: {
                        'aria-label': 'Close modal',
                        type: 'button',
                    },
                    children: [div({ className: 'banda-modal__close-icon' })],
                    onClick: () => onClose?.(),
                })
            );
        }

        sections.push(div({ className: 'banda-modal__header', children: headerContent }));
    }

    // Body
    if (children.length > 0) {
        sections.push(
            div({
                className: 'banda-modal__body',
                children,
            })
        );
    }

    // Footer
    if (footer && footer.length > 0) {
        const footerClasses = [
            'banda-modal__footer',
            footerAlign !== 'right' && `banda-modal__footer--${footerAlign}`,
        ]
            .filter(Boolean)
            .join(' ');

        sections.push(div({ className: footerClasses, children: footer }));
    }

    return div({
        className: modalClasses,
        attrs: {
            role: 'dialog',
            'aria-modal': true,
            'aria-labelledby': title ? 'modal-title' : undefined,
        } as Record<string, string | boolean | number>,
        children: sections,
    });
}

/**
 * Creates a Modal Header section.
 */
export function ModalHeader(props: {
    title: string;
    description?: string;
    children?: (HTMLElement | string)[];
}): HTMLElement {
    const { title, description, children } = props;

    if (children && children.length > 0) {
        return div({ className: 'banda-modal__header-content', children });
    }

    return div({
        className: 'banda-modal__header-content',
        children: [
            h2({ className: 'banda-modal__title', text: title }),
            description ? p({ className: 'banda-modal__description', text: description }) : null,
        ].filter(Boolean) as HTMLElement[],
    });
}

/**
 * Creates a Modal Body section.
 */
export function ModalBody(props: {
    children: (HTMLElement | string)[];
    className?: string;
}): HTMLElement {
    const { children, className = '' } = props;
    const classes = ['banda-modal__body', className].filter(Boolean).join(' ');
    return div({ className: classes, children });
}

/**
 * Creates a Modal Footer section.
 */
export function ModalFooter(props: {
    children: HTMLElement[];
    align?: 'left' | 'center' | 'right' | 'between';
    className?: string;
}): HTMLElement {
    const { children, align = 'right', className = '' } = props;
    const classes = [
        'banda-modal__footer',
        align !== 'right' && `banda-modal__footer--${align}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');
    return div({ className: classes, children });
}

/**
 * Opens a modal dialog.
 */
export function openModal(props: ModalProps): void {
    // Close any existing modal first
    if (activeModal) {
        closeModal();
    }

    const {
        closeOnBackdrop = true,
        closeOnEscape = true,
        onClose,
        ...modalProps
    } = props;

    // Create cleanup functions
    const cleanupFns: (() => void)[] = [];

    // Handle close
    const handleClose = () => {
        if (activeModal) {
            // Add closing animation classes
            const backdrop = activeModal.element;
            const modal = backdrop.querySelector('.banda-modal') as HTMLElement;

            backdrop.classList.add('banda-modal-backdrop--closing');
            if (modal) {
                modal.classList.add('banda-modal--closing');
            }

            // Wait for animation then cleanup
            setTimeout(() => {
                activeModal?.cleanup();
                onClose?.();
            }, 200);
        }
    };

    // Pass onClose to modal
    const modal = Modal({ ...modalProps, onClose: handleClose });

    // Create backdrop
    const backdrop = div({
        className: 'banda-modal-backdrop',
        children: [modal],
        onClick: (e) => {
            if (closeOnBackdrop && e.target === backdrop) {
                handleClose();
            }
        },
    });

    // Mount to body
    document.body.appendChild(backdrop);

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cleanupFns.push(() => {
        document.body.style.overflow = originalOverflow;
    });

    // ESC key handler
    if (closeOnEscape) {
        const escCleanup = onEscape(handleClose);
        cleanupFns.push(escCleanup);
    }

    // Focus trap
    const focusTrapCleanup = createFocusTrap(modal);
    cleanupFns.push(focusTrapCleanup);

    // Master cleanup
    const cleanup = () => {
        for (const fn of cleanupFns) {
            fn();
        }
        if (backdrop.parentNode) {
            backdrop.parentNode.removeChild(backdrop);
        }
        activeModal = null;
    };

    activeModal = { element: backdrop, cleanup };
}

/**
 * Closes the currently open modal.
 */
export function closeModal(): void {
    if (activeModal) {
        const backdrop = activeModal.element;
        const modal = backdrop.querySelector('.banda-modal') as HTMLElement;

        backdrop.classList.add('banda-modal-backdrop--closing');
        if (modal) {
            modal.classList.add('banda-modal--closing');
        }

        setTimeout(() => {
            activeModal?.cleanup();
        }, 200);
    }
}

/**
 * Checks if a modal is currently open.
 */
export function isModalOpen(): boolean {
    return activeModal !== null;
}

export default Modal;
