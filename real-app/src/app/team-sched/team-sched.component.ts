import { Component, OnInit } from '@angular/core';
import { Match } from '../match';
import { Team } from '../team';
import { MATCHES } from '../ex_match';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-sched',
  templateUrl: './team-sched.component.html',
  styleUrls: ['./team-sched.component.scss']
})
export class TeamSchedComponent implements OnInit {

  matches: Match[] = MATCHES;
  team: Team;

  constructor(public teamService: TeamService) { }

  ngOnInit() {
  	this.team = this.teamService.getTeam();
  	this.matches = this.matches.filter(m => 
  		m.getHome() === this.team || m.getAway() === this.team);
  }

}
