import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { TEAMS } from '../ex_teams';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {

  teams: Team[] = TEAMS;

  constructor() { }

  ngOnInit() {
  	this.sortTeams();
  }

  sortTeams() {
  	
  }

}
