import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueGameScheduleComponent } from './league-game-schedule.component';

describe('LeagueGameScheduleComponent', () => {
  let component: LeagueGameScheduleComponent;
  let fixture: ComponentFixture<LeagueGameScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueGameScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueGameScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
