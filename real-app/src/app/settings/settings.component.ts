import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  name: string = "Matt Callahan";
  pronouns: string = "He/Him";
  time_zone: string = "EST";
  language: string = "English";
  settings: Settings = new Settings(this.name, this.pronouns, this.time_zone, this.language);

  constructor() { }

  ngOnInit() {
  }

}
