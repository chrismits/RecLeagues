import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { League } from '../league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-form-two',
  templateUrl: './league-form-two.component.html',
  styleUrls: ['./league-form-two.component.scss'],
})
export class LeagueFormTwoComponent implements OnInit {

  numTeams: number[] = [...Array(11).keys()].map(x => x + 5);
  numPlayers: number[] = [...Array(16).keys()].map(x => x + 1);
  numPlayersOn: number[] = [...Array(10).keys()].map(x => x + 1);
  maxNumTeams: number;
  minTeamSize: number;
  playersOn: number;

  model: League;
  submitted = false;
  freeAgent: boolean;

  onSubmit() {
    this.submitted = true;
    if (this.freeAgent) {
      this.model.setIsFreeAgents(true);
    }
    this.leagueService.getLeague().deepCopyLeague(this.model);
    this.leagueService.getLeague().setMaxNumTeams(this.maxNumTeams);
    this.leagueService.getLeague().setMinTeamSize(this.minTeamSize);
    this.leagueService.getLeague().setPlayersOn(this.playersOn);
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.model = this.leagueService.getLeague();
  }

}
