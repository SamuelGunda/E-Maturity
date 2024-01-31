import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  userName: string = '';

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('User_info') || '{}');
    this.userName = `${userData.lname} ${userData.fname}`;
  }
}
