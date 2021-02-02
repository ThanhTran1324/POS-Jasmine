import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthModule } from './authentication/authentication.module';
import { AuthGuard } from './authentication/authentication.guard';
import { PageNotFound404Component } from './shared/page-not-found404/page-not-found404.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => AuthModule,
	},
	{
		path: 'home',
		loadChildren: () =>
			import('./home-page/home-page.module').then((m) => m.HomeModule),
	},
	{
		path: '**',
		component: PageNotFound404Component,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule {}
