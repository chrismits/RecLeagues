import { Injectable } from '@angular/core';
import { Player } from './player';
import { Admin } from './admin';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    player: Player;
    admin: Admin;

    setPlayer(p: Player) { this.player = p; }
    getPlayer() { return this.player; }

    setAdmin(a: Admin) { this.admin = a; }
    getAdmin() { return this.admin; }

    constructor(private apiService: ApiService) {}

    /*******  DATABASE METHODS FOR PLAYER *******/

    /*
      To call this method simply use:

      this.userService.storePlayer(p).subscribe((player) => {
        DO WHATEVER, 
        -> change the id of frontend player to that of backend
      }, (error) => {
        DID NOT WORK, handle error
      })
    */
    storePlayer(p: Player) {
      return this.apiService.addPlayer(p)
    }

    /* 
    Similarly:
    this.userService.getPlayerByEmail(e).subscribe((player) => {}, (error) => {})
    */
    getPlayerByEmail(e : string) {
      return this.apiService.getPlayerByEmail(e)
    }

    /*
    this.userService.updatePlayer(p).subscribe((player)=>{}, (err)=>{})
    */
    updatePlayer(p : Player) {
      return this.apiService.updatePlayer(p)
    }

    /*
    this.userService.getAllPlayers().subscribe(pls=>{}, err=>{})
    */
    getAllPlayers() {
      return this.apiService.getAllPlayers()
    }

    //deletePlayers() to be added potentially.

}
