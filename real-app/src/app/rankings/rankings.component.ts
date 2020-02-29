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
    let team_and_points = [];
    for (let team of this.teams) {
      let team_points = 3 * team.getWins() + team.getTies();
      team_and_points.push({
        team: team.getName(),
        points: team_points
      });
  	}
    this.teams.sort(function(first, second) {
      let f_points = 3 * first.getWins() + first.getTies();
      let s_points = 3 * second.getWins() + second.getTies();
      if (s_points === f_points) {
        return first.getLosses() - second.getLosses();
      }
      return s_points - f_points;
    });
  }

}
