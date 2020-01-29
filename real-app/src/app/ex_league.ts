import { League, TimeSlot } from './league'
import { MATCHES } from './ex_match'

var now = new Date();
var sport = 'Baseball';
var season = 'Spring';
var name = season + ' ' + sport;
var tmp_league_1 = new League(name, false, sport, season, now, now, now, "", "", "");

sport = 'Volleybal'
name = season + ' ' + sport;
var tmp_league_2 = new League(name, false, sport, season, now, now, now, "", "", "");

sport = 'Tennis'
name = season + ' ' + sport;
var tmp_league_3 = new League(name, false, sport, season, now, now, now, "", "", "");

sport = 'Indoor Soccer'
name = season + ' ' + sport;
var tmp_league_4 = new League(name, false, sport, season, now, now, now, "", "", "");

var slot = new TimeSlot();
var now = new Date();
var diff = 180;
var end = new Date(now.getTime() + diff * 60000)
slot.setStart(now);
slot.setEnd(end);
slot.setLength(15);
slot.setBuffer(5);

slot.setDay('Tuesday');
tmp_league_1.addTimeSlot(slot);
slot.setDay('Wednesday');
tmp_league_2.addTimeSlot(slot);
slot.setDay('Sunday');
tmp_league_3.addTimeSlot(slot);
slot.setDay('Friday');
tmp_league_4.addTimeSlot(slot);

export const LEAGUES: League[] = [
	tmp_league_1,
	tmp_league_2,
	tmp_league_3,
	tmp_league_4,
];