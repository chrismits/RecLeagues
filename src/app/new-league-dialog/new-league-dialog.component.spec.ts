import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLeagueDialogComponent } from './new-league-dialog.component';

describe('NewLeagueDialogComponent', () => {
  let component: NewLeagueDialogComponent;
  let fixture: ComponentFixture<NewLeagueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLeagueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
