/**
 * Data Table Examples
 */

import { div, h3, p } from '../../core/element';
import { Stack } from '../layout/layout';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Table } from './table';

// Sample data
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor', status: 'active' },
    { id: 5, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'pending' },
    { id: 6, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Admin', status: 'active' },
    { id: 7, name: 'George Lucas', email: 'george@example.com', role: 'User', status: 'inactive' },
    { id: 8, name: 'Helen Troy', email: 'helen@example.com', role: 'Editor', status: 'active' },
];

export function TableExamples(): HTMLElement {
    return Stack({
        space: 8,
        children: [
            // Basic table
            div({
                children: [
                    h3({ text: 'Basic Table' }),
                    Table({
                        columns: [
                            { key: 'name', label: 'Name', sortable: true },
                            { key: 'email', label: 'Email' },
                            { key: 'role', label: 'Role', sortable: true },
                        ],
                        data: users.slice(0, 4),
                        rowKey: (row) => row.id,
                    }),
                ],
            }),

            // With custom renderers
            div({
                children: [
                    h3({ text: 'Custom Renderers' }),
                    p({ text: 'Render custom content in cells' }),
                    Table({
                        columns: [
                            { key: 'name', label: 'Name', sortable: true },
                            { key: 'email', label: 'Email' },
                            {
                                key: 'status',
                                label: 'Status',
                                render: (value) => {
                                    const variant = value === 'active' ? 'success'
                                        : value === 'pending' ? 'warning'
                                            : 'secondary';
                                    return Badge({
                                        label: value.charAt(0).toUpperCase() + value.slice(1),
                                        variant,
                                        styleType: 'solid',
                                    });
                                },
                            },
                            {
                                key: 'id',
                                label: 'Actions',
                                align: 'right',
                                render: (_value, row) => Button({
                                    label: 'View',
                                    variant: 'ghost',
                                    size: 'sm',
                                    onClick: () => console.log('View:', row),
                                }),
                            },
                        ],
                        data: users.slice(0, 5),
                        rowKey: (row) => row.id,
                    }),
                ],
            }),

            // With selection and pagination
            div({
                children: [
                    h3({ text: 'Selection & Pagination' }),
                    Table({
                        columns: [
                            { key: 'name', label: 'Name', sortable: true },
                            { key: 'email', label: 'Email' },
                            { key: 'role', label: 'Role' },
                            {
                                key: 'status',
                                label: 'Status',
                                render: (value) => Badge({
                                    label: value,
                                    variant: value === 'active' ? 'success' : 'secondary',
                                }),
                            },
                        ],
                        data: users,
                        rowKey: (row) => row.id,
                        selectable: true,
                        onSelectionChange: (keys) => console.log('Selected:', keys),
                        pagination: {
                            enabled: true,
                            pageSize: 5,
                        },
                    }),
                ],
            }),

            // Striped variant
            div({
                children: [
                    h3({ text: 'Striped Variant' }),
                    Table({
                        columns: [
                            { key: 'name', label: 'Name' },
                            { key: 'email', label: 'Email' },
                            { key: 'role', label: 'Role' },
                        ],
                        data: users.slice(0, 4),
                        rowKey: (row) => row.id,
                        variant: 'striped',
                    }),
                ],
            }),

            // Empty state
            div({
                children: [
                    h3({ text: 'Empty State' }),
                    Table({
                        columns: [
                            { key: 'name', label: 'Name' },
                            { key: 'email', label: 'Email' },
                        ],
                        data: [],
                        emptyText: 'No users found. Try adjusting your filters.',
                    }),
                ],
            }),
        ],
    });
}

export default TableExamples;
