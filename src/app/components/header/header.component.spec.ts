import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {AppSettings} from '../../app.settings';
import { Router } from '@angular/router';

import { HeaderComponent } from './header.component';

class MockAuthService{
  isLoggedIn() {
    return true;
  }
};
class MockRouter{
  navigate(someString) {}
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        AppSettings,
        {provide: AuthService, useClass: MockAuthService},
        {provide: Router, useClass: MockRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates home on clicking home', () => {
    const MockRouter = fixture.debugElement.injector.get(Router);
    spyOn(MockRouter, 'navigate');

    component.home();

    expect(MockRouter.navigate).toHaveBeenCalledWith([""]);
  });

  it('navigates to login on clicking sign in', () => {
    const MockRouter = fixture.debugElement.injector.get(Router);
    spyOn(MockRouter, 'navigate');

    component.signIn();

    expect(MockRouter.navigate).toHaveBeenCalledWith(["login"]);
  });

});
