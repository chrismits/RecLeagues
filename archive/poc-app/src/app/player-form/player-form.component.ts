import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Player } from '../player'

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {

  @Output() added = new EventEmitter<Player>();

  constructor() { }

  first: string = '';
  last: string = '';
  email: string = '';
  cell: string = '';

  model = new Player(this.first, this.last, this.email, this.cell);

  submitted = false;

  onSubmit() {
  	this.submitted = true;
  	var new_model = new Player(this.model._first, this.model._last, 
                               this.model._email, this.model._cell);
  	this.added.emit(new_model);
  }

  ngOnInit() { }

}
