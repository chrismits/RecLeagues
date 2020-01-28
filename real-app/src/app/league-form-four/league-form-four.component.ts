import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../match'
import { League } from '../league'  
import { TimeSlot } from '../league'  

@Component({
  selector: 'app-league-form-four',
  templateUrl: './league-form-four.component.html',
  styleUrls: ['./league-form-four.component.scss']
})
export class LeagueFormFourComponent implements OnInit {

  @Output() added = new EventEmitter<League>();

  days: string[] = ['Sunday', 'Monday', 'Tuesday',
  					'Wednesday', 'Thursday', 'Friday',
  					'Saturday'];

  model = new TimeSlot();

  init_name: string = 'name';
  init_sport: string = '';
  init_season: string = ''; 
  init_date: Date = new Date();

  league_model = new League(this.init_name, false, this.init_sport, this.init_season, this.init_date, this.init_date, this.init_date, "", "", ""); 

  submitted = false;

  slots: TimeSlot[] = [];

  onSubmit() { 
  	this.submitted = true; 
    // Need error checking
    //if (this.model.schedule != null) {
    //  this.model.schedule.map(m => new_model.addMatch(m));
    //}
  	//this.added.emit(new_model);
  }

  addSlot() {
    let tempSlot = new TimeSlot();
    tempSlot.setDay(this.model.getDay());
    tempSlot.setLength(this.model.getLength());
    tempSlot.setBuffer(this.model.getBuffer());
    tempSlot.setStart(this.model.getStart());
    tempSlot.setEnd(this.model.getEnd());
    this.slots.push(tempSlot);
  }

  daysAdded() {
    if (this.slots == []) return false;
    else return true;
  }

  constructor() { }

  ngOnInit() {
  }

}
