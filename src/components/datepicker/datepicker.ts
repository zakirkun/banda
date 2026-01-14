/**
 * Banda Date Picker Component
 * 
 * Calendar date picker with keyboard navigation.
 */

import { el, div, button, span } from '../../core/element';
import { onClickOutside, onKey, Keys } from '../../core/events';
import { registerCleanup } from '../../core/mount';
import { createState } from '../../core/state';

/** Date picker props */
export interface DatePickerProps {
    /** Selected date */
    value?: Date | null;
    /** Placeholder text */
    placeholder?: string;
    /** Date format function */
    formatDate?: (date: Date) => string;
    /** First day of week (0 = Sunday, 1 = Monday) */
    firstDayOfWeek?: 0 | 1;
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** Disabled dates */
    disabledDates?: Date[];
    /** Show today button */
    showTodayButton?: boolean;
    /** Show clear button */
    clearable?: boolean;
    /** Change callback */
    onChange?: (date: Date | null) => void;
    /** Disabled state */
    disabled?: boolean;
    /** Additional class names */
    className?: string;
}

/** Default date formatter */
const defaultFormatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/** Month names */
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

/** Weekday names */
const WEEKDAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Calendar icon */
const CALENDAR_ICON = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>';
const CHEVRON_LEFT = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>';
const CHEVRON_RIGHT = '<svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/></svg>';

/** Check if two dates are the same day */
function isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

/** Check if date is disabled */
function isDateDisabled(
    date: Date,
    minDate?: Date,
    maxDate?: Date,
    disabledDates?: Date[]
): boolean {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disabledDates) {
        return disabledDates.some(d => isSameDay(d, date));
    }
    return false;
}

/** Get days in month */
function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

/** Get first day of month (0 = Sunday) */
function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

/**
 * Creates a Date Picker component.
 * 
 * @example
 * DatePicker({
 *   placeholder: 'Select date',
 *   onChange: (date) => console.log('Selected:', date),
 * })
 */
