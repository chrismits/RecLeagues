import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFormFiveComponent } from './league-form-five.component';

describe('LeagueFormFiveComponent', () => {
  let component: LeagueFormFiveComponent;
  let fixture: ComponentFixture<LeagueFormFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueFormFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueFormFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
