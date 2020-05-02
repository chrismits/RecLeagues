import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFormTwoComponent } from './league-form-two.component';

describe('LeagueFormTwoComponent', () => {
  let component: LeagueFormTwoComponent;
  let fixture: ComponentFixture<LeagueFormTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueFormTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueFormTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
