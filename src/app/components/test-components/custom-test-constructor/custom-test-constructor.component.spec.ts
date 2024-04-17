import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTestConstructorComponent } from './custom-test-constructor.component';

describe('CustomTestConstructorComponent', () => {
  let component: CustomTestConstructorComponent;
  let fixture: ComponentFixture<CustomTestConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTestConstructorComponent]
    });
    fixture = TestBed.createComponent(CustomTestConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
