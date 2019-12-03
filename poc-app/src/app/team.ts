import { Player } from './player'
import { League } from './league'

export class Team {
    private _id: number;

    name:    string;
    size:    number;
    captain: Player;
    players: Player[]; 
    created: Date;

    constructor (name: string, captain: Player){
        this._id     = 1; // will change for db
        this.name    = name;
        this.size    = 1;
        this.captain = captain;
        this.players = [];
        this.players.push(captain); 
        this.created = new Date();
    }

    addPlayer(p: Player) {
        if (!this.players.includes(p)) {
            this.players.push(p);
            console.log(this.name);
            console.log(p._first);
            console.log(this.players[1]._first);
        }
    }
}