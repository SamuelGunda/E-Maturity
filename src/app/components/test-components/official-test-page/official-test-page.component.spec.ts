import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialTestPageComponent } from './official-test-page.component';

describe('OfficialTestPageComponent', () => {
  let component: OfficialTestPageComponent;
  let fixture: ComponentFixture<OfficialTestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficialTestPageComponent]
    });
    fixture = TestBed.createComponent(OfficialTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
