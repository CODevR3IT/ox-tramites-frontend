import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptorInterceptor } from './shared/interceptors/loading-interceptor.interceptor';
import { httpErrorsInterceptor } from './shared/interceptors/http-errors.interceptor';
import { authInterceptor } from './shared/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([loadingInterceptorInterceptor, httpErrorsInterceptor, authInterceptor])),
  ],
};
