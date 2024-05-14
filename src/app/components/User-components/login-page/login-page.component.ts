import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { Router } from '@angular/router';

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
    loggedIn: boolean = false;

    constructor(
        private router: Router,
        private service: AuthService,
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

    signInWithGoogle() {
        this.service
            .googleSignIn()
            .then(() => this.router.navigate(['']))
            .catch(() => (this.error = true));
    }
    ngOnInit() {
        const savedUser = localStorage.getItem('rememberMe');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            console.log(user);
            this.name = user.email;
            this.password = user.password;
        }
    }
}
