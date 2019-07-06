import { TestBed } from '@angular/core/testing';

import { ExperimentSubheaderService } from './experiment-subheader.service';

describe('ExperimentSubheaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExperimentSubheaderService = TestBed.get(ExperimentSubheaderService);
    expect(service).toBeTruthy();
  });
});
