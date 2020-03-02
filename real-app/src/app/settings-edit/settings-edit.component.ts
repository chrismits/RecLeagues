import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';
import { SettingsService } from '../settings.service';
import { UserService } from '../user.service'

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['../profile/profile.component.scss',
  			  '../settings/settings.component.scss', 
  			  './settings-edit.component.scss']
})
export class SettingsEditComponent implements OnInit {

  settings: Settings = new Settings('', '', '', '');
  prons: string[] = ['He/Him/His', 'She/Her/Hers', 'They/Them/Their', 'Other'];
  password_confirm = '';

  constructor(public settingsService: SettingsService) { }

  onSubmit() {
    console.log(this.settings.getName());
    console.log(this.settings.getPronouns());
    console.log(this.settings.getEmail());
    console.log(this.settings.getPassword());
  	/* store in db */
    this.settingsService.setSettings(this.settings);
  }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

}
