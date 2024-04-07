import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialTestConstructorPageComponent } from './official-test-constructor-page.component';

describe('OfficialTestConstructorPageComponent', () => {
  let component: OfficialTestConstructorPageComponent;
  let fixture: ComponentFixture<OfficialTestConstructorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficialTestConstructorPageComponent]
    });
    fixture = TestBed.createComponent(OfficialTestConstructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
