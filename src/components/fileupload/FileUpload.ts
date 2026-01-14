/**
 * Banda FileUpload Component
 * 
 * A flexible file upload component with drag-and-drop, previews, and validation.
 */

import { el, div, span, button } from '../../core/element';

/** File upload state */
export type FileUploadState = 'default' | 'error' | 'success';

/** File error types */
export type FileErrorType = 'type' | 'size' | 'count';

/** File error info */
export interface FileError {
    file: File;
    type: FileErrorType;
    message: string;
}

/** FileUpload props interface */
export interface FileUploadProps {
    /** Input name attribute */
    name?: string;
    /** Accepted file types (e.g., 'image/*', '.pdf,.doc') */
    accept?: string;
    /** Allow multiple files */
    multiple?: boolean;
    /** Maximum file size in bytes */
    maxSize?: number;
    /** Maximum number of files */
    maxFiles?: number;
    /** Whether upload is disabled */
    disabled?: boolean;
    /** Label text */
    label?: string;
    /** Helper text below dropzone */
    helperText?: string;
    /** Text shown when dragging over */
    dragActiveText?: string;
    /** Text shown in dropzone */
    dropzoneText?: string;
    /** Show image previews */
    showPreview?: boolean;
    /** Show file list */
    showFileList?: boolean;
    /** Validation state */
    state?: FileUploadState;
    /** Error message */
    errorMessage?: string;
    /** Called when files are selected */
    onSelect?: (files: File[]) => void;
    /** Called when files change (including removes) */
    onChange?: (files: File[]) => void;
    /** Called when validation error occurs */
    onError?: (errors: FileError[]) => void;
    /** ARIA label */
    ariaLabel?: string;
    /** Additional class names */
    className?: string;
}

/**
 * Format file size to human readable string
 */
function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

/**
 * Check if file type is accepted
 */
function isFileTypeAccepted(file: File, accept?: string): boolean {
    if (!accept) return true;

    const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

    return acceptedTypes.some(accepted => {
        if (accepted.startsWith('.')) {
            return fileExt === accepted;
        }
        if (accepted.endsWith('/*')) {
            const category = accepted.replace('/*', '');
            return fileType.startsWith(category + '/');
        }
        return fileType === accepted;
    });
}

/**
 * Creates a FileUpload component.
 * 
 * @example
 * // Basic file upload
 * FileUpload({ 
 *   label: 'Upload Files',
 *   onSelect: (files) => console.log(files)
 * })
 * 
 * // Image upload with preview
 * FileUpload({
 *   accept: 'image/*',
 *   multiple: true,
 *   showPreview: true,
 *   maxSize: 5 * 1024 * 1024, // 5MB
 * })
 */
