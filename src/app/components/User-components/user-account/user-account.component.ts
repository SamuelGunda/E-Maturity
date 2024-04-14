import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { UserAccountService } from '../../../service/user-acc-service/user-acc.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
})
export class UserAccountComponent implements OnInit {
  userName: string = '';
  isDarkMode: boolean = false;
  darkMode: boolean = false;

  constructor(
    private authService: AuthService,
    public userAccountService: UserAccountService,
  ) {}

  ngOnInit() {
    this.authService.userData.subscribe((user) => {
      if (user) {
        this.userName = user.displayName || '';
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
