import { Match } from './match'
import { Team } from './team'

export class League {
    private _id:   number;

    name:            string;
    is_pickup:       boolean;
    sport:           string;
    season:          string;
    reg_start:       Date;
    reg_end:         Date;
    num_teams:       number;
    teams:           Team[];
    max_num_teams:   number;
    max_team_size:   number;
    start_date:      Date;
    schedule:        Match[]; 
    pickup_location: string
    created:         Date;

    constructor (name: string, is_pickup: boolean, sport: string, 
                 season: string, reg_start: Date, reg_end: Date, 
                 start: Date, pickup_location: string) {
        this._id                = 1; // will change for db
        this.name               = name;
        this.is_pickup          = is_pickup;
        if (is_pickup) {
            this.sport              = sport;
            this.season             = season;
            this.reg_start          = reg_start;
            this.reg_end            = reg_end;
            this.num_teams          = 0;
            this.max_num_teams      = 10; // change to global based on Matt
            this.max_team_size      = 15; // change to global
            this.start_date         = start;
            this.schedule           = [];
        } else {
            this.pickup_location    = pickup_location;
        }
        this.created            = new Date();
    }

    getName() { return this.name; }
    getSport() { return this.sport; }
    getSeason() { return this.season; }
    getRegStart() { return this.reg_start; }
    getRegEnd() { return this.reg_end; }
    getNumTeams() { return this.num_teams; }
    getTeams() { return this.teams; }
    getMaxNumTeams() { return this.max_num_teams; }
    getMaxTeamSize() { return this.max_team_size; }
    getStartDate() { return this.start_date; }
    getSchedule() { return this.schedule; }
    getCreated() { return this.created; }
    isPickup() { return this.is_pickup; }
    getPickupLocation() { 
        if (this.isPickup()) return this.pickup_location;
        else return "";
    }

    setName(name: string) { this.name = name; }
    setSport(sport: string) { this.sport = sport; }
    setSeason(season: string) { this.season = season; }
    setRegStart(d: Date) { this.reg_start = d; }
    setRegEnd(d: Date) { this.reg_end = d; }
    setNumTeams(n: number) { this.num_teams = n; }
    setMaxNumTeams(n: number) { this.max_num_teams = n; }
    setMaxTeamSize(n: number) { this.max_team_size = n; }
    setStartDate(d: Date) { this.start_date = d; }
    setIsPickup(b: boolean) { this.is_pickup = b; }
    setPickupLocation(loc: string) { 
        if (this.isPickup()) this.pickup_location = loc;
    }

    addTeam (t: Team) {
        if (this.num_teams < this.max_num_teams - 1 && 
            t.getSize() <= this.max_team_size &&
            !this.teams.includes(t)) {
            this.teams.push(t);
            this.num_teams += 1;
        }
    }

    addMatch (m: Match) {
        if (this.num_teams < this.max_num_teams - 2 &&
            !this.schedule.includes(m)) {
            this.schedule.push(m);
            this.addTeam(m.getHome());
            this.addTeam(m.getAway());
        }
    }

    getAllMatches() { return this.schedule; }
    getMatchesForTeam(t: Team) { 
        return this.schedule.filter(
            m => m.getHome() == t || m.getAway() == t);
    }

    removeTeam(t: Team) {
        this.teams = this.teams.filter(team => team != t);
        let matches = this.getMatchesForTeam(t);
        matches.forEach(m => this.removeMatch(m));
        this.num_teams -= 1;
    }

    removeMatch(m: Match) {
        let home = m.getHome();
        let away = m.getAway();
        if (this.getMatchesForTeam(home).length < 2)
            this.removeTeam(home);
        if (this.getMatchesForTeam(away).length < 2)
            this.removeTeam(away);
        this.schedule = this.schedule.filter(match => match != m);

    }



}