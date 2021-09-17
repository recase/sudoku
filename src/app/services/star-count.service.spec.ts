import { TestBed } from '@angular/core/testing';

import { StarCountService } from './star-count.service';

describe('StarCountService', () => {
  let service: StarCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
