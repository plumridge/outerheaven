import { TestBed } from '@angular/core/testing';

import { CastsService } from './casts.service';

describe('CastsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CastsService = TestBed.get(CastsService);
    expect(service).toBeTruthy();
  });
});
