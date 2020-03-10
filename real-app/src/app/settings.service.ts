import { Injectable } from '@angular/core';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
    model: Settings;

    setSettings(s: Settings) { this.model = s; }
    getSettings() { return this.model; }

    constructor() { }
}
