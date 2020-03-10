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

  settings: Settings = new Settings('', '', '', '', null);
  prons: string[] = ['He/Him/His', 'She/Her/Hers', 'They/Them/Their', 'Other'];
  password_confirm = '';
  selectedFile = null;
  url: string = "assets/img/default_prof.jpeg"; /* default */

  onSelectedImage(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    var reader = new FileReader();

    reader.readAsDataURL(this.selectedFile); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    }

    this.settings.setPicture(event);
  }

  uploadImage() {
    console.log('upload to db');
  }

  constructor(public settingsService: SettingsService) { }

  onSubmit() {
    console.log(this.settings.getName());
    console.log(this.settings.getPronouns());
    console.log(this.settings.getEmail());
    console.log(this.settings.getPassword());
    console.log(this.settings.getPicture());
  	/* store in db */
    this.settingsService.setSettings(this.settings);
  }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
    if (this.settings.getPicture() !== null) {
      let event = this.settings.getPicture();
      let selectedFile = event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(selectedFile); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  readImage(img) {
    
  }

}
