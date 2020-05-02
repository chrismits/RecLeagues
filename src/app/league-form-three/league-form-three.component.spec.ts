import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueFormThreeComponent } from './league-form-three.component';

describe('LeagueFormThreeComponent', () => {
  let component: LeagueFormThreeComponent;
  let fixture: ComponentFixture<LeagueFormThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueFormThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueFormThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
