/**
 * Banda Rich Text Editor Component
 * 
 * A lightweight WYSIWYG editor using contenteditable.
 */

import { div, button as btnEl, span } from '../../core/element';
import type { ElementEvents } from '../../core/element';

/** Toolbar action */
type ToolbarAction = 'bold' | 'italic' | 'underline' | 'strikethrough' |
    'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'link' | 'code' | 'quote' | 'clear';

/** Rich text editor props */
export interface RichTextEditorProps {
    /** Initial HTML content */
    value?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Toolbar actions to show */
    toolbar?: ToolbarAction[];
    /** Minimum height */
    minHeight?: string;
    /** Maximum height */
    maxHeight?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Called when content changes */
    onChange?: (html: string) => void;
    /** Called on blur */
    onBlur?: () => void;
    /** Additional CSS class */
    className?: string;
}

const defaultToolbar: ToolbarAction[] = [
    'bold', 'italic', 'underline', 'strikethrough',
    'h1', 'h2', 'h3',
    'ul', 'ol',
    'link', 'code', 'quote', 'clear'
];

const toolbarIcons: Record<ToolbarAction, string> = {
    bold: '<b>B</b>',
    italic: '<i>I</i>',
    underline: '<u>U</u>',
    strikethrough: '<s>S</s>',
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    ul: '•',
    ol: '1.',
    link: '🔗',
    code: '</>',
    quote: '"',
    clear: '⌫',
};

const toolbarCommands: Record<ToolbarAction, { command: string; value?: string }> = {
    bold: { command: 'bold' },
    italic: { command: 'italic' },
    underline: { command: 'underline' },
    strikethrough: { command: 'strikeThrough' },
    h1: { command: 'formatBlock', value: 'h1' },
    h2: { command: 'formatBlock', value: 'h2' },
    h3: { command: 'formatBlock', value: 'h3' },
    ul: { command: 'insertUnorderedList' },
    ol: { command: 'insertOrderedList' },
    link: { command: 'createLink' },
    code: { command: 'formatBlock', value: 'pre' },
    quote: { command: 'formatBlock', value: 'blockquote' },
    clear: { command: 'removeFormat' },
};

/**
 * Creates a Rich Text Editor component.
 */
export function RichTextEditor(props: RichTextEditorProps = {}): HTMLElement {
    const {
        value = '',
        placeholder = 'Start typing...',
        toolbar = defaultToolbar,
        minHeight = '200px',
        maxHeight = '500px',
        disabled = false,
        onChange,
        onBlur,
        className = '',
    } = props;

    // Create editor content area
    const editor = div({
        className: 'banda-rte__editor',
        attrs: {
            contenteditable: disabled ? 'false' : 'true',
            'data-placeholder': placeholder,
        },
    });

    editor.innerHTML = value;
    editor.style.minHeight = minHeight;
    editor.style.maxHeight = maxHeight;

    // Handle input
    editor.addEventListener('input', () => {
        onChange?.(editor.innerHTML);
    });

    editor.addEventListener('blur', () => {
        onBlur?.();
    });

    // Execute command
    const execCommand = (action: ToolbarAction) => {
        const { command, value } = toolbarCommands[action];

        if (action === 'link') {
            const url = prompt('Enter URL:');
            if (url) {
                document.execCommand(command, false, url);
            }
        } else {
            document.execCommand(command, false, value);
        }

        editor.focus();
        onChange?.(editor.innerHTML);
    };

    // Create toolbar buttons
    const toolbarButtons = toolbar.map(action => {
        const btn = btnEl({
            className: 'banda-rte__btn',
            attrs: {
                type: 'button',
                title: action.charAt(0).toUpperCase() + action.slice(1),
                disabled: disabled,
            },
            onClick: () => execCommand(action),
        });
        btn.innerHTML = toolbarIcons[action];
        return btn;
    });

    // Create toolbar
    const toolbarEl = div({
        className: 'banda-rte__toolbar',
        children: toolbarButtons,
    });

    // Create container
    const container = div({
        className: `banda-rte ${disabled ? 'banda-rte--disabled' : ''} ${className}`.trim(),
        children: [toolbarEl, editor],
    });

    // Expose methods
    (container as any).getValue = () => editor.innerHTML;
    (container as any).setValue = (html: string) => {
        editor.innerHTML = html;
    };
    (container as any).focus = () => editor.focus();
    (container as any).clear = () => {
        editor.innerHTML = '';
        onChange?.('');
    };

    return container;
}

export default RichTextEditor;
