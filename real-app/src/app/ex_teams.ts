import { Team } from './team'
import { PLAYERS } from './ex_players'

var tmp_team_1 = new Team('TUFC B', PLAYERS[0]);
var tmp_team_2 = new Team('Mich St.', PLAYERS[1]);
var tmp_team_3 = new Team('UF', PLAYERS[2]);

tmp_team_2.setFreeAgents(true);

export const TEAMS: Team[] = [
	tmp_team_1,
	tmp_team_2,
	tmp_team_3,
];