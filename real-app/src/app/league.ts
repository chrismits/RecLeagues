import { Match } from './match';
import { Team } from './team';

export class TimeSlot {
    day: string;
    length: number;
    buffer: number;
    start: string;
    end: string;

    constructor() {}

    getDay()    { return this.day; }
    getLength() { return this.length; }
    getBuffer() { return this.buffer; }
    getStart()  { return this.start; }
    getEnd()    { return this.end; }
    getDayNum() {
        const days = ['Sunday', 'Monday', 'Tuesday',
                    'Wednesday', 'Thursday', 'Friday',
                    'Saturday'];
        for (let i = 0; i < days.length; i++) {
            if (days[i] === this.day) { return i; }
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
    id: string;
    name: string;
    sport: string;
    season: string;

    regStart: Date;
    regEnd: Date;
    startDate: Date;
    endDate: Date;
    timeSlots: TimeSlot[];
    schedule: Match[];
    gameLength: number;
    location: string;

    numTeams: number;
    teams: Team[];
    maxNumTeams: number;
    minTeamSize: number;
    playersOn: number;

    leagueType: string;
    competitionLevel: string;
    freeAgents: boolean;
    autoApproval: boolean;
    rules: string;

    created: Date;

    constructor(id: string, name: string,
                sport: string, season: string, regS: Date,
                regE: Date, numTeams: number, teams: Team[],
                maxTeams: number, minSize: number, players: number,
                start: Date, end: Date, schedule: Match[],
                slots: TimeSlot[], loc: string, type: string,
                level: string, freeAg: boolean, approval: boolean,
                rules: string, created: Date) {
        this.id                 = id;
        this.name               = name;
        this.sport              = sport;
        this.season             = season;
        this.regStart           = regS;
        this.regEnd             = regE;
        this.numTeams           = numTeams;
        this.teams              = teams;
        this.maxNumTeams        = maxTeams;
        this.minTeamSize        = minSize;
        this.playersOn          = players;
        this.startDate          = start;
        this.endDate            = end;
        this.schedule           = schedule;
        this.timeSlots          = slots;
        this.leagueType         = type;
        this.competitionLevel   = level;
        this.location           = loc;
        this.freeAgents         = freeAg;
        this.autoApproval       = approval;
        this.rules              = rules;
        this.created            = created;
    }

    getName() { return this.name; }
    getSport() { return this.sport; }
    getSeason() { return this.season; }
    getRegStart() { return this.regStart; }
    getRegEnd() { return this.regEnd; }
    getNumTeams() { return this.numTeams; }
    getTeams() { return this.teams; }
    getType() { return this.leagueType; }
    getCompLevel() { return this.competitionLevel; }
    getMaxNumTeams() { return this.maxNumTeams; }
    getMinTeamSize() { return this.minTeamSize; }
    getPlayersOn() { return this.playersOn; }
    getGameLength() { return this.gameLength; }
    getStartDate() { return this.startDate; }
    getEndDate() { return this.endDate; }
    getTimeSlots() { return this.timeSlots; }
    getRules() { return this.rules; }

    getReadableRegStartDate() {
        return this.makeReadable(this.regStart);
    }
    getReadableRegEndDate() {
        return this.makeReadable(this.regEnd);
    }
    getReadableStartDate() {
        return this.makeReadable(this.startDate);
    }
    getReadableEndDate() {
        return this.makeReadable(this.endDate);
    }

    makeReadable(d: Date) {
        let words = d.toString().split(' ');
        if (words.length === 1) {
            words = d.toString().split('T');
            const dates = words[0].split('-');
            return dates[1].concat('/', dates[2], '/', dates[0]);
        } else {
            return words[1].concat('. ', words[2], ', ', words[3]);
        }
    }
    getSchedule() { return this.schedule; }
    getCreated() { return this.created; }
    getLocation() { return this.location; }
    isFreeAgents() { return this.freeAgents; }
    isAutoApproval() { return this.autoApproval; }

    setName(name: string) { this.name = name; }
    setSport(sport: string) { this.sport = sport; }
    setSeason(season: string) { this.season = season; }
    setRegStart(d: Date) { this.regStart = d; }
    setRegEnd(d: Date) { this.regEnd = d; }
    setNumTeams(n: number) { this.numTeams = n; }
    setType(s: string) { this.leagueType = s; }
    setCompLevel(s: string) { this.competitionLevel = s; }
    setMaxNumTeams(n: number) { this.maxNumTeams = n; }
    setMinTeamSize(n: number) { this.minTeamSize = n; }
    setPlayersOn(n: number) { this.playersOn = n; }
    setGameLength(n: number) { this.gameLength = n; }
    setStartDate(d: Date) { this.startDate = d; }
    setEndDate(d: Date) { this.endDate = d; }
    setRules(s: string) { this.rules = s; }

    addTimeSlot(slot: TimeSlot) {
        this.timeSlots.push(slot);
    }
    addTimeSlots(slots: TimeSlot[]) {
        // for (let i = 0; i < slots.length; i++) {
        //     this.addTimeSlot(slots[i]);
        // }
        slots.forEach(s => this.addTimeSlot(s));
    }
    removeTimeSlot(slot: TimeSlot) {
        this.timeSlots = this.timeSlots.filter(s => s !== slot);
    }
    removeAllTimeSlots() {
        this.timeSlots = [];
    }

    setIsFreeAgents(b: boolean) { this.freeAgents = b; }
    setIsAutoApproval(b: boolean) { this.autoApproval = b; }
    setLocation(loc: string) { this.location = loc; }

    addTeam(t: Team) {
        if (this.numTeams < this.maxNumTeams - 1 &&
            t.getSize() >= this.minTeamSize &&
            !this.teams.includes(t)) {
            this.teams.push(t);
            this.numTeams += 1;
        }
    }

    addMatch(m: Match) {
        if (this.numTeams < this.maxNumTeams - 2 &&
            !this.schedule.includes(m)) {
            this.schedule.push(m);
            this.addTeam(m.getHome());
            this.addTeam(m.getAway());
        }
    }

    getAllMatches() { return this.schedule; }
    getMatchesForTeam(t: Team) {
        return this.schedule.filter(
            m => m.getHome() === t || m.getAway() === t);
    }

    removeTeam(t: Team) {
        this.teams = this.teams.filter(team => team !== t);
        const matches = this.getMatchesForTeam(t);
        matches.forEach(m => this.removeMatch(m));
        this.numTeams -= 1;
    }

    removeMatch(m: Match) {
        const home = m.getHome();
        const away = m.getAway();
        if (this.getMatchesForTeam(home).length < 2) {
            this.removeTeam(home);
        }
        if (this.getMatchesForTeam(away).length < 2) {
            this.removeTeam(away);
        }
        this.schedule = this.schedule.filter(match => match !== m);
    }

    deepCopyLeague(l: League) {
        this.setName(l.getName());
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
