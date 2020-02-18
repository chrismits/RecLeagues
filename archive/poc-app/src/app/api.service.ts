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

  /**** Player API Service ****/

  // GET '/api/Player/players'
  getPlayers()  {
    return this.http.get(`${this.apiuri}/Player/players`)
  }

  // POST '/api/Player/players'
  addPlayer(pl : Player): Observable<Player> {
    return this.http.post<Player>(`${this.apiuri}/Player/players`, pl, 
                                    {headers: this.headers})
  }
}
