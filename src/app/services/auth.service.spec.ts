import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service'

class MockAuthService{
  isLoggedIn() {
    return true;
  }
};

describe('SignupService', () => {
  beforeEach(() => TestBed.configureTestingModule({
  	providers: [
      {provide: AuthService, useClass: MockAuthService},
  	]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
