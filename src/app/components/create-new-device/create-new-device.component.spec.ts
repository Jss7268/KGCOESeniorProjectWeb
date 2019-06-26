import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {AppSettings} from '../../app.settings';
import { CreateNewDeviceComponent } from './create-new-device.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';


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

describe('CreateNewDeviceComponent', () => {
  let component: CreateNewDeviceComponent;
  let fixture: ComponentFixture<CreateNewDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewDeviceComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        AppSettings,
        {provide: AuthService, useClass: MockAuthService},
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: Router, useClass: MockRouter},
        MatDialog
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
