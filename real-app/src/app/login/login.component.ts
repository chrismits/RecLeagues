import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../role.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	@Output() loggedin = new EventEmitter();

  constructor(public roleService: RoleService, private router: Router) { }

  ngOnInit() {
  }

  logIn() {
  	var username = (<HTMLInputElement>document.getElementById("username")).value;
  	var password = (<HTMLInputElement>document.getElementById("password")).value;
  	// If admin
  	if (username == "admin" && password == "admin") {
  		this.roleService.setRole("admin");
  		this.router.navigate(['/admin']);
  		this.loggedin.emit(null);
 	}
  	else if (username == "user" && password == "user") {
  		this.roleService.setRole("user");
  		this.router.navigate(['/user-home']);
  		this.loggedin.emit(null);
  	}
  	else {
  		console.log("Not a valid username and/or password!");
  	}

  }

}
