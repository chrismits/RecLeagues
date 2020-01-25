import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Player } from './player';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiuri: string = 'http://localhost:8080/api' //change from localhost to heroku server
  private headers = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {}

  getAllPlayers() {
    console.log("Sending request to backend to get player")
    return this.http.get(`${this.apiuri}/Player/players`);
  }

  //check if player already exists -> using id
  addPlayer(pl : Player): Observable<Player> {
    //let headers = new HttpHeaders({'Content-Type': 'application/json'})
    console.log("Sending request to backend to add player")

    return this.http.post<Player>(`${this.apiuri}/players`, pl, {headers: this.headers})
  }
}
