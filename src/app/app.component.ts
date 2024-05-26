import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth-serivce/auth.service';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private cookieServ: CookieService,
    ) {}

    ngOnInit() {
        this.authService.checkToken();
        const uid = this.cookieServ.get('uid');
        if (uid === 'Thlx1tYLcnfft6fey38i6KTD5bY2') {
            this.authService.adminLog = true;
        } else {
            this.authService.adminLog = false;
        }
    }

    title(title: any) {
        throw new Error('Method not implemented.');
    }
}
