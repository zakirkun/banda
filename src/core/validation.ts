/**
 * Banda Form Validation
 * 
 * Lightweight form validation utilities with built-in rules.
 */

import { createState, type State } from './state';

// ============================================================================
// VALIDATION RULES
// ============================================================================

/** Validation rule result */
export interface ValidationResult {
    valid: boolean;
    message?: string;
}

/** Validation rule function */
export type ValidationRule<T = string> = (value: T) => ValidationResult;

/** Built-in validation rules */
export const rules = {
    /** Required field */
    required: (message = 'This field is required'): ValidationRule =>
        (value) => ({
            valid: value !== undefined && value !== null && value !== '',
            message: value === '' ? message : undefined,
        }),

    /** Minimum length */
    minLength: (min: number, message?: string): ValidationRule =>
        (value) => ({
            valid: typeof value === 'string' && value.length >= min,
            message: value.length < min ? (message || `Must be at least ${min} characters`) : undefined,
        }),

    /** Maximum length */
    maxLength: (max: number, message?: string): ValidationRule =>
        (value) => ({
            valid: typeof value === 'string' && value.length <= max,
            message: value.length > max ? (message || `Must be at most ${max} characters`) : undefined,
        }),

    /** Email format */
    email: (message = 'Invalid email address'): ValidationRule =>
        (value) => ({
            valid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? message : undefined,
        }),

    /** URL format */
    url: (message = 'Invalid URL'): ValidationRule =>
        (value) => {
            try {
                new URL(value);
                return { valid: true };
            } catch {
                return { valid: false, message };
            }
        },

    /** Numeric value */
    numeric: (message = 'Must be a number'): ValidationRule =>
        (value) => ({
            valid: !isNaN(Number(value)) && value !== '',
            message: isNaN(Number(value)) ? message : undefined,
        }),

    /** Minimum number */
    min: (min: number, message?: string): ValidationRule =>
        (value) => ({
            valid: Number(value) >= min,
            message: Number(value) < min ? (message || `Must be at least ${min}`) : undefined,
        }),

    /** Maximum number */
    max: (max: number, message?: string): ValidationRule =>
        (value) => ({
            valid: Number(value) <= max,
            message: Number(value) > max ? (message || `Must be at most ${max}`) : undefined,
        }),

    /** Pattern match */
    pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule =>
        (value) => ({
            valid: regex.test(value),
            message: !regex.test(value) ? message : undefined,
        }),

    /** Match another field */
    matches: (fieldName: string, getValue: () => string, message?: string): ValidationRule =>
        (value) => ({
            valid: value === getValue(),
            message: value !== getValue() ? (message || `Must match ${fieldName}`) : undefined,
        }),

    /** Custom validation */
    custom: <T = string>(
        validator: (value: T) => boolean,
        message: string
    ): ValidationRule<T> =>
        (value) => ({
            valid: validator(value),
            message: !validator(value) ? message : undefined,
        }),
};

// ============================================================================
// FIELD VALIDATOR
// ============================================================================

/** Field validation state */
export interface FieldState {
    value: string;
    touched: boolean;
    dirty: boolean;
    valid: boolean;
    errors: string[];
}

/** Field validator options */
export interface FieldValidatorOptions {
    rules: ValidationRule[];
    validateOnChange?: boolean;
    validateOnBlur?: boolean;
}

/**
 * Creates a field validator.
 */
export function createFieldValidator(options: FieldValidatorOptions) {
    const { rules: fieldRules, validateOnChange = true, validateOnBlur = true } = options;

    const state = createState<FieldState>({
        value: '',
        touched: false,
        dirty: false,
        valid: true,
        errors: [],
    });

    function validate(value: string): ValidationResult[] {
        return fieldRules.map(rule => rule(value));
    }

    function updateState(newValue: string) {
        const results = validate(newValue);
        const errors = results.filter(r => !r.valid).map(r => r.message!);

        state.set((s: FieldState) => ({
            ...s,
            value: newValue,
            dirty: true,
            valid: errors.length === 0,
            errors,
        }));
    }

    return {
        state,

        /** Set value and optionally validate */
        setValue(value: string) {
            if (validateOnChange) {
                updateState(value);
            } else {
                state.set((s: FieldState) => ({ ...s, value, dirty: true }));
            }
        },

        /** Mark as touched (for blur events) */
        touch() {
            const current = state.get();
            state.set((s: FieldState) => ({ ...s, touched: true }));

            if (validateOnBlur && !current.dirty) {
                updateState(current.value);
            }
        },

        /** Force validation */
        validate(): boolean {
            const current = state.get();
            updateState(current.value);
            state.set((s: FieldState) => ({ ...s, touched: true }));
            return state.get().valid;
        },

        /** Reset to initial state */
        reset() {
            state.set({
                value: '',
                touched: false,
                dirty: false,
                valid: true,
                errors: [],
            });
        },

        /** Get current errors */
        getErrors(): string[] {
            return state.get().errors;
        },

        /** Check if valid */
        isValid(): boolean {
            return state.get().valid;
        },
    };
}

