import { TestBed } from '@angular/core/testing';

import { ApiGetService } from './api-get.service';

describe('ApiGetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGetService = TestBed.get(ApiGetService);
    expect(service).toBeTruthy();
  });
});
