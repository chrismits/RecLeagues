import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RecLeagues';

  isAdmin = true;

  toggleAdmin() {
  	this.isAdmin = !this.isAdmin;
  }
}