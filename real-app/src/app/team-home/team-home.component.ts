import { Component, OnInit } from '@angular/core';
import { Team } from '../team'
import { TeamService } from '../team.service'

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.scss']
})
export class TeamHomeComponent implements OnInit {

  team_name: string = "some team's name"; 
  team: Team;

  constructor(public teamService: TeamService) { }

  ngOnInit() {
  	this.team = this.teamService.getTeam();
  	this.team_name = this.team.getName();
  }

}
