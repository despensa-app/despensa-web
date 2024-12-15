import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {SpinnerService} from '@app/services/layout/spinner.service';
import {finalize} from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  spinnerService.show();

  return next(req)
    .pipe(
      finalize(() => {
        spinnerService.hide();
      })
    );
};
