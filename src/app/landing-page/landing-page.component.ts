import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../dark-mode.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
}
