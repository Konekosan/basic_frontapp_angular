import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS, withInterceptorsFromDi  } from '@angular/common/http';
import { AuthInterceptorService, authInterceptor, spinnerInterceptor } from './_service/interceptor/auth.interceptor.service';

export const appConfig: ApplicationConfig = {
  providers:[ 
              provideZoneChangeDetection({ eventCoalescing: true }), 
              provideRouter(routes), 
              provideClientHydration(), 
              provideAnimationsAsync(),
              provideHttpClient(
                withInterceptorsFromDi(),
                withInterceptors([authInterceptor, spinnerInterceptor])),
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
            ]
};
