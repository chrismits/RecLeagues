import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['../profile/profile.component.scss',
  			  './profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  profile: Profile = new Profile("", "", "")

  constructor() { }

  onSubmit() {
  	/* store new information into db */
  	console.log(this.profile.getName())
  	console.log(this.profile.getEmail())
  	console.log(this.profile.getCell())
  }

  ngOnInit() {
  }

}
