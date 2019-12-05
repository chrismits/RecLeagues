import { Component, OnInit, Output } from '@angular/core';
import { Team } from '../team'
import { Player } from '../player'
import { PLAYERS } from '../ex_players'
import { TEAMS } from '../ex_teams'

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teams: Team[] = TEAMS;
  caps: Player[] = TEAMS.map(x => x.captain);
  avail_caps: Player[] = PLAYERS.filter(
    player => !this.caps.includes(player));
  team_names: string[] = this.teams.map(t => t.name);

  addTeam(t: Team) {
    
    	var new_team = new Team(t.name, t.captain);
    	this.teams.push(new_team);
      this.avail_caps = this.avail_caps.filter(
        player => player != t.captain);
      // propogate to db

      console.log(t.captain._first);
      console.log(this.avail_caps.length);
     
  }  

  constructor() { }

  ngOnInit() {
  }

}
