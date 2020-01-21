 import { Team } from './team'
 import { Player } from './player'

export class Match {
    private _id: number;

    home:           Team;
    away:           Team;
    confirmed_home: Player[];
    confirmed_away: Player[];
    date:           Date;
    location:       string;
    // home_stats: Stats;
    // away_stats: Stats;
    score:          string;
    created:        Date;

    constructor (home: Team, away: Team, date: Date, location: string) {
        if (home != away) {
            this._id      = 1; // will change for db
            this.home     = home;
            this.away     = away;
            this.date     = date;
            this.location = location;
            this.score    = "TBD";
            this.created  = new Date();
        }
    }

    getHome() { return this.home; }
    getAway() { return this.away; }
    getDate() { return this.date; }
    getLocation() { return this.location; }
    getScore() { return this.score; }
    getCreated() { return this.created; }

    setHome(t: Team) { this.home = t; }
    setAway(t: Team) { this.away = t; }
    setDate(d: Date) { this.date = d; }
    setLocation(l: string) { this.location = l; }
    setScore(s: string) { this.score = s; }

    addHomePlayer(p: Player) {
        if (!this.confirmed_home.includes(p) &&
            this.home.isOnTeam(p)) {
            this.confirmed_home.push(p);
        }
    }
    addAwayPlayer(p: Player) {
        if (!this.confirmed_away.includes(p) &&
            this.away.isOnTeam(p)) {
            this.confirmed_away.push(p);
        }
    }
    removeHomePlayer(p: Player) {
        if (this.confirmed_home.includes(p)) {
            this.confirmed_home = this.confirmed_home.filter(pl => pl != p)
        }
    }
    removeAwayPlayer(p: Player) {
        if (this.confirmed_away.includes(p)) {
            this.confirmed_away = this.confirmed_home.filter(pl => pl != p)
        }
    }


}