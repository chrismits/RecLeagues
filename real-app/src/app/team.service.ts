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

  // Not yet tested
  storeTeam() {
    console.log("F -> F: store team");
    
    this.apiService.createTeam(this.model).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    })
  }

  updateTeam() {

  }
}