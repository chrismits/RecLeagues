import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Player } from './player';
import { League, TimeSlot } from './league';
import { Team } from './team';
import {environment } from '../environments/environment'
const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}


  handleError(err: HttpErrorResponse) {
    if (err.error instanceof ErrorEvent) {
      // client-side error event
      console.error("Error: ", err.error.message)
    } else {
      // error in backend
      console.error(`Error: Backend returned code ${err.status}, ` +
                    ` Body was ${err.error}`)
    }
  }

  /*
  TODO IN THIS FILE

  -- Add conversion functions for each model type to clean up frontend.
  -- Add route guards
  */

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

  // Conversion function to respond with frontend object
  convertToLeague(l) {
      var lg = new League(l._id,
        l.name, 
        l.is_pickup, 
        l.sport,
        l.season,
        l.dates.reg_start,
        l.dates.reg_end,
        l.team_info.num_teams,
        l.team_info.teams,
        l.team_info.max_num_teams,
        l.team_info.min_team_size,
        l.team_info.min_team_size,
        l.dates.start_date,
        l.dates.end_date,
        l.matches.schedule,
        [], /* time slots come later */
        l.matches.location, 
        l.league_type, 
        l.competition_level,
        l.free_agents,
        l.team_info.auto_approval,
        l.rules,
        l.created
      );
    /* Done to change object type */
    for (let s of l.dates.time_slots) {
      var slot = new TimeSlot();
      slot.setDay(s.day);
      slot.setStart(s.start);
      slot.setEnd(s.end);
      slot.setLength(s.length);
      slot.setBuffer(s.buffer);
      l.addTimeSlot(slot);
    }

    return lg
  }

  // done
  createLeague(lg : League) : Observable<any> {
      return this.http.post<any>(`${API_URL}/leagues`, 
                            lg, {headers: this.headers})
  }

  // done
  getAllLeagues() : Observable<any[]> {
    console.log("F -> B: Get All Leagues");
    return this.http.get<any[]>(`${API_URL}/leagues`);
  }

  // done
  updateLeague(lg : League) : Observable<League> {
    console.log("F -> B: Updating league");

    return this.http.put<League>(`${API_URL}/leagues`, lg, 
                                                      {headers: this.headers});
  }


  /************ TEAM ****************/ 

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


  getTeamsByLeague(league_id: string) {
    var params = new HttpParams().set("league_id", league_id);
    return this.http.get<any []>(`${API_URL}/teams/`, {params});
  }

  getTeamById(team_id: string) {
    var params = new HttpParams().set("team_id", team_id);
    return this.http.get(`${API_URL}/teams/`, {params});
  }

}
