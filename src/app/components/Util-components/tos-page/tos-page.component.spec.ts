import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TosPageComponent } from './tos-page.component';

describe('TosPageComponent', () => {
  let component: TosPageComponent;
  let fixture: ComponentFixture<TosPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TosPageComponent]
    });
    fixture = TestBed.createComponent(TosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
