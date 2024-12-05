import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const httpErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastrService);
  const authService = inject(AuthService);
  return next(req).pipe(catchError((err: HttpErrorResponse) => {
    if (err) {

      switch (err.status) {
        case 400:
          let message = '';
          if (Array.isArray(err.error.message)) {
            err.error.message.forEach((value: string) => {
              message += value;
            });
          } else {
            message = err.error.message;
          }
          toastService.error(message, err.error.error);
          break;
          case 401:
          authService.logout();
            break;  
        default:
          toastService.error(err.error.message)
          break;
      }
    }

    throw err;
  }));
};
