import { Component, OnInit, Input } from '@angular/core';
import { Profile } from '../profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  name: string = "Matt Callahan";
  email: string = "Matt.Callahan@tufts.edu";
  cell: string = "1-800-123-4567";
  profile: Profile = new Profile(this.name, this.email, this.cell);

  constructor() { }

  ngOnInit() {
  }

}
