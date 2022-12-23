import { TestBed } from '@angular/core/testing';

import { HouseCommentService } from './house-comment.service';

describe('HouseCommentService', () => {
  let service: HouseCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HouseCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
