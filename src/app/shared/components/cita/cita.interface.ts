import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export interface CitaConfig {
    minDate:          NgbDateStruct;
    maxDate:          NgbDateStruct;
    disabledWeekDays: number[];
    holidays:         NgbDateStruct[];
    availableDays:    AvailableDay[];
}
export interface CitaConfigResponse {
    minDate:          string;
    maxDate:          string;
    disabledWeekDays: number[];
    holidays:         string[];
    availableDays:    AvailableDay[];
}

export interface AvailableDay {
    fecha:       NgbDateStruct;
    disponibles: number;
}
