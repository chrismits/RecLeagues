import { Injectable } from '@angular/core';
import { Team } from './team'

import {ApiService} from './api.service'

@Injectable()
export class TeamService {
  model: Team;

  setTeam(t : Team) { this.model = t; }
  getTeam()         { return this.model; }


  constructor(private apiService: ApiService) {}

  // Backend Tested
  storeTeam() {
    console.log("F -> F: store team");
    this.apiService.createTeam(this.model).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
  }

  //Not yet functional backend
  updateTeam() {
    // Wins or players.
    console.log("F -> F: update team");

    // this.apiService.updateTeam(this.model).subscribe((data) => {
    //   console.log(data)
    // }, (error) => {
    //   console.log(error)
    // })
  }
  
  
  // Returns all teams in db for current league
  getTeamsByLeagueID(league_id) {
    this.apiService.getTeamsByLeague(league_id).subscribe((data: any[]) => {
      console.log("Not working: Map db team object to frontend team")
    }, (error) => {
      console.log("Error in searching for teams")
    })

  }
}