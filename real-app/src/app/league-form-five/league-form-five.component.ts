import { Component, OnInit } from '@angular/core';
import { League, TimeSlot } from '../league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-form-five',
  templateUrl: './league-form-five.component.html',
  styleUrls: ['./league-form-five.component.scss']
})
export class LeagueFormFiveComponent implements OnInit {

  constructor(public leagueService: LeagueService) { }

  autoApproval = 'not';
  freeAgentsAre = 'not allowed';

  model: League;
  leagues: League[] = [this.leagueService.getLeague()];

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.leagueService.storeLeague();
  }

  ngOnInit() {
    this.model = this.leagueService.getLeague();
    if (this.leagueService.getLeague().isAutoApproval()) {
      this.autoApproval = '';
    }
    if (this.leagueService.getLeague().isFreeAgents()) {
      this.freeAgentsAre = 'allowed';
    }
  }

}
