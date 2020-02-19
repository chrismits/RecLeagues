import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TEAMS } from '../mock-teams';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})

export class TeamsComponent implements OnInit {
  team_a: Team = {
  	id: 1,
	name: "TUFC B"
  };
  teams = TEAMS;
  selectedTeam: Team;
  onSelect(team: Team): void {
  	this.selectedTeam = team;
  }

  constructor() { }

  ngOnInit() {
  }

}