import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueInfoScheduleComponent } from './league-info-schedule.component';

describe('LeagueInfoScheduleComponent', () => {
  let component: LeagueInfoScheduleComponent;
  let fixture: ComponentFixture<LeagueInfoScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueInfoScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueInfoScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
