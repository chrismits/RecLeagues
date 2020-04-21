import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse} from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Player } from './player';
import { League, TimeSlot } from './league';
import { Team } from './team';
import { Match } from './match'
import { Admin } from './admin'
import {environment } from '../environments/environment'
import { TeamSchedComponent } from './team-sched/team-sched.component';
import { JsonPipe } from '@angular/common';

import { Router } from '@angular/router'

const API_URL = environment.apiUrl

/*** Authentication Interfaces ****/

export interface LoginDetails {
  _id: string
  email: string
  exp: number
  admin: boolean
}


export interface TokenPayload {
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router: Router) {}


  /***************************** Auth *********************************/
  // Authentication Methods with local storage...
  private token: string

  private saveToken(token : string): void {
    localStorage.setItem('token', token)
    this.token = token
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token')
    }
    return this.token
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('token')
    this.router.navigateByUrl('/login')

    // succesfuly navigate to sign in screen
  }

  public getLoginDetails(): LoginDetails {
    const token = this.getToken()
    let pload;

    if (token) {
      // JWT has encoded type: Header.Payload.Signature
      pload = token.split('.')[1];
      pload = window.atob(pload) // decode base 64 string
      return JSON.parse(pload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getLoginDetails()
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      console.log("JWT has expired. Please login again.")
      return false;
    }
  }


  extractTokenAndConvert(response,conversionFunction, is_admin?) {
    if (response.token) {
      console.log("found token in response")
      this.saveToken(response.token)
    }

    response.user = conversionFunction(response.user)
    return response
  }


  //admin signup
  adminSignup(name: string, email: string, password: string): Observable<any> {
    console.log("F -> B: Admin Signup")
    var url = `${API_URL}/admin/signup`

    return this.http.post<any>(url, {name: name, email: email, password: password}, 
                                    {headers: this.headers})
                    .pipe(
                      map(res => this.extractTokenAndConvert(res, this.convertToAdmin)))
  }

  //admin login
  adminLogin(email: string, password: string): Observable<any> {
    console.log("F -> B: Admin Login")
    var url = `${API_URL}/admin/login`

    return this.http.post<any>(url, {email: email, password: password},
                                    {headers: this.headers})
                    .pipe(
                      map(res => this.extractTokenAndConvert(res, this.convertToAdmin)))
  }

  playerSignup(first: string, last: string,
               email: string, password: string): Observable<any> {
      console.log("F -> B: Player Signup")
      var url = `${API_URL}/players/signup`

      return this.http.post<any>(url, {first: first, last: last, email: email, password: password},
                                      {headers: this.headers})
                      .pipe(
                        map(res => this.extractTokenAndConvert(res, this.convertToPlayer)))
  }

  playerLogin(email: string, password: string): Observable<any> {
    console.log("F -> B: Player Login")
    var url = `${API_URL}/players/login`

    return this.http.post<any>(url, {email: email, password: password},
                                    {headers: this.headers})
                    .pipe(
                      map(res => this.extractTokenAndConvert(res, this.convertToPlayer)))
  }


/*****************************************************************************/ 
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
  -- Add route guards
  */

  /************ PLAYER ****************/ 

  // ADD PLAYER IS CURRENTLY INACTIVE
  // In server.js -> app.post(/api/players)
  addPlayer(pl : Player): Observable<Player> {
    console.log("F -> B: Add Player is INACTIVE")

    return null
    // return this.http.post<Player>(`${API_URL}/players`, pl, 
    //                                     {headers: this.headers})
    //                 .pipe(map(pl => this.convertToPlayer(pl)))
  }


  // In server.js -> app.get(/api/players/:email)
  // REQUIRES ADMIN AUTH
  getPlayerByEmail(email : string): Observable<Player> {
    console.log("F -> B: Get Player by email" )
    let url = `${API_URL}/players/${email}`
    return this.http.get<Player>(url, {headers: {'Content-Type': 'application/json',
                                                  'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(pl => this.convertToPlayer(pl)))
  }

  // In server.js -> app.get(/api/players/teams/:id)
  // REQUIRES PLAYER AUTH
  getTeamsByPlayer(pl_id : string): Observable<Team []> {
    console.log("F -> B: Get Teams of player")

    let url = `${API_URL}/players/teams/${pl_id}`
    return this.http.get<Team []>(url, {headers: {'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(teams => teams.map(team => this.convertToTeam(team))))

  }

  // In server.js -> app.put(/api/players)
  // REQUIRES PLAYER AUTH
  updatePlayer(pl: Player): Observable<Player> {
    console.log("F -> B: Updating Player")

    return this.http.put<Player>(`${API_URL}/players`, pl, {headers: {'Content-Type': 'application/json',
                                                                      'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(player => this.convertToPlayer(player)))
  }

  // In server.js -> app.get(/api/players)
  // REQUIRES ADMIN AUTH
  getAllPlayers(): Observable<Player[]> {
    console.log("F -> B: Get all players")
    return this.http.get<Player []>(`${API_URL}/players`, {headers: {'Content-Type': 'application/json',
                                                                     'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(db_players => 
                              db_players.map(pl => this.convertToPlayer(pl))))
  }

  // deletePlayer() to be added potentially.

  /******** LEAGUE ********/

  // REQUIRES ADMIN AUTHA
  createLeague(lg : League) : Observable<League> {
      console.log("F -> B: Creating League")
      return this.http.post<League>(`${API_URL}/leagues`, 
                            lg, {headers: {'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.getToken()}`}})
                      .pipe(map(league => this.convertToLeague(league)))
  }

  // No Auth, OPEN SETUP
  getAllLeagues() : Observable<League []> {
      console.log("F -> B: Get All Leagues")
      return this.http.get<League []>(`${API_URL}/leagues`, {headers: {'Content-Type': 'application/json',
                                                            'Authorization': `Bearer ${this.getToken()}`}})
                      .pipe(map(data => data.map(p => this.convertToLeague(p))))
  }
    

  // REQUIRES ADMIN AUTH
  updateLeague(lg : League) : Observable<League> {
    console.log("F -> B: Updating league");
    return this.http.put<League>(`${API_URL}/leagues`, lg, 
                                  {headers: {'Content-Type': 'application/json',
                                  'Authorization': `Bearer ${this.getToken()}`}})
                     .pipe(map(league => this.convertToLeague(league)))
  }


  // REQUIRES PLAYER AUTH
  getLeague(id : string) : Observable<League> {
    console.log("F -> B: Getting single league")
    let url = `${API_URL}/league/${id}`
    return this.http.get<League>(url, {headers: {'Content-Type': 'application/json',
                                                'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(league => this.convertToLeague(league)))

  }


  /************ TEAM ****************/ 

  // adds team to db
  // REQUIRES PLAYER AUTH
  createTeam(t: Team): Observable<Team> {
    console.log("F -> B: Create team");
    return this.http.post<Team>(`${API_URL}/teams`, t, 
                                {headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(team => this.convertToTeam(team)))
  }

  // Gets all teams in a league.
  /* Note: This does not mean that all these teams are approved.
    This is where we would see all teams wanting to register for league.
    The admin then has to drag them to approved team. 
        - Then the approved boolean will be set to true
        - Then the team will be added to the league
  */
 // NO AUTH CURRENTLY
  getTeamsByLeague(league_id: string): Observable<Team []> {
    console.log("F -> B: Getting teams by league ID")
    let url = `${API_URL}/teams/${league_id}`
    return this.http.get<Team []>(url, {headers: {'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(data => data.map(team => this.convertToTeam(team))));
  }

  // gets team by id
  // NO AUTH CURRENTLY
  getTeamById(team_id: string): Observable<Team> {
    console.log("F -> B: Getting team by team ID")
    let url = `${API_URL}/team/${team_id}` //team rather than teams to differentiatee
    return this.http.get<Team>(url, {headers: {'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(data => this.convertToTeam(data)));
  }

  // changes existing team in db based on t object
  // PLAYER AUTH
  updateTeam(t: Team): Observable<Team> {
    console.log("F -> B: Updating Team")
    return this.http.put<Team>(`${API_URL}/teams`, t,
                                {headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(team => this.convertToTeam(team)))
  }


  /************* MATCH ****************/ 

  // ADMIN AUTH
  createMatch(m: Match): Observable<Match> {
    console.log("F -> B: Creting Match")
    return this.http.post<Match>(`${API_URL}/matches`, m, 
                                {headers: {'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.getToken()}`}})
                    .pipe(map(match => this.convertToMatch(match))) 
  }



    /*******************************/

    // Conversion functions from backend to frontend
    convertToAdmin(ad) : Admin {
      if (!ad)
        return null

      var leagues : League[]
      if (ad.leagues)
        leagues = ad.leagues
      else
        leagues = []

      var pronouns : string
      if (!ad.pronouns) {
        pronouns = ''
      }
      else {
        pronouns = ad.pronouns
      }
      
      var curr_admin = new Admin(ad._id, ad.name, ad.email, leagues, pronouns)

      return curr_admin
    }

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

        var curr_player = new Player(pl._id, pl.first, pl.last, pl.email, pl.cell);
        curr_player.setWaiver(pl.signedWaiver)
        if (pl.pronouns !== '')
          curr_player.setPronouns(pl.pronouns)

        // add logo

        return curr_player
    }


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
        var curr_captain = this.convertToPlayer(t.captain) //isn't captain an ID?
        var curr_team = new Team(t.name, curr_captain)
        curr_team.setID(t._id)
        curr_team.setSize(t.size)
        curr_team.setApproved(t.approved)
        curr_team.setFreeAgents(t.free_agents)
        curr_team.setLeagueID(String(t.league))

        // set record of team
        curr_team.setWins(t.record.wins)
        curr_team.setLosses(t.record.losses)
        curr_team.setTies(t.record.ties)

        // add other player (BESIDES Captain)
        for (var j = 1; j < t.players.length; j++) {
            curr_team.addPlayer(this.convertToPlayer(t.players[j])) //aren't these ID's
        }

        return curr_team
    }

    convertToMatch(m) : Match {
      var curr_match = new Match(
                          this.convertToTeam(m.home),
                          this.convertToTeam(m.away),
                          new Date(m.date),
                          m.location)
      return curr_match
    }

    convertToLeague(l): League {
        var lg = new League(l._id,
            l.name, 
            l.sport,
            l.season,
            new Date(l.dates.reg_start),
            new Date(l.dates.reg_end),
            l.team_info.num_teams,
            this.convertToTeamArray(l.team_info.teams),
            l.team_info.max_num_teams,
            l.team_info.min_team_size,
            l.team_info.min_team_size,
            new Date(l.dates.start_date),
            new Date(l.dates.end_date),
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


