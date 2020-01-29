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

  ngOnInit() {
    // can load in events here using db info
    console.log('why');
    this.leagues.forEach(l => 
        l.getTimeSlots().forEach(s => 
          this.calendarEvents.push(
           {
              title: l.getName(),
              start: s.getStart(),
              end: s.getEnd(),
            })));
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
