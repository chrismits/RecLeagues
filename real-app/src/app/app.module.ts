import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LeagueFormOneComponent } from './league-form-one/league-form-one.component';
import { LeagueFormTwoComponent } from './league-form-two/league-form-two.component';
import { LeagueFormThreeComponent } from './league-form-three/league-form-three.component';
import { LeagueFormFourComponent } from './league-form-four/league-form-four.component';
import { LeagueFormFiveComponent } from './league-form-five/league-form-five.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { LeagueService } from './league.service';
import { TeamService } from './team.service';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { routing } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeagueInfoComponent } from './league-info/league-info.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InfoComponent } from './info/info.component';
import { InfoEditRulesComponent } from './info-edit-rules/info-edit-rules.component';
import { LeagueInfoScheduleComponent } from './league-info-schedule/league-info-schedule.component';
import { LeagueGameScheduleComponent } from './league-game-schedule/league-game-schedule.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { RosterComponent } from './roster/roster.component';
import { TeamHomeComponent } from './team-home/team-home.component';
import { RankingsComponent } from './rankings/rankings.component';
import { RegistrationStatusComponent } from './registration-status/registration-status.component';
import { LoginComponent } from './login/login.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { TeamSchedComponent } from './team-sched/team-sched.component';

import { MatDialogModule } from "@angular/material";
import { NewLeagueDialogComponent } from "./new-league-dialog/new-league-dialog.component";


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CalendarComponent,
    LeagueFormOneComponent,
    LeagueFormTwoComponent,
    LeagueFormThreeComponent,
    LeagueFormFourComponent,
    LeagueFormFiveComponent,
    HeaderComponent,
    FooterComponent,
    LeagueInfoComponent,
    SettingsComponent,
    SettingsEditComponent,
    InfoComponent,
    InfoEditRulesComponent,
    LeagueInfoScheduleComponent,
    LeagueGameScheduleComponent,
    UserHomeComponent,
    UserInfoComponent,
    CreateTeamComponent,
    RosterComponent,
    TeamHomeComponent,
    RankingsComponent,
    RegistrationStatusComponent,
    LoginComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    TeamSchedComponent,
    NewLeagueDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
    routing,
    NoopAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    ApiService,
    LeagueService,
    TeamService,
  ],
  bootstrap: [AppComponent]
  ,
  entryComponents: [NewLeagueDialogComponent]
})
export class AppModule { }
