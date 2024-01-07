import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  onToggleNav(): void {
    const navbar = document.getElementById('navbar') as HTMLElement;
    const landingPage = document.getElementById('landingPage') as HTMLElement;

    if (navbar.style.display === 'none') {
      navbar.style.display = 'block';
      navbar.style.display = '0 1 20%';
      landingPage.style.flex = '1 1 75%';
    } else {
      navbar.style.display = 'none';
      landingPage.style.flexBasis = '100%';
    }
  }
}