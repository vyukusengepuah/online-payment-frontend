import { TestBed } from '@angular/core/testing';

import { RegidesoService } from './regideso.service';

describe('RegidesoService', () => {
  let service: RegidesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegidesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
