import { Component, OnInit } from '@angular/core';
import { Player } from '../player'
import { League } from '../league'
import { LEAGUES } from '../ex_league'
import { LeagueService } from '../league.service'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  title = "Tufts University Intramural Leagues"
  season = "Winter 2020";
  isAdmin = false;
  leagues: League[] = LEAGUES;
  constructor(public leagueService: LeagueService) { }

  goToLeague(l: League) {
    console.log(l.getName());
    this.leagueService.setLeague(l);
  }

  ngOnInit() {
  	//this.leagues = this.leagueService.getLeagues();
  }

}
