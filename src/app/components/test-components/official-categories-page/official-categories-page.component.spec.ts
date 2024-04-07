import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialCategoriesPageComponent } from './official-categories-page.component';

describe('OfficialCategoriesPageComponent', () => {
  let component: OfficialCategoriesPageComponent;
  let fixture: ComponentFixture<OfficialCategoriesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficialCategoriesPageComponent]
    });
    fixture = TestBed.createComponent(OfficialCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
