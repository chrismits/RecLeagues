import { Component, OnInit } from '@angular/core';
import { League } from '../league'
import { Match } from '../match'
import { MATCHES } from '../ex_match'
import { LEAGUES } from '../ex_league'

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.scss']
})
export class LeagueComponent implements OnInit {

  leagues: League[] = LEAGUES;

  matches: Match[] = [].concat(...this.leagues.map(l => l.schedule));
  avail_matches: Match[] = MATCHES.filter(
      m => !this.matches.includes(m));

  addLeague(l: League) {
  	var new_league = new League(l.name, l.sport, l.season, l.reg_start, l.reg_end, l.start_date);
  	this.leagues.push(new_league);
    l.schedule.map(m => new_league.addMatch(m));
    this.avail_matches = this.avail_matches.filter(
      match => !l.schedule.includes(match));
    // propogate to db

    //console.log(this.leagues[1].schedule[0].home.name);
  }  

  constructor() { }

  ngOnInit() { }

}
