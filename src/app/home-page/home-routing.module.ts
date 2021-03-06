import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { AuthGuard } from '../authentication/authentication.guard';
import { AdminComponent } from './admin/admin.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MenuItemListComponent } from './user-menu/menu-item-list/menu-item-list.component';
import { MenuResolver } from './menu.resolver';

export const routes: Routes = [
	{
		path: '',
		// canActivate: [AuthGuard],
		// canLoad: [AuthGuard],
		component: HomePageComponent,
		resolve: { menuResolver: MenuResolver },
		children: [
			{ path: '', pathMatch: 'full', component: UserMenuComponent },
			{ path: 'group/:id', component: MenuItemListComponent },
			{ path: 'admin', component: AdminComponent }, // need to add auth admin guard.
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
