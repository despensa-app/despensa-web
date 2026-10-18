import {ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors, withXhr} from '@angular/common/http';
import {authInterceptor} from './shared/interceptor/auth.interceptor';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import {definePreset} from '@primeuix/themes';
import {spinnerInterceptor} from '@app/shared/interceptor/spinner.interceptor';
import {apiErrorInterceptor} from '@app/shared/interceptor/api-error.interceptor';
import {MessageService} from 'primeng/api';
import {environment} from '@env/environment';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

// La interfaz está en español: sin esto, los pipes de número y fecha
// formatearían al estilo inglés (1,000.5 en vez de 1.000,5).
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withXhr(),
      withInterceptors([
        authInterceptor,
        spinnerInterceptor,
        apiErrorInterceptor
      ])
    ),
    providePrimeNG({
      theme: {
        preset: definePreset(Lara, {
          semantic: {
            primary: {
              50: '{blue.50}',
              100: '{blue.100}',
              200: '{blue.200}',
              300: '{blue.300}',
              400: '{blue.400}',
              500: '{blue.500}',
              600: '{blue.600}',
              700: '{blue.700}',
              800: '{blue.800}',
              900: '{blue.900}',
              950: '{blue.950}'
            }
          }
        }),
        options: {
          darkModeSelector: 'none',
          cssLayer: {
            name: 'primeng',
            order: 'primeng, admin-lte, app-global-style'
          }
        }
      },
      license: environment.PRIMEUI_LICENSE_KEY
    }),
    {
      provide: MessageService
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    }
  ]
};
