import { TestBed } from '@angular/core/testing';

import { OldTestService } from './old-test.service';

describe('TestService', () => {
  let service: OldTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
