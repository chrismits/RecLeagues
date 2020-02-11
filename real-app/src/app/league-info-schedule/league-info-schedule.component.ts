import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { LEAGUES } from '../ex_league';

@Component({
  selector: 'app-league-info-schedule',
  templateUrl: './league-info-schedule.component.html',
  styleUrls: ['./league-info-schedule.component.scss']
})
export class LeagueInfoScheduleComponent implements OnInit {

	leagues: League[] = LEAGUES;
	league = this.leagues[0];
	season = this.league.getSeason();
  	sport = this.league.getSport();

  constructor() { }

  ngOnInit() {
  }

}
