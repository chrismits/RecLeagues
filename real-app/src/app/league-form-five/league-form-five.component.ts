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

  init_name: string = 'name';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();

  model: League = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", ""); 
  // model: League;
  leagues: League[] = [];

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.leagueService.getLeague().deepCopyLeague(this.model);
    this.leagueService.storeLeague();
  }

  ngOnInit() {
    //this.leagueService.getLeague().removeAllTimeSlots();
    this.model = this.leagueService.getLeague();
    let slot = new TimeSlot();
    let now = new Date();
    let diff = 180;
    let end = new Date(now.getTime() + diff * 60000)
    slot.setDay('Tuesday');
    slot.setStart(now);
    slot.setEnd(end);
    slot.setLength(15);
    slot.setBuffer(5);
    this.model.addTimeSlot(slot);
    this.leagues.push(this.model);
    // console.log(this.model.getTimeSlots()[0].getDay());
  }

}
