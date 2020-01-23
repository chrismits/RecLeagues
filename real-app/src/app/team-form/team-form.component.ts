import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Team } from '../team'
import { Player } from '../player'

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {

  @Output() added = new EventEmitter<Team>();
  @Input() avail_caps: Player[];

  league_names = ['Soccer', 'Basketball', 'Dodgeball', 'other...'];

  team_name: string = '';
  init_capt = new Player('', '', '');

  model = new Team(this.team_name, this.init_capt);

  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    var new_model = new Team(this.model.name, this.model.captain);
  	this.added.emit(new_model);
  }

  constructor() {}

  ngOnInit() {}

}
