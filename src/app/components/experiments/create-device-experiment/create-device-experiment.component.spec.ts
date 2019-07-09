import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeviceExperimentComponent } from './create-device-experiment.component';

describe('CreateDeviceExperimentComponent', () => {
  let component: CreateDeviceExperimentComponent;
  let fixture: ComponentFixture<CreateDeviceExperimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeviceExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeviceExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
