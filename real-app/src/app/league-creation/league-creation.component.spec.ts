import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueCreationComponent } from './league-creation.component';

describe('LeagueCreationComponent', () => {
  let component: LeagueCreationComponent;
  let fixture: ComponentFixture<LeagueCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
