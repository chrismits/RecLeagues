import { League } from './league'
import { MATCHES } from './ex_match'

var now = new Date();
var name = 'Rec League'
var sport = 'Baseball'
var season = 'Spring'
var tmp_league_1 = new League(name, false, sport, season, now, now, now, "", "", "");
sport = 'Volleybal'
var tmp_league_2 = new League(name, false, sport, season, now, now, now, "", "", "");
sport = 'Tennis'
var tmp_league_3 = new League(name, false, sport, season, now, now, now, "", "", "");
sport = 'Indoor Soccer'
var tmp_league_4 = new League(name, false, sport, season, now, now, now, "", "", "");

export const LEAGUES: League[] = [
	tmp_league_1,
	tmp_league_2,
	tmp_league_3,
	tmp_league_4,
];