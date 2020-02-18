import { Component, OnInit } from '@angular/core';
import { League } from '../league'
import { LEAGUES } from '../ex_league' 
import { TEAMS } from '../ex_teams' 
import { Team } from '../team' 
import { LeagueService } from '../league.service'
import { TeamService } from '../team.service'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  league: League = LEAGUES[0];
  teams: Team[] = TEAMS;
	now: Date = new Date();

  regOpen() {
  	// this.now.setDate(this.now.getDate() - 1); // for testing
  	return this.league.getRegStart() < this.now && 
  		   this.league.getRegEnd() > this.now;
  }

  createTeam() {
    this.leagueService.setLeague(this.league);
  }

  teamsExist() {
  	return false;
  }

  gamesExist() {
  	return false;
  }

  constructor(public leagueService: LeagueService,
              public teamService: TeamService) { }

  ngOnInit() {
  	if (this.leagueService.getLeague() != undefined) {
      this.league = this.leagueService.getLeague();
    }
    if (this.teamService.getTeam() != undefined) {
  		console.log(this.teamService.getTeam());
  	}
  }

}
