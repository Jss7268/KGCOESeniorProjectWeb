import { TestBed } from '@angular/core/testing';

import { DeviceOutputService } from './device-output.service';

describe('DeviceOutputService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceOutputService = TestBed.get(DeviceOutputService);
    expect(service).toBeTruthy();
  });
});
