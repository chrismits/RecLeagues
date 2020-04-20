import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  firstName: string;
  lastName: string;
  playerEmail: string;
  password: string

  constructor(public roleService: RoleService, private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    console.log("Signing up")

    if (!this.firstName || !this.lastName ||
       !this.playerEmail || !this.password){
         alert("UNSUCCESFUL") // change this to an error redirect page
         return
    }

    this.roleService.playerSignup(this.firstName, this.lastName, this.playerEmail, this.password)
                    .subscribe(data => {
                      this.successSignup('/')
                    }, error => {
                      console.log(error)
                      alert("Please try again")
                    })
  }

  successSignup(route: string) {
    this.router.navigate([route])
    this.roleService.setRole('user')
  }

}
