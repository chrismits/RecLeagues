import { Team } from './team'
import { PLAYERS } from './ex_players'

var tmp_team_1 = new Team('TUFC B', PLAYERS[0]);
var tmp_team_2 = new Team('Mich St.', PLAYERS[1]);
var tmp_team_3 = new Team('UF', PLAYERS[2]);

tmp_team_2.setFreeAgents(true);

tmp_team_1.setWins(2);
tmp_team_1.setTies(1);
tmp_team_1.setLosses(3);

tmp_team_2.setWins(4);
tmp_team_2.setTies(0);
tmp_team_2.setLosses(2);

tmp_team_3.setWins(1);
tmp_team_3.setTies(4);
tmp_team_3.setLosses(1);

export const TEAMS: Team[] = [
	tmp_team_1,
	tmp_team_2,
	tmp_team_3,
];