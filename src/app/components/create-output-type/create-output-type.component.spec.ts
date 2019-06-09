import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutputTypeComponent } from './create-output-type.component';

describe('CreateOutputTypeComponent', () => {
  let component: CreateOutputTypeComponent;
  let fixture: ComponentFixture<CreateOutputTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOutputTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOutputTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
