import { Component, OnInit } from '@angular/core';
import { League } from '../league'  
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-league-form-three',
  templateUrl: './league-form-three.component.html',
  styleUrls: ['./league-form-three.component.scss']
})
export class LeagueFormThreeComponent implements OnInit {

  locations: string[] = ['Tisch', 'Bello', 'Couzens', 'Sauna'];

  // init_name: string = 'name';
  // init_sport: string = '';
  // init_season: string = ''; 
  // init_date: Date = new Date();

  // model = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", "");

  model: League;
  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    this.leagueService.getLeague().deepCopyLeague(this.model);
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.model = this.leagueService.getLeague();
  }

}
