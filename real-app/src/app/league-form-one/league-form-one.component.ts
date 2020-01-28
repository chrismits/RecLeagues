import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { League } from '../league'
import { Match } from '../match'

@Component({
  selector: 'app-league-form-one',
  templateUrl: './league-form-one.component.html',
  styleUrls: ['./league-form-one.component.scss']
})
export class LeagueFormOneComponent implements OnInit {

  @Output() added = new EventEmitter<League>();
  @Input() league: League;
  @Input() avail_matches: Match[];

  seasons: string[] = ['Fall', 'Winter', 'Spring'];
  sports: string[] = ['Indoor Soccer', 'Basketball', 'Volleyball',
                      'Tennis', 'Dodgeball'];
  types: string[] = ['Male', 'Female', 'Co-Ed'];
  levels: string[] = ['Competitive', 'Recreational'];

  init_name: string = '';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();
  init_loc: string = '';
  init_type: string = '';
  init_level: string = '';

  model = new League(this.init_name, false, this.init_sport, 
             this.init_season, this.init_date, 
             this.init_date, this.init_date, 
             this.init_loc, this.init_type, 
             this.init_level);
  //model = this.league;
  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    console.log(this.model.getName());
    console.log(this.model.sport);
    console.log(this.model.season);
    console.log(this.model.getType());
    console.log(this.model.getCompLevel());
  	this.added.emit(this.model);
  }

  constructor() { }

  ngOnInit() {
  }

}
