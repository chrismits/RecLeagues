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
  
  // getTeamByID(team_id) {
  //   this.apiService.getTeamById(team_id).subscribe((data: any) => {
  //     var t = 


  //   }, (error) => {
  //     console.log("Error: Could not find team by specific id")
  //   })
  // }



  // Returns all teams in db for current league
  getTeamsByLeagueID(league_id) {
    this.apiService.getTeamsByLeague(league_id).subscribe((data: any[]) => {

      // CHANGE TEAM CONSTRUCTOR IN TEAM.TS TO CONFORM WITH RESPONSE
        // for (var t in data) {
        //   var curr = new Team(t.name, )

        // }

      console.log("Not working yet")


    }, (error) => {
      console.log("Error in searching for teams")
    })

  }
}