import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEditRulesComponent } from './info-edit-rules.component';

describe('InfoEditRulesComponent', () => {
  let component: InfoEditRulesComponent;
  let fixture: ComponentFixture<InfoEditRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEditRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEditRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
