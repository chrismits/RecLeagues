import { Player } from './player'

var tmp_player_1 = new Player('1', 'George', 'West', 'gwest@tufts.edu');
var tmp_player_2 = new Player('1', 'Chris', 'Mits', 'cmits@tufts.edu');
var tmp_player_3 = new Player('1', 'Yekwon', 'Park', 'ypark@tufts.edu');
var tmp_player_4 = new Player('1', 'Atef', 'Fayed', 'afayed@tufts.edu');

export const PLAYERS: Player[] = [
	tmp_player_1,
	tmp_player_2,
	tmp_player_3,
	tmp_player_4,
];