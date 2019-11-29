 import { Team } from './team'

export class Match {
    private _id: number;

    home:        Team;
    away:        Team;
    date:        Date;
    location:    string;
    // home_stats: Stats;
    // away_stats: Stats;
    score:       string;
    created:     Date;

    constructor (home: Team, away: Team, date: Date, location: string) {
        this._id      = 1; // will change for db
        this.home     = home;
        this.away     = away;
        this.date     = date;
        this.location = location;
        this.score    = "TBD";
        this.created  = new Date();
    }
}