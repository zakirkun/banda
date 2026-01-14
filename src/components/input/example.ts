/**
 * Input Component Example
 */

import { div, h2, span } from '../../core/element';
import { Input, Textarea } from './input';

function Section(title: string, children: HTMLElement[]): HTMLElement {
    return div({
        style: { marginBottom: '2rem' },
        children: [
            h2({ text: title, style: { marginBottom: '1rem' } }),
            div({
                style: { display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' },
                children,
            }),
        ],
    });
}

export function InputExamples(): HTMLElement {
    return div({
        children: [
            // Basic Inputs
            Section('Basic Inputs', [
                Input({ placeholder: 'Basic text input' }),
                Input({ label: 'Email', type: 'email', placeholder: 'you@example.com' }),
                Input({ label: 'Password', type: 'password', placeholder: 'Enter password' }),
            ]),

            // Input Sizes
            Section('Input Sizes', [
                Input({ placeholder: 'Small input', size: 'sm' }),
                Input({ placeholder: 'Medium input (default)', size: 'md' }),
                Input({ placeholder: 'Large input', size: 'lg' }),
            ]),

            // Validation States
            Section('Validation States', [
                Input({
                    label: 'Username',
                    placeholder: 'Enter username',
                    helperText: 'Choose a unique username',
                }),
                Input({
                    label: 'Email (Error)',
                    type: 'email',
                    value: 'invalid-email',
                    state: 'error',
                    errorMessage: 'Please enter a valid email address',
                }),
                Input({
                    label: 'Email (Success)',
                    type: 'email',
                    value: 'valid@email.com',
                    state: 'success',
                    helperText: 'Email is available!',
                }),
            ]),

            // With Prefix/Suffix
            Section('With Prefix & Suffix', [
                Input({ label: 'Website', prefix: 'https://', placeholder: 'example.com' }),
                Input({ label: 'Price', suffix: 'USD', type: 'number', placeholder: '0.00' }),
                Input({ label: 'Twitter', prefix: '@', placeholder: 'username' }),
            ]),

            // Required & Disabled
            Section('Required & Disabled', [
                Input({ label: 'Required Field', required: true, placeholder: 'This field is required' }),
                Input({ label: 'Disabled Input', disabled: true, value: 'Cannot edit this' }),
                Input({ label: 'Read-only', readonly: true, value: 'Read only value' }),
            ]),

            // Textarea
            Section('Textarea', [
                Textarea({ label: 'Message', placeholder: 'Enter your message...' }),
                Textarea({
                    label: 'Bio',
                    placeholder: 'Tell us about yourself',
                    helperText: 'Max 250 characters',
                }),
            ]),
        ],
    });
}

export default InputExamples;
