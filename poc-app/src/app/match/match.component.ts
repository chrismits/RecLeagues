import { Component, OnInit } from '@angular/core';
import { Match } from '../match'
import { Team } from '../team'
import { TEAMS } from '../ex_teams'
import { MATCHES } from '../ex_match'

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  matches: Match[] = MATCHES;
  h_teams: Team[] = MATCHES.map(x => x.home);
  a_teams: Team[] = MATCHES.map(x => x.away);
  avail_teams: Team[] = TEAMS.filter(
    team => !this.h_teams.includes(team) && !this.a_teams.includes(team));

  addMatch(m: Match) {
    if (m.home.name != m.away.name) {
    	var new_match = new Match(m.home, m.away, m.date, m.location);
    	this.matches.push(new_match);
      this.avail_teams = this.avail_teams.filter(
        team => team != m.home && team != m.away);
      // propogate to db

      console.log(m.home.name);
      console.log(this.avail_teams.length);
    }
  }  

  constructor() { }

  ngOnInit() {
  }

}
