
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

buttonExpanded: any = false;

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
}