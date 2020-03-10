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

  createLeague(lg : League) : Observable<any> {
      return this.http.post<any>(`${API_URL}/leagues`, 
                            lg, {headers: this.headers})
  }

  //done
  getAllLeagues() : Observable<League []> {
      console.log("F -> B: Get All Leagues");
      return this.http.get<League []>(`${API_URL}/leagues`).pipe(map(data => data.map(p => this.convertToLeague(p))));
  }
    

  // done
  updateLeague(lg : League) : Observable<League> {
    console.log("F -> B: Updating league");

    return this.http.put<League>(`${API_URL}/leagues`, lg, 
                                                      {headers: this.headers});
  }


  /************ TEAM ****************/ 

  // adds team to db
  createTeam(t: Team): Observable<Team> {
    console.log("F -> B: Create team");

    return this.http.post<Team>(`${API_URL}/teams`, t, 
                                                    {headers: this.headers})
  }

  // changes existing team in db based on t object
  updateTeam(t: Team): Observable<Team> {
    console.log("F -> B: Updating Team")

    return this.http.put<Team>(`${API_URL}/teams`, t,
                                                  {headers: this.headers})
  }


  // gets all teams in a league.
  // Note: This does not mean that all these teams are approved.
  getTeamsByLeague(league_id: string): Observable<Team []> {
    var params = new HttpParams().set("league_id", league_id);
    return this.http.get<Team []>(`${API_URL}/teams/`, {params}).pipe(map(data => this.convertToTeamArray(data)));
  }

  // gets team by id
  getTeamById(team_id: string): Observable<Team> {
    var params = new HttpParams().set("team_id", team_id);
    return this.http.get<Team>(`${API_URL}/teams/`, {params}).pipe(map(data => this.convertToTeam(data)));
  }

 
    /*******************************/
    // Conversion functions from backend to frontend
    convertToPlayer(pl) : Player {
        if (!pl)
            return null
        var cell; 
        if (pl.cell) {
            cell = pl.cell
        }
        else {
            cell = ""
        }

        var curr_player = new Player(pl._id, pl.first, pl.last, pl.email. cell);
        curr_player.setWaiver(pl.signedWaiver)

        return curr_player
    }


    // convertToTeamArray(team_array: any[]): Team [] {
    //     var team_arr: Array<Team> = [];
    //     for (var i = 0; i < team_array.length; i++) {
    //         var curr_captain = this.convertToPlayer(team_array[i].captain)
    //         var curr_team = new Team(team_array[i].name, curr_captain)
    //         curr_team.setID(team_array[i]._id)
    //         curr_team.setSize(team_array[i].size)

    //         // add other players (BESIDES CAPTAIN)
    //         for (var j = 1; j < team_array[i].players.length; j++) {
    //             curr_team.addPlayer(this.convertToPlayer(team_array[i].players[j]))
    //         }

    //         curr_team.setLeagueID(String(team_array[i].league))
    //         team_arr.push(curr_team)
    //     } 
    //     return team_arr;
    // }    

    //test convert to team array
    convertToTeamArray(team_array: any[]): Team [] {
        var team_arr: Array<Team> = [];

        for (var i = 0; i < team_array.length; i++) {
            var curr_team = this.convertToTeam(team_array[i])
            team_arr.push(curr_team)
        }

        return team_arr;
    }

    convertToTeam(t) : Team {
        var curr_captain = this.convertToPlayer(t.captain)
        var curr_team = new Team(t.name, curr_captain)
        curr_team.setID(t._id)
        curr_team.setSize(t.size)
        curr_team.setApproved(t.approved)
        curr_team.setLeagueID(String(t.league))

        // set record of team
        curr_team.setWins(t.record.wins)
        curr_team.setLosses(t.record.losses)
        curr_team.setTies(t.record.ties)

        // add other player (BESIDES Captain)
        for (var j = 1; j < t.players.length; j++) {
            curr_team.addPlayer(this.convertToPlayer(t.players[j]))
        }

        return curr_team
    }


    convertToLeague(l): League {
        var lg = new League(l._id,
            l.name, 
            l.sport,
            l.season,
            l.dates.reg_start,
            l.dates.reg_end,
            l.team_info.num_teams,
            this.convertToTeamArray(l.team_info.teams),
            l.team_info.max_num_teams,
            l.team_info.min_team_size,
            l.team_info.min_team_size,
            l.dates.start_date,
            l.dates.end_date,
            l.matches.schedule,   /*  Change to convertToMatchArray */
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
            lg.addTimeSlot(slot);
        }

        return lg
    }

}


