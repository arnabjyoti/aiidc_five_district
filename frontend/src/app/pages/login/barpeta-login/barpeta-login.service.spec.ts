import { TestBed } from '@angular/core/testing';

import { BarpetaLoginService } from './barpeta-login.service';

describe('BarpetaLoginService', () => {
  let service: BarpetaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarpetaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
