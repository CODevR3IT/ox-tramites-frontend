import { AbstractControl } from "@angular/forms";

export function isValidControl(inputAbstract: AbstractControl<string | null, string | null> | null): boolean{
    return inputAbstract?.invalid && (inputAbstract.dirty || inputAbstract.touched) || false;
}