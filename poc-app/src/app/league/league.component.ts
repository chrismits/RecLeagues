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

  avail_matches: Match[] = MATCHES;

  addLeague(l: League) {
  	var new_league = new League(l.name, l.sport, l.season, l.reg_start, l.reg_end, l.start_date);
  	this.leagues.push(new_league);
    //this.avail_teams = this.avail_teams.filter(
    //  team => team != m.home && team != m.away);
    // propogate to db

    console.log(l.name);
  }  

  constructor() { }

  ngOnInit() {
  }

}
