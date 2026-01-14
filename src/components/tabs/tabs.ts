/**
 * Banda Tabs Component
 * 
 * Tabbed interface for organizing content into sections.
 */

import { el, div, button } from '../../core/element';
import { createState, type State } from '../../core/state';

/** Tab item configuration */
export interface TabItem {
    /** Unique tab ID */
    id: string;
    /** Tab label */
    label: string;
    /** Tab icon (HTML string) */
    icon?: string;
    /** Tab content */
    content: HTMLElement | (() => HTMLElement);
    /** Whether tab is disabled */
    disabled?: boolean;
}

/** Tabs variant */
export type TabsVariant = 'default' | 'pills' | 'bordered';

/** Tabs size */
export type TabsSize = 'sm' | 'md' | 'lg';

/** Tabs props */
export interface TabsProps {
    /** Tab items */
    items: TabItem[];
    /** Initially active tab ID */
    defaultTab?: string;
    /** Tabs variant style */
    variant?: TabsVariant;
    /** Tabs size */
    size?: TabsSize;
    /** Stretch tabs to fill width */
    stretch?: boolean;
    /** Tab change callback */
    onChange?: (tabId: string) => void;
    /** Additional class names */
    className?: string;
}

/**
 * Creates a Tabs component.
 * 
 * @example
 * Tabs({
 *   items: [
 *     { id: 'tab1', label: 'Overview', content: OverviewPanel() },
 *     { id: 'tab2', label: 'Settings', content: SettingsPanel() },
 *     { id: 'tab3', label: 'Analytics', content: AnalyticsPanel() },
 *   ],
 *   defaultTab: 'tab1',
 * })
 */
export function Tabs(props: TabsProps): HTMLElement {
    const {
        items,
        defaultTab,
        variant = 'default',
        size = 'md',
        stretch = false,
        onChange,
        className = '',
    } = props;

    const activeTab = createState(defaultTab || items[0]?.id || '');

    const containerClasses = [
        'banda-tabs',
        variant !== 'default' && `banda-tabs--${variant}`,
        size !== 'md' && `banda-tabs--${size}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const listClasses = [
        'banda-tabs__list',
        stretch && 'banda-tabs__list--stretch',
    ]
        .filter(Boolean)
        .join(' ');

    // Create tab buttons
    const tabButtons = items.map((item) => {
        const isActive = activeTab.get() === item.id;
        const tabClasses = [
            'banda-tabs__tab',
            isActive && 'banda-tabs__tab--active',
        ]
            .filter(Boolean)
            .join(' ');

        const tabChildren: (HTMLElement | string)[] = [];
        if (item.icon) {
            tabChildren.push(el({ tag: 'span', className: 'banda-tabs__tab-icon', html: item.icon }));
        }
        tabChildren.push(item.label);

        return button({
            className: tabClasses,
            children: tabChildren,
            attrs: {
                type: 'button',
                role: 'tab',
                'aria-selected': isActive,
                'aria-controls': `panel-${item.id}`,
                disabled: item.disabled || false,
                'data-tab-id': item.id,
            },
            onClick: () => {
                if (item.disabled) return;
                activeTab.set(item.id);
                onChange?.(item.id);
                updateTabs();
            },
        });
    });

    // Create tab panels  
    const tabPanels = items.map((item) => {
        const isActive = activeTab.get() === item.id;
        const content = typeof item.content === 'function' ? item.content() : item.content;

        return div({
            className: `banda-tabs__panel ${isActive ? 'banda-tabs__panel--active' : ''}`,
            attrs: {
                role: 'tabpanel',
                id: `panel-${item.id}`,
                'aria-labelledby': `tab-${item.id}`,
            },
            children: [content],
        });
    });

    const tabList = div({
        className: listClasses,
        attrs: { role: 'tablist' },
        children: tabButtons,
    });

    const panelsContainer = div({
        children: tabPanels,
    });

    const container = div({
        className: containerClasses,
        children: [tabList, panelsContainer],
    });

    // Update function for re-rendering tabs
    function updateTabs() {
        const currentActiveId = activeTab.get();

        // Update tab buttons
        tabButtons.forEach((btn, index) => {
            const item = items[index];
            if (!item) return;
            const isActive = item.id === currentActiveId;
            btn.classList.toggle('banda-tabs__tab--active', isActive);
            btn.setAttribute('aria-selected', String(isActive));
        });

        // Update panels
        tabPanels.forEach((panel, index) => {
            const item = items[index];
            if (!item) return;
            const isActive = item.id === currentActiveId;
            panel.classList.toggle('banda-tabs__panel--active', isActive);
        });
    }

    return container;
}

/**
 * Creates a controlled Tabs component.
 */
export function createControlledTabs(
    props: Omit<TabsProps, 'defaultTab'> & { activeTab: State<string> }
): HTMLElement {
    const { items, activeTab, variant, size, stretch, onChange, className } = props;

    // Subscribe to external state changes
    activeTab.subscribe(() => {
        // Re-render would be needed here in a real reactive system
    });

    return Tabs({
        items,
        defaultTab: activeTab.get(),
        variant,
        size,
        stretch,
        onChange: (tabId) => {
            activeTab.set(tabId);
            onChange?.(tabId);
        },
        className,
    });
}

export default Tabs;
