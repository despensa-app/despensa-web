import {HttpErrorResponse, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {BrowserStorageService} from '@app/services/layout/browser-storage.service';
import {MessagePrimeNgService} from '@app/services/external/message-prime-ng.service';
import {SidebarService} from '@app/services/layout/sidebar.service';
import {environment} from '@env/environment';
import {catchError, throwError} from 'rxjs';

const AUTH_LOGIN_PATH = '/auth/login';
const MESSAGES = {
  FALLBACK: 'Algo ha ido mal. Inténtalo de nuevo.',
  SESSION_EXPIRED: 'Tu sesión ha caducado',
  SIGN_CONTINUE: 'Inicia sesión para continuar'
};

/** Conserva la respuesta HTTP y ofrece un mensaje seguro a los consumidores. */
export class ApiHttpError extends HttpErrorResponse {
  constructor(response: HttpErrorResponse, readonly userMessage: string) {
    super({
      error: response.error,
      headers: response.headers,
      status: response.status,
      statusText: '',
      url: response.url ?? undefined
    });
  }
}

export const apiErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const messagePrimeNgService = inject(MessagePrimeNgService);
  const storage = inject(BrowserStorageService);
  const sidebar = inject(SidebarService);
  const router = inject(Router);

  return next(request)
    .pipe(
      catchError((error: unknown) => {
        if (!(error instanceof HttpErrorResponse)) {
          messagePrimeNgService.showError(MESSAGES.FALLBACK);

          return throwError(() => error);
        }

        if (error.status === 401 && !isLogin(request)) {
          const requestToken = getRequestToken(request);

          if (requestToken && storage.getToken() !== requestToken) {
            return throwError(() => new ApiHttpError(error, MESSAGES.SESSION_EXPIRED));
          }

          let message = MESSAGES.SIGN_CONTINUE;

          if (requestToken) {
            message = MESSAGES.SESSION_EXPIRED;

            storage.removeToken();
            sidebar.showLoginAndHideLogout();
          }

          messagePrimeNgService.showWarn(message);

          const returnUrl = router.url.startsWith(AUTH_LOGIN_PATH) ? '/' : router.url;

          void router.navigate([AUTH_LOGIN_PATH], {queryParams: {returnUrl}});

          return throwError(() => new ApiHttpError(error, message));
        }

        const message = messageOf(error);

        messagePrimeNgService.showError(message);

        return throwError(() => new ApiHttpError(error, message));
      })
    );
};

function isLogin(request: HttpRequest<unknown>) {
  return request.url === `${environment.DESPENSA_REST_API_URL}${AUTH_LOGIN_PATH}`;
}

function getRequestToken(request: HttpRequest<unknown>) {
  return request.headers.get('Authorization')
                ?.replace(/^Bearer /, '');
}

function messageOf(response: HttpErrorResponse): string {
  if (response.status === 0) {
    return 'No se pudo conectar con el servidor. Comprueba tu conexión e inténtalo de nuevo.';
  }

  if (response.status >= 500) {
    return MESSAGES.FALLBACK;
  }

  const body: unknown = response.error;
  const problem = isRecord(body) && isRecord(body['error']) ? body['error'] : body;
  const detail = isRecord(problem) ? problem['detail'] : undefined;

  if (typeof detail === 'string' && detail.trim()) {
    return detail.trim();
  }

  switch (response.status) {
    case 401:
      return 'No se pudo iniciar sesión. Comprueba tus datos.';
    case 403:
      return 'No tienes permiso para realizar esta acción.';
    case 404:
      return 'No se encontró el recurso solicitado.';
    default:
      return MESSAGES.FALLBACK;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
