import { Component, OnInit } from '@angular/core';
import { League, TimeSlot } from '../league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-form-four',
  templateUrl: './league-form-four.component.html',
  styleUrls: ['./league-form-four.component.scss']
})
export class LeagueFormFourComponent implements OnInit {

  days: string[] = ['Sunday', 'Monday', 'Tuesday',
                    'Wednesday', 'Thursday', 'Friday',
                    'Saturday'];

  model: TimeSlot = new TimeSlot();

  leagueModel: League;
  submitted = false;

  slots: TimeSlot[] = [];

  onSubmit() {
    if (!this.daysAdded()) {
      this.addSlot();
    }
    this.submitted = true;
    this.leagueModel.addTimeSlots(this.slots);
  }

  addSlot() {
    const tempSlot = new TimeSlot();
    tempSlot.setDay(this.model.getDay());
    tempSlot.setLength(this.model.getLength());
    tempSlot.setBuffer(this.model.getBuffer());
    tempSlot.setStart(this.model.getStart());
    tempSlot.setEnd(this.model.getEnd());
    this.slots.push(tempSlot);
  }

  removeSlot(s: TimeSlot) {
    this.slots = this.slots.filter(x => x !== s);
  }

  daysAdded() {
    if (this.slots === []) { return false; }
    return true;
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.leagueModel = this.leagueService.getLeague();
  }

}
