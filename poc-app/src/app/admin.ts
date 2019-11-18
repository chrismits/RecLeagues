import { League } from './league'

class LeaguePrivs {
    league: League;
    priv:   number;

    constructor (league: League, priv: number) {
        this.league = league;
        this.priv   = priv;
    }
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
}