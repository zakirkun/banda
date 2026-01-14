/**
 * Banda Badge Component
 * 
 * A small label component for status, categories, or counts.
 */

import { el, span, button } from '../../core/element';
import type { ElementEvents } from '../../core/element';

/** Badge color variants */
export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/** Badge style type */
export type BadgeStyle = 'subtle' | 'solid' | 'outline';

/** Badge size options */
export type BadgeSize = 'sm' | 'md' | 'lg';

/** Badge props interface */
export interface BadgeProps extends ElementEvents {
    /** Badge text content */
    label: string;
    /** Color variant */
    variant?: BadgeVariant;
    /** Style type */
    styleType?: BadgeStyle;
    /** Badge size */
    size?: BadgeSize;
    /** Show dot indicator */
    dot?: boolean;
    /** Animate the dot (pulse) */
    dotPulse?: boolean;
    /** Show close/dismiss button */
    dismissible?: boolean;
    /** Callback when dismissed */
    onDismiss?: () => void;
    /** Additional class names */
    className?: string;
}

/**
 * Creates a Badge component.
 * 
 * @example
 * // Simple badge
 * Badge({ label: 'New' })
 * 
 * // Status badge with dot
 * Badge({ label: 'Active', variant: 'success', dot: true })
 * 
 * // Dismissible badge
 * Badge({
 *   label: 'Tag',
 *   dismissible: true,
 *   onDismiss: () => console.log('Dismissed'),
 * })
 */
export function Badge(props: BadgeProps): HTMLElement {
    const {
        label,
        variant = 'default',
        styleType = 'subtle',
        size = 'md',
        dot = false,
        dotPulse = false,
        dismissible = false,
        onDismiss,
        className = '',
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = props;

    const classes = [
        'banda-badge',
        `banda-badge--${variant}`,
        styleType !== 'subtle' && `banda-badge--${styleType}`,
        size !== 'md' && `banda-badge--${size}`,
        dismissible && 'banda-badge--dismissible',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const children: (HTMLElement | string)[] = [];

    // Dot indicator
    if (dot) {
        const dotClasses = [
            'banda-badge__dot',
            dotPulse && 'banda-badge__dot--pulse',
        ]
            .filter(Boolean)
            .join(' ');
        children.push(span({ className: dotClasses }));
    }

    // Label text
    children.push(label);

    // Dismiss button
    if (dismissible) {
        children.push(
            button({
                className: 'banda-badge__close',
                attrs: {
                    'aria-label': 'Dismiss',
                    type: 'button',
                },
                onClick: (e) => {
                    e.stopPropagation();
                    onDismiss?.();
                },
            })
        );
    }

    return span({
        className: classes,
        children,
        onClick,
        onMouseEnter,
        onMouseLeave,
        attrs: {
            role: dismissible ? 'button' : undefined,
        } as Record<string, string | boolean | number>,
    });
}

/**
 * Creates a Badge Group container.
 * 
 * @example
 * BadgeGroup([
 *   Badge({ label: 'React', variant: 'primary' }),
 *   Badge({ label: 'TypeScript', variant: 'primary' }),
 *   Badge({ label: 'Banda', variant: 'secondary' }),
 * ])
 */
export function BadgeGroup(badges: HTMLElement[]): HTMLElement {
    return el({
        tag: 'div',
        className: 'banda-badge-group',
        children: badges,
    });
}

/**
 * Creates a status indicator badge.
 */
export function StatusBadge(props: {
    status: 'online' | 'offline' | 'away' | 'busy';
    showLabel?: boolean;
}): HTMLElement {
    const { status, showLabel = true } = props;

    const statusConfig = {
        online: { label: 'Online', variant: 'success' as BadgeVariant },
        offline: { label: 'Offline', variant: 'default' as BadgeVariant },
        away: { label: 'Away', variant: 'warning' as BadgeVariant },
        busy: { label: 'Busy', variant: 'danger' as BadgeVariant },
    };

    const config = statusConfig[status];

    return Badge({
        label: showLabel ? config.label : '',
        variant: config.variant,
        dot: true,
        dotPulse: status === 'online',
        size: showLabel ? 'md' : 'sm',
    });
}

export default Badge;
