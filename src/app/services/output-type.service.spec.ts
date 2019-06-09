import { TestBed } from '@angular/core/testing';

import { OutputTypeService } from './output-type.service';

describe('OutputTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OutputTypeService = TestBed.get(OutputTypeService);
    expect(service).toBeTruthy();
  });
});
