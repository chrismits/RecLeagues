import { Match } from './match'
import { Team } from './team'

export class TimeSlot {
    day:    string;
    length: number;
    buffer: number;
    start:  string;
    end:    string;

    constructor() {}

    getDay()    { return this.day; }
    getLength() { return this.length; }
    getBuffer() { return this.buffer; }
    getStart()  { return this.start; }
    getEnd()    { return this.end; }
    getDayNum() { 
        let days = ['Sunday', 'Monday', 'Tuesday',
                    'Wednesday', 'Thursday', 'Friday',
                    'Saturday'];
        for (var i = 0; i < days.length; i++) {
            if (days[i] == this.day) return i;
        }
        return -1; 
    }

    setDay(s: string)    { this.day = s; }
    setLength(n: number) { this.length = n; }
    setBuffer(n: number) { this.buffer = n; }
    setStart(s: string)  { this.start = s; }
    setEnd(s: string)    { this.end = s; }

}

export class League {
    _id:               string;

    name:              string;
    is_pickup:         boolean;
    sport:             string;
    season:            string;
    reg_start:         Date;
    reg_end:           Date;
    num_teams:         number;
    teams:             Team[];
    max_num_teams:     number;
    min_team_size:     number;
    players_on:        number;
    game_length:       number;
    start_date:        Date;
    end_date:          Date;
    time_slots:        TimeSlot[];
    schedule:          Match[]; 
    location:          string;
    league_type:       string;
    competition_level: string;
    free_agents:       boolean;
    auto_approval:     boolean;
    rules:             string;
    created:           Date;

    constructor(id: string, name: string, is_pickup: boolean,
                    sport: string, season: string, reg_s: Date,
                    reg_e: Date, num_teams: number, teams: Team[],
                    max_teams: number, min_size: number, players: number,
                    start: Date, end: Date, schedule: Match[], 
                    slots: TimeSlot[], loc: string, type: string, 
                    level: string, free_ag: boolean, approval: boolean,
                    rules: string, created: Date) {
        this._id                = id; // will change for db
        this.name               = name;
        this.is_pickup          = is_pickup;
        this.sport              = sport;
        this.season             = season;
        this.reg_start          = reg_s;
        this.reg_end            = reg_e;
        this.num_teams          = num_teams;
        this.teams              = teams;
        this.max_num_teams      = max_teams; // change to global based on Matt
        this.min_team_size      = min_size; // change to global
        this.players_on         = players; // change to global
        this.start_date         = start;
        this.end_date           = end;
        this.schedule           = schedule;
        this.time_slots         = slots;
        this.league_type        = type;
        this.competition_level  = level;
        this.location           = loc;
        this.free_agents        = free_ag;
        this.auto_approval      = approval;
        this.rules              = rules;
        this.created            = created;
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
    getMinTeamSize() { return this.min_team_size; }
    getPlayersOn() { return this.players_on; }
    getGameLength() { return this.game_length; }
    getStartDate() { return this.start_date; }
    getEndDate() { return this.end_date; }
    getTimeSlots() { return this.time_slots; }
    getRules() { return this.rules; }

    getReadableRegStartDate() { 
        let words = this.reg_start.toString().split(" "); 
        if (words.length == 1) {
            words = this.reg_start.toString().split("T");
            let dates = words[0].split("-");
            return dates[1].concat('/', dates[2], '/', dates[0]);
        } else { 
            return words[1].concat('. ', words[2], ', ', words[3]);
        }
    }
    getReadableRegEndDate() { 
        let words = this.reg_end.toString().split(" "); 
        if (words.length == 1) {
            words = this.reg_end.toString().split("T");
            let dates = words[0].split("-");
            return dates[1].concat('/', dates[2], '/', dates[0]);
        } else { 
            return words[1].concat('. ', words[2], ', ', words[3]);
        }
    }
    getReadableStartDate() { 
        let words = this.start_date.toString().split(" "); 
        if (words.length == 1) {
            words = this.start_date.toString().split("T");
            let dates = words[0].split("-");
            return dates[1].concat('/', dates[2], '/', dates[0]);
        } else { 
            return words[1].concat('. ', words[2], ', ', words[3]);
        }
    }
    getReadableEndDate() { 
        let words = this.end_date.toString().split(" "); 
        if (words.length == 1) {
            words = this.end_date.toString().split("T");
            let dates = words[0].split("-");
            return dates[1].concat('/', dates[2], '/', dates[0]);
        } else { 
            return words[1].concat('. ', words[2], ', ', words[3]);
        }
    }
    getSchedule() { return this.schedule; }
    getCreated() { return this.created; }
    isPickup() { return this.is_pickup; }
    getLocation() { return this.location; }
    isFreeAgents() { return this.free_agents; }
    isAutoApproval() { return this.auto_approval; }

    setName(name: string) { this.name = name; }
    setSport(sport: string) { this.sport = sport; }
    setSeason(season: string) { this.season = season; }
    setRegStart(d: Date) { this.reg_start = d; }
    setRegEnd(d: Date) { this.reg_end = d; }
    setNumTeams(n: number) { this.num_teams = n; }
    setType(s: string) { this.league_type = s; }
    setCompLevel(s: string) { this.competition_level = s; }
    setMaxNumTeams(n: number) { this.max_num_teams = n; }
    setMinTeamSize(n: number) { this.min_team_size = n; }
    setPlayersOn(n: number) { this.players_on = n; }
    setGameLength(n: number) { this.game_length = n; }
    setStartDate(d: Date) { this.start_date = d; }
    setEndDate(d: Date) { this.end_date = d; }
    setRules(s: string) { this.rules = s; }

    addTimeSlot(slot: TimeSlot) { 
        this.time_slots.push(slot);
    }
    addTimeSlots(slots: TimeSlot[]) { 
        for (let i = 0; i < slots.length; i++) {
            this.addTimeSlot(slots[i]);
        }
    }
    removeTimeSlot(slot: TimeSlot) {
        this.time_slots.filter(s => s != slot);
    }
    removeAllTimeSlots() {
        this.time_slots = [];
    }

    setIsPickup(b: boolean) { this.is_pickup = b; }
    setIsFreeAgents(b: boolean) { this.free_agents = b; }
    setIsAutoApproval(b: boolean) { this.auto_approval = b; }
    setLocation(loc: string) { this.location = loc; }

    addTeam (t: Team) {
        if (this.num_teams < this.max_num_teams - 1 && 
            t.getSize() >= this.min_team_size &&
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

    deepCopyLeague(l: League) {
        this.setName(l.getName()); 
        this.setIsPickup(l.isPickup());
        this.setSport(l.getSport());
        this.setSeason(l.getSeason());
        this.setRegStart(l.getRegStart());
        this.setRegEnd(l.getRegEnd());
        this.setNumTeams(l.getNumTeams());
        l.getTeams().forEach(t => this.addTeam(t));
        this.setMaxNumTeams(l.getMaxNumTeams());
        this.setMinTeamSize(l.getMinTeamSize());
        this.setGameLength(l.getGameLength());
        this.setStartDate(l.getStartDate());
        this.setEndDate(l.getEndDate());
        this.addTimeSlots(l.getTimeSlots()); 
        l.getSchedule().forEach(m => this.addMatch(m));
        this.setLocation(l.getLocation());
        this.setType(l.getType());
        this.setCompLevel(l.getCompLevel());
        this.setIsFreeAgents(l.isFreeAgents());
        this.setIsAutoApproval(l.isAutoApproval());
    }

}