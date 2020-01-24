import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFormFourComponent } from './league-form-four.component';

describe('LeagueFormFourComponent', () => {
  let component: LeagueFormFourComponent;
  let fixture: ComponentFixture<LeagueFormFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueFormFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueFormFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
