import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTeamFormComponent } from './join-team-form.component';

describe('JoinTeamFormComponent', () => {
  let component: JoinTeamFormComponent;
  let fixture: ComponentFixture<JoinTeamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinTeamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
