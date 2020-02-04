import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Player } from './player';
import { League } from './league'
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
    console.log("Sending request to backend to get player")
    return this.http.get(`${API_URL}/players`);
  }

  addPlayer(pl : Player): Observable<Player> {
    //let headers = new HttpHeaders({'Content-Type': 'application/json'})
    console.log("Sending request to backend to add player")

    return this.http.post<Player>(`${API_URL}/players`, pl, {headers: this.headers})
  }


  /******** LEAGUE ********/


  createLeague(lg : League) : Observable<League> {
    console.log("Sending request to backend to create league")
    console.log(`${API_URL}/leagues`)
    console.log(lg)
    return this.http.post<League>(`${API_URL}/leagues`, lg, {headers: this.headers})
  }
}
