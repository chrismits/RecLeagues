import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { LeagueService } from '../league.service';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogRef } from "@angular/material"; 
import { NewLeagueDialogComponent } from "../new-league-dialog/new-league-dialog.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  season = 'Winter 2020';
  isAdmin = true;
  leagues: League[] = LEAGUES;
  
  newLeagueDialogRef: MatDialogRef<NewLeagueDialogComponent>;

  constructor(public leagueService: LeagueService, private dialog: MatDialog) { }

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
      this.leagueService.getLeagues().subscribe((leagues: League[]) => {
        this.leagues = leagues
      }, error => {
        console.log(error)
      });
  }
}