// ============================================================================
// FORM VALIDATOR
// ============================================================================

/** Form field configuration */
export interface FormFieldConfig {
    rules: ValidationRule[];
    initialValue?: string;
}

/** Form configuration */
export type FormConfig = Record<string, FormFieldConfig>;

/** Form state */
export interface FormState<T extends FormConfig> {
    values: Record<keyof T, string>;
    errors: Record<keyof T, string[]>;
    touched: Record<keyof T, boolean>;
    valid: boolean;
    submitting: boolean;
}

/**
 * Creates a form validator.
 * 
 * @example
 * const form = createForm({
 *   email: { rules: [rules.required(), rules.email()] },
 *   password: { rules: [rules.required(), rules.minLength(8)] },
 * });
 * 
 * form.setValue('email', 'user@example.com');
 * 
 * if (form.validate()) {
 *   const data = form.getValues();
 *   await submitForm(data);
 * }
 */
export function createForm<T extends FormConfig>(config: T) {
    type FieldName = keyof T;

    const fields: Record<string, ReturnType<typeof createFieldValidator>> = {};

    // Initialize fields
    for (const [name, fieldConfig] of Object.entries(config)) {
        fields[name] = createFieldValidator({
            rules: fieldConfig.rules,
        });
        if (fieldConfig.initialValue) {
            fields[name].setValue(fieldConfig.initialValue);
        }
    }

    const formState = createState({
        submitting: false,
    });

    return {
        /** Set field value */
        setValue(name: FieldName, value: string) {
            fields[name as string]?.setValue(value);
        },

        /** Get field value */
        getValue(name: FieldName): string {
            return fields[name as string]?.state.get().value || '';
        },

        /** Get all values */
        getValues(): Record<FieldName, string> {
            const values: Record<string, string> = {};
            for (const name of Object.keys(config)) {
                values[name] = fields[name]?.state.get().value ?? '';
            }
            return values as Record<FieldName, string>;
        },

        /** Touch a field */
        touchField(name: FieldName) {
            fields[name as string]?.touch();
        },

        /** Get field errors */
        getFieldErrors(name: FieldName): string[] {
            return fields[name as string]?.getErrors() || [];
        },

        /** Check if field is valid */
        isFieldValid(name: FieldName): boolean {
            return fields[name as string]?.isValid() ?? true;
        },

        /** Get field state */
        getFieldState(name: FieldName): FieldState | undefined {
            return fields[name as string]?.state.get();
        },

        /** Subscribe to field changes */
        subscribeToField(name: FieldName, callback: (state: FieldState) => void) {
            return fields[name as string]?.state.subscribe(callback);
        },

        /** Validate all fields */
        validate(): boolean {
            let allValid = true;
            for (const field of Object.values(fields)) {
                if (!field.validate()) {
                    allValid = false;
                }
            }
            return allValid;
        },

        /** Check if entire form is valid */
        isValid(): boolean {
            return Object.values(fields).every(f => f.isValid());
        },

        /** Reset form */
        reset() {
            for (const field of Object.values(fields)) {
                field.reset();
            }
            formState.set({ submitting: false });
        },

        /** Handle form submission */
        async handleSubmit<R>(
            onSubmit: (values: Record<FieldName, string>) => Promise<R>
        ): Promise<R | null> {
            if (!this.validate()) {
                return null;
            }

            formState.set({ submitting: true });

            try {
                const result = await onSubmit(this.getValues());
                return result;
            } finally {
                formState.set({ submitting: false });
            }
        },

        /** Check if form is submitting */
        isSubmitting(): boolean {
            return formState.get().submitting;
        },
    };
}

export default { rules, createFieldValidator, createForm };
