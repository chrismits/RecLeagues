import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../role.service';
import { Player } from '../player';
import { Team } from '../team';
import { League } from '../league';
import { UserService } from '../user.service';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  @Output() loggedout = new EventEmitter();
  me: Player;
  myTeams: Team[] = [];

  /* DEBUG */
  goToLeague(t: Team) {
    /* get league ID */
    let league_id = t.getLeagueID();
    //this.leagueService.setLeague(l);
  }

  constructor(public roleService: RoleService, public userService: UserService) { }

  ngOnInit() {
    // if (this.userService.getPlayer() === undefined) {
    //     this.userService.getAllPlayers().subscribe(pls=>{
    //       this.me = pls[0];
    //       this.userService.getTeamsByPlayerID(this.me.id).subscribe(teams => {
    //         this.myTeams = teams;
    //         console.log(this.myTeams);
    //       }, error => {
    //         console.log(error);
    //       });
    //       console.log(this.me);
    //     }, err => { 
    //       console.log(err)
    //     });
    //     this.userService.setPlayer(this.me);
    //   } else {
    //     this.me = this.userService.getPlayer();
    //     this.userService.getTeamsByPlayerID(this.me.id).subscribe(teams => {
    //       this.myTeams = teams;
    //       console.log(this.myTeams);
    //     }, error => {
    //       console.log(error);
    //     });
    //   }
    }
  

  logout() {
    this.roleService.setRole(null);
    this.roleService.logout()
  	this.loggedout.emit(null);
  }

}
