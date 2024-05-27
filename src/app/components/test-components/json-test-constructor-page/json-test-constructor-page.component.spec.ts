import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonTestConstructorPageComponent } from './json-test-constructor-page.component';

describe('OfficialTestConstructorPageComponent', () => {
  let component: JsonTestConstructorPageComponent;
  let fixture: ComponentFixture<JsonTestConstructorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonTestConstructorPageComponent]
    });
    fixture = TestBed.createComponent(JsonTestConstructorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
