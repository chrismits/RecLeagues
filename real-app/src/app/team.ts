import { Player } from './player';
import { League } from './league';

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

    id: string; // chris change id to string

    name: string;
    size: number;
    captain: Player;
    approved: boolean;
    freeAgents: boolean;
    record: Record;
    // logo:    any;
    players: Player[];
    emails: string[];
    registeredPlayers: Player[];
    league: string; /* object id */
    created: Date;

    constructor(name: string, captain: Player) {
        this.id                = ''; // will change for db
        this.name              = name;
        this.size              = 1;
        this.approved          = false;
        this.freeAgents        = false;
        this.captain           = captain;
        this.record            = new Record();
        this.players           = [];
        this.emails            = [];
        this.registeredPlayers = [];
        this.players.push(captain);
        this.created           = new Date();
    }

    getName() { return this.name; }
    getSize() { return this.size; }
    getCaptain() { return this.captain; }
    getAllPlayers() { return this.players; }
    getEmails() { return this.emails; }
    getWins() { return this.record.wins; }
    getTies() { return this.record.ties; }
    getLosses() { return this.record.losses; }
    getCreated() { return this.created; }
    getLeagueID() { return this.league; }
    isOnTeam(p: Player) {
        return this.players.includes(p);
    }
    isCaptain(p: Player) {
        return this.captain === p;
    }

    isApproved() { return this.approved; }
    isFreeAgents() { return this.freeAgents; }
    setApproved(b: boolean) { this.approved = b; }
    setFreeAgents(b: boolean) { this.freeAgents = b; }
    pushEmails(s: string[]) {
        s.forEach(str => {
            if (!this.emails.includes(str)) {
                this.emails.push(str);
                const front = str.split('@')[0];
                const first = front.split('.')[0];
                const last = front.split('.')[1];
                this.addPlayer(new Player('1', first, last, str));
            }
        });
    }
    // chris: added set ID.
    setID(id: string) { this.id = id; }

    setWins(n: number) { this.record.wins = n; }
    setTies(n: number) { this.record.ties = n; }
    setLosses(n: number) { this.record.losses = n; }
    setName(n: string) { this.name = n; }
    setLeagueID(id: string) { this.league = id; }
    setSize(s: number) { this.size = s; }
    setCaptain(c: Player) {
        if (this.isOnTeam(c)) { this.captain = c; }
    }

    addPlayer(p: Player) {
        if (!this.players.includes(p)) {
            this.players.push(p);
            this.size++;
        }
    }

    registerPlayer(p: Player) {
        if (!this.registeredPlayers.includes(p) &&
            this.players.includes(p)) {
            this.registeredPlayers.push(p);
        }
    }

    playerIsRegistered(p: Player) {
        return this.registeredPlayers.includes(p);
    }

    removePlayer(p: Player) {
        this.players = this.players.filter(pl => pl !== p);
    }
}
