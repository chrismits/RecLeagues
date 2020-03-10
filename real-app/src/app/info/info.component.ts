import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { Team } from '../team';
import { TEAMS } from '../ex_teams';
import { LEAGUES } from '../ex_league';
import { LeagueService } from '../league.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  league: League = LEAGUES[0];
  now: Date = new Date();
  teams: Team[] = TEAMS;

  beforeReg() {
    const start = new Date(this.league.getRegStart());
    return start > this.now;
  }

  regOpen() {
    const start = new Date(this.league.getRegStart());
    const end = new Date(this.league.getRegEnd());
    return start <= this.now && end >= this.now;
  }

  afterReg() {
    const end = new Date(this.league.getRegEnd());
    return end < this.now;
  }

  setLeague() {
    this.leagueService.setLeague(this.league);
  }

  setTeam(t: Team) {
    this.teamService.setTeam(t);
  }

  teamsExist() {
    return this.teams !== [];
  }

  gamesExist() {
    return false;
  }

  constructor(public leagueService: LeagueService,
              public teamService: TeamService) { }

  ngOnInit() {
    if (this.leagueService.getLeague() !== undefined) {
      this.league = this.leagueService.getLeague();
    }
  }

}
