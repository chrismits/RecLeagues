import { Component, OnInit, Input } from '@angular/core';
import { League } from '../league';
import { LeagueService } from '../league.service';
import { Team } from '../team';
import { TEAMS } from '../ex_teams';
import { LEAGUES } from '../ex_league';

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.scss']
})
export class LeagueInfoComponent implements OnInit {


  leagues: League[] = LEAGUES;
  league = this.leagues[0];
  season = this.league.getSeason();
  sport = this.league.getSport();
  unapprovedTeams: Team[] = TEAMS;
  approvedTeams: Team[] = [];

  constructor(public leagueService: LeagueService) { }

  ngOnInit()  {
  }

  changeStatus(team) {
    console.log(team.getName());
  }

}
