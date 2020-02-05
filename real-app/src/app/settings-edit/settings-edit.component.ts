import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['../profile/profile.component.scss',
  			  '../settings/settings.component.scss', 
  			  './settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit {

  settings: Settings = new Settings("", "", "", "");
  prons: string[] = ['He/Him', 'She/Her', 'They/Them', 'Other'];
  langs: string[] = ['English', 'Spanish', 'French', 'Italian',
  					 'German', 'Mandarin'];
  zones: string[] = ['EST', 'PST', 'CST', 'MST'];

  constructor() { }

  onSubmit() {
  	/* store in db */
  	console.log(this.settings.getName());
  	console.log(this.settings.getPronouns());
  	console.log(this.settings.getLanguage());
  	console.log(this.settings.getTimeZone());
  }

  ngOnInit() {
  }

}
