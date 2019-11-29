import { Player } from './player'

var tmp_player_1 = new Player('George', 'West', 'gwest@tufts.edu');
var tmp_player_2 = new Player('Chris', 'Mits', 'cmits@tufts.edu');
var tmp_player_3 = new Player('Yekwon', 'Park', 'ypark@tufts.edu');
var tmp_player_4 = new Player('Atef', 'Fayed', 'afayed@tufts.edu');

export const PLAYERS: Player[] = [
	tmp_player_1,
	tmp_player_2,
	tmp_player_3,
	tmp_player_4,
];