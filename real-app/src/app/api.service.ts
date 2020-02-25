import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Player } from './player';
import { League } from './league';
import { Team } from './team';
import {environment } from '../environments/environment'
const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}

  /************ PLAYER ****************/ 

  getAllPlayers() {
    console.log("F -> B: Get all players")
    return this.http.get(`${API_URL}/players`);
  }

  addPlayer(pl : Player): Observable<Player> {
    console.log("F -> B: Add Player")

    return this.http.post<Player>(`${API_URL}/players`, pl, 
                                              {headers: this.headers})
  }


  /******** LEAGUE ********/
  createLeague(lg : League) : Observable<League> {
    console.log("F -> B: Creating League")
    console.log(`${API_URL}/leagues`)
    console.log(lg)
    return this.http.post<League>(`${API_URL}/leagues`, lg, 
                                              {headers: this.headers})
  }

  getAllLeagues() {
    console.log("F -> B: Get All Leagues");
    // return this.http.get(`${API_URL}/leagues`).map((res: Response) => res.json());
    return this.http.get(`${API_URL}/leagues`);
  }

  updateLeague(lg : League) : Observable<League> {
    console.log("F -> B: Updating league");

    return this.http.put<League>(`${API_URL}/leagues`, lg, 
                                                      {headers: this.headers});
  }

  /************ TEAM ****************/ 


  // Not yet tested
  createTeam(t: Team): Observable<Team> {
    console.log("F -> B: Create team");

    return this.http.post<Team>(`${API_URL}/teams`, t, 
                                                    {headers: this.headers})
  }

  updateTeam(t: Team): Observable<Team> {
    console.log("F -> B: Updating Team")

    return this.http.put<Team>(`${API_URL}/teams`, t,
                                                  {headers: this.headers})
  }

}
