import { Player } from './player'

var tmp_player_1 = new Player('G', 'West', 'gwest@tufts.edu');
var tmp_player_2 = new Player('C', 'Mits', 'cmits@tufts.edu');
var tmp_player_3 = new Player('Y', 'Park', 'ypark@tufts.edu');

export const PLAYERS: Player[] = [
	tmp_player_1,
	tmp_player_2,
	tmp_player_3,
];