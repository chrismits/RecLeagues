import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { PlayerComponent } from './player/player.component';
import { AdminComponent } from './admin/admin.component';
import { TeamFormComponent } from './team-form/team-form.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { LeagueFormComponent } from './league-form/league-form.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { JoinTeamFormComponent } from './join-team-form/join-team-form.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service'

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LeagueComponent,
    TeamComponent,
    MatchComponent,
    PlayerComponent,
    AdminComponent,
    TeamFormComponent,
    PlayerFormComponent,
    MatchFormComponent,
    LeagueFormComponent,
    JoinTeamComponent,
    JoinTeamFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
