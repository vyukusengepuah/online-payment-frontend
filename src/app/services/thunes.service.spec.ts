import { TestBed } from '@angular/core/testing';

import { ThunesService } from './thunes.service';

describe('ThunesService', () => {
  let service: ThunesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThunesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
