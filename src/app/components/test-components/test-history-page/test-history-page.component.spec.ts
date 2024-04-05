import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHistoryPageComponent } from './test-history-page.component';

describe('TestHistoryPageComponent', () => {
  let component: TestHistoryPageComponent;
  let fixture: ComponentFixture<TestHistoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHistoryPageComponent]
    });
    fixture = TestBed.createComponent(TestHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
