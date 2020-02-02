import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { League } from '../league'
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-league-form-two',
  templateUrl: './league-form-two.component.html',
  styleUrls: ['./league-form-two.component.scss'],
})
export class LeagueFormTwoComponent implements OnInit {

  num_teams: number[] = [...Array(11).keys()].map(x => x + 5);
  num_players: number[] = [...Array(16).keys()].map(x => x + 5);

  model: League;
  submitted = false;
  free_agent: boolean;

  onSubmit() { 
  	this.submitted = true; 
    if (this.free_agent) {
      this.model.setIsFreeAgents(true);
    }
    this.leagueService.getLeague().deepCopyLeague(this.model);
    console.log(this.leagueService.getLeague().getMaxNumTeams());
    console.log(this.leagueService.getLeague().getSport());
    if(this.leagueService.getLeague().isFreeAgents()) {
      console.log('nice');
    }
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    console.log('start two');
    console.log(this.leagueService.getLeague().getName());
    this.model = this.leagueService.getLeague();
  }

}
