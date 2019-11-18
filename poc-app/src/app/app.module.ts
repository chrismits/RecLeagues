import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LeagueComponent } from './league/league.component';
import { TeamComponent } from './team/team.component';
import { MatchComponent } from './match/match.component';
import { PlayerComponent } from './player/player.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LeagueComponent,
    TeamComponent,
    MatchComponent,
    PlayerComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
