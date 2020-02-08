import { Component, OnInit } from '@angular/core';
import { League, TimeSlot } from '../league'
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-league-form-five',
  templateUrl: './league-form-five.component.html',
  styleUrls: ['./league-form-five.component.scss']
})
export class LeagueFormFiveComponent implements OnInit {

  constructor(public leagueService: LeagueService) { }

  auto_approval: string = "not";
  free_agents_are: string = "not allowed";

  model: League;
  leagues: League[] = [this.leagueService.getLeague()];

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.leagueService.storeLeague();
  }

  ngOnInit() {
    this.model = this.leagueService.getLeague();
    if(this.leagueService.getLeague().isAutoApproval()) {
      this.auto_approval = "";
    }
    if(this.leagueService.getLeague().isFreeAgents()) {
      this.free_agents_are = "allowed";
    }

    console.log(this.model.getTimeSlots());

    // console.log(this.model.getMaxNumTeams());
  }

}
