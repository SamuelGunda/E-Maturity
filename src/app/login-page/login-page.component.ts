import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DarkModeService } from '../dark-mode.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit{
  submitted = false;
  name: string = '';
  password: string = '';
  error: boolean = false;
  rememberMe: boolean = false;
  isDarkMode: boolean = false;


  constructor(private router: Router, private service: AuthService, private darkModeService: DarkModeService) {}

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
  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
}
