import { TestBed } from '@angular/core/testing';

import { EnotiService } from './enoti.service';

describe('EnotiService', () => {
  let service: EnotiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnotiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
