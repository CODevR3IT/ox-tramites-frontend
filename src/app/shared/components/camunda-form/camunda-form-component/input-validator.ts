import { AbstractControl, ValidationErrors } from "@angular/forms";

export function isValidControlClass(inputAbstract: AbstractControl<string | null, string | null> | null): string {
    if (inputAbstract?.invalid && (inputAbstract.dirty || inputAbstract.touched)) {
        return 'is-invalid';
    }
    if (inputAbstract?.valid && (inputAbstract.dirty || inputAbstract.touched)) {
        return 'is-valid';
    }
    return '';
}

export function isValidControlBoolean(inputAbstract: AbstractControl<string | null, string | null> | null): boolean {
    return !!inputAbstract && inputAbstract.valid && (inputAbstract.dirty || inputAbstract.touched);
}

export function getMessageError(errors: ValidationErrors | null | undefined, campo: string, patternMessage: string = ''): string{
 
    if(errors && errors['required']) {
        return `El campo ${campo} es requerido.`;
    }
    if(errors && errors['whitespace']) {
        return `No debe de contener espacios vacios.`;
    }
    if(errors && errors['pattern']) {
        return !patternMessage ? `El campo ${campo} no coincide con el patrón.`:patternMessage;
    }
    if(errors && errors['email']) {
        return `Debe de ser un correo electrónico valido.`;
    }
    if(errors && errors['ngbDate']) {
        return `La fecha seleccionada no es válida.`;
    }

    return '';
}