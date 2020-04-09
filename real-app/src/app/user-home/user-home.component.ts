import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Team } from '../team';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { PLAYERS } from '../ex_players';
import { LeagueService } from '../league.service';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  title = 'Intramural Leagues';
  season = 'Winter 2020';
  isAdmin = false;
  leagues: League[] = LEAGUES;
  myLeagues: League[] = [LEAGUES[0]];
  myTeam: string = 'wow';
  me: Player = PLAYERS[0];
  logoUrl = '../../assets/img/tennis.png';

  constructor(public leagueService: LeagueService,
              public userService: UserService) { }

  goToLeague(l: League) {
    this.leagueService.setLeague(l);
  }

  getLeagueLogo(l: League) {
    let sport = l.getSport().toLowerCase();
    console.log(sport);
    if (sport.indexOf('soccer') >= 0) {
      this.logoUrl = '../../assets/img/soccer.png';
    } else if (sport.indexOf('volleyball') >= 0) {
      this.logoUrl = '../../assets/img/volleyball.png';
    } else if (sport.indexOf('basketball') >= 0) {
      this.logoUrl = '../../assets/img/basketball.png';
    } else if (sport.indexOf('tennis') >= 0) {
      this.logoUrl = '../../assets/img/tennis.png';
    } else if (sport.indexOf('football') >= 0) {
      this.logoUrl = '../../assets/img/football.png';
    }
    return this.logoUrl;
  }

  getTeam(l: League) {
    let teams = l.getTeams();
    for (let t of teams) {
      if (t.isOnTeam(this.me)) {
        this.myTeam = t.getName();
      }
    }
    return this.myTeam;
  }

  // test version
  ngOnInit() {
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
      this.myLeagues = [this.leagues[2]];
    }, error => {
      console.log(error)
    })
    if (this.userService.getPlayer() === undefined) {
      this.userService.setPlayer(this.me);
    } else {
      this.me = this.userService.getPlayer();
    }
  }
}
