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

const routes: Routes = [
    { path: 'admin', component: AdminComponent},
    { path: 'create-team', component: CreateTeamComponent},
    { path: 'user-home', component: UserHomeComponent},
    { path: 'team-home', component: TeamHomeComponent},
    { path: 'info', component: InfoComponent},
    { path: 'user-info', component: UserInfoComponent},
    { path: 'info-edit-rules', component: InfoEditRulesComponent},
    { path: 'leagues-form-one', component: LeagueFormOneComponent},
    { path: 'leagues-form-two', component: LeagueFormTwoComponent},
    { path: 'leagues-form-three', component: LeagueFormThreeComponent},
    { path: 'leagues-form-four', component: LeagueFormFourComponent},
    { path: 'leagues-form-five', component: LeagueFormFiveComponent},
    { path: 'league-info', component: LeagueInfoComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'settings-edit', component: SettingsEditComponent},
    { path: 'league-info-schedule', component: LeagueInfoScheduleComponent},
    { path: 'league-game-schedule', component: LeagueGameScheduleComponent},
    { path: 'login', component: LoginComponent},
];
export const routing: ModuleWithProviders =
    RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
