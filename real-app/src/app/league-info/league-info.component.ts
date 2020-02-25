import { Component, OnInit, Input } from '@angular/core';
import { League } from '../league';
import { LeagueService } from '../league.service';
import { Team } from '../team';
import { TEAMS } from '../ex_teams';
import { LEAGUES } from '../ex_league';

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.scss']
})
export class LeagueInfoComponent implements OnInit {


  leagues: League[] = LEAGUES;
  league = this.leagues[0];
  unapprovedTeams: Team[] = TEAMS;
  approvedTeams: Team[] = [];
  unapprovedclicked = new Map();
  approvedclicked = new Map();

  constructor(public leagueService: LeagueService) { 
    for (var i=0; i<this.unapprovedTeams.length; i++) {
      this.unapprovedclicked.set(this.unapprovedTeams[i],false);
    }
  }

  ngOnInit()  {
    if (this.leagueService.getLeague() != undefined) {
      this.league = this.leagueService.getLeague();
    }
  }

  changeunapprovedStatus(team) {
    this.unapprovedclicked.set(team,!(this.unapprovedclicked.get(team)));
  }

  changeapprovedStatus(team) {
    this.approvedclicked.set(team,!(this.approvedclicked.get(team)));
  }

  sendLeft() {
    for (var i=0; i<this.approvedTeams.length; i++) {
      if (this.approvedclicked.get(this.approvedTeams[i])) {
        this.unapprovedTeams.push(this.approvedTeams[i]);
        this.approvedclicked.delete(this.approvedTeams[i]);
        this.unapprovedclicked.set(this.approvedTeams[i],false);
        this.approvedTeams.splice(i,1);
        i--;
      }
    }
  }

  sendRight() {
    // Append to approved teams if clicked true and delete them form unapproved
    for (var i=0; i<this.unapprovedTeams.length; i++) {
      if (this.unapprovedclicked.get(this.unapprovedTeams[i])) {
        this.approvedTeams.push(this.unapprovedTeams[i]);
        this.unapprovedclicked.delete(this.unapprovedTeams[i]);
        this.approvedclicked.set(this.unapprovedTeams[i],false);
        this.unapprovedTeams.splice(i,1);
        i--;
      }
    }
  }

}
