
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  onToggleNav(): void {
    const navbar = document.getElementById('navbar') as HTMLElement;
    const header = document.getElementById('main_header') as HTMLElement;

    if (navbar.style.display === 'block') {
      navbar.style.display = 'none';
      header.style.borderRadius = '10px'
    } else {
      navbar.style.display = 'block';
      header.style.borderRadius = '10px 10px 10px 0px'
    }
  }
}