import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import $ from 'jquery' 
import { League } from '../league'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  title = 'League Scheduler';
  @Input() leagues: League[];

  setTime(d: Date, time: string) {
    d.setHours(Number(time.split(":")[0]));
    d.setMinutes(Number(time.split(":")[1].split(" ")[0]));
    if (time.split(":")[1].split(" ")[1].toUpperCase() === "PM") {
      d.setHours(d.getHours() + 12);
    }
  }

  setZeroTime(d: Date) {
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
  }
  setMaxTime(d : Date) {
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    d.setMilliseconds(999);
    return d;
  }

  ngOnInit() {
    /* - Can load in events here using db info
       - Create all of the league game days */
    for (let l of this.leagues) {
      let league_start = this.setZeroTime(l.getStartDate());
      let league_end   = this.setMaxTime(l.getEndDate());
      console.log("league start and end");
      console.log(league_start);
      console.log(league_end);
      for (let s of l.getTimeSlots()) {
        console.log('got slot');
        console.log(s);
        /* Populate a date object with date/time info */
        var all_starts: Date[] = [];
        var all_ends  : Date[] = [];
        var curr_date = new Date(league_start);
        var diff      = curr_date.getDay() - s.getDayNum();
        if (diff > 0) {
          curr_date.setDate(curr_date.getDate() + ( 7 - diff))
        } else {
          curr_date.setDate(curr_date.getDate() - diff);
        }
        this.setTime(curr_date, s.getStart());
        var curr_end_date = new Date(curr_date);
        this.setTime(curr_end_date, s.getEnd());

        /* Generate all date objects needed for a complete schedule */
        while (curr_date >= league_start && curr_date <= league_end) {
          console.log('in while');
          console.log(curr_date);
          console.log(curr_end_date);
          all_starts.push(new Date(curr_date));
          all_ends.push(new Date(curr_end_date));
          curr_date.setDate(curr_date.getDate() + 7);
          curr_end_date.setDate(curr_end_date.getDate() + 7);
        }

        /* Push those game schedules to calendar events */
        for (var idx = 0; idx < all_starts.length; idx++) {
          this.calendarEvents.push(
            {
               title: l.getName(),
               start: all_starts[idx],
               end:   all_ends[idx],
            });
        }
      }
    }
    console.log(this.leagues.length);
  }

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [] 

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }


  handleEventClick(event_info) {
    var eventObj = event_info.event;
    var old_matchup = eventObj.title;
    var old_home = old_matchup.split("vs.")[0];
    var old_away = old_matchup.split("vs.")[1];
    var new_home = prompt("Enter new home team's name or leave blank.");
    var new_away = prompt("Enter new away team's name or leave blank.");
    if (new_home == "") { new_home = old_home; }
    if (new_away == "") { new_away = old_away; }
    var new_matchup = new_home + " vs. " + new_away;
    eventObj.setProp("title", new_matchup);
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2004-10-27'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    let cal = this.calendarComponent.getApi();
    var view = cal.view;
    if (view.type == "dayGridMonth") {
       cal.changeView('timeGridWeek', arg.dateStr);
       return;
    }      
    if (confirm('Would you like to add a match to ' + arg.dateStr.split("T")[0] + ' at ' + 
       		 arg.dateStr.split("T")[1].split("-")[0] + ' ?')) {
      var diff = 30; // currently hardcoded, but should be time from db
      var endDate = new Date(arg.date.getTime() + diff*60000);
      var team_1 = prompt("Home Team: ", "");
      var team_2 = prompt("Away Team: ", "");
      var match_up = team_1 + " vs. " + team_2;
      if (team_1 == null || team_1 == "" || team_2 == null || team_2 == "") {
        alert("Invalid matchup!");
      } else {
        this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
          // id: from_db -- this is match _id stored in db
          title: match_up,
          start: arg.date,
  	      end: endDate
        })
      }
    }
  }

}
