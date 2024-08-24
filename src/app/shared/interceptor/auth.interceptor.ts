import {HttpInterceptorFn} from '@angular/common/http';
import {BrowserStorageService} from '../../services/layout/browser-storage.service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const browserStorageService = inject(BrowserStorageService);
  const token = browserStorageService.getToken();
  let reqClone = req;

  if (token) {
    reqClone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(reqClone);
};
