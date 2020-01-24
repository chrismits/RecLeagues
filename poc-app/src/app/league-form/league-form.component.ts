import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../match'
import { League } from '../league'

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss']
})
export class LeagueFormComponent implements OnInit {

  @Output() added = new EventEmitter<League>();
  @Input() avail_matches: Match[];

  init_name: string = '';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();
  matches: Match[] = [];
  seasons: string[] = ['Fall', 'Winter', 'Spring'];

  model = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "");

  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    var new_model = new League(this.model.name, false, this.model.sport, this.model.season, this.model.reg_start, this.model.reg_end, this.model.start_date, "");
    // Need error checking
    if (this.model.schedule != null) {
      this.model.schedule.map(m => new_model.addMatch(m));
    }
  	this.added.emit(new_model);
  }

  constructor() { }

  ngOnInit() {
  }

}