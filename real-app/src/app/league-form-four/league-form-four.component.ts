import { Component, OnInit } from '@angular/core';
import { League, TimeSlot } from '../league'  
import { LeagueService } from '../league.service'  

@Component({
  selector: 'app-league-form-four',
  templateUrl: './league-form-four.component.html',
  styleUrls: ['./league-form-four.component.scss']
})
export class LeagueFormFourComponent implements OnInit {

  days: string[] = ['Sunday', 'Monday', 'Tuesday',
  					'Wednesday', 'Thursday', 'Friday',
  					'Saturday'];

  model = new TimeSlot();
  start_time: string;
  end_time: string;

  // init_name: string = 'name';
  // init_sport: string = '';
  // init_season: string = ''; 
  // init_date: Date = new Date();

  // league_model = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", ""); 
  league_model: League;
  submitted = false;

  slots: TimeSlot[] = [];

  onSubmit() { 
  	this.submitted = true; 
    //this.slots.forEach(slot => this.league_model.addTimeSlot(slot));
    this.leagueService.getLeague().deepCopyLeague(this.league_model);
    // Need error checking
    //if (this.model.schedule != null) {
    //  this.model.schedule.map(m => new_model.addMatch(m));
    //}
  	//this.added.emit(new_model);
  }

  addSlot() {
    let now = new Date();
    let diff = 180;
    let end = new Date(now.getTime() + diff * 60000)
    let tempSlot = new TimeSlot();
    tempSlot.setDay(this.model.getDay());
    tempSlot.setLength(this.model.getLength());
    tempSlot.setBuffer(this.model.getBuffer());
    tempSlot.setStart(now);
    tempSlot.setEnd(end);
    this.slots.push(tempSlot);
  }

  daysAdded() {
    if (this.slots == []) return false;
    else return true;
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.league_model = this.leagueService.getLeague();
  }

}
