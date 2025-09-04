import { TestBed } from '@angular/core/testing';

import { SilcharLoginService } from './silchar-login.service';

describe('SilcharLoginService', () => {
  let service: SilcharLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SilcharLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
