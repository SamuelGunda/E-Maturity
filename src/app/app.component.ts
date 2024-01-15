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
