import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  submitted = false;
  name: string = '';
  password: string = '';
  error: boolean = false;
  rememberMe: boolean = false;

  constructor(private router: Router, private service: AuthService) {}

  submit() {
    this.submitted = true;
  }

  newInput() {
    this.error = false;
  }

  login() {
    this.service.login(this.name, this.password, this.rememberMe)
      .then(() => this.router.navigate(['']))
      .catch(() => this.error = true);
  }

  signInWithGoogle(){
    this.service.googleSignIn();
    this.router.navigate(['/login']);
  }
}
