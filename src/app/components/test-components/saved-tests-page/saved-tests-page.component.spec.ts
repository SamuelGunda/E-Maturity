import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedTestsPageComponent } from './saved-tests-page.component';

describe('SavedTestsPageComponent', () => {
  let component: SavedTestsPageComponent;
  let fixture: ComponentFixture<SavedTestsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedTestsPageComponent],
    });
    fixture = TestBed.createComponent(SavedTestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
