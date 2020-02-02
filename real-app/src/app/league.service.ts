import { Injectable } from '@angular/core';
import { League } from './league'

import {ApiService} from './api.service'

@Injectable()
export class LeagueService {
  model: League;

  setLeague(l : League) { this.model = l; }
  getLeague() 			{ return this.model; }


  constructor(private apiService: ApiService) {}

  storeLeague() {
    // add to db
    this.apiService.createLeague(this.model).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
    
  }

}