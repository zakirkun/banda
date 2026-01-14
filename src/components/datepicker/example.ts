/**
 * Date Picker Examples
 */

import { div, h3, p } from '../../core/element';
import { Stack, Inline, Grid } from '../layout/layout';
import { DatePicker } from './datepicker';

export function DatePickerExamples(): HTMLElement {
    return Stack({
        space: 6,
        children: [
            // Basic
            div({
                children: [
                    h3({ text: 'Basic Date Picker' }),
                    Grid({
                        cols: 2,
                        gap: 4,
                        children: [
                            DatePicker({
                                placeholder: 'Select a date',
                                onChange: (date) => console.log('Selected:', date),
                            }),
                            DatePicker({
                                value: new Date(),
                                placeholder: 'With initial value',
                            }),
                        ],
                    }),
                ],
            }),

            // With constraints
            div({
                children: [
                    h3({ text: 'With Constraints' }),
                    p({ text: 'Min/max date restrictions' }),
                    Grid({
                        cols: 2,
                        gap: 4,
                        children: [
                            DatePicker({
                                placeholder: 'Min date: today',
                                minDate: new Date(),
                                onChange: (date) => console.log('Future date:', date),
                            }),
                            DatePicker({
                                placeholder: 'Max date: today',
                                maxDate: new Date(),
                                onChange: (date) => console.log('Past date:', date),
                            }),
                        ],
                    }),
                ],
            }),

            // Options
            div({
                children: [
                    h3({ text: 'Options' }),
                    Inline({
                        space: 4,
                        children: [
                            DatePicker({
                                placeholder: 'Monday first',
                                firstDayOfWeek: 1,
                            }),
                            DatePicker({
                                placeholder: 'Not clearable',
                                clearable: false,
                                showTodayButton: true,
                            }),
                            DatePicker({
                                placeholder: 'Disabled',
                                disabled: true,
                            }),
                        ],
                    }),
                ],
            }),

            // Custom format
            div({
                children: [
                    h3({ text: 'Custom Format' }),
                    DatePicker({
                        placeholder: 'ISO format',
                        formatDate: (date) => date.toISOString().split('T')[0] || '',
                        onChange: (date) => console.log('ISO:', date?.toISOString()),
                    }),
                ],
            }),
        ],
    });
}

export default DatePickerExamples;
