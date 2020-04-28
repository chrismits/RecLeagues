import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { PLAYERS } from '../ex_players';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Output() successfulLogin = new EventEmitter<string>();
    adminFlag: boolean

    constructor(public roleService: RoleService, private router: Router,
              public userService: UserService) { }

    ngOnInit() {
    }

    signUp() {
    this.router.navigate(['/signup'])
    }

    logIn() {
        var username = (<HTMLInputElement>document.getElementById("username")).value;
        var password = (<HTMLInputElement>document.getElementById("password")).value;
          
        if (this.adminFlag) {
            this.roleService.adminLogin(username, password)
                            .subscribe(data => {
                                this.successLogIn('/admin')
                            }, error => {
                                alert("Invalid admin. Please try again.") // FRONTEND: change to something better 
                            })
        } 
        else {
            this.roleService.playerLogin(username, password)
                            .subscribe(data => {
                                this.successLogIn('/user-home')
                            }, error => {
                                console.log(error)
                                alert("Invalid user. Please try again.")
                            })
                        
        }
    }

    successLogIn(route: string) {
        this.router.navigate([route])
        if (route === '/admin') {
            this.roleService.setRole('admin')
        }
        else {
            this.roleService.setRole('user')
        }
        this.successfulLogin.emit()
    }
}
