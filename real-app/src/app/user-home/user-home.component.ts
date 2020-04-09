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
  leftLeagues: League[];
  rightLeagues: League[];
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
    let url = this.logoUrl;
    if (sport.indexOf('soccer') >= 0) {
      url = '../../assets/img/soccer.png';
    } else if (sport.indexOf('volleyball') >= 0) {
      url = '../../assets/img/volleyball.png';
    } else if (sport.indexOf('basketball') >= 0) {
      url = '../../assets/img/basketball.png';
    } else if (sport.indexOf('tennis') >= 0) {
      url = '../../assets/img/tennis.png';
    } else if (sport.indexOf('football') >= 0) {
      url = '../../assets/img/football.png';
    }
    this.logoUrl = url;
    return url;
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

  splitLeagues() {
    console.log('in here');
    console.log(this.leagues);
    let leagues = this.leagues.map(x => x);
    let length = leagues.length;
    let half = Math.ceil(length / 2)
    this.leftLeagues = leagues.splice(0, half);
    this.rightLeagues = leagues;
    console.log(this.rightLeagues);
    console.log(this.leftLeagues);
  }

  // test version
  ngOnInit() {
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
      this.myLeagues = [this.leagues[2]];
      this.splitLeagues();
    }, error => {
      console.log(error)
    })
    if (this.userService.getPlayer() === undefined) {
      this.userService.setPlayer(this.me);
    } else {
      this.me = this.userService.getPlayer();
    }
    this.splitLeagues();
  }
}
