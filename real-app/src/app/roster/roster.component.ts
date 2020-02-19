import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PLAYERS } from '../ex_players';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.scss']
})
export class RosterComponent implements OnInit {

  players: Player[] = PLAYERS;

  constructor() { }

  ngOnInit() {
  }

}
