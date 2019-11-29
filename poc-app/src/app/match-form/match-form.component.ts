import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../match'
import { Team } from '../team'
import { Player } from '../player'

@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss']
})
export class MatchFormComponent implements OnInit {

  @Output() added = new EventEmitter<Match>();
  @Input() avail_teams: Team[];

  init_capt: Player = new Player('', '', '');
  init_home: Team = new Team('', this.init_capt); 
  init_away: Team = new Team('', this.init_capt); 
  init_date: Date = new Date();
  init_loc: string = '';

  model = new Match(this.init_home, this.init_away, this.init_date, this.init_loc);

  submitted = false;

  onSubmit() { 
  	this.submitted = true; 
    var new_model = new Match(this.model.home, this.model.away, this.model.date, this.model.location);
  	this.added.emit(new_model);
  }

  constructor() { }

  ngOnInit() {
  }

}
