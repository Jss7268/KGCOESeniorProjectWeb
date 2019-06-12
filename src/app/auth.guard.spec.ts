import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service'
import {AppSettings} from './app.settings';
import { Router } from '@angular/router';

class MockAuthService{
  isLoggedIn() {
    return true;
  }
};
class MockRouter{
  navigate(someString) {}
};

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      	AuthGuard,
      	AppSettings,
      	{provide: AuthService, useClass: MockAuthService},
      	{provide: Router, useClass: MockRouter}
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
