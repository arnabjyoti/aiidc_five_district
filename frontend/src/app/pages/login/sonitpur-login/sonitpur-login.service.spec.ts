import { TestBed } from '@angular/core/testing';

import { SonitpurLoginService } from './sonitpur-login.service';

describe('SonitpurLoginService', () => {
  let service: SonitpurLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SonitpurLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