export function DatePicker(props: DatePickerProps): HTMLElement {
    const {
        value: initialValue = null,
        placeholder = 'Select date',
        formatDate = defaultFormatDate,
        firstDayOfWeek = 0,
        minDate,
        maxDate,
        disabledDates,
        showTodayButton = true,
        clearable = true,
        onChange,
        disabled = false,
        className = '',
    } = props;

    const isOpen = createState(false);
    const selectedDate = createState<Date | null>(initialValue);
    const viewDate = createState(initialValue || new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build weekday headers
    function buildWeekdays(): HTMLElement[] {
        const days = [...WEEKDAYS_SHORT];
        if (firstDayOfWeek === 1) {
            days.push(days.shift()!);
        }
        return days.map(day =>
            div({ className: 'banda-datepicker__weekday', text: day })
        );
    }

    // Build calendar grid
    function buildCalendarGrid(): HTMLElement {
        const view = viewDate.get();
        const year = view.getFullYear();
        const month = view.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        let firstDay = getFirstDayOfMonth(year, month);

        if (firstDayOfWeek === 1) {
            firstDay = firstDay === 0 ? 6 : firstDay - 1;
        }

        const days: HTMLElement[] = [];
        const selected = selectedDate.get();

        // Previous month days
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const date = new Date(prevYear, prevMonth, day);
            days.push(createDayButton(date, true));
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = isSameDay(date, today);
            const isSelected = selected ? isSameDay(date, selected) : false;
            const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);

            const classes = ['banda-datepicker__day'];
            if (isToday) classes.push('banda-datepicker__day--today');
            if (isSelected) classes.push('banda-datepicker__day--selected');
            if (isDisabled) classes.push('banda-datepicker__day--disabled');

            days.push(
                button({
                    className: classes.join(' '),
                    text: String(day),
                    attrs: { type: 'button', disabled: isDisabled },
                    onClick: () => {
                        if (!isDisabled) {
                            selectDate(date);
                        }
                    },
                })
            );
        }

        // Next month days
        const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
        const nextMonthDays = totalCells - (firstDay + daysInMonth);
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;

        for (let day = 1; day <= nextMonthDays; day++) {
            const date = new Date(nextYear, nextMonth, day);
            days.push(createDayButton(date, true));
        }

        return div({ className: 'banda-datepicker__days', children: days });
    }

    function createDayButton(date: Date, outside: boolean): HTMLElement {
        const isDisabled = isDateDisabled(date, minDate, maxDate, disabledDates);
        const classes = ['banda-datepicker__day', 'banda-datepicker__day--outside'];
        if (isDisabled) classes.push('banda-datepicker__day--disabled');

        return button({
            className: classes.join(' '),
            text: String(date.getDate()),
            attrs: { type: 'button', disabled: isDisabled },
            onClick: () => {
                if (!isDisabled) {
                    viewDate.set(new Date(date.getFullYear(), date.getMonth(), 1));
                    selectDate(date);
                }
            },
        });
    }

    function selectDate(date: Date) {
        selectedDate.set(date);
        isOpen.set(false);
        onChange?.(date);
        updateUI();
    }

    function goToPrevMonth() {
        const view = viewDate.get();
        viewDate.set(new Date(view.getFullYear(), view.getMonth() - 1, 1));
        updateCalendar();
    }

    function goToNextMonth() {
        const view = viewDate.get();
        viewDate.set(new Date(view.getFullYear(), view.getMonth() + 1, 1));
        updateCalendar();
    }

    function goToToday() {
        const todayDate = new Date();
        viewDate.set(new Date(todayDate.getFullYear(), todayDate.getMonth(), 1));
        selectDate(todayDate);
    }

    function clearDate() {
        selectedDate.set(null);
        onChange?.(null);
        updateUI();
    }

    // Build UI
    const selected = selectedDate.get();
    const triggerText = selected
        ? span({ className: 'banda-datepicker__trigger-value', text: formatDate(selected) })
        : span({ className: 'banda-datepicker__trigger-value banda-datepicker__placeholder', text: placeholder });

    const trigger = button({
        className: 'banda-datepicker__trigger',
        attrs: { type: 'button', disabled },
        children: [
            span({ className: 'banda-datepicker__trigger-icon', html: CALENDAR_ICON }),
            triggerText,
        ],
        onClick: () => {
            if (!disabled) {
                isOpen.set(!isOpen.get());
                updateUI();
            }
        },
    });

    // Calendar header
    const view = viewDate.get();
    const monthYearLabel = span({
        className: 'banda-datepicker__month-year',
        text: `${MONTHS[view.getMonth()]} ${view.getFullYear()}`,
    });

    const header = div({
        className: 'banda-datepicker__header',
        children: [
            button({
                className: 'banda-datepicker__nav',
                attrs: { type: 'button', 'aria-label': 'Previous month' },
                html: CHEVRON_LEFT,
                onClick: goToPrevMonth,
            }),
            monthYearLabel,
            button({
                className: 'banda-datepicker__nav',
                attrs: { type: 'button', 'aria-label': 'Next month' },
                html: CHEVRON_RIGHT,
                onClick: goToNextMonth,
            }),
        ],
    });

    const weekdays = div({
        className: 'banda-datepicker__weekdays',
        children: buildWeekdays(),
    });

    const daysGrid = buildCalendarGrid();

    const footerChildren: HTMLElement[] = [];
    if (showTodayButton) {
        footerChildren.push(
            button({
                className: 'banda-datepicker__today-btn',
                text: 'Today',
                attrs: { type: 'button' },
                onClick: goToToday,
            })
        );
    }
    if (clearable) {
        footerChildren.push(
            button({
                className: 'banda-datepicker__clear-btn',
                text: 'Clear',
                attrs: { type: 'button' },
                onClick: clearDate,
            })
        );
    }

    const footer = footerChildren.length > 0
        ? div({ className: 'banda-datepicker__footer', children: footerChildren })
        : null;

    const dropdown = div({
        className: 'banda-datepicker__dropdown',
        children: [header, weekdays, daysGrid, footer].filter(Boolean) as HTMLElement[],
    });

    const container = div({
        className: `banda-datepicker ${className}`,
        children: [trigger, dropdown],
    });

    function updateUI() {
        const open = isOpen.get();
        trigger.classList.toggle('banda-datepicker__trigger--open', open);
        dropdown.classList.toggle('banda-datepicker__dropdown--open', open);

        const selected = selectedDate.get();
        const valueSpan = trigger.querySelector('.banda-datepicker__trigger-value') as HTMLElement;
        if (valueSpan) {
            if (selected) {
                valueSpan.textContent = formatDate(selected);
                valueSpan.classList.remove('banda-datepicker__placeholder');
            } else {
                valueSpan.textContent = placeholder;
                valueSpan.classList.add('banda-datepicker__placeholder');
            }
        }
    }

    function updateCalendar() {
        const view = viewDate.get();
        monthYearLabel.textContent = `${MONTHS[view.getMonth()]} ${view.getFullYear()}`;

        // Replace days grid
        const newGrid = buildCalendarGrid();
        daysGrid.replaceWith(newGrid);
    }

    // Click outside to close
    const cleanupClickOutside = onClickOutside(container, () => {
        if (isOpen.get()) {
            isOpen.set(false);
            updateUI();
        }
    });

    // Keyboard
    container.addEventListener('keydown', onKey({
        [Keys.ESCAPE]: () => {
            isOpen.set(false);
            updateUI();
            trigger.focus();
        },
    }));

    registerCleanup(container, cleanupClickOutside);

    return container;
}

export default DatePicker;
