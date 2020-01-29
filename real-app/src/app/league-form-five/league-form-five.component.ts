import { Component, OnInit } from '@angular/core';
import { League, TimeSlot } from '../league'

@Component({
  selector: 'app-league-form-five',
  templateUrl: './league-form-five.component.html',
  styleUrls: ['./league-form-five.component.scss']
})
export class LeagueFormFiveComponent implements OnInit {

  constructor() { }

  init_name: string = 'name';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();

  model: League = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", ""); 
  leagues: League[] = [this.model];

  ngOnInit() {
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
    console.log(this.model.getTimeSlots()[0].getDay());
  }

}
