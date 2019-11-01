import { TestBed, inject } from '@angular/core/testing';

import { AuthCallsService } from './auth-calls.service';

describe('AuthCallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCallsService]
    });
  });

  it('should be created', inject([AuthCallsService], (service: AuthCallsService) => {
    expect(service).toBeTruthy();
  }));
});
