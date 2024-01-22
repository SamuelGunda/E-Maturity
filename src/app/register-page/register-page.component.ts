import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  name: any;
  email: any;
  password: any;
  passwordCheck: any;

  constructor(private router: Router, private service: AuthService) {}

  register() {
    if (!this.email || !this.password || !this.passwordCheck) {
      alert('Please fill in all fields');
      return;
    }
    if (this.password !== this.passwordCheck) {
      alert('Passwords do not match');
      return;
    }
    this.service
      .register(this.email, this.password)
      .then((res) => {
        this.router.navigate(['']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
