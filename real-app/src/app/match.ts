import { Team } from './team';
import { Player } from './player';

export class Match {

    id: string; // Chris: Changed the ID to a string!!
    home: Team;
    away: Team;
    confirmedHome: Player[];
    confirmedAway: Player[];
    date: Date;
    location: string;
    // home_stats: Stats;
    // away_stats: Stats;
    score: string;
    created: Date;

    constructor(home: Team, away: Team, date: Date, location: string) {
        if (home !== away) {
            this.id       = "1"; // will change for db
            this.home     = home;
            this.away     = away;
            this.date     = date;
            this.location = location;
            this.score    = 'TBD';
            this.created  = new Date();
        }
    }

    getHome() { return this.home; }
    getAway() { return this.away; }
    getDate() { return this.date; }
    getReadableDate() {
        let words = this.date.toString().split(' ');
        let str = '';
        if (words.length === 1) {
            words = this.date.toString().split('T');
            const dates = words[0].split('-');
            str = dates[1].concat('/', dates[2], '/', dates[0]);
        } else {
            str = words[1].concat('. ', words[2], ', ', words[3]);
            const times = words[4].split(':');
            let hr = Number(times[0]);
            const mins = times[1];
            let tod = 'AM';
            if (hr > 12) {
                tod = 'PM';
                hr -= 12;
            }
            const time = hr.toString() + ':' + mins + ' ' + tod;
            str = str + ' @ ' + time;
        }

        return str;
    }
    getLocation() { return this.location; }
    getScore() { return this.score; }
    getCreated() { return this.created; }

    setHome(t: Team) { this.home = t; }
    setAway(t: Team) { this.away = t; }
    setDate(d: Date) { this.date = d; }
    setLocation(l: string) { this.location = l; }
    setScore(s: string) { this.score = s; }

    addHomePlayer(p: Player) {
        if (!this.confirmedHome.includes(p) &&
            this.home.isOnTeam(p)) {
            this.confirmedHome.push(p);
        }
    }
    addAwayPlayer(p: Player) {
        if (!this.confirmedAway.includes(p) &&
            this.away.isOnTeam(p)) {
            this.confirmedAway.push(p);
        }
    }
    removeHomePlayer(p: Player) {
        if (this.confirmedHome.includes(p)) {
            this.confirmedHome = this.confirmedHome.filter(pl => pl !== p);
        }
    }
    removeAwayPlayer(p: Player) {
        if (this.confirmedAway.includes(p)) {
            this.confirmedAway = this.confirmedHome.filter(pl => pl !== p);
        }
    }


}
