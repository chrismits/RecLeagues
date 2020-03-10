import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-form-three',
  templateUrl: './league-form-three.component.html',
  styleUrls: ['./league-form-three.component.scss']
})
export class LeagueFormThreeComponent implements OnInit {

  locations: string[] = ['Ounjian', 'Bello', 'Gantcher',
                         'Carzo Cage'];
  regStartDate = '';
  regEndDate = '';
  startDate = '';
  endDate = '';
  autoApproval: boolean;

  model: League;
  submitted = false;

  onSubmit() {
    this.submitted = true;
    if (this.autoApproval) {
      this.model.setIsAutoApproval(true);
    }
    this.model.setRegStart(this.stringToDate(this.regStartDate));
    this.model.setRegEnd(this.stringToDate(this.regEndDate));
    this.model.setStartDate(this.stringToDate(this.startDate));
    this.model.setEndDate(this.stringToDate(this.endDate));
    this.leagueService.getLeague().deepCopyLeague(this.model);
  }

  constructor(public leagueService: LeagueService) { }

  ngOnInit() {
    this.model = this.leagueService.getLeague();
  }

  stringToDate(s: string) {
    const numbers = s.split('/');
    const month = numbers[0];
    const day = numbers[1];
    const year = numbers[2];
    const newDate = new Date();
    newDate.setMonth(parseInt(month, 10) - 1);
    newDate.setDate(parseInt(day, 10));
    newDate.setFullYear(parseInt(year, 10));
    return newDate;
  }

}


