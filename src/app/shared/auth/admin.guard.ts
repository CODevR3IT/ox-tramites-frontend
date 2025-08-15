import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  if(user.roleKey == 'ADMIN'){
    return true;
  } else {
    router.navigate(['/tramites-servicios']);
    return false;
  } 
};
