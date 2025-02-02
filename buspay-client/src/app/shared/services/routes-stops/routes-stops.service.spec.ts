import { TestBed } from '@angular/core/testing';

import { RoutesStopsService } from './routes-stops.service';

describe('RoutesStopsService', () => {
  let service: RoutesStopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesStopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
