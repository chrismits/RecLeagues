import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings'
import { UserService } from '../user.service'
import { SettingsService } from '../settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../profile/profile.component.scss',
  		      './settings.component.scss']
})
export class SettingsComponent implements OnInit {

  name = "Matt Callahan";
  pronouns = "He/Him/His";
  email = "Matt.Callahan@tufts.edu";
  password = "***********";
  settings: Settings;
  isPlayer: boolean = true;

  toEdit() {
    this.settingsService.setSettings(this.settings);
  }

  constructor(public userService: UserService,
              public settingsService: SettingsService) { }

  ngOnInit() {
    this.settings = new Settings(this.name, this.pronouns, this.email, this.password);
    
    if (this.userService.getPlayer() !== undefined) {
      const player = this.userService.getPlayer();
      const full_name = player.getFirst() + ' ' + player.getLast();
      this.settings = new Settings(full_name, player.getPronouns(),
        player.getEmail(), '****');
    } else if (this.userService.getAdmin() !== undefined) {
      const admin = this.userService.getAdmin();
      this.settings = new Settings(admin.getName(), admin.getPronouns(),
        admin.getEmail(), '****');
      this.isPlayer = false;
    } else { this.isPlayer = false; }

    if (this.settingsService.getSettings() !== undefined) {
      this.settings = this.settingsService.getSettings(); 
      if (this.isPlayer) {
        this.userService.getPlayer().updateWithSettings(this.settings);
      }
    }
  }

}
