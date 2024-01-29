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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;

    if (!this.el.nativeElement.contains(targetElement)) {
      const navbar = document.getElementById('navbar') as HTMLElement;
      navbar.style.display = 'none';
      this.buttonExpanded = false;
    }
  }
}