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

  constructor(public roleService: RoleService) {

  }

  ngOnInit() {
  	this.setRole();
  	//this.role = "admin";
  	//this.role = "user";
  }

  setRole() {
  	this.role = this.roleService.getRole();
  }


}
