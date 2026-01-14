/**
 * Banda Data Table Component
 * 
 * Feature-rich data table with sorting, pagination, and selection.
 */

import { el, div, span, button, input } from '../../core/element';
import { createState } from '../../core/state';
import { Spinner } from '../feedback/feedback';

// ============================================================================
// TYPES
// ============================================================================

/** Column definition */
export interface TableColumn<T = any> {
    /** Column key (property name in data) */
    key: string;
    /** Column header label */
    label: string;
    /** Column width */
    width?: string;
    /** Enable sorting */
    sortable?: boolean;
    /** Custom render function */
    render?: (value: any, row: T, index: number) => HTMLElement | string;
    /** Text alignment */
    align?: 'left' | 'center' | 'right';
}

/** Sort direction */
export type SortDirection = 'asc' | 'desc' | null;

/** Sort state */
export interface SortState {
    key: string | null;
    direction: SortDirection;
}

/** Pagination options */
export interface PaginationOptions {
    enabled: boolean;
    pageSize: number;
    pageSizeOptions?: number[];
}

/** Table props */
export interface TableProps<T = any> {
    /** Column definitions */
    columns: TableColumn<T>[];
    /** Data rows */
    data: T[];
    /** Row key extractor */
    rowKey?: (row: T, index: number) => string | number;
    /** Enable row selection */
    selectable?: boolean;
    /** Selected row keys */
    selectedKeys?: (string | number)[];
    /** Selection change callback */
    onSelectionChange?: (keys: (string | number)[]) => void;
    /** Row click callback */
    onRowClick?: (row: T, index: number) => void;
    /** Table variant */
    variant?: 'default' | 'striped' | 'compact' | 'borderless';
    /** Loading state */
    loading?: boolean;
    /** Empty state message */
    emptyText?: string;
    /** Pagination options */
    pagination?: PaginationOptions;
    /** Sort change callback */
    onSortChange?: (sort: SortState) => void;
    /** Additional class names */
    className?: string;
}

/** Sort icons */
const SORT_ASC = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414l-3.293 3.293a1 1 0 01-1.414 0z"/></svg>';
const SORT_DESC = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z"/></svg>';
const SORT_NEUTRAL = '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>';
const CHEVRON_LEFT = '<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
const CHEVRON_RIGHT = '<svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>';

/**
 * Creates a Data Table component.
 * 
 * @example
 * Table({
 *   columns: [
 *     { key: 'name', label: 'Name', sortable: true },
 *     { key: 'email', label: 'Email' },
 *     { key: 'status', label: 'Status', render: (v) => Badge({ label: v }) },
 *   ],
 *   data: users,
 *   selectable: true,
 *   pagination: { enabled: true, pageSize: 10 },
 * })
 */
