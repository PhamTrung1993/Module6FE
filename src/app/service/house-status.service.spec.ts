import { TestBed } from '@angular/core/testing';

import { HouseStatusService } from './house-status.service';

describe('HouseStatusService', () => {
  let service: HouseStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
