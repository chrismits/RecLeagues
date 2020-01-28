import { Component, OnInit } from '@angular/core';
import { League } from '../league'

@Component({
  selector: 'app-league-creation',
  templateUrl: './league-creation.component.html',
  styleUrls: ['./league-creation.component.scss']
})
export class LeagueCreationComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
