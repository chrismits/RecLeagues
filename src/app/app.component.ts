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
    this.checkLogin();
  }

  checkLogin() {
    if (!this.isLoggedIn()) {
      this.router.navigateByUrl['\login']
    }
  }

  isLoggedIn() {
    if (this.router.url === '/signup') {
      return true
    }
    
    return this.roleService.loggedin()
  }

  isAdmin() {
    if (this.isLoggedIn() && (this.roleService.getRole() === 'admin')) {
      return true
    }

    return false
  }

  isPlayer() {
    if (this.isLoggedIn() && (this.roleService.getRole() === 'user')) {
      return true
    }
    return false
  }


  setLogin() {
    this.loggedIn = true;
    this.role = this.roleService.getRole()
  }


  // setRole(r: string) {
  //   this.roleService.setRole(r);
  //   this.role = this.roleService.getRole();
  // }


}
