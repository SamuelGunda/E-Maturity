import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTestConstructorPageComponent } from './custom-test-constructor-page.component';

describe('CustomTestConstructorComponent', () => {
  let component: CustomTestConstructorPageComponent;
  let fixture: ComponentFixture<CustomTestConstructorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTestConstructorPageComponent]
    });
    fixture = TestBed.createComponent(CustomTestConstructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
