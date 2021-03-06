import { Component, OnInit } from '@angular/core';
import { Team } from '../team';
import { Player } from '../player';
import { League } from '../league';
import { TeamService } from '../team.service';
import { LeagueService } from '../league.service';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.component.html',
  styleUrls: ['./team-home.component.scss']
})
export class TeamHomeComponent implements OnInit {

  teamName = 'some team name';
  team: Team;
  isPlayer = false;
  amCaptain = false;
  invite = false;
  user: Player;
  league: League;
  now: Date;

  playerEmail = '';
  playerEmails: string[] = [];
  existingEmails: string[] = [];


  constructor(public teamService: TeamService,
              public leagueService: LeagueService,
              public roleService: RoleService,
              public userService: UserService) { }

  regOpen() {
    const start = new Date(this.league.getRegStart());
    const end = new Date(this.league.getRegEnd());
    return start <= this.now && end >= this.now;
  }

  startInv() {
    this.invite = true;
  }

  endInv() {
    this.invite = false;
  }

  addEmail() {
    if (!this.playerEmails.includes(this.playerEmail) &&
        !this.existingEmails.includes(this.playerEmail)) {
      this.playerEmails.push(this.playerEmail);
    }
  }

  inviteMore() {
    this.team.pushEmails(this.playerEmails);
    /* send emails */
    this.playerEmails = [];
    this.playerEmail = '';
    this.endInv();
  }

  removeEmail(email: string) {
    this.playerEmails.splice(this.playerEmails.indexOf(email), 1);
  }

  ngOnInit() {
    this.team = this.teamService.getTeam();
    this.existingEmails = this.team.getEmails();
    this.league = this.leagueService.getLeague();
    this.teamName = this.team.getName();
    this.isPlayer = this.roleService.getRole() === 'user';
    if (this.isPlayer) {
      this.user = this.userService.getPlayer();
      this.amCaptain = this.team.isCaptain(this.user);
    }
    this.now = new Date();
  }

}
