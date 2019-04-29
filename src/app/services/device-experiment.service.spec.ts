import { TestBed } from '@angular/core/testing';

import { DeviceExperimentService } from './device-experiment.service';

describe('DeviceExperimentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceExperimentService = TestBed.get(DeviceExperimentService);
    expect(service).toBeTruthy();
  });
});
