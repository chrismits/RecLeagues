import { Injectable } from '@angular/core';
import { League } from './league'

@Injectable()
export class LeagueService {

  model: League;

  setLeague(l : League) { this.model = l; }
  getLeague() 			{ return this.model; }

  storeLeague() {
  	// add to db
  }

}