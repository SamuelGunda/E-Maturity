import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  buttonExpanded: any = false;
  authService: AuthService;

  constructor(authService: AuthService, private el: ElementRef, private router: Router) {
    this.authService = authService;

    // Subscribe to router events to close navbar on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeNavbar();
      }
    });
  }

  private closeNavbar(): void {
    const navbar = document.getElementById('navbar') as HTMLElement;
    navbar.style.display = 'none';
    this.buttonExpanded = false;
  }

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

  // Click event listener for the whole document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    // Check if the clicked element is outside the navbar and header
    if (!this.el.nativeElement.contains(targetElement)) {
      const navbar = document.getElementById('navbar') as HTMLElement;
      
      // Close the navbar
      navbar.style.display = 'none';
      this.buttonExpanded = false;
    }
  }
}