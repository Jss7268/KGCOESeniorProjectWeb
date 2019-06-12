import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDeviceComponent } from './create-new-device.component';

describe('CreateNewDeviceComponent', () => {
  let component: CreateNewDeviceComponent;
  let fixture: ComponentFixture<CreateNewDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewDeviceComponent ]
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
