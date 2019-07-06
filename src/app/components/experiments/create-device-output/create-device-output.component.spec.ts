import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeviceOutputComponent } from './create-device-output.component';

describe('CreateDeviceOutputComponent', () => {
  let component: CreateDeviceOutputComponent;
  let fixture: ComponentFixture<CreateDeviceOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeviceOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeviceOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