export function FileUpload(props: FileUploadProps = {}): HTMLElement {
    const {
        name,
        accept,
        multiple = false,
        maxSize,
        maxFiles,
        disabled = false,
        label,
        helperText,
        dragActiveText = 'Drop files here',
        dropzoneText = 'Drag and drop files here, or click to browse',
        showPreview = false,
        showFileList = true,
        state = 'default',
        errorMessage,
        onSelect,
        onChange,
        onError,
        ariaLabel,
        className = '',
    } = props;

    // Selected files state
    let selectedFiles: File[] = [];
    let previewUrls: Map<File, string> = new Map();

    // Build container classes
    const containerClasses = [
        'banda-fileupload',
        state !== 'default' && `banda-fileupload--${state}`,
        disabled && 'banda-fileupload--disabled',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    // Create hidden input
    const inputId = `banda-fileupload-${Math.random().toString(36).slice(2, 9)}`;
    const fileInput = el({
        tag: 'input',
        attrs: {
            type: 'file',
            id: inputId,
            ...(name && { name }),
            ...(accept && { accept }),
            ...(multiple && { multiple: true }),
            ...(disabled && { disabled: true }),
            'aria-label': ariaLabel || label || 'File upload',
        },
        className: 'banda-fileupload-input',
    }) as HTMLInputElement;

    // Dropzone text element
    const dropzoneTextEl = span({
        className: 'banda-fileupload-text',
        text: dropzoneText,
    });

    // Icon - Create SVG using proper namespace
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '40');
    svg.setAttribute('height', '40');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.5');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
    svg.appendChild(path);

    const polyline = document.createElementNS(svgNS, 'polyline');
    polyline.setAttribute('points', '17 8 12 3 7 8');
    svg.appendChild(polyline);

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', '12');
    line.setAttribute('y1', '3');
    line.setAttribute('x2', '12');
    line.setAttribute('y2', '15');
    svg.appendChild(line);

    const uploadIcon = div({
        className: 'banda-fileupload-icon',
        children: [svg as unknown as HTMLElement],
    });

    // Dropzone
    const dropzone = div({
        className: 'banda-fileupload-dropzone',
        attrs: {
            tabindex: disabled ? -1 : 0,
            role: 'button',
            'aria-controls': inputId,
        },
        children: [uploadIcon, dropzoneTextEl],
    });

    // Preview container
    const previewContainer = div({ className: 'banda-fileupload-preview' });

    // File list container
    const fileListContainer = div({ className: 'banda-fileupload-list' });

    /**
     * Validate files against constraints
     */
    function validateFiles(files: File[]): { valid: File[]; errors: FileError[] } {
        const valid: File[] = [];
        const errors: FileError[] = [];
        let count = selectedFiles.length;

        for (const file of files) {
            // Check max files
            if (maxFiles && count >= maxFiles) {
                errors.push({
                    file,
                    type: 'count',
                    message: `Maximum ${maxFiles} files allowed`,
                });
                continue;
            }

            // Check file type
            if (!isFileTypeAccepted(file, accept)) {
                errors.push({
                    file,
                    type: 'type',
                    message: `File type not accepted: ${file.type || 'unknown'}`,
                });
                continue;
            }

            // Check file size
            if (maxSize && file.size > maxSize) {
                errors.push({
                    file,
                    type: 'size',
                    message: `File too large: ${formatFileSize(file.size)} (max: ${formatFileSize(maxSize)})`,
                });
                continue;
            }

            valid.push(file);
            count++;
        }

        return { valid, errors };
    }

    /**
     * Update the preview container
     */
    function updatePreviews() {
        previewContainer.innerHTML = '';

        if (!showPreview) return;

        selectedFiles.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            let url = previewUrls.get(file);
            if (!url) {
                url = URL.createObjectURL(file);
                previewUrls.set(file, url);
            }

            const img = el({
                tag: 'img',
                className: 'banda-fileupload-preview-img',
                attrs: {
                    src: url,
                    alt: file.name,
                },
            });

            const removeBtn = button({
                className: 'banda-fileupload-preview-remove',
                attrs: { type: 'button', 'aria-label': `Remove ${file.name}` },
                text: '×',
                onClick: () => removeFile(file),
            });

            const previewItem = div({
                className: 'banda-fileupload-preview-item',
                children: [img, removeBtn],
            });

            previewContainer.appendChild(previewItem);
        });
    }

    /**
     * Update the file list
     */
    function updateFileList() {
        fileListContainer.innerHTML = '';

        if (!showFileList || selectedFiles.length === 0) return;

        selectedFiles.forEach(file => {
            const fileInfo = div({
                className: 'banda-fileupload-file-info',
                children: [
                    span({ className: 'banda-fileupload-file-name', text: file.name }),
                    span({ className: 'banda-fileupload-file-size', text: formatFileSize(file.size) }),
                ],
            });

            const removeBtn = button({
                className: 'banda-fileupload-file-remove',
                attrs: { type: 'button', 'aria-label': `Remove ${file.name}` },
                text: '×',
                onClick: () => removeFile(file),
            });

            const fileItem = div({
                className: 'banda-fileupload-file',
                children: [fileInfo, removeBtn],
            });

            fileListContainer.appendChild(fileItem);
        });
    }

    /**
     * Remove a file
     */
    function removeFile(file: File) {
        const url = previewUrls.get(file);
        if (url) {
            URL.revokeObjectURL(url);
            previewUrls.delete(file);
        }

        selectedFiles = selectedFiles.filter(f => f !== file);
        updatePreviews();
        updateFileList();
        onChange?.(selectedFiles);
    }

    /**
     * Handle file selection
     */
    function handleFiles(files: FileList | null) {
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        const { valid, errors } = validateFiles(fileArray);

        if (errors.length > 0) {
            onError?.(errors);
        }

        if (valid.length > 0) {
            if (multiple) {
                selectedFiles = [...selectedFiles, ...valid];
            } else {
                // Clean up old previews for single file mode
                previewUrls.forEach(url => URL.revokeObjectURL(url));
                previewUrls.clear();
                selectedFiles = valid.slice(0, 1);
            }

            onSelect?.(valid);
            onChange?.(selectedFiles);
            updatePreviews();
            updateFileList();
        }

        // Reset input value to allow re-selecting same file
        fileInput.value = '';
    }

    // Event handlers
    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    // Dropzone click
    dropzone.addEventListener('click', () => {
        if (!disabled) {
            fileInput.click();
        }
    });

    // Keyboard support
    dropzone.addEventListener('keydown', (e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            fileInput.click();
        }
    });

    // Drag and drop
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            dropzone.classList.add('banda-fileupload-dropzone--active');
            dropzoneTextEl.textContent = dragActiveText;
        }
    });

    dropzone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('banda-fileupload-dropzone--active');
        dropzoneTextEl.textContent = dropzoneText;
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('banda-fileupload-dropzone--active');
        dropzoneTextEl.textContent = dropzoneText;

        if (!disabled) {
            handleFiles(e.dataTransfer?.files || null);
        }
    });

    // Build component
    const wrapperChildren: HTMLElement[] = [];

    // Label
    if (label) {
        wrapperChildren.push(
            el({
                tag: 'label',
                className: 'banda-fileupload-label',
                text: label,
                attrs: { for: inputId },
            }) as HTMLElement
        );
    }

    wrapperChildren.push(fileInput);
    wrapperChildren.push(dropzone);

    if (showPreview) {
        wrapperChildren.push(previewContainer);
    }

    if (showFileList) {
        wrapperChildren.push(fileListContainer);
    }

    // Helper or error text
    const displayHelper = state === 'error' && errorMessage ? errorMessage : helperText;
    if (displayHelper) {
        const helperClasses = [
            'banda-fileupload-helper',
            state === 'error' && 'banda-fileupload-helper--error',
        ]
            .filter(Boolean)
            .join(' ');

        wrapperChildren.push(span({ className: helperClasses, text: displayHelper }));
    }

    return div({
        className: containerClasses,
        children: wrapperChildren,
    });
}

export default FileUpload;
