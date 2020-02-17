import { Component, OnInit } from '@angular/core';
import { League } from '../league'
import { LEAGUES } from '../ex_league' 
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

	league: League = LEAGUES[0];
	now: Date = new Date();

  regOpen() {
  	// this.now.setDate(this.now.getDate() - 1); // for testing
  	return this.league.getRegStart() < this.now && 
  		   this.league.getRegEnd() > this.now;
  }

  setLeague() {
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
  	if (this.leagueService.getLeague() != undefined) {
  		this.league = this.leagueService.getLeague();
  	}
  }

}
