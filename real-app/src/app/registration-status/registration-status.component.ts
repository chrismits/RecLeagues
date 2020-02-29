import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PLAYERS } from '../ex_players';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { Team } from '../team';
import { TEAMS } from '../ex_teams';

@Component({
  selector: 'app-registration-status',
  templateUrl: './registration-status.component.html',
  styleUrls: ['./registration-status.component.scss']
})
export class RegistrationStatusComponent implements OnInit {

  players: Player[] = PLAYERS;
  league: League = LEAGUES[0];
  team: Team = TEAMS[0];

  constructor() { }

  ngOnInit() {
  }

  isRegistered(p: Player) {
  	if (this.team.playerIsRegistered(p)) return "Registered";
  	else return "Unregistered";
  }

  isCaptain(p: Player) {
    return this.team.captain === p;
  }

}
