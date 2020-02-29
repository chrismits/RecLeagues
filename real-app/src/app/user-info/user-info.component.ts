import { Component, OnInit } from '@angular/core';
import { League } from '../league'
import { LEAGUES } from '../ex_league' 
import { PLAYERS } from '../ex_players' 
import { TEAMS } from '../ex_teams' 
import { Team } from '../team' 
import { Player } from '../player' 
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
  me: Player = PLAYERS[2];

  beforeReg() {
    return this.league.getRegStart() > this.now;
  }

  regOpen() {
  	return this.league.getRegStart() <= this.now && 
  		     this.league.getRegEnd() >= this.now;
  }

  afterReg() {
    return this.league.getRegEnd() < this.now;
  }

  createTeam() {
    this.leagueService.setLeague(this.league);
  }

  teamsExist() {
  	return this.teams != [];
  }

  joinTeam(t: Team) {
    console.log("i joined");
    console.log(t);
  }

  isOnATeam(){
    for (let t of this.teams) {
      if (t.isOnTeam(this.me)) return true;
    }
    return false;
  }

  onThisTeam(t: Team) {
    return t.isOnTeam(this.me);
  }

  constructor(public leagueService: LeagueService,
              public teamService: TeamService) { }

  ngOnInit() {
  	if (this.leagueService.getLeague() !== undefined) {
      this.league = this.leagueService.getLeague();
      // if (this.teamService.getTeamsByLeagueID(this.league._id) !== []) {
      //   this.teams = this.teamService.getTeamsByLeagueID(this.league._id);
      // }
    }
    if (this.teamService.getTeam() !== undefined) {
  		console.log(this.teamService.getTeam());
      //this.teams.push(this.teamService.getTeam());
  	}

  }

  setTeam(t: Team){
    this.teamService.setTeam(t);
  }

}
