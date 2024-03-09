import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { DarkModeService } from '../../../service/dark-mode-serivce/dark-mode.service';
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

  showSjlNotes: boolean = false;
  showAnjNotes: boolean = false;
  showMatNotes: boolean = false;
  isDarkMode: boolean = false;

  constructor(
    private darkModeService: DarkModeService,
    private eduService: EduService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {}

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
  toggleShowSjlNotes() {
    this.showSjlNotes = !this.showSjlNotes;
    if (this.showSjlNotes) {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.main_container'),
        'height',
        '119rem',
      );
    } else if (this.showAnjNotes) {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.main_container'),
        'height',
        '92rem',
      );
    } else {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.main_container'),
        'height',
        '100%',
      );
    }
  }
  toggleShowAnjNotes() {
    this.showAnjNotes = !this.showAnjNotes;
    if (this.showAnjNotes) {
      if (this.showSjlNotes) {
        this.renderer.setStyle(
          this.el.nativeElement.querySelector('.main_container'),
          'height',
          '119rem',
        );
      }
    }
    if (this.showAnjNotes) {
      if (!this.showSjlNotes) {
        this.renderer.setStyle(
          this.el.nativeElement.querySelector('.main_container'),
          'height',
          '92rem',
        );
      }
    } else if (this.showSjlNotes) {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.main_container'),
        'height',
        '119rem',
      );
    } else {
      this.renderer.setStyle(
        this.el.nativeElement.querySelector('.main_container'),
        'height',
        '100%',
      );
    }
  }
}
