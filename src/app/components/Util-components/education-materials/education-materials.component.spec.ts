import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationMaterialsComponent } from './education-materials.component';

describe('EducationMaterialsComponent', () => {
  let component: EducationMaterialsComponent;
  let fixture: ComponentFixture<EducationMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationMaterialsComponent],
    });
    fixture = TestBed.createComponent(EducationMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
