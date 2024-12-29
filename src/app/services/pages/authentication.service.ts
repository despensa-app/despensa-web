import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';
import {LoginAuthenticationReq} from '@app/models/login-authentication-req';
import {LoginAuthenticationRes} from '@app/models/login-authentication-res';
import {tap} from 'rxjs';
import {MessagePrimeNgService} from '@app/services/external/message-prime-ng.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _authURI = `${environment.DESPENSA_REST_API_URL}/auth`;

  constructor(
    private httpClient: HttpClient,
    private messagePrimeNgService: MessagePrimeNgService
  ) {
  }

  login(request: LoginAuthenticationReq) {
    return this.httpClient.post<LoginAuthenticationRes>(`${this._authURI}/login`, request)
               .pipe(
                 tap({
                   error: ({error}) => this.messagePrimeNgService.showError(error.error.detail)
                 })
               );
  }

}
