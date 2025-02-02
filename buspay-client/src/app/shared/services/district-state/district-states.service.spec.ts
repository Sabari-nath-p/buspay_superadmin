import { TestBed } from '@angular/core/testing';

import { DistrictStatesService } from './district-states.service';

describe('DistrictStatesService', () => {
  let service: DistrictStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
