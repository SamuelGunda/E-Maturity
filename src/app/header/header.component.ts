
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

buttonExpanded: any = false;
authService: AuthService;
constructor(authService: AuthService) {this.authService = authService; }
  

  /** toggle navigation menu */
  onToggleNav(): void {
    const navbar = document.getElementById('navbar') as HTMLElement;

    if (navbar.style.display === 'block') {
      navbar.style.display = 'none';
      this.buttonExpanded = !this.buttonExpanded;
    } else {
      navbar.style.display = 'block';
      this.buttonExpanded = !this.buttonExpanded;
    }
  }

  /** logout */
  onLogout(): void {
    this.authService.logout();
  }
}