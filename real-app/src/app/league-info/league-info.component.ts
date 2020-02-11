import { Component, OnInit, Input } from '@angular/core';
import { League } from '../league'
import { LeagueService } from '../league.service'
import { Team } from '../team'
import { TEAMS } from '../ex_teams'

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.scss']
})
export class LeagueInfoComponent implements OnInit {

  season: string = "Winter 2020";
  sport: string = "Volleyball";
  unapprovedTeams: Team[] = TEAMS;
  approvedTeams: Team[] = [];

  constructor(public leagueService: LeagueService) { }

  ngOnInit()  {
  }

}
