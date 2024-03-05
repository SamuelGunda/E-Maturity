import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Input,
} from '@angular/core';
import { AuthService } from '../../../service/auth-serivce/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { DarkModeService } from '../../../service/dark-mode-serivce/dark-mode.service';
import { TestPageComponent } from '../../test-components/test-page/test-page.component';
import { TimerService } from '../../../service/timer-service/timer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  buttonExpanded: any = false;
  authService: AuthService;
  isDarkMode: boolean = false;
  testPage: TestPageComponent;
  timerIsOn: boolean = false;
  timeLeft: number = 0;

  constructor(
    authService: AuthService,
    private el: ElementRef,
    private router: Router,
    private darkModeService: DarkModeService,
    testPage: TestPageComponent,
    private timerService: TimerService
  ) {
    this.authService = authService;
    this.testPage = testPage;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeNavbar();
      }
    });
  }

  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.timerService
      .getTimerIsOn()
      .subscribe((isOn) => (this.timerIsOn = isOn));
    this.timerService.getTimeLeft().subscribe((time) => (this.timeLeft = time));
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
    localStorage.removeItem('rememberedUser');
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
