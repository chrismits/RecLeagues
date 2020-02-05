import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LeagueComponent } from './league/league.component';
import { LeagueFormOneComponent } from './league-form-one/league-form-one.component';
import { LeagueFormTwoComponent } from './league-form-two/league-form-two.component'
import { LeagueFormThreeComponent } from './league-form-three/league-form-three.component';
import { LeagueFormFourComponent } from './league-form-four/league-form-four.component';
import { LeagueFormFiveComponent } from './league-form-five/league-form-five.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { LeagueService } from './league.service';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { routing } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeagueInfoComponent } from './league-info/league-info.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component'

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
    HeaderComponent,
    FooterComponent,
    LeagueInfoComponent,
    ProfileComponent,
    SettingsComponent,
    ProfileEditComponent,
    SettingsEditComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    HttpClientModule,
    routing
  ],
  providers: [
    ApiService, 
    LeagueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
