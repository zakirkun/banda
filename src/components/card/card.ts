/**
 * Banda Card Component
 * 
 * A flexible container component for grouping related content.
 */

import { el, div, h3, p } from '../../core/element';
import type { ElementEvents } from '../../core/element';

/** Card variant options */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost';

/** Card padding options */
export type CardPadding = 'compact' | 'default' | 'spacious';

/** Card props interface */
export interface CardProps extends ElementEvents {
    /** Card variant style */
    variant?: CardVariant;
    /** Card padding size */
    padding?: CardPadding;
    /** Make the card interactive (clickable) */
    interactive?: boolean;
    /** Card content children */
    children?: (HTMLElement | string)[];
    /** Additional CSS class names */
    className?: string;
}

/** Card header props */
export interface CardHeaderProps {
    /** Header title */
    title?: string;
    /** Header subtitle */
    subtitle?: string;
    /** Action elements (buttons, icons) */
    actions?: HTMLElement[];
    /** Custom content (overrides title/subtitle) */
    children?: (HTMLElement | string)[];
    /** Additional CSS class names */
    className?: string;
}

/** Card body props */
export interface CardBodyProps {
    /** Body content */
    children?: (HTMLElement | string)[];
    /** Additional CSS class names */
    className?: string;
}

/** Card footer props */
export interface CardFooterProps {
    /** Footer content alignment */
    align?: 'left' | 'center' | 'right' | 'between';
    /** Footer content */
    children?: (HTMLElement | string)[];
    /** Additional CSS class names */
    className?: string;
}

/**
 * Creates a Card component.
 * 
 * @example
 * Card({
 *   variant: 'elevated',
 *   children: [
 *     CardHeader({ title: 'Card Title', subtitle: 'Subtitle' }),
 *     CardBody({ children: [p({ text: 'Card content here...' })] }),
 *     CardFooter({ children: [Button({ label: 'Action' })] }),
 *   ],
 * })
 */
export function Card(props: CardProps = {}): HTMLElement {
    const {
        variant = 'default',
        padding = 'default',
        interactive = false,
        children = [],
        className = '',
        onClick,
        onKeyDown,
        onMouseEnter,
        onMouseLeave,
    } = props;

    const classes = [
        'banda-card',
        `banda-card--${variant}`,
        padding !== 'default' && `banda-card--${padding}`,
        interactive && 'banda-card--interactive',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const attrs: Record<string, string | boolean | number> = {};

    if (interactive) {
        attrs.tabindex = 0;
        attrs.role = 'button';
    }

    return div({
        className: classes,
        children,
        attrs,
        onClick: interactive ? onClick : undefined,
        onKeyDown: interactive ? onKeyDown : undefined,
        onMouseEnter,
        onMouseLeave,
    });
}

/**
 * Creates a Card Header section.
 */
export function CardHeader(props: CardHeaderProps = {}): HTMLElement {
    const { title, subtitle, actions, children, className = '' } = props;

    const classes = ['banda-card__header', className].filter(Boolean).join(' ');

    // If custom children provided, use them
    if (children && children.length > 0) {
        return div({ className: classes, children });
    }

    // Otherwise build from title/subtitle/actions
    const content: HTMLElement[] = [];

    if (title || subtitle) {
        const headerContent = div({
            className: 'banda-card__header-content',
            children: [
                title ? h3({ className: 'banda-card__title', text: title }) : null,
                subtitle ? p({ className: 'banda-card__subtitle', text: subtitle }) : null,
            ].filter(Boolean) as HTMLElement[],
        });
        content.push(headerContent);
    }

    if (actions && actions.length > 0) {
        content.push(
            div({
                className: 'banda-card__header-actions',
                children: actions,
            })
        );
    }

    return div({ className: classes, children: content });
}

/**
 * Creates a Card Body section.
 */
export function CardBody(props: CardBodyProps = {}): HTMLElement {
    const { children = [], className = '' } = props;
    const classes = ['banda-card__body', className].filter(Boolean).join(' ');
    return div({ className: classes, children });
}

/**
 * Creates a Card Footer section.
 */
export function CardFooter(props: CardFooterProps = {}): HTMLElement {
    const { align = 'right', children = [], className = '' } = props;

    const classes = [
        'banda-card__footer',
        align !== 'right' && `banda-card__footer--${align}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return div({ className: classes, children });
}

/**
 * Creates a Card Media element (image).
 */
export function CardMedia(props: {
    src: string;
    alt: string;
    aspect?: 'default' | 'square' | 'wide';
}): HTMLElement {
    const { src, alt, aspect = 'default' } = props;

    const classes = [
        'banda-card__media',
        aspect !== 'default' && `banda-card__media--${aspect}`,
    ]
        .filter(Boolean)
        .join(' ');

    return el({
        tag: 'img',
        className: classes,
        attrs: { src, alt },
    });
}

export default Card;
