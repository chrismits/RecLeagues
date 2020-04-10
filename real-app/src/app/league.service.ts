import { Injectable } from '@angular/core';
import { League, TimeSlot } from './league'
import {ApiService} from './api.service'

import { map } from 'rxjs/operators'


@Injectable()
export class LeagueService {
  model: League;

  setLeague(l : League) { this.model = l; }
  getLeague()           { return this.model; }


  constructor(private apiService: ApiService) {}

  /* ALL OF the below methods need subscriptions to work.

  AKA: this.apiService.storeLeague().subscribe(league =>
    {}, error => {})
  */

  // aka createLeague
  storeLeague() {
    console.log("F -> F: Creating League")
    return this.apiService.createLeague(this.model)
  }

  getLeagues() {
    console.log("F -> F: Get all Leagues")
    return this.apiService.getAllLeagues()
  }

  updateLeague() {
    console.log("F -> F: Updating league")
    return this.apiService.updateLeague(this.model)
  }
}

