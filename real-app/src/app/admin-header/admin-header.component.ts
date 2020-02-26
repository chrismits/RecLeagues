import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../role.service';

@Component({
  selector: 'admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  @Output() loggedout = new EventEmitter();

  constructor(public roleService: RoleService) { }

  ngOnInit() {
  }

  logout() {
  	this.roleService.setRole(null);
  	this.loggedout.emit(null);
  }

}
