import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../team'
import { Player } from '../player'

@Component({
  selector: 'app-join-team-form',
  templateUrl: './join-team-form.component.html',
  styleUrls: ['./join-team-form.component.scss']
})
export class JoinTeamFormComponent implements OnInit {

  @Output() added = new EventEmitter<Team>();
  @Input() avail_teams: Team[];

  team_name: string = '';
  init_capt = new Player('', '', '');

  model = new Team(this.team_name, this.init_capt);

  submitted = false;

  onSubmit() { 
  	this.submitted = true;
    this.added.emit(this.model);
  }

  constructor() { }

  ngOnInit() {
  }

}
