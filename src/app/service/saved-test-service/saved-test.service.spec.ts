import { TestBed } from '@angular/core/testing';

import { SavedTestService } from './saved-test.service';

describe('SavedTestService', () => {
  let service: SavedTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
