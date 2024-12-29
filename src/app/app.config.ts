import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {authInterceptor} from './shared/interceptor/auth.interceptor';
import {providePrimeNG} from 'primeng/config';
import Lara from '@primeng/themes/lara';
import {definePreset} from '@primeng/themes';
import {spinnerInterceptor} from '@app/shared/interceptor/spinner.interceptor';
import {MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        spinnerInterceptor
      ])
    ),
    provideAnimations(),
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
      }
    }),
    {
      provide: MessageService
    }
  ]
};
