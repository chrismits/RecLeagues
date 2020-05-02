import { Component, OnInit } from '@angular/core';
import { League } from '../league';
import { LEAGUES } from '../ex_league';
import { PLAYERS } from '../ex_players';
import { TEAMS } from '../ex_teams';
import { Team } from '../team';
import { Player } from '../player';
import { LeagueService } from '../league.service';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  league: League = LEAGUES[0];
  teams: Team[] = TEAMS;
  now: Date = new Date();
  me: Player = PLAYERS[3];

  beforeReg() {
    const start = new Date(this.league.getRegStart());
    return start > this.now;
  }

  regOpen() {
    const start = new Date(this.league.getRegStart());
    const end = new Date(this.league.getRegEnd());
    return start <= this.now && end >= this.now;
  }

  afterReg() {
    const end = new Date(this.league.getRegEnd());
    return end < this.now;
  }

  createTeam() {
    this.leagueService.setLeague(this.league);
  }

  teamsExist() {
    return this.teams !== [];
  }

  joinTeam(t: Team) {
    console.log('i joined');
    console.log(t);
    /* store to db with userSevice */
    t.addPlayer(this.me);
  }

  isOnATeam() {
    for (const t of this.teams) {
      if (t.isOnTeam(this.me)) { return true; }
    }
    return false;
  }

  onThisTeam(t: Team) {
    return t.isOnTeam(this.me);
  }

  constructor(public leagueService: LeagueService,
              public teamService: TeamService) { }

  ngOnInit() {
    if (this.leagueService.getLeague() !== undefined) {
      this.league = this.leagueService.getLeague();

      // call to server
      this.teamService.getTeamsByLeagueID(this.league.id).subscribe(teams => {
        console.log(teams)
        if (teams.length !== 0) {
          this.teams = teams;
        }
      }, error => {
        console.log(error)
      });
    }

    if (this.teamService.getTeam() !== undefined &&
        this.teamService.isNew() !== undefined &&
        this.teamService.isNew()) {
      console.log(this.teamService.getTeam());
      this.teams.push(this.teamService.getTeam());
      this.teamService.setNew(false);
    }

  }

  setTeam(t: Team) {
    this.teamService.setTeam(t);
  }

}
