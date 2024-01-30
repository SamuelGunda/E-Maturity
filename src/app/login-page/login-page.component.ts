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
  name: any;
  password: any;
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
    this.service
      .login(this.name, this.password)
      .then((res) => {
        this.router.navigate(['']);
        if (this.rememberMe) {
          localStorage.setItem('rememberedUser', JSON.stringify({ name: this.name, password: this.password }));
        }
      })
      .catch((err) => {
        this.error = true;
      });
  }
}
