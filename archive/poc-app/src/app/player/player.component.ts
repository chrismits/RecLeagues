import { Component, OnInit, PlatformRef } from '@angular/core';
import { Player } from '../player'
import { PLAYERS } from '../ex_players'
import { ApiService } from '../api.service'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  players: Player[] = PLAYERS;

  constructor(private apiService: ApiService) {}

  addPlayer(p: Player) {
    var curr_player = new Player(p._first, p._last, p._email, p._cell); 
    this.players.push(curr_player);

    // Add to db
    this.apiService.addPlayer(curr_player).subscribe((data) => {
      console.log(data)
    }, (error) => {
      console.log(error)
    });
  }

  ngOnInit() { }

}
