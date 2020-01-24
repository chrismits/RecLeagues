import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../match'
import { League } from '../league'  

@Component({
  selector: 'app-league-form-three',
  templateUrl: './league-form-three.component.html',
  styleUrls: ['./league-form-three.component.scss']
})
export class LeagueFormThreeComponent implements OnInit {

  @Output() added = new EventEmitter<League>();

  locations: string[] = ['Tisch', 'Bello', 'Couzens', 'Sauna'];

  init_name: string = 'name';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();

  model = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", "");

  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    var new_model = new League(this.model.name, false, this.model.sport, 
                               this.model.season, this.model.reg_start, 
                               this.model.reg_end,this.model.start_date, 
                               "", this.model.league_type, 
                               this.model.competition_level);
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
