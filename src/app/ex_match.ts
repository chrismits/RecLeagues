import { Match } from './match'
import { TEAMS } from './ex_teams'

var now = new Date();
var loc = "Bello"
var tmp_match_1 = new Match(TEAMS[0], TEAMS[1], now, loc);
var tmp_match_2 = new Match(TEAMS[0], TEAMS[2], now, loc);
var tmp_match_3 = new Match(TEAMS[1], TEAMS[0], now, loc);
var tmp_match_4 = new Match(TEAMS[1], TEAMS[2], now, loc);
var tmp_match_5 = new Match(TEAMS[2], TEAMS[0], now, loc);
var tmp_match_6 = new Match(TEAMS[2], TEAMS[1], now, loc);

export const MATCHES: Match[] = [
	tmp_match_1,
	tmp_match_2,
	tmp_match_3,
	tmp_match_4,
	tmp_match_5,
	tmp_match_6,

];