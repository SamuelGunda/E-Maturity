import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorSelectComponent } from './constructor-select.component';

describe('ConstructorSelectComponent', () => {
  let component: ConstructorSelectComponent;
  let fixture: ComponentFixture<ConstructorSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructorSelectComponent]
    });
    fixture = TestBed.createComponent(ConstructorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
