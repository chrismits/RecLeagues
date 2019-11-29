import { Match } from './match'
import { TEAMS } from './ex_teams'

var now = new Date();
var loc = "Bello"
var tmp_match_1 = new Match(TEAMS[0], TEAMS[1], now, loc);

export const MATCHES: Match[] = [
	tmp_match_1,
];