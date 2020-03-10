import { Injectable } from '@angular/core';
import { Team } from './team'

import {ApiService} from './api.service'

@Injectable()
export class TeamService {
  model: Team;
  newTeam: boolean;

  setTeam(t : Team) { this.model = t; }
  getTeam()         { return this.model; }

  setNew(b: boolean) { this.newTeam = b; }
  isNew()            { return this.newTeam; }


  constructor(private apiService: ApiService) {
    this.newTeam = false;
  }

  // adds team to db
  storeTeam() {
    return this.apiService.createTeam(this.model)
  }

  // updates record, num_teams, team array, player array if changed
  updateTeam() {
    console.log("F -> F: update team");
    return this.apiService.updateTeam(this.model);
  }
  
  // Returns all teams in db for current league
  getTeamsByLeagueID(league_id) {
    return this.apiService.getTeamsByLeague(league_id)
  }

  // returns team by id
  getTeambyId(team_id) {
    return this.apiService.getTeamById(team_id)
  }
}