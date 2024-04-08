import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../service/dark-mode-serivce/dark-mode.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  submitted = false;
  name: string = '';
  password: string = '';
  error: boolean = false;
  rememberMe: boolean = false;
  isDarkMode: boolean = false;
  isStudent: boolean = true;
  teacherName: string = '';
  teacherPassword: string = '';
  loggedIn: boolean = false;
  adminLogin: boolean = false;

  constructor(
    private router: Router,
    private service: AuthService,
    private darkModeService: DarkModeService,
  ) {}

  submit() {
    this.submitted = true;
  }

  newInput() {
    this.error = false;
  }

  login() {
    this.service
      .login(this.name, this.password, this.rememberMe)
      .then(() => this.router.navigate(['']))
      .catch(() => (this.error = true));
  }
  async teacherLogin() {
    if (this.teacherName !== 'admin') {
      this.loggedIn = await this.service.teacherLogin(
        this.teacherName,
        this.teacherPassword,
      );
    } else {
      const adminLogin = await this.service.adminLogin(
        this.teacherName,
        this.teacherPassword,
      );
    }
    if (this.loggedIn) {
      this.router.navigate(['']);
      this.service.teacherLogged = true;
      this.service.adminLogged = false;
    } else {
      this.router.navigate(['/dashboard']);
      this.service.teacherLogged = false;
      this.service.adminLogged = true;
    }
  }

  signInWithGoogle() {
    this.service
      .googleSignIn()
      .then(() => this.router.navigate(['']))
      .catch(() => (this.error = true));
  }
  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    const savedUser = localStorage.getItem('rememberMe');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      console.log(user);
      this.name = user.email;
      this.password = user.password;
    }
  }
  changeToTeacher() {
    this.isStudent = true;
  }
  changeToStudent() {
    this.isStudent = false;
  }
}
