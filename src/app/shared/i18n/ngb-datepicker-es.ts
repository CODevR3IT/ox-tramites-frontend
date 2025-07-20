import { Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    es: {
        weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        months: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ]
    }
};

@Injectable()
export class NgbDatepickerEsI18n extends NgbDatepickerI18n {
    override getWeekdayLabel(weekday: number, width?: Exclude<Intl.DateTimeFormatOptions['weekday'], undefined>): string {
        // Puedes usar el mismo array de weekdays, ajustando el formato si lo necesitas
        return I18N_VALUES.es.weekdays[weekday - 1];
    }
    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES.es.weekdays[weekday - 1];
    }
    override getMonthShortName(month: number): string {
        return I18N_VALUES.es.months[month - 1].substr(0, 3);
    }
    override getMonthFullName(month: number): string {
        return I18N_VALUES.es.months[month - 1];
    }
    override getDayAriaLabel(date: import('@ng-bootstrap/ng-bootstrap').NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}