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

  storeTeam() {

  }

  updateTeam() {

  }
}