import { Injectable } from '@angular/core';
import { Team } from './team'

import {ApiService} from './api.service'

@Injectable()
export class TeamService {
  model: Team;

  setTeam(t : Team) { this.model = t; }
  getTeam()         { return this.model; }


  constructor(private apiService: ApiService) {}

  getTeams() {

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
}