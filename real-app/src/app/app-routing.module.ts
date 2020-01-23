import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LeagueComponent } from './league/league.component';

const routes: Routes = [
	{ path: 'admin', component: AdminComponent},	
	{ path: 'leagues', component: LeagueComponent},	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
