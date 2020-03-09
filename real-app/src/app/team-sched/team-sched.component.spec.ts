import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSchedComponent } from './team-sched.component';

describe('TeamSchedComponent', () => {
  let component: TeamSchedComponent;
  let fixture: ComponentFixture<TeamSchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
