import { Component, OnInit } from '@angular/core';
import {
  EduService,
  eduMaterials,
} from '../../../service/edu-service/edu.service';

@Component({
  selector: 'app-education-materials',
  templateUrl: './education-materials.component.html',
  styleUrls: ['./education-materials.component.css'],
})
export class EducationMaterialsComponent implements OnInit {
  sjlMaterials: eduMaterials[] = [];
  anjMaterials: eduMaterials[] = [];
  matMaterials: eduMaterials[] = [];

  showSjlNotes: boolean = false;
  showAnjNotes: boolean = false;
  showMatNotes: boolean = false;
  isDarkMode: boolean = false;

  constructor(private eduService: EduService) {}

  ngOnInit() {
    this.eduService.getFile('SJL').subscribe((materials) => {
      this.sjlMaterials = materials;
    });
    this.eduService.getFile('ANJ').subscribe((materials) => {
      this.anjMaterials = materials;
    });
    this.eduService.getFile('MAT').subscribe((materials) => {
      this.matMaterials = materials;
    });
  }
  toggleShowSjlNotes() {
    this.showSjlNotes = !this.showSjlNotes;
  }
  toggleShowAnjNotes() {
    this.showAnjNotes = !this.showAnjNotes;
  }
  toggleShowMatNotes() {
    this.showMatNotes = !this.showMatNotes;
  }
}
