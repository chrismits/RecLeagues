import { Injectable } from '@angular/core';
import { League } from './league'

import {ApiService} from './api.service'

@Injectable()
export class LeagueService {
  model: League;

  setLeague(l : League) { this.model = l; }
  getLeague() 		{ return this.model; }


  constructor(private apiService: ApiService) {}

  storeLeague() {
    // add to db
    console.log("Adding league to DB")
    this.apiService.createLeague(this.model).subscribe((data) => {   
    }) 
  }

  // NOT TESTED
  getLeagues() {
    var arr: Array<League> = [];

    this.apiService.getAllLeagues().subscribe((data: any[]) => {
      for (var l in data) {
        var curr = new League(data[l].name, 
                            data[l].is_pickup, 
                            data[l].sport,
                            data[l].season,
                            data[l].dates.reg_start,
                            data[l].dates.reg_end,
                            data[l].dates.start_date,
                            data[l].dates.end_date,
                            '', data[l].league_type, data[l].competition_level)
        arr.push(curr);
        console.log(curr.start_date)
      }
    }, (error) => {
      console.log(error)
      return;
    })
    return arr;

  }
}