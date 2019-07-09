import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ExportExperimentComponent } from './export-experiment.component';

class MockRouter{
  navigate(someString, someObservable) {};
};
class MockQueryParams{
  subscribe() {}
};
class MockActivatedRoute{
  queryParams = new MockQueryParams();
};

describe('ExportExperimentComponent', () => {
  let component: ExportExperimentComponent;
  let fixture: ComponentFixture<ExportExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportExperimentComponent ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: ActivatedRoute, useClass: MockActivatedRoute},
        {provide: Router, useClass: MockRouter},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
