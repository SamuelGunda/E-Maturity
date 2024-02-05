import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../dark-mode.service';


@Component({
  selector: 'app-education-materials',
  templateUrl: './education-materials.component.html',
  styleUrls: ['./education-materials.component.css']
})
export class EducationMaterialsComponent implements OnInit {
  showSjlNotes = false;
  showAnjNotes = false;
  showMatNotes = false;
  isDarkMode: boolean = false;

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }
}