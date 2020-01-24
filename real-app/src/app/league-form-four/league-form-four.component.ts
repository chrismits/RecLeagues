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

  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    // Need error checking
    //if (this.model.schedule != null) {
    //  this.model.schedule.map(m => new_model.addMatch(m));
    //}
  	//this.added.emit(new_model);
  }

  constructor() { }

  ngOnInit() {
  }

}
