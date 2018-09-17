import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MonsterDetailsComponent } from './monster-details/monster-details.component';
import { MonsterListComponent } from './monster-list/monster-list.component';

const routes: Routes = [
	{
		path: 'list',
		component: MonsterListComponent
	},
	{
		path: 'details/:id',
		component: MonsterDetailsComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
