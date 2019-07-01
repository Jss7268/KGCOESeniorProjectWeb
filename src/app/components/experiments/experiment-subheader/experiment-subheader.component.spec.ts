import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentSubheaderComponent } from './experiment-subheader.component';

describe('ExperimentSubheaderComponent', () => {
  let component: ExperimentSubheaderComponent;
  let fixture: ComponentFixture<ExperimentSubheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentSubheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
