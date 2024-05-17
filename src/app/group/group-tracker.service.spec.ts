import { TestBed } from '@angular/core/testing';

import { GroupTrackerService } from './group-tracker.service';

describe('GroupService', () => {
  let service: GroupTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
