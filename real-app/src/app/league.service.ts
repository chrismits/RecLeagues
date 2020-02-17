import { Injectable } from '@angular/core';
import { League, TimeSlot } from './league'

import {ApiService} from './api.service'

@Injectable()
export class LeagueService {
  model: League;

  setLeague(l : League) { this.model = l; }
  getLeague()           { return this.model; }


  constructor(private apiService: ApiService) {}

  storeLeague() {
    // add to db
    console.log("Adding league to DB")
    this.apiService.createLeague(this.model).subscribe((data) => {   
    }, (error) => {
      console.log(error)
    }) 
  }

  updateLeague() {
    // update db entry
    console.log("LS: Updating league")
    this.apiService.updateLeague(this.model).subscribe((data) => {
      console.log(data.name + "Updated");
    }, (error) => {
      console.log(error);
    })
  }

  // NOT TESTED
  getLeagues() {
    var arr: Array<League> = [];

    this.apiService.getAllLeagues().subscribe((data: any[]) => {
      for (var l in data) {
        var curr = new League(data[l]._id,
                            data[l].name, 
                            data[l].is_pickup, 
                            data[l].sport,
                            data[l].season,
                            data[l].dates.reg_start,
                            data[l].dates.reg_end,
                            data[l].team_info.num_teams,
                            data[l].team_info.teams,
                            data[l].team_info.max_num_teams,
                            data[l].team_info.min_team_size,
                            data[l].team_info.min_team_size,
                            data[l].dates.start_date,
                            data[l].dates.end_date,
                            data[l].matches,
                            [],
                            '', 
                            data[l].league_type, 
                            data[l].competition_level,
                            data[l].free_agents,
                            data[l].team_info.auto_approval,
                            /* add rules string to db? */
                            'No rules yet',
                            data[l].created);
        /* Done to change object type */
        for (let s of data[l].dates.time_slots) {
          var slot = new TimeSlot();
          slot.setDay(s.day);
          slot.setStart(s.start);
          slot.setEnd(s.end);
          slot.setLength(s.length);
          slot.setBuffer(s.buffer);
          curr.addTimeSlot(slot);

        }
        arr.push(curr);
        //console.log(curr.start_date)
      }
    }, (error) => {
      console.log(error)
      return;
    })
    return arr;

  }
}