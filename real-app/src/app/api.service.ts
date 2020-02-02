import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import { Player } from './player';
import { League } from './league'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiuri: string = 'http://localhost:8080/api/' //change from localhost to heroku server
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}

  getAllPlayers() {
    console.log("Sending request to backend to get player")
    return this.http.get(`${this.apiuri}/players`);
  }

  //check if player already exists -> using id
  addPlayer(pl : Player): Observable<Player> {
    //let headers = new HttpHeaders({'Content-Type': 'application/json'})
    console.log("Sending request to backend to add player")

    return this.http.post<Player>(`${this.apiuri}players`, pl, {headers: this.headers})
  }


  createLeague(lg : League) : Observable<League> {
    console.log("Sending request to backend to create league")

    return this.http.post<League>(`${this.apiuri}leagues`, lg, {headers: this.headers})
  }
}
