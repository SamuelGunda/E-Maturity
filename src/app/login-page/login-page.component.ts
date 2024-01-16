import { Component } from '@angular/core';
import { Service } from '../service/service';
import { User } from '../model/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  submitted = false;

  constructor(private service: Service) {}

  login() {
    console.log('login');
    this.service.getAll();
  }
}
