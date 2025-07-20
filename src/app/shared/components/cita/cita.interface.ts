export interface CitaConfig {
    minDate:          Date;
    maxDate:          Date;
    disabledWeekDays: number[];
    holidays:         Date[];
    availableDays:    AvailableDay[];
}

export interface AvailableDay {
    fecha:       Date;
    disponibles: number;
}
