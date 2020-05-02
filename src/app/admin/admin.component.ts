import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { LeagueService } from '../league.service';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef } from "@angular/material"; 
import { NewLeagueDialogComponent } from "../new-league-dialog/new-league-dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  title = 'Intramural Leagues';
  season = 'Winter 2020';
  isAdmin = true;
  leagues: League[] = [];
  leftLeagues: League[];
  rightLeagues: League[];
  logoUrl = '../../assets/img/tennis.png';
  
  newLeagueDialogRef: MatDialogRef<NewLeagueDialogComponent>;

  constructor(public leagueService: LeagueService, 
              private dialog: MatDialog,
              public userService: UserService) { }

  getLeagueLogo(l: League) {
    let sport = l.getSport().toLowerCase();
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

  openNewLeagueDialog() {
    this.newLeagueDialogRef = this.dialog.open(NewLeagueDialogComponent,
                                      {width: '50%',
                                      height: '50%'});
  }

  goToLeague(l: League) {
      console.log(l.getName());
      this.leagueService.setLeague(l);
  }

  // test version
  ngOnInit() {
      this.leagueService.getLeagues().subscribe(leagues => {
        this.leagues = leagues;
        this.splitLeagues();
      }, error => {
        console.log(error)
      });
  }
}


