import { Component, OnInit } from '@angular/core';
import { Admin } from '../admin'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
 
  season = "Winter 2020";

  constructor() { }

  ngOnInit() {
  }

}
