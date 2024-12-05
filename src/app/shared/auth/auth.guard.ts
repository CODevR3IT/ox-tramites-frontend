import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if(authService.isLoggedIn()){
    return true;
  } else {
    window.location.href = `${environment.loginUrl}/login/${environment.appUuid}`;
    return false;
  } 
};
