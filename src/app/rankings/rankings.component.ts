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
    const teamAndPoints = [];
    for (const team of this.teams) {
      const teamPoints = 3 * team.getWins() + team.getTies();
      teamAndPoints.push({
        team: team.getName(),
        points: teamPoints
      });
    }
    this.teams.sort(function(first, second) {
      const fPoints = 3 * first.getWins() + first.getTies();
      const sPoints = 3 * second.getWins() + second.getTies();
      if (sPoints === fPoints) {
        return first.getLosses() - second.getLosses();
      }
      return sPoints - fPoints;
    });
  }

}
