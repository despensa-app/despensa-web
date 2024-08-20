import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LoginAuthenticationReq} from '../../models/login-authentication-req';
import {LoginAuthenticationRes} from '../../models/login-authentication-res';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly _authURI = `${environment.DESPENSA_REST_API_URL}/auth`;

  constructor(private httpClient: HttpClient) {
  }

  login(request: LoginAuthenticationReq) {
    return this.httpClient.post<LoginAuthenticationRes>(`${this._authURI}/login`, request);
  }

}
