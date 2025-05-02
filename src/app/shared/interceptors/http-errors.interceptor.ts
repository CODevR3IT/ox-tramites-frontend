import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { responseAlertError } from '../helpers/alert.helper';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const swalError = responseAlertError();
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err) {
        switch (err.status) {
          case 400:
            swalError( err.error.msg + JSON.stringify(err.error.errores));
            break;
          case 401:
            swalError(err.error.msg);
            authService.logout();
            break;
          default:
            swalError(err.error.error || err.error.msg);
            break;
        }
      }

      throw err;
    })
  );
};
