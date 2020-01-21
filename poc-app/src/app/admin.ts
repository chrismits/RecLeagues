import { League } from './league'


var ADMIN_PRIV = 1;
var OFFICIAL_PRIV = 0;


class LeaguePrivs {
    league: League;
    priv:   number;

    constructor (league: League, priv: number) {
        this.league = league;
        this.priv   = priv;
    }

    getLeague() { return this.league; }
    getPriv() { return this.priv; }

    setLeague(l: League) { this.league = l; }
    setPriv(p: number) { this.priv = p; }
    setHighPriv() { this.priv = ADMIN_PRIV; }
    setLowPriv() { this.priv = OFFICIAL_PRIV; }
}

export class Admin {
    private _id: number;

    leagues: LeaguePrivs[];
    created: Date;

    constructor () {
        this._id     = 1; // will change for db
        this.leagues = [];
        this.created = new Date();
    }


    getCreated() { return this.created; }
    getLeaguesAndPrivs() { return this.leagues; }
    getLeagues() { return this.leagues.map(lp => lp.getLeague()); }
    getPrivOfLeague(l: League) {
        let privs = this.leagues.filter(lp => lp.getLeague() == l);
        return privs[0].getPriv();
    }

    isLeagueAdmin(l: League) {
        let leagues = this.leagues.filter(lp => l == lp.getLeague());
        if (leagues == []) return true;
        else return false;
    }

    addLeagueWithPriv(l: League, priv: number) {
        if (!this.isLeagueAdmin(l)) {
            let newLeague = new LeaguePrivs(l, priv);
            this.leagues.push(newLeague);
        }
    }

    setPrivToLeague(l: League, p: number) {
        this.leagues = this.leagues.map( lp =>
            { if (l == lp.getLeague()) 
                lp.setPriv(p); }  
        );
    }

    removeLeague(l: League) {
        this.leagues = this.leagues.filter( 
            lp => lp.getLeague() != l);

    }
}