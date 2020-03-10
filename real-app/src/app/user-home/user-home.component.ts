import { Component, OnInit } from '@angular/core';
import { Player } from '../player'
import { League } from '../league'
import { LEAGUES } from '../ex_league'
import { PLAYERS } from '../ex_players'
import { LeagueService } from '../league.service'
import { UserService } from '../user.service'
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
  me: Player = PLAYERS[3];
  constructor(public leagueService: LeagueService,
              public userService: UserService) { }

  goToLeague(l: League) {
    console.log(l.getName());
    this.leagueService.setLeague(l);
  }

  // ngOnInit() {
  // 	this.leagues = this.leagueService.getLeagues();
  //   this.userService.setPlayer(this.me);
  // }

  // test version
  ngOnInit() {
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
    }, error => {
      console.log(error)
    })
    this.userService.setPlayer(this.me)
  }

}
