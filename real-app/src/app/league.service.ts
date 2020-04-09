import { Injectable } from '@angular/core';
import { League, TimeSlot } from './league'
import {ApiService} from './api.service'

import { map } from 'rxjs/operators'


@Injectable()
export class LeagueService {
  model: League;

  setLeague(l : League) { this.model = l; }
  getLeague()           { return this.model; }


  constructor(private apiService: ApiService) {}

  storeLeague() {
    console.log("F -> F: Storing League")
    this.apiService.createLeague(this.model).subscribe((league) => { 
      console.log("Successfully added League")
      console.log(league)  
    }, (error) => {
      this.apiService.handleError(error);
    }) 
  }

  //test version
  getLeagues() {
    return this.apiService.getAllLeagues()
  }

  //done
  updateLeague() {
    // update db entry
    console.log("F -> F: Updating league")
    this.apiService.updateLeague(this.model).subscribe((data) => {
      console.log(data)
      console.log(data.name + "Updated");
    }, (error) => {
      this.apiService.handleError(error)
    })
  }



  // To subscribe to above run the following: 
    // this.leagueService.getLeagues().subscribe(data => {
    //   // data is league array
    // }, error => {
    //   // error is error if request fails
    // })

}

