import { TestBed } from '@angular/core/testing';

import { CommonModalService } from './common-modal.service';

describe('CommonModalService', () => {
  let service: CommonModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
