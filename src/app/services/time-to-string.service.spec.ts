import { TestBed } from '@angular/core/testing';

import { TimeToStringService } from './time-to-string.service';

describe('TimeToStringService', () => {
  let service: TimeToStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeToStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
