import { League } from './league'
import { MATCHES } from './ex_match'

var now = new Date();
var name = 'Rec League'
var sport = 'Baseball'
var season = 'Spring'
var tmp_league_1 = new League(name, sport, season, now, now, now);

export const LEAGUES: League[] = [
	tmp_league_1
];