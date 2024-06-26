import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { UserAccountService } from '../../../service/user-acc-service/user-acc.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie';

@Component({
    selector: 'app-user-account',
    templateUrl: './user-account.component.html',
    styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
    userName: string = '';
    isDarkMode: boolean = false;
    darkMode: boolean = false;
    sjlStatistics$:
        | Observable<{ averagePercentage: number; averageTime: string }>
        | undefined;
    anjStatistics$:
        | Observable<{ averagePercentage: number; averageTime: string }>
        | undefined;
    matStatistics$:
        | Observable<{ averagePercentage: number; averageTime: string }>
        | undefined;
    sjlTestCount: number = 0;
    anjTestCount: number = 0;
    matTestCount: number = 0;
    sjlAveragePercentage: number = 0;
    anjAveragePercentage: number = 0;
    matAveragePercentage: number = 0;
    sjlAverageTime: string = '00:00';
    anjAverageTime: string = '00:00';
    matAverageTime: string = '00:00';

    constructor(
        private authService: AuthService,
        public userAccountService: UserAccountService,
        private cookieService: CookieService,
    ) {}

    ngOnInit() {
        this.authService.userData.subscribe((user) => {
            if (user) {
                this.userName = user.displayName || '';
                const uid = this.cookieService.get('uid');
                if (uid) {
                    this.userAccountService
                        .getTestCountBySubject(uid, 'sjl')
                        .subscribe((count) => (this.sjlTestCount = count));
                    this.userAccountService
                        .getTestCountBySubject(uid, 'anj')
                        .subscribe((count) => (this.anjTestCount = count));
                    this.userAccountService
                        .getTestCountBySubject(uid, 'mat')
                        .subscribe((count) => (this.matTestCount = count));
                    this.sjlStatistics$ =
                        this.userAccountService.getTestStatistics(uid, 'sjl');
                    this.anjStatistics$ =
                        this.userAccountService.getTestStatistics(uid, 'anj');
                    this.matStatistics$ =
                        this.userAccountService.getTestStatistics(uid, 'mat');
                    this.sjlStatistics$.subscribe((stats) => {
                        this.sjlAveragePercentage = stats.averagePercentage;
                        this.sjlAverageTime = stats.averageTime;
                    });
                    this.anjStatistics$.subscribe((stats) => {
                        this.anjAveragePercentage = stats.averagePercentage;
                        this.anjAverageTime = stats.averageTime;
                    });
                    this.matStatistics$.subscribe((stats) => {
                        this.matAveragePercentage = stats.averagePercentage;
                        this.matAverageTime = stats.averageTime;
                    });
                }
            }
        });
    }

    darkToggle = document.querySelector('.toggle_dark');

    toggleDark() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
            document.documentElement.classList.toggle('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}
