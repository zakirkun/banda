/**
 * Banda Layout Components
 * 
 * Composable layout primitives for consistent spacing and alignment.
 */

import { el, div } from '../../core/element';

/** Spacing scale values */
export type SpaceScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

/** Alignment options */
export type Alignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/** Justify options */
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// ============================================================================
// STACK
// ============================================================================

export interface StackProps {
    /** Gap between children */
    space?: SpaceScale;
    /** Align items along cross axis */
    align?: Alignment;
    /** Justify items along main axis */
    justify?: Justify;
    /** Child elements */
    children?: (HTMLElement | string | null | undefined)[];
    /** Additional class names */
    className?: string;
}

/**
 * Stack - Vertical flex layout with consistent spacing.
 * 
 * @example
 * Stack({ space: 4, children: [
 *   h2({ text: 'Title' }),
 *   p({ text: 'Description' }),
 *   Button({ label: 'Action' }),
 * ]})
 */
export function Stack(props: StackProps = {}): HTMLElement {
    const { space = 4, align, justify, children = [], className = '' } = props;

    const classes = [
        'banda-stack',
        `banda-stack--space-${space}`,
        align && `banda-stack--align-${align}`,
        justify && `banda-stack--justify-${justify}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return div({ className: classes, children });
}

// ============================================================================
// INLINE
// ============================================================================

export interface InlineProps {
    /** Gap between children */
    space?: SpaceScale;
    /** Align items along cross axis */
    align?: Alignment;
    /** Justify items along main axis */
    justify?: Justify;
    /** Prevent wrapping */
    nowrap?: boolean;
    /** Child elements */
    children?: (HTMLElement | string | null | undefined)[];
    /** Additional class names */
    className?: string;
}

/**
 * Inline - Horizontal flex layout with wrapping support.
 * 
 * @example
 * Inline({ space: 2, align: 'center', children: [
 *   Badge({ label: 'React' }),
 *   Badge({ label: 'TypeScript' }),
 *   Badge({ label: 'Banda' }),
 * ]})
 */
export function Inline(props: InlineProps = {}): HTMLElement {
    const { space = 2, align, justify, nowrap = false, children = [], className = '' } = props;

    const classes = [
        'banda-inline',
        `banda-inline--space-${space}`,
        align && `banda-inline--align-${align}`,
        justify && `banda-inline--justify-${justify}`,
        nowrap && 'banda-inline--nowrap',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return div({ className: classes, children });
}

// ============================================================================
// GRID
// ============================================================================

export interface GridProps {
    /** Number of columns */
    cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto-fit' | 'auto-fill';
    /** Gap between cells */
    gap?: SpaceScale;
    /** Align items */
    align?: 'start' | 'center' | 'end' | 'stretch';
    /** Justify items */
    justify?: 'start' | 'center' | 'end' | 'stretch';
    /** Minimum column width for auto-fit/fill (CSS value) */
    minWidth?: string;
    /** Child elements */
    children?: (HTMLElement | string | null | undefined)[];
    /** Additional class names */
    className?: string;
}

/**
 * Grid - CSS Grid layout with common configurations.
 * 
 * @example
 * // Fixed 3 columns
 * Grid({ cols: 3, gap: 4, children: cards })
 * 
 * // Responsive auto-fit
 * Grid({ cols: 'auto-fit', minWidth: '250px', gap: 6, children: cards })
 */
export function Grid(props: GridProps = {}): HTMLElement {
    const {
        cols = 1,
        gap = 4,
        align,
        justify,
        minWidth,
        children = [],
        className = ''
    } = props;

    const isAuto = cols === 'auto-fit' || cols === 'auto-fill';

    const classes = [
        'banda-grid',
        isAuto ? `banda-grid--${cols}` : `banda-grid--cols-${cols}`,
        `banda-grid--gap-${gap}`,
        align && `banda-grid--align-${align}`,
        justify && `banda-grid--justify-${justify}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const style: Partial<CSSStyleDeclaration> = {};
    if (minWidth && isAuto) {
        (style as Record<string, string>)['--banda-grid-min'] = minWidth;
    }

    return div({ className: classes, children, style });
}

// ============================================================================
// DIVIDER
// ============================================================================

export interface DividerProps {
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Spacing around divider */
    space?: 1 | 2 | 4 | 6 | 8;
    /** Divider style */
    variant?: 'solid' | 'dashed' | 'dotted';
    /** Divider color */
    color?: 'default' | 'light' | 'dark';
    /** Additional class names */
    className?: string;
}

/**
 * Divider - Visual separator for content sections.
 * 
 * @example
 * Divider({ space: 4 })
 * Divider({ orientation: 'vertical' })
 * Divider({ variant: 'dashed', color: 'light' })
 */
export function Divider(props: DividerProps = {}): HTMLElement {
    const {
        orientation = 'horizontal',
        space,
        variant = 'solid',
        color = 'default',
        className = ''
    } = props;

    const classes = [
        'banda-divider',
        `banda-divider--${orientation}`,
        space && `banda-divider--space-${space}`,
        variant !== 'solid' && `banda-divider--${variant}`,
        color !== 'default' && `banda-divider--${color}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return el({ tag: 'hr', className: classes, attrs: { role: 'separator' } });
}

// ============================================================================
// SPACER
// ============================================================================

export interface SpacerProps {
    /** Fixed size (uses flex: none) */
    size?: 1 | 2 | 4 | 6 | 8;
}

/**
 * Spacer - Flexible or fixed space filler.
 * 
 * @example
 * // Flexible (pushes content apart)
 * Inline({ children: [Logo(), Spacer(), NavButtons()] })
 * 
 * // Fixed size
 * Stack({ children: [Header(), Spacer({ size: 8 }), Content()] })
 */
export function Spacer(props: SpacerProps = {}): HTMLElement {
    const { size } = props;

    const classes = [
        'banda-spacer',
        size && `banda-spacer--${size}`,
    ]
        .filter(Boolean)
        .join(' ');

    return div({ className: classes, attrs: { 'aria-hidden': true } });
}

// ============================================================================
// CENTER
// ============================================================================

export interface CenterProps {
    /** Fill parent dimensions */
    full?: boolean;
    /** Maximum width */
    maxWidth?: string;
    /** Child elements */
    children?: (HTMLElement | string | null | undefined)[];
    /** Additional class names */
    className?: string;
}

/**
 * Center - Centers content both horizontally and vertically.
 * 
 * @example
 * Center({ children: [Spinner()] })
 * Center({ full: true, children: [EmptyState()] })
 */
export function Center(props: CenterProps = {}): HTMLElement {
    const { full = false, maxWidth, children = [], className = '' } = props;

    const classes = [
        'banda-center',
        full && 'banda-center--full',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const style: Partial<CSSStyleDeclaration> = {};
    if (maxWidth) {
        style.maxWidth = maxWidth;
    }

    return div({ className: classes, children, style });
}

// ============================================================================
// CONTAINER
// ============================================================================

export interface ContainerProps {
    /** Max width size */
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    /** Child elements */
    children?: (HTMLElement | string | null | undefined)[];
    /** Additional class names */
    className?: string;
}

/**
 * Container - Centered content container with max-width.
 * 
 * @example
 * Container({ size: 'lg', children: [PageContent()] })
 */
export function Container(props: ContainerProps = {}): HTMLElement {
    const { size = 'lg', children = [], className = '' } = props;

    const classes = [
        'banda-layout-container',
        `banda-layout-container--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return div({ className: classes, children });
}

export default { Stack, Inline, Grid, Divider, Spacer, Center, Container };
