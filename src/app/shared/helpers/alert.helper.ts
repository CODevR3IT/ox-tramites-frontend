import Swal from 'sweetalert2';
import { ResponseMessage } from '../interfaces/response-message.interface';

const swal = Swal.mixin({
  customClass: {
    cancelButton: 'btn btn-secondary ms-2 me-2',
    confirmButton: 'btn btn-primary ms-2 me-2',
  },
  buttonsStyling: false,
});

export const responseAlertSuccess = () => {
  return (response: ResponseMessage) => {
    swal.fire({
      title: 'Correcto',
      text: response.message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };
};

export const responseAlertError = () => {
    return (message: string, title: string = '¡Atención!') => {
      swal.fire({
        title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    };
  };
