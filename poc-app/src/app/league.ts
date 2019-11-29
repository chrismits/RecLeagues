import { Match } from './match'

export class League {
    private _id:   number;

    name:           string;
    sport:          string;
    season:         string;
    reg_start:      Date;
    reg_end:        Date;
    num_teams:      number;
    max_num_teams:  number;
    max_team_size:  number;
    start_date:     Date;
    schedule:       Match[]; 
    created:        Date;

    constructor (name: string, sport: string, season: string, 
                 reg_start: Date, reg_end: Date, start: Date) {
        this._id                = 1; // will change for db
        this.name               = name;
        this.sport              = sport;
        this.season             = season;
        this.reg_start          = reg_start;
        this.reg_end            = reg_end;
        this.num_teams          = 0;
        this.max_num_teams      = 10; // change to global based on Matt
        this.max_team_size      = 15; // change to global
        this.start_date         = start;
        this.schedule           = [];
        this.created            = new Date();
    }
}