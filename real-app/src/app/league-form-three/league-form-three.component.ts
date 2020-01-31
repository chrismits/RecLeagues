import { Component, OnInit } from '@angular/core';
import { League } from '../league'  
import { LeagueService } from '../league.service'

@Component({
  selector: 'app-league-form-three',
  templateUrl: './league-form-three.component.html',
  styleUrls: ['./league-form-three.component.scss']
})
export class LeagueFormThreeComponent implements OnInit {

  locations: string[] = ['Tisch', 'Bello', 'Cousens', 'Sauna'];
  reg_start_date: string = "";
  reg_end_date: string = "";
  start_date: string = "";
  end_date: string = "";
  
  model: League;
  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    this.model.setRegStart(this.stringToDate(this.reg_start_date));
    this.model.setRegEnd(this.stringToDate(this.reg_end_date));
    this.model.setStartDate(this.stringToDate(this.start_date));
    this.model.setEndDate(this.stringToDate(this.end_date));
    this.leagueService.getLeague().deepCopyLeague(this.model);
    console.log(this.model.getReadableStartDate());
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.model = this.leagueService.getLeague();
  }

  stringToDate(s: string) {
    let numbers = s.split("/"); 
    let month = numbers[0];
    let day = numbers[1];
    let year = numbers[2];
    let new_date = new Date();
    new_date.setDate(parseInt(day, 10));
    new_date.setMonth(parseInt(month, 10) - 1);
    new_date.setFullYear(parseInt(year, 10));
    return new_date;
  }

}


