import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { League } from '../league'
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-league-form-two',
  templateUrl: './league-form-two.component.html',
  styleUrls: ['./league-form-two.component.scss'],
})
export class LeagueFormTwoComponent implements OnInit {

  // init_name: string = 'name';
  // init_sport: string = '';
  // init_season: string = ''; 
  // init_date: Date = new Date();
  // matches: Match[] = [];
  // state: League;
  num_teams: number[] = [...Array(11).keys()].map(x => x + 5);
  num_players: number[] = [...Array(16).keys()].map(x => x + 5);

  //model: League = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", "");
  model: League;
  //model = this.leagueService.model;
  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    this.leagueService.getLeague().deepCopyLeague(this.model);
    console.log(this.leagueService.getLeague().getMaxNumTeams());
    console.log(this.leagueService.getLeague().getSport());
    // Need error checking
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    console.log('start two');
    console.log(this.leagueService.getLeague().getName());
    //this.model.deepCopyLeague(this.leagueService.getLeague());
    this.model = this.leagueService.getLeague();
  }

}
