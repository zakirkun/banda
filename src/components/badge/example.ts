/**
 * Badge Component Example
 */

import { div, h2 } from '../../core/element';
import { Badge, BadgeGroup, StatusBadge } from './badge';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return div({
        style: { marginBottom: '2rem' },
        children: [
            h2({ text: title, style: { marginBottom: '1rem' } }),
            div({
                style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' },
                children,
            }),
        ],
    });
}

export function BadgeExamples(): HTMLElement {
    return div({
        children: [
            // Color Variants
            Section('Badge Variants', [
                Badge({ label: 'Default', variant: 'default' }),
                Badge({ label: 'Primary', variant: 'primary' }),
                Badge({ label: 'Secondary', variant: 'secondary' }),
                Badge({ label: 'Success', variant: 'success' }),
                Badge({ label: 'Warning', variant: 'warning' }),
                Badge({ label: 'Danger', variant: 'danger' }),
            ]),

            // Style Types
            Section('Style Types', [
                Badge({ label: 'Subtle', variant: 'primary', styleType: 'subtle' }),
                Badge({ label: 'Solid', variant: 'primary', styleType: 'solid' }),
                Badge({ label: 'Outline', variant: 'primary', styleType: 'outline' }),
            ]),

            // Sizes
            Section('Sizes', [
                Badge({ label: 'Small', variant: 'primary', size: 'sm' }),
                Badge({ label: 'Medium', variant: 'primary', size: 'md' }),
                Badge({ label: 'Large', variant: 'primary', size: 'lg' }),
            ]),

            // With Dot Indicators
            Section('With Dot Indicators', [
                Badge({ label: 'Active', variant: 'success', dot: true }),
                Badge({ label: 'Live', variant: 'danger', dot: true, dotPulse: true }),
                Badge({ label: 'Pending', variant: 'warning', dot: true }),
                Badge({ label: 'Offline', variant: 'default', dot: true }),
            ]),

            // Status Badges
            Section('Status Badges', [
                StatusBadge({ status: 'online' }),
                StatusBadge({ status: 'away' }),
                StatusBadge({ status: 'busy' }),
                StatusBadge({ status: 'offline' }),
            ]),

            // Solid Variants
            Section('Solid Badges', [
                Badge({ label: 'Solid Default', variant: 'default', styleType: 'solid' }),
                Badge({ label: 'Solid Success', variant: 'success', styleType: 'solid' }),
                Badge({ label: 'Solid Warning', variant: 'warning', styleType: 'solid' }),
                Badge({ label: 'Solid Danger', variant: 'danger', styleType: 'solid' }),
            ]),

            // Dismissible
            Section('Dismissible Badges', [
                Badge({
                    label: 'Click to dismiss',
                    variant: 'primary',
                    dismissible: true,
                    onDismiss: () => alert('Badge dismissed!'),
                }),
                Badge({
                    label: 'Tag',
                    variant: 'secondary',
                    dismissible: true,
                    onDismiss: () => alert('Tag removed!'),
                }),
            ]),

            // Badge Group
            Section('Badge Group', [
                BadgeGroup([
                    Badge({ label: 'React', variant: 'primary' }),
                    Badge({ label: 'TypeScript', variant: 'primary' }),
                    Badge({ label: 'Banda', variant: 'secondary' }),
                    Badge({ label: 'CSS', variant: 'success' }),
                ]),
            ]),
        ],
    });
}

export default BadgeExamples;
