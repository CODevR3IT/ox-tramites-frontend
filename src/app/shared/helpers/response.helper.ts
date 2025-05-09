import Swal from 'sweetalert2';
import { ResponseMessage } from "../interfaces/response-message.interface";

const swal = Swal.mixin({
    customClass: {
        cancelButton: 'btn ms-2 me-2',
        confirmButton: 'btn btn-primary ms-2 me-2',
    },
    buttonsStyling: false,
});


export const responseSuccess = () => {
    return (response: ResponseMessage) => {
        return swal.fire({
            title: 'Correcto',
            text: response.msg,
            icon: 'success',
            confirmButtonText: 'Cerrar'
        });
    }
}
export const responseError = () => {
    return (title: string = 'Error', message: string) => {
        swal.fire({
            title: 'Advertencia',
            text: message,
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }
}
export const responseConfirmation = () => {
    return (title: string = '', text: string = '') => {
        return swal.fire({
            title,
            text,
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            reverseButtons: true
        });
    }
}