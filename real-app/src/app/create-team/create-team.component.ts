import { Component, OnInit } from '@angular/core';
import { League } from '../league'
import { LEAGUES } from '../ex_league' 
import { LeagueService } from '../league.service'
import { TeamService } from '../team.service'
import { Team } from '../team'
import { PLAYERS } from '../ex_players';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  team_name: string = "";
  player_email: string = "";
  free_agent: boolean;
  league: League = LEAGUES[0];
  sport: string = this.league.getSport();

  player_emails: string[] = [];

  addEmail() {
  	if (!this.player_emails.includes(this.player_email)) {
	  	this.player_emails.push(this.player_email);
  	}
  }

  removeEmail(email: string) {
  	this.player_emails.splice(this.player_emails.indexOf(email), 1);
  }

  onSubmit() {
  	console.log("submitted");
  	console.log(this.player_emails); /* send email notification */
  	/* send to db */
  	console.log(this.team_name); 
  	console.log(this.free_agent);
  	let new_team = new Team(this.team_name, PLAYERS[0]);
  	this.teamService.setTeam(new_team);
  }

  constructor(public leagueService: LeagueService,
  			  public teamService: TeamService) { }

  ngOnInit() {
  	if (this.leagueService.getLeague() != undefined) {
  		this.league = this.leagueService.getLeague();
  	}
  }

}
