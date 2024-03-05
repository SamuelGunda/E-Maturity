import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from '../../../service/dark-mode-serivce/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  displayed: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService
  ) {}
  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
  changeSubCat() {
    this.displayed = !this.displayed;
  }

  addSubCat(subCat: string) {
    console.log(subCat);
    this.router.navigate(['/years-page/' + subCat]);
  }
}
