import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {LoginAuthenticationReq} from '@app/models/login-authentication-req';
import {AuthenticationService} from '@app/services/pages/authentication.service';
import {tap} from 'rxjs';
import {BrowserStorageService} from '@app/services/layout/browser-storage.service';
import {SidebarService} from '@app/services/layout/sidebar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.formBuilder.nonNullable.group({
    username: [''],
    password: ['']
  });

  constructor(
    private authenticationService: AuthenticationService,
    private browserStorageService: BrowserStorageService,
    private sidebarService: SidebarService,
    private formBuilder: FormBuilder,
    private router: Router) {
    if (this.browserStorageService.getToken()) {
      this.router.navigate([''])
          .then();
    }
  }

  loginSubmit() {
    const request: LoginAuthenticationReq = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.authenticationService.login(request)
        .pipe(
          tap(loginResponse => {
            this.browserStorageService.setToken(loginResponse.accessToken);
            this.sidebarService.showLogoutAndHideLogin();
          })
        )
        .subscribe({
          complete: () => {
            this.router.navigate([''])
                .then();
          }
        });
  }
}
