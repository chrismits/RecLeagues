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
      /* Registration Period */
      let reg_start = this.setZeroTime(l.getRegStart());
      let reg_s_end = new Date(reg_start);
      let reg_end   = this.setMaxTime(l.getRegEnd());
      let reg_e_start = new Date(reg_end);
      this.calendarEvents.push(
        {
          title: l.getName() + " Registration Start",
          start: reg_start,
          end:   reg_s_end.setHours(reg_start.getHours() + 3),
        });
      this.calendarEvents.push(
        {
          title: l.getName() + " Registration End",
          start: reg_e_start.setHours(reg_end.getHours() - 3),
          end:   reg_end,
        });

      /* League Period */
      let league_start = this.setZeroTime(l.getStartDate());
      let league_end   = this.setMaxTime(l.getEndDate());
      // console.log("league start and end");
      // console.log(league_start);
      // console.log(league_end);
      for (let s of l.getTimeSlots()) {
        // console.log('got slot');
        // console.log(s);
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
          // console.log('in while');
          // console.log(curr_date);
          // console.log(curr_end_date);
          all_starts.push(new Date(curr_date));
          all_ends.push(new Date(curr_end_date));
          curr_date.setDate(curr_date.getDate() + 7);
          curr_end_date.setDate(curr_end_date.getDate() + 7);
        }

        /* Push those game schedules to calendar events */
        for (var idx = 0; idx < all_starts.length; idx++) {
          this.calendarEvents.push(
            {
               title: l.getName() + " game day",
               start: all_starts[idx],
               end:   all_ends[idx],
            });
        }
      }
    }
    // console.log(this.leagues.length);
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

  dateTimeToString(d: Date) {
    var hr = d.getHours();
    var mins = d.getMinutes().toString();
    var isAm = false;
    var tod = "pm"
    if (hr < 12) { isAm = true; tod = "am"; }
    if (hr == 0) { hr += 12; }
    if (hr > 12) { hr -= 12; }
    if (mins.length == 1) {
      mins = '0' + mins;
    }
    var str = hr.toString() + ':' + mins + ' ' + tod;
    return str;
  }

  handleEventClick(event_info) {
    /* can do routing to game info from here */
    var eventObj = event_info.event;
    var start_str = this.dateTimeToString(eventObj.start);
    var end_str = this.dateTimeToString(eventObj.end);
    var alert_str = eventObj.title + " from " + start_str + " - " + end_str;
    alert(alert_str);
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
  }

}
