import { Component } from '@angular/core';
import { LeagueService } from './league.service';
import { RoleService } from './role.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'RecLeagues';
  role: string;
  loggedIn: boolean;

  constructor(public roleService: RoleService, private router: Router) {

  }

  ngOnInit() {
    //this.setRole();
    this.checkLogin();
  	//this.role = "admin";
    //this.loggedIn = true;
  	//this.role = "user";
  }

  checkLogin() {
    if (!this.loggedIn) {
      this.router.navigate['\login']
    }
  }

  setLogin() {
    this.loggedIn = true;
    this.role = this.roleService.getRole()
  }


  setRole(r: string) {
    this.roleService.setRole(r);
    this.role = this.roleService.getRole();
  }


}
