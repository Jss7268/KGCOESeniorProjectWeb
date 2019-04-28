import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExperimentsComponent } from './list-experiments.component';

describe('ListExperimentsComponent', () => {
  let component: ListExperimentsComponent;
  let fixture: ComponentFixture<ListExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
