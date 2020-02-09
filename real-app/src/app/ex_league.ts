import { League, TimeSlot } from './league'

var now = new Date();
var end = new Date(now);
var start = new Date(now);
var reg_end = new Date(now);
reg_end.setDate(reg_end.getDate() + 5);
start.setDate(start.getDate() + 6);
end.setDate(end.getDate() + 30);
var season = 'Winter';

var sport = 'Baseball';
var name = season + ' ' + sport;
var tmp_league_1 = new League(name, false, sport, season, now, reg_end, start, end, "", "", "");

sport = 'Volleybal'
name = season + ' ' + sport;
var tmp_league_2 = new League(name, false, sport, season, now, reg_end, start, end, "", "", "");

sport = 'Tennis'
name = season + ' ' + sport;
var tmp_league_3 = new League(name, false, sport, season, now, reg_end, start, end, "", "", "");

sport = 'Indoor Soccer'
name = season + ' ' + sport;
var tmp_league_4 = new League(name, false, sport, season, now, reg_end, start, end, "", "", "");

var slot1 = new TimeSlot();
var slot2 = new TimeSlot();
var slot3 = new TimeSlot();
var slot4 = new TimeSlot();
var now1 = "11:30 am";
var end1 = "2:00 pm";
slot1.setStart(now1);
slot1.setEnd(end1);
slot1.setLength(15);
slot1.setBuffer(5);

slot2.setStart(now1);
slot2.setEnd(end1);
slot2.setLength(15);
slot2.setBuffer(5);

slot3.setStart(now1);
slot3.setEnd(end1);
slot3.setLength(15);
slot3.setBuffer(5);

slot4.setStart(now1);
slot4.setEnd(end1);
slot4.setLength(15);
slot4.setBuffer(5);

slot1.setDay('Tuesday');
tmp_league_1.addTimeSlot(slot1);
slot2.setDay('Wednesday');
tmp_league_2.addTimeSlot(slot2);
slot3.setDay('Sunday');
tmp_league_3.addTimeSlot(slot3);
slot4.setDay('Friday');
tmp_league_4.addTimeSlot(slot4);

export const LEAGUES: League[] = [
	tmp_league_1,
	tmp_league_2,
	tmp_league_3,
	tmp_league_4,
];