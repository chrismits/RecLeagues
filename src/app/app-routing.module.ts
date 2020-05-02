import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { TeamHomeComponent } from './team-home/team-home.component';
import { InfoComponent } from './info/info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { InfoEditRulesComponent } from './info-edit-rules/info-edit-rules.component';
import { LeagueFormOneComponent } from './league-form-one/league-form-one.component';
import { LeagueFormTwoComponent } from './league-form-two/league-form-two.component';
import { LeagueFormThreeComponent } from './league-form-three/league-form-three.component';
import { LeagueFormFourComponent } from './league-form-four/league-form-four.component';
import { LeagueFormFiveComponent } from './league-form-five/league-form-five.component';
import { LeagueInfoComponent } from './league-info/league-info.component';
import { LeagueGameScheduleComponent } from './league-game-schedule/league-game-schedule.component';
import { LeagueInfoScheduleComponent } from './league-info-schedule/league-info-schedule.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsEditComponent } from './settings-edit/settings-edit.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouteGuardService } from './route-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'admin', component: AdminComponent, canActivate: [RouteGuardService]},
  { path: 'create-team', component: CreateTeamComponent, canActivate: [RouteGuardService]},
  { path: 'user-home', component: UserHomeComponent, canActivate: [RouteGuardService]},
  { path: 'team-home', component: TeamHomeComponent, canActivate: [RouteGuardService]},
  { path: 'info', component: InfoComponent, canActivate: [RouteGuardService]},
  { path: 'user-info', component: UserInfoComponent, canActivate: [RouteGuardService]},
  { path: 'info-edit-rules', component: InfoEditRulesComponent, canActivate: [RouteGuardService]},
  { path: 'leagues-form-one', component: LeagueFormOneComponent, canActivate: [RouteGuardService]},
  { path: 'leagues-form-two', component: LeagueFormTwoComponent, canActivate: [RouteGuardService]},
  { path: 'leagues-form-three', component: LeagueFormThreeComponent, canActivate: [RouteGuardService]},
  { path: 'leagues-form-four', component: LeagueFormFourComponent, canActivate: [RouteGuardService]},
  { path: 'leagues-form-five', component: LeagueFormFiveComponent, canActivate: [RouteGuardService]},
  { path: 'league-info', component: LeagueInfoComponent, canActivate: [RouteGuardService]},
  { path: 'settings', component: SettingsComponent, canActivate: [RouteGuardService]},
  { path: 'settings-edit', component: SettingsEditComponent, canActivate: [RouteGuardService]},
  { path: 'league-info-schedule', component: LeagueInfoScheduleComponent, canActivate: [RouteGuardService]},
  { path: 'league-game-schedule', component: LeagueGameScheduleComponent, canActivate: [RouteGuardService]},
];
export const routing: ModuleWithProviders =
    RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
