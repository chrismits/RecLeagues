import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin'
import { League } from '../league'
import { LEAGUES } from '../ex_league'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 
  season = "Winter 2020";
  isAdmin = true;
  leagues: League[] = LEAGUES;
  constructor() { }

  ngOnInit() {
  }

}
