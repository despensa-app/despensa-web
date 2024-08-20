import {Component} from '@angular/core';
import {PageComponent} from '../../../../layout/page/page.component';
import {NavbarComponent} from '../../../../layout/navbar/navbar.component';
import {Router, RouterLink} from '@angular/router';
import {HeaderComponent} from '../../../../layout/header/header.component';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {LoginAuthenticationReq} from '../../../../models/login-authentication-req';
import {AuthenticationService} from '../../../../services/pages/authentication.service';
import {tap} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PageComponent,
    NavbarComponent,
    RouterLink,
    HeaderComponent,
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
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  loginSubmit() {
    const request: LoginAuthenticationReq = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.authenticationService.login(request)
        .pipe(
          tap(loginResponse => {
            //TODO: guardar el token
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
