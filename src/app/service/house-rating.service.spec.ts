import { TestBed } from '@angular/core/testing';

import { HouseRatingService } from './house-rating.service';

describe('HouseRatingService', () => {
  let service: HouseRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
