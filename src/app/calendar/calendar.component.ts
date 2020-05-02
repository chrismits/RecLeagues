import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick
import * as $ from 'jquery';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  title = 'League Scheduler';
  @Input() leagues: League[];
  @ViewChild('calendar', {static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  isPopulated = false;

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [];

  setTime(d: Date, time: string) {
    d.setHours(Number(time.split(':')[0]));
    d.setMinutes(Number(time.split(':')[1].split(' ')[0]));
    if (time.split(':')[1].split(' ')[1].toUpperCase() === 'PM') {
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
  setMaxTime(d: Date) {
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    d.setMilliseconds(999);
    return d;
  }

  constructor(public leagueService: LeagueService) {}

  ngOnInit() {
    /* - Can load in events here using db info
       - Create all of the league game days */
    this.populateCal();
  }

  ngDoCheck() {
    if (this.leagues.length !== 0 && !this.isPopulated) {
      this.populateCal();
    }
  }

  populateCal() {
    for (const l of this.leagues) {
      /* Registration Period */
      const realRegStart = new Date(l.getRegStart());
      const realRegEnd = new Date(l.getRegEnd());
      const regStart = this.setZeroTime(realRegStart);
      const regSEnd = new Date(regStart);
      const regEnd   = this.setMaxTime(realRegEnd);
      const regEndStart = new Date(regEnd);
      this.calendarEvents.push(
        {
          title: l.getSport() + ' Registration Start',
          start: regStart,
          end:   regSEnd.setHours(regStart.getHours() + 3),
        });
      this.calendarEvents.push(
        {
          title: l.getSport() + ' Registration End',
          start: regEndStart.setHours(regEnd.getHours() - 3),
          end:   regEnd,
        });

      /* League Period */
      const realLeagueStart = new Date(l.getStartDate());
      const realLeagueEnd = new Date(l.getEndDate());
      const leagueStart = this.setZeroTime(realLeagueStart);
      const leagueEnd   = this.setMaxTime(realLeagueEnd);
      // console.log('league start and end');
      // console.log(leagueStart);
      // console.log(leagueEnd);
      for (const s of l.getTimeSlots()) {
        // console.log('got slot');
        // console.log(s);
        /* Populate a date object with date/time info */
        const allStarts: Date[] = [];
        const allEnds: Date[] = [];
        const currDate = new Date(leagueStart);
        const diff      = currDate.getDay() - s.getDayNum();
        if (diff > 0) {
          currDate.setDate(currDate.getDate() + ( 7 - diff));
        } else {
          currDate.setDate(currDate.getDate() - diff);
        }
        this.setTime(currDate, s.getStart());
        const currEndDate = new Date(currDate);
        this.setTime(currEndDate, s.getEnd());

        /* Generate all date objects needed for a complete schedule */
        while (currDate >= leagueStart && currDate <= leagueEnd) {
          // console.log('in while');
          // console.log(currDate);
          // console.log(currEndDate);
          allStarts.push(new Date(currDate));
          allEnds.push(new Date(currEndDate));
          currDate.setDate(currDate.getDate() + 7);
          currEndDate.setDate(currEndDate.getDate() + 7);
        }

        /* Push those game schedules to calendar events */
        for (let idx = 0; idx < allStarts.length; idx++) {
          this.calendarEvents.push(
            {
               title: l.getSport() + ' game day',
               start: allStarts[idx],
               end:   allEnds[idx],
            });
        }
      }
      this.isPopulated = true;
      // console.log(this.calendarEvents);
    }
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  dateTimeToString(d: Date) {
    let hr = d.getHours();
    let mins = d.getMinutes().toString();
    let isAm = false;
    let tod = 'pm';
    if (hr < 12) { isAm = true; tod = 'am'; }
    if (hr === 0) { hr += 12; }
    if (hr > 12) { hr -= 12; }
    if (mins.length === 1) {
      mins = '0' + mins;
    }
    const str = hr.toString() + ':' + mins + ' ' + tod;
    return str;
  }

  handleEventClick(eventInfo) {
    /* can do routing to game info from here */
    const eventObj = eventInfo.event;
    const startStr = this.dateTimeToString(eventObj.start);
    const endStr = this.dateTimeToString(eventObj.end);
    const alertStr = eventObj.title + ' from ' + startStr + ' - ' + endStr;
    alert(alertStr);
  }

  gotoPast() {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2004-10-27'); // call a method on the Calendar object
  }

  handleDateClick(arg) {
    const cal = this.calendarComponent.getApi();
    const view = cal.view;
    if (view.type === 'dayGridMonth') {
       cal.changeView('timeGridWeek', arg.dateStr);
       return;
    }
  }

}
