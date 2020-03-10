import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { League } from '../league';
import { LeagueService } from '../league.service';
import { Match } from '../match';

@Component({
  selector: 'app-league-form-one',
  templateUrl: './league-form-one.component.html',
  styleUrls: ['./league-form-one.component.scss'],
})
export class LeagueFormOneComponent implements OnInit {

  seasons: string[] = ['Fall', 'Winter', 'Spring'];
  sports: string[] = ['Indoor Soccer', 'Basketball', 'Volleyball',
                      'Flag Football', 'Soccer'];
  types: string[] = ['Male', 'Female', 'Co-ed'];
  levels: string[] = ['Competitive', 'Recreational'];

  initName = '';
  initSport = '';
  initSeason = '';
  initDate: Date = new Date();
  initLoc = '';
  initType = '';
  initLevel = '';

  model = new League('1', this.initName, this.initSport,
             this.initSeason, this.initDate,
             this.initDate, 0, [], 10, 5, 5, this.initDate, this.initDate,
             [], [], this.initLoc, this.initType,
             this.initLevel, false, false, '', this.initDate);

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.leagueService.getLeague().deepCopyLeague(this.model);
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    const lgue = new League('1', 'initialized', this.initSport,
             this.initSeason, this.initDate,
             this.initDate, 0, [], 10, 5, 5, this.initDate, this.initDate,
             [], [], this.initLoc, this.initType,
             this.initLevel, false, false, '', this.initDate);
    this.leagueService.setLeague(lgue);
  }

}
