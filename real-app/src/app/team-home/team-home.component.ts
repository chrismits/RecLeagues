import { Component, OnInit } from '@angular/core';
import { Team } from '../team'
import { Player } from '../player'
import { League } from '../league'
import { TeamService } from '../team.service'
import { LeagueService } from '../league.service'
import { RoleService } from '../role.service'
import { UserService } from '../user.service'

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.scss']
})
export class TeamHomeComponent implements OnInit {

  team_name: string = "some team's name"; 
  team: Team;
  isPlayer: boolean = false;
  amCaptain: boolean = false;
  user: Player;
  league: League;
  now: Date;


  constructor(public teamService: TeamService,
              public leagueService: LeagueService,
              public roleService: RoleService,
              public userService: UserService) { }

  regOpen() {
    const start = new Date(this.league.getRegStart());
    const end = new Date(this.league.getRegEnd());
    return start <= this.now && end >= this.now;
  }

  ngOnInit() {
  	this.team = this.teamService.getTeam();
    this.league = this.leagueService.getLeague();
  	this.team_name = this.team.getName();
    this.isPlayer = this.roleService.getRole() === "user";
    if (this.isPlayer) {
      this.user = this.userService.getPlayer();
      this.amCaptain = this.team.isCaptain(this.user);
    }
    this.now = new Date();
  }

}
