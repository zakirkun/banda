# FileUpload

Flexible file upload with drag-and-drop, previews, and validation.

## Import

```typescript
import { FileUpload } from 'banda';
```

## Basic Usage

```typescript
FileUpload({
  label: 'Upload Files',
  onSelect: (files) => console.log('Selected:', files),
})
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | Input name |
| `accept` | `string` | - | Accepted file types (e.g., `'image/*'`, `.pdf,.doc`) |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `maxSize` | `number` | - | Maximum file size in bytes |
| `maxFiles` | `number` | - | Maximum number of files |
| `disabled` | `boolean` | `false` | Disable upload |
| `label` | `string` | - | Label text |
| `helperText` | `string` | - | Helper text below dropzone |
| `dropzoneText` | `string` | `'Drag and drop...'` | Dropzone placeholder |
| `dragActiveText` | `string` | `'Drop files here'` | Text when dragging |
| `showPreview` | `boolean` | `false` | Show image previews |
| `showFileList` | `boolean` | `true` | Show selected files list |
| `state` | `'default' \| 'error'` | `'default'` | Validation state |
| `errorMessage` | `string` | - | Error message |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `onSelect` | `(files: File[]) => void` | Called when files are selected |
| `onChange` | `(files: File[]) => void` | Called when files change (including removes) |
| `onError` | `(errors: FileError[]) => void` | Called on validation errors |

## Image Upload with Preview

```typescript
FileUpload({
  label: 'Photos',
  accept: 'image/*',
  multiple: true,
  showPreview: true,
  maxSize: 5 * 1024 * 1024, // 5MB
  onSelect: (files) => console.log(files),
})
```

## Document Upload

```typescript
FileUpload({
  label: 'Documents',
  accept: '.pdf,.doc,.docx',
  multiple: true,
  maxFiles: 5,
  helperText: 'PDF or Word documents, max 5 files',
})
```

## Single File with Validation

```typescript
FileUpload({
  label: 'Avatar',
  accept: 'image/png,image/jpeg',
  maxSize: 2 * 1024 * 1024, // 2MB
  showPreview: true,
  helperText: 'PNG or JPG, max 2MB',
  onError: (errors) => {
    errors.forEach(err => {
      console.error(`${err.file.name}: ${err.message}`);
    });
  },
})
```

## Error State

```typescript
FileUpload({
  label: 'Upload',
  state: 'error',
  errorMessage: 'Please upload at least one file',
})
```

## Complete Form Example

```typescript
import { form, Stack, FileUpload, Input, Button } from 'banda';

function SubmissionForm() {
  let selectedFiles: File[] = [];

  return form({
    onSubmit: (e) => {
      e.preventDefault();
      console.log('Submitting files:', selectedFiles);
    },
    children: [
      Stack({
        space: 4,
        children: [
          Input({
            label: 'Name',
            placeholder: 'Your name',
            required: true,
          }),
          FileUpload({
            label: 'Attachments',
            accept: 'image/*,.pdf',
            multiple: true,
            showPreview: true,
            showFileList: true,
            maxSize: 10 * 1024 * 1024,
            helperText: 'Images or PDFs, max 10MB each',
            onChange: (files) => {
              selectedFiles = files;
            },
          }),
          Button({
            label: 'Submit',
            type: 'submit',
            variant: 'primary',
          }),
        ],
      }),
    ],
  });
}
```

## FileError Type

```typescript
interface FileError {
  file: File;
  type: 'type' | 'size' | 'count';
  message: string;
}
```

## Accessibility

- Keyboard navigation (Enter/Space to open file dialog)
- ARIA labels for dropzone and buttons
- Screen reader announcements for file actions
- Focus management
