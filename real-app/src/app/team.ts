import { Player } from './player'
import { League } from './league'

class Record {
    wins: number;
    ties: number;
    losses: number;

    constructor() {
        this.wins = 0;
        this.ties = 0;
        this.losses = 0;
    }
}

export class Team {
    private _id: number;

    name:    string;
    size:    number;
    captain: Player;
    approved: boolean;
    free_agents: boolean;
    record: Record
    //logo:    any;
    players: Player[]; 
    registered_players: Player[]; 
    created: Date;

    constructor (name: string, captain: Player){
        this._id     = 1; // will change for db
        this.name    = name;
        this.size    = 1;
        this.approved = false;
        this.free_agents = false;
        this.captain = captain;
        this.record = new Record();
        this.players = [];
        this.registered_players = [];
        this.players.push(captain); 
        this.created = new Date();
    }

    getName() { return this.name; }
    getSize() { return this.size; }
    getCaptain() { return this.captain; }
    getAllPlayers() { return this.players; }
    getWins() { return this.record.wins; }
    getTies() { return this.record.ties; }
    getLosses() { return this.record.losses; }
    getCreated() { return this.created; }
    isOnTeam(p: Player) {
        //if(this.players.filter(pl => pl == p) != []) return true;
        return this.players.includes(p);
    }

    isApproved() { return this.approved; }
    isFreeAgents() { return this.free_agents; }
    setApproved(b: boolean) { this.approved = b; }
    setFreeAgents(b: boolean) { this.free_agents = b; }


    setWins(n: number) { this.record.wins = n; }
    setTies(n: number) { this.record.ties = n; }
    setLosses(n: number) { this.record.losses = n; }
    setName(n: string) { this.name = n; }
    setSize(s: number) { this.size = s; }
    setCaptain(c: Player) { 
        if (this.isOnTeam(c)) this.captain = c; 
    }

    addPlayer(p: Player) {
        if (!this.players.includes(p)) {
            this.players.push(p);
        }
    }

    registerPlayer(p: Player) {
        if (!this.registered_players.includes(p) &&
            this.players.includes(p)) {
            this.registered_players.push(p);
        }
    }

    playerIsRegistered(p: Player) {
        return this.registered_players.includes(p);
    }

    removePlayer(p: Player) {
        this.players = this.players.filter(pl => pl != p)
    }
}