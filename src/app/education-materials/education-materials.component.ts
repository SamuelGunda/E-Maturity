import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../dark-mode.service';
import { EduService, eduMaterials  } from '../service/edu-service/edu.service';

@Component({
  selector: 'app-education-materials',
  templateUrl: './education-materials.component.html',
  styleUrls: ['./education-materials.component.css']
})
export class EducationMaterialsComponent implements OnInit {
  sjlMaterials: eduMaterials[] = [];
  anjMaterials: eduMaterials[] = [];

  showSjlNotes = false;
  showAnjNotes = false;
  showMatNotes = false;
  isDarkMode: boolean = false;
https: any;

  constructor(private darkModeService: DarkModeService, private eduService: EduService) { }

  ngOnInit() {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    this.eduService.getFile('SJL').subscribe((materials) => {
      this.sjlMaterials = materials;
    });
    this.eduService.getFile('ANJ').subscribe((materials) => {
      this.anjMaterials = materials;
    });
  }
}