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
}
