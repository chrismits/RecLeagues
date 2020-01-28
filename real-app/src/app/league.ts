import { Match } from './match'
import { Team } from './team'

export class TimeSlot {
    day: string;
    length: number;
    buffer: number;
    start: Date;
    end: Date;

    constructor() {}

    getDay() { return this.day; }
    getLength() { return this.length; }
    getBuffer() { return this.buffer; }
    getStart() { return this.start; }
    getEnd() { return this.end; }

    getReadableStartDate() { 
        let words = this.start.toString().split(" "); 
        return words[1].concat(' ', words[2], ' ', words[3]);
    }
    getReadableEndDate() { 
        let words = this.end.toString().split(" "); 
        return words[1].concat(' ', words[2], ' ', words[3]);
    }

    setDay(s: string) { this.day = s; }
    setLength(n: number) { this.length = n; }
    setBuffer(n: number) { this.buffer = n; }
    setStart(d: Date) { this.start = d; }
    setEnd(d: Date) { this.end = d; }

}

export class League {
    private _id:       number;

    name:              string;
    is_pickup:         boolean;
    sport:             string;
    season:            string;
    reg_start:         Date;
    reg_end:           Date;
    num_teams:         number;
    teams:             Team[];
    max_num_teams:     number;
    max_team_size:     number;
    game_length:       number;
    start_date:        Date;
    end_date:          Date;
    time_slots:        TimeSlot[];
    schedule:          Match[]; 
    location:          string;
    league_type:       string;
    competition_level: string;
    created:           Date;

    constructor (name: string, is_pickup: boolean, sport: string, 
                 season: string, reg_start: Date, reg_end: Date, 
                 start: Date, location: string, type: string,
                 level: string) {
        this._id                = 1; // will change for db
        this.name               = name;
        this.is_pickup          = is_pickup;
        this.sport              = sport;
        this.season             = season;
        this.reg_start          = reg_start;
        this.reg_end            = reg_end;
        this.num_teams          = 0;
        this.max_num_teams      = 10; // change to global based on Matt
        this.max_team_size      = 15; // change to global
        this.start_date         = start;
        this.end_date           = start;
        this.schedule           = [];
        this.time_slots         = [];
        this.league_type        = type;
        this.competition_level  = level;
        this.location           = location;
        this.created            = new Date();
    }

    getName() { return this.name; }
    getSport() { return this.sport; }
    getSeason() { return this.season; }
    getRegStart() { return this.reg_start; }
    getRegEnd() { return this.reg_end; }
    getNumTeams() { return this.num_teams; }
    getTeams() { return this.teams; }
    getType() { return this.league_type; }
    getCompLevel() { return this.competition_level; }
    getMaxNumTeams() { return this.max_num_teams; }
    getMaxTeamSize() { return this.max_team_size; }
    getGameLength() { return this.game_length; }
    getStartDate() { return this.start_date; }
    getEndDate() { return this.end_date; }
    getTimeSlots() { return this.time_slots; }
    getReadableRegStartDate() { 
        let words = this.reg_start.toString().split(" "); 
        return words[1].concat(' ', words[2], ' ', words[3]);
    }
    getReadableRegEndDate() { 
        let words = this.reg_end.toString().split(" "); 
        return words[1].concat(' ', words[2], ' ', words[3]);
    }
    getReadableStartDate() { 
        let words = this.start_date.toString().split(" "); 
        return words[1].concat(' ', words[2], ' ', words[3]);
    }
    getReadableEndDate() { 
        let words = this.end_date.toString().split(" "); 
        return words[1].concat(' ', words[2], ' ', words[3]);
    }
    getSchedule() { return this.schedule; }
    getCreated() { return this.created; }
    isPickup() { return this.is_pickup; }
    getLocation() { return this.location; }

    setName(name: string) { this.name = name; }
    setSport(sport: string) { this.sport = sport; }
    setSeason(season: string) { this.season = season; }
    setRegStart(d: Date) { this.reg_start = d; }
    setRegEnd(d: Date) { this.reg_end = d; }
    setNumTeams(n: number) { this.num_teams = n; }
    setType(s: string) { this.league_type = s; }
    setCompLevel(s: string) { this.competition_level = s; }
    setMaxNumTeams(n: number) { this.max_num_teams = n; }
    setMaxTeamSize(n: number) { this.max_team_size = n; }
    setGameLength(n: number) { this.game_length = n; }
    setStartDate(d: Date) { this.start_date = d; }
    setEndDate(d: Date) { this.end_date = d; }

    addTimeSlot(slot: TimeSlot) { 
        this.time_slots.push(slot);
    }
    removeTimeSlot(slot: TimeSlot) {
        this.time_slots.filter(s => s != slot);
    }

    setIsPickup(b: boolean) { this.is_pickup = b; }
    setLocation(loc: string) { this.location = loc; }

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