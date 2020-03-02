import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PLAYERS } from '../ex_players';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { Team } from '../team';
import { TEAMS } from '../ex_teams';
import { TeamService } from '../team.service';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  players: Player[] = PLAYERS;
  league: League = LEAGUES[0];
  team: Team = TEAMS[0];


  constructor(public leagueService: LeagueService,
              public teamService: TeamService) { }

  ngOnInit() {
    if (this.teamService.getTeam() !== undefined) {
      this.team = this.teamService.getTeam()
      this.players = this.team.getAllPlayers();
    }

    if (this.leagueService.getLeague() !== undefined) {
      this.league = this.leagueService.getLeague();
    }
  }

  isRegistered(p: Player) {
  	if (this.team.playerIsRegistered(p)) return "Registered";
  	else return "Unregistered";
  }

  isCaptain(p: Player) {
  	return this.team.captain === p;
  }

}