export function Table<T extends Record<string, any>>(props: TableProps<T>): HTMLElement {
    const {
        columns,
        data,
        rowKey = (_row, index) => index,
        selectable = false,
        selectedKeys: initialSelected = [],
        onSelectionChange,
        onRowClick,
        variant = 'default',
        loading = false,
        emptyText = 'No data available',
        pagination,
        onSortChange,
        className = '',
    } = props;

    const sortState = createState<SortState>({ key: null, direction: null });
    const currentPage = createState(1);
    const selectedKeys = createState<(string | number)[]>(initialSelected);

    // Get sorted and paginated data
    function getProcessedData(): T[] {
        let result = [...data];

        // Sort
        const sort = sortState.get();
        if (sort.key && sort.direction) {
            result.sort((a, b) => {
                const aVal = a[sort.key!];
                const bVal = b[sort.key!];
                const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                return sort.direction === 'asc' ? cmp : -cmp;
            });
        }

        return result;
    }

    function getPaginatedData(): T[] {
        let result = getProcessedData();

        // Paginate
        if (pagination?.enabled) {
            const page = currentPage.get();
            const start = (page - 1) * pagination.pageSize;
            result = result.slice(start, start + pagination.pageSize);
        }

        return result;
    }

    function toggleSort(key: string) {
        const current = sortState.get();
        let direction: SortDirection;

        if (current.key !== key) {
            direction = 'asc';
        } else if (current.direction === 'asc') {
            direction = 'desc';
        } else {
            direction = null;
        }

        const newSort = { key: direction ? key : null, direction };
        sortState.set(newSort);
        onSortChange?.(newSort);
        renderTable();
    }

    function toggleSelection(key: string | number) {
        const current = selectedKeys.get();
        const newKeys = current.includes(key)
            ? current.filter(k => k !== key)
            : [...current, key];
        selectedKeys.set(newKeys);
        onSelectionChange?.(newKeys);
        renderTable();
    }

    function toggleAllSelection() {
        const current = selectedKeys.get();
        const allKeys = data.map((row, i) => rowKey(row, i));
        const allSelected = allKeys.every(k => current.includes(k));

        const newKeys = allSelected ? [] : allKeys;
        selectedKeys.set(newKeys);
        onSelectionChange?.(newKeys);
        renderTable();
    }

    // Build header
    function buildHeader(): HTMLElement {
        const cells: HTMLElement[] = [];

        if (selectable) {
            const allKeys = data.map((row, i) => rowKey(row, i));
            const allSelected = allKeys.length > 0 && allKeys.every(k => selectedKeys.get().includes(k));

            cells.push(
                el({
                    tag: 'th',
                    className: 'banda-table__th banda-table__checkbox',
                    children: [
                        input({
                            attrs: { type: 'checkbox', checked: allSelected },
                            onChange: toggleAllSelection,
                        }),
                    ],
                })
            );
        }

        for (const col of columns) {
            const sort = sortState.get();
            const isSorted = sort.key === col.key;
            const classes = ['banda-table__th'];
            if (col.sortable) classes.push('banda-table__th--sortable');
            if (isSorted) classes.push('banda-table__th--sorted');

            const content: HTMLElement[] = [span({ text: col.label })];

            if (col.sortable) {
                let icon = SORT_NEUTRAL;
                if (isSorted && sort.direction === 'asc') icon = SORT_ASC;
                if (isSorted && sort.direction === 'desc') icon = SORT_DESC;
                content.push(span({ className: 'banda-table__sort-icon', html: icon }));
            }

            cells.push(
                el({
                    tag: 'th',
                    className: classes.join(' '),
                    style: col.width ? { width: col.width } : undefined,
                    children: [div({ className: 'banda-table__th-content', children: content })],
                    onClick: col.sortable ? () => toggleSort(col.key) : undefined,
                })
            );
        }

        return el({
            tag: 'thead',
            className: 'banda-table__head',
            children: [
                el({ tag: 'tr', className: 'banda-table__header-row', children: cells }),
            ],
        });
    }

    // Build body
    function buildBody(): HTMLElement {
        const rows = getPaginatedData();

        if (rows.length === 0 && !loading) {
            return el({
                tag: 'tbody',
                className: 'banda-table__body',
                children: [
                    el({
                        tag: 'tr',
                        children: [
                            el({
                                tag: 'td',
                                attrs: { colspan: String(columns.length + (selectable ? 1 : 0)) },
                                children: [
                                    div({
                                        className: 'banda-table__empty',
                                        children: [
                                            div({ className: 'banda-table__empty-icon', text: '📭' }),
                                            div({ className: 'banda-table__empty-text', text: emptyText }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }

        if (loading) {
            return el({
                tag: 'tbody',
                className: 'banda-table__body',
                children: [
                    el({
                        tag: 'tr',
                        children: [
                            el({
                                tag: 'td',
                                attrs: { colspan: String(columns.length + (selectable ? 1 : 0)) },
                                children: [
                                    div({
                                        className: 'banda-table__loading',
                                        children: [
                                            Spinner({ size: 'md' }),
                                            span({ text: 'Loading...' }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            });
        }

        const rowElements = rows.map((row, index) => {
            const key = rowKey(row, index);
            const isSelected = selectedKeys.get().includes(key);
            const classes = ['banda-table__row'];
            if (isSelected) classes.push('banda-table__row--selected');

            const cells: HTMLElement[] = [];

            if (selectable) {
                cells.push(
                    el({
                        tag: 'td',
                        className: 'banda-table__td banda-table__checkbox',
                        children: [
                            input({
                                attrs: { type: 'checkbox', checked: isSelected },
                                onChange: () => toggleSelection(key),
                            }),
                        ],
                    })
                );
            }

            for (const col of columns) {
                const value = row[col.key];
                const content = col.render
                    ? col.render(value, row, index)
                    : String(value ?? '');

                cells.push(
                    el({
                        tag: 'td',
                        className: 'banda-table__td',
                        style: col.align ? { textAlign: col.align } : undefined,
                        children: typeof content === 'string' ? undefined : [content],
                        text: typeof content === 'string' ? content : undefined,
                    })
                );
            }

            return el({
                tag: 'tr',
                className: classes.join(' '),
                children: cells,
                onClick: onRowClick ? () => onRowClick(row, index) : undefined,
            });
        });

        return el({
            tag: 'tbody',
            className: 'banda-table__body',
            children: rowElements,
        });
    }

    // Build pagination
    function buildPagination(): HTMLElement | null {
        if (!pagination?.enabled) return null;

        const page = currentPage.get();
        const totalPages = Math.ceil(data.length / pagination.pageSize);
        const start = (page - 1) * pagination.pageSize + 1;
        const end = Math.min(page * pagination.pageSize, data.length);

        return div({
            className: 'banda-table__pagination',
            children: [
                span({
                    className: 'banda-table__page-info',
                    text: `Showing ${start}-${end} of ${data.length}`,
                }),
                div({
                    className: 'banda-table__page-controls',
                    children: [
                        button({
                            className: 'banda-table__page-btn',
                            html: CHEVRON_LEFT,
                            attrs: { type: 'button', disabled: page <= 1 },
                            onClick: () => {
                                if (page > 1) {
                                    currentPage.set(page - 1);
                                    renderTable();
                                }
                            },
                        }),
                        span({ text: `Page ${page} of ${totalPages}` }),
                        button({
                            className: 'banda-table__page-btn',
                            html: CHEVRON_RIGHT,
                            attrs: { type: 'button', disabled: page >= totalPages },
                            onClick: () => {
                                if (page < totalPages) {
                                    currentPage.set(page + 1);
                                    renderTable();
                                }
                            },
                        }),
                    ],
                }),
            ],
        });
    }

    // Build table
    const variantClass = variant !== 'default' ? `banda-table--${variant}` : '';

    let tableElement: HTMLElement;
    let paginationElement: HTMLElement | null;

    function buildTable(): HTMLElement {
        return el({
            tag: 'table',
            className: `banda-table ${variantClass}`,
            children: [buildHeader(), buildBody()],
        });
    }

    function renderTable() {
        const newTable = buildTable();
        tableElement.replaceWith(newTable);
        tableElement = newTable;

        if (pagination?.enabled) {
            const newPagination = buildPagination();
            if (paginationElement && newPagination) {
                paginationElement.replaceWith(newPagination);
                paginationElement = newPagination;
            }
        }
    }

    tableElement = buildTable();
    paginationElement = buildPagination();

    const wrapper = div({
        className: `banda-table-wrapper ${className}`,
        children: [tableElement, paginationElement].filter(Boolean) as HTMLElement[],
    });

    return wrapper;
}

export default Table;
