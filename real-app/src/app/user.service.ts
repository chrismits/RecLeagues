import { Injectable } from '@angular/core';
import { Player } from './player';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	player: Player;
	admin: Admin;

	setPlayer(p : Player) { this.player = p; }
	getPlayer() { return this.player; }

	setAdmin(a : Admin) { this.admin = a; }
	getAdmin() { return this.admin; }

    constructor() { }
}
