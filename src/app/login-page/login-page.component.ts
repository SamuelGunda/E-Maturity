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

  constructor( private router: Router, private service: AuthService) {
  }
  
  submit() {
    this.submitted = true;
  }

  login() {
    this.service.login(this.name, this.password).then((res) => {
      console.log(res);
      this.router.navigate(['']);
    }).catch((err) => {
      console.log(err);
    });
  }
}