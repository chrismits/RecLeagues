import { Component, OnInit } from '@angular/core';
import { Player } from '../player'
import { PLAYERS } from '../ex_players'

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  players: Player[] = PLAYERS;

  constructor() { }

  addPlayer(p: Player) { 
  	var tmp = new Player(p._first, p._last, p._email, p._cell); this.players.push(tmp); 
  	// propogate to db
  }

  ngOnInit() { }

}
