import { Component, HostListener } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  toggleNav(): void {
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

  headerfixes: boolean = false;

  @HostListener('window:scroll', []) onScroll(){
    if(window.scrollY > 100){
      this.headerfixes = true;
    }
    else{
      this.headerfixes = false;
    }
  }
}
