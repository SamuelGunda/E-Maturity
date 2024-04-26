import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth-serivce/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  fname: any;
  lname: any;
  email: any;
  password: any;
  passwordCheck: any;
  errorMessage: string = '';
  pswdError: boolean = false;
  emailError: boolean = false;

  constructor(
    private router: Router,
    private service: AuthService,
  ) {}

  isValidEmail(email: string): boolean {
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    return emailRegex.test(email);
  }

  register() {
    if (
      !this.email ||
      !this.password ||
      !this.passwordCheck ||
      !this.fname ||
      !this.lname
    ) {
      this.errorMessage = 'Prosím vyplň všetky políčka';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = `Heslo musí obsahovať aspoň 6 znakov`;
      this.pswdError = true;
      this.emailError = false;
      return;
    } else {
      this.pswdError = false;
    }
    if (this.password !== this.passwordCheck) {
      this.errorMessage = 'Hesla sa nezhodujú';
      this.pswdError = true;
      this.emailError = false;
      return;
    } else {
      this.pswdError = false;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Neplatná emailová adresa';
      this.emailError = true;
      return;
    } else {
      this.emailError = false;
    }
    this.service
      .register(this.email, this.password, this.fname, this.lname)
      .then((res) => {
        this.router.navigate(['']);
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.errorMessage = 'Tento email je už registrovaný';
          this.emailError = true;
        }
      });
  }
}
