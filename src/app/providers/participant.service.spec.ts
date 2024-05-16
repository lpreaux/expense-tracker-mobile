import { TestBed } from '@angular/core/testing';

import { ProvidersService } from './participant.service';

describe('ProvidersService', () => {
  let service: ProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
