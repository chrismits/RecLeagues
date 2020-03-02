import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { LeagueService } from '../league.service';
import { TeamService } from '../team.service';
import { Team } from '../team';
import { PLAYERS } from '../ex_players';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  teamName = '';
  playerEmail = '';
  freeAgent: boolean;
  league: League = LEAGUES[0];

  playerEmails: string[] = [];

  addEmail() {
    if (!this.playerEmails.includes(this.playerEmail)) {
      this.playerEmails.push(this.playerEmail);
    }

    console.log(this.playerEmail);
    console.log(this.playerEmails);
  }

  removeEmail(email: string) {
    this.playerEmails.splice(this.playerEmails.indexOf(email), 1);
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.playerEmails); /* send email notification */
    /* send to db */
    console.log(this.teamName);
    console.log(this.freeAgent);
    const newTeam = new Team(this.teamName, PLAYERS[0]);
    newTeam.setLeagueID(this.league._id);
    newTeam.setFreeAgents(this.freeAgent);
    console.log(newTeam);
    this.teamService.setTeam(newTeam);
    this.teamService.setNew(true);
    //this.teamService.storeTeam();
  }

  constructor(public leagueService: LeagueService,
              public teamService: TeamService) { }

  ngOnInit() {
    if (this.leagueService.getLeague() !== undefined) {
      this.league = this.leagueService.getLeague();
    }
  }

}
