import { TestBed } from '@angular/core/testing';

import { TinsukiaLoginService } from './tinsukia-login.service';

describe('TinsukiaLoginService', () => {
  let service: TinsukiaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinsukiaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
