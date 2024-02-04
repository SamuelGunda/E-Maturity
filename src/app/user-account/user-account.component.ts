import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DarkModeService } from '../dark-mode.service';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css'],
  animations: [
    trigger('toggleAnimation', [
      state('dark', style({
        transform: 'rotate(180deg)',
      })),
      state('light', style({
        transform: 'rotate(0deg)',
      })),
      transition('dark <=> light', animate('0.3s ease-in-out')),
    ]),
  ],
})
export class UserAccountComponent implements OnInit {
  userName: string = '';
  isDarkMode: boolean = false;

  constructor(private authService: AuthService, private darkModeService: DarkModeService) { }

  ngOnInit() {
    this.authService.userData.subscribe(user => {
      if (user) {
        this.userName = user.displayName || '';
      }
    });

    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
