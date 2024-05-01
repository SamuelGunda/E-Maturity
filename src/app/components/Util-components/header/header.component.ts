import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    buttonExpanded: any = false;
    authService: AuthService;
    timerIsOn: boolean = false;
    timeLeft: number = 0;

    constructor(
        authService: AuthService,
        private el: ElementRef,
        private router: Router,
    ) {
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
        const header = document.getElementById('main_header') as HTMLElement;
        const screenWidth = window.innerWidth;

        if (navbar.style.display === 'flex') {
            navbar.style.display = 'none';
            header.style.borderRadius = '8px';
            this.buttonExpanded = !this.buttonExpanded;
        } else {
            navbar.style.display = 'flex';
            if (screenWidth <= 320) {
                header.style.borderBottomLeftRadius = '0';
                header.style.borderBottomRightRadius = '0';
            } else {
                header.style.borderRadius = '8px';
                header.style.borderBottomLeftRadius = '0';
            }
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
        if (!this.buttonExpanded) {
            const header = document.getElementById(
                'main_header',
            ) as HTMLElement;
            header.style.borderBottomLeftRadius = '10px';
        }
    }
}
