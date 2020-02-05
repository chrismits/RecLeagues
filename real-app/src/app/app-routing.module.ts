import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LeagueComponent } from './league/league.component';
import { LeagueFormOneComponent } from './league-form-one/league-form-one.component';
import { LeagueFormTwoComponent } from './league-form-two/league-form-two.component';
import { LeagueFormThreeComponent } from './league-form-three/league-form-three.component';
import { LeagueFormFourComponent } from './league-form-four/league-form-four.component';
import { LeagueFormFiveComponent } from './league-form-five/league-form-five.component';
import { LeagueInfoComponent } from './league-info/league-info.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{ path: 'admin', component: AdminComponent},	
	{ path: 'leagues', component: LeagueComponent},	
	{ path: 'leagues-form-one', component: LeagueFormOneComponent},	
	{ path: 'leagues-form-two', component: LeagueFormTwoComponent},	
	{ path: 'leagues-form-three', component: LeagueFormThreeComponent},	
	{ path: 'leagues-form-four', component: LeagueFormFourComponent},	
	{ path: 'leagues-form-five', component: LeagueFormFiveComponent},
	{ path: 'league-info', component: LeagueInfoComponent},	
	{ path: 'profile', component: ProfileComponent},	
	{ path: 'settings', component: SettingsComponent},	
];
export const routing: ModuleWithProviders =  
    RouterModule.forRoot(routes); 
    
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
