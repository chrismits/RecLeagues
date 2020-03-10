import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';
import { UserService } from '../user.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  name = 'Matt Callahan';
  pronouns = 'He/Him/His';
  email = 'Matt.Callahan@tufts.edu';
  password = '***********';
  settings: Settings;
  isPlayer = true;
  url = 'assets/img/default_prof.jpeg'; /* default */

  toEdit() {
    this.settingsService.setSettings(this.settings);
  }

  constructor(public userService: UserService,
              public settingsService: SettingsService) { }

  ngOnInit() {
    this.settings = new Settings(this.name, this.pronouns, this.email, this.password, '');

    if (this.userService.getPlayer() !== undefined) {
      const player = this.userService.getPlayer();
      const fullName = player.getFirst() + ' ' + player.getLast();
      this.settings = new Settings(fullName, player.getPronouns(),
        player.getEmail(), '****', player.getLogo());
    } else if (this.userService.getAdmin() !== undefined) {
      const admin = this.userService.getAdmin();
      this.settings = new Settings(admin.getName(), admin.getPronouns(),
        admin.getEmail(), '****', '');
      this.isPlayer = false;
    } else { this.isPlayer = false; }

    if (this.settingsService.getSettings() !== undefined) {
      this.settings = this.settingsService.getSettings();
      if (this.isPlayer) {
        this.userService.getPlayer().updateWithSettings(this.settings);
      }
    }

    if (this.settings.getPicture() !== null) {
      const event = this.settings.getPicture();
      const selectedFile = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(selectedFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = reader.result.toString();
      };
    }
  }

}
