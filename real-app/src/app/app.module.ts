import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LeagueComponent } from './league/league.component';
import { LeagueFormOneComponent } from './league-form-one/league-form-one.component';
import { LeagueFormTwoComponent } from './league-form-two/league-form-two.component'

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { CalendarComponent } from './calendar/calendar.component';
import { LeagueFormThreeComponent } from './league-form-three/league-form-three.component';
import { LeagueFormFourComponent } from './league-form-four/league-form-four.component';
import { LeagueFormFiveComponent } from './league-form-five/league-form-five.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CalendarComponent,
    LeagueComponent,
    LeagueFormOneComponent,
    LeagueFormTwoComponent,
    LeagueFormThreeComponent,
    LeagueFormFourComponent,
    LeagueFormFiveComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }