import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { Match } from '../match';
import { MATCHES } from '../ex_match';


@Component({
  selector: 'app-league-game-schedule',
  templateUrl: './league-game-schedule.component.html',
  styleUrls: ['./league-game-schedule.component.scss']
})
export class LeagueGameScheduleComponent implements OnInit {


	matches = MATCHES;
	match = this.matches[0];
	leagues: League[] = LEAGUES;
	league = this.leagues[0];
	season = this.league.getSeason();
  	sport = this.league.getSport();


  constructor() { }

  ngOnInit() {
  }

}
