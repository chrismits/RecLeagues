import { Player } from './player'
import { League } from './league'

export class Team {
    private _id: number;

    name:    string;
    size:    number;
    captain: Player;
    approved: boolean;
    free_agents: boolean;
    //logo:    any;
    players: Player[]; 
    created: Date;

    constructor (name: string, captain: Player){
        this._id     = 1; // will change for db
        this.name    = name;
        this.size    = 1;
        this.approved = false;
        this.free_agents = false;
        this.captain = captain;
        this.players = [];
        this.players.push(captain); 
        this.created = new Date();
    }

    getName() { return this.name; }
    getSize() { return this.size; }
    getCaptain() { return this.captain; }
    getAllPlayers() { return this.players; }
    getCreated() { return this.created; }
    isOnTeam(p: Player) {
        //if(this.players.filter(pl => pl == p) != []) return true;
        return this.players.includes(p);
    }
    isApproved() { return this.approved; }
    isFreeAgents() { return this.free_agents; }
    setApproved(b: boolean) { this.approved = b; }
    setFreeAgents(b: boolean) { this.free_agents = b; }

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

    removePlayer(p: Player) {
        this.players = this.players.filter(pl => pl != p)
    }
}