import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../role.service';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  @Output() loggedout = new EventEmitter();

  constructor(public roleService: RoleService) { }

  ngOnInit() {
  }

  logout() {
  	this.roleService.setRole(null);
  	this.loggedout.emit(null);
  }

}
