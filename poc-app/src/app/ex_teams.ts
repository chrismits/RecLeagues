import { Team } from './team'
import { PLAYERS } from './ex_players'

var tmp_team_1 = new Team('Greats', PLAYERS[0]);
var tmp_team_2 = new Team('Cool GUYS', PLAYERS[1]);

export const TEAMS: Team[] = [
	tmp_team_1,
	tmp_team_2,
];