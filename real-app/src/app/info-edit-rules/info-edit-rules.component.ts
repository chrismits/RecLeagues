import { Component, OnInit } from '@angular/core';
import { League } from '../league'
import { LEAGUES } from '../ex_league' 
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-info-edit-rules',
  templateUrl: './info-edit-rules.component.html',
  styleUrls: ['./info-edit-rules.component.scss']
})
export class InfoEditRulesComponent implements OnInit {
  
  league: League = LEAGUES[0];
  now: Date = new Date();
  new_rules: string = this.league.getRules();

  regOpen() {
  	// this.now.setDate(this.now.getDate() - 1); // for testing
  	return this.league.getRegStart() < this.now && 
  		   this.league.getRegEnd() > this.now;
  }

  goToInfo() {
  	this.league.setRules(this.new_rules);
  	this.leagueService.setLeague(this.league);
    this.leagueService.updateLeague();
  }

  teamsExist() {
  	return false;
  }

  gamesExist() {
  	return false;
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
  	this.league = this.leagueService.getLeague();
  }

}
