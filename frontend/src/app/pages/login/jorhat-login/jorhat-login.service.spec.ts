import { TestBed } from '@angular/core/testing';

import { JorhatLoginService } from './jorhat-login.service';

describe('JorhatLoginService', () => {
  let service: JorhatLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JorhatLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
