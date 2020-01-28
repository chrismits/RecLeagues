import { Component, OnInit } from '@angular/core';
import { League } from '../league'

@Component({
  selector: 'app-league-form-five',
  templateUrl: './league-form-five.component.html',
  styleUrls: ['./league-form-five.component.scss']
})
export class LeagueFormFiveComponent implements OnInit {

  constructor() { }

  init_name: string = 'name';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();

  model: League = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", ""); 

  ngOnInit() {
  }

}
