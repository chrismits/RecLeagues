import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueComponent } from './league/league.component';
import { MatchComponent } from './match/match.component';
import { TeamComponent } from './team/team.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { PlayerComponent } from './player/player.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
	{ path: 'leagues', component: LeagueComponent},	
	{ path: 'matches', component: MatchComponent},	
	{ path: 'teams', component: TeamComponent},	
	{ path: 'players', component: PlayerComponent},	
	{ path: 'admin', component: AdminComponent},	
	{ path: 'join-team', component: JoinTeamComponent},	
	{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
