import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { Team } from '../team';
import { LEAGUES } from '../ex_league';
import { TEAMS } from '../ex_teams';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-info-edit-rules',
  templateUrl: './info-edit-rules.component.html',
  styleUrls: ['./info-edit-rules.component.scss']
})
export class InfoEditRulesComponent implements OnInit {

  league: League = LEAGUES[0];
  teams: Team[] = TEAMS;
  now: Date = new Date();
  newRules: string = this.league.getRules();

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

  goToInfo() {
    this.league.setRules(this.newRules);
    this.leagueService.setLeague(this.league);
    this.leagueService.updateLeague();
  }

  teamsExist() {
    return this.teams !== [];
  }

  gamesExist() {
    return false;
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.league = this.leagueService.getLeague();
    this.newRules = this.league.getRules();
  }

}
