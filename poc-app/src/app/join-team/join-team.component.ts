import { Component, OnInit } from '@angular/core';
import { TEAMS } from '../ex_teams'
import { Player } from '../player'
import { Team } from '../team'

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent implements OnInit {

  user: Player = new Player('Ming', 'Chow', 'mchow@tufts.edu')
  teams: Team[] = TEAMS;

  addPlayerToTeam(t: Team) {
  	t.addPlayer(this.user);
  }
	
  constructor() { }

  ngOnInit() {
  }

}
