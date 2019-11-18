import { Player } from './player'
import { League } from './league'

export class Team {
    private _id: number;

    name:    string;
    size:    number;
    captain: Player;
    players: Player[]; 
    league:  League;
    created: Date;

    constructor (name: string, captain: Player, league: League) {
        this._id     = 1; // will change for db
        this.name    = name;
        this.size    = 1;
        this.captain = captain;
        this.players = [];
        this.players.push(captain); 
        this.league  = league;
        this.created = new Date();
    }
}