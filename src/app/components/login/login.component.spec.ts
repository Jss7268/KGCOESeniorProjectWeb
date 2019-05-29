import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {AppSettings} from '../../app.settings';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

class MockAuthService{
  isLoggedIn() {
    return true;
  }
};
class MockQueryParams{
  subscribe() {}
};
class MockRouter{
  navigate(someString, someObservable) {};
};
class MockActivatedRoute{
  queryParams = new MockQueryParams();
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AppSettings,
        {provide: AuthService, useClass: MockAuthService},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: Router, useClass: MockRouter}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass the value from email to the router', () => {
    const MockRouter = fixture.debugElement.injector.get(Router);
    spyOn(MockRouter, 'navigate');

    component.loginForm.controls.email.setValue('suqah');
    component.register();

    expect(MockRouter.navigate).toHaveBeenCalledWith(["signup"], Object({queryParams: Object({email: 'suqah'})}));
  });
});
