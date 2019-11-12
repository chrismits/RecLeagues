import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import $ from 'jquery' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [] // can load in events here using db info

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
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
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
        // id: from_db -- this is match _id stored in db
        title: match_up,
        start: arg.date,
	end: endDate
      })
    }
  }

}
