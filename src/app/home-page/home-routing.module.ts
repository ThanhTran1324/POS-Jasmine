import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';

export const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		children: [
			{
				path: 'pos',
				loadChildren: () => import('./pos/pos.module').then((m)=> m.POSModule)

			},
			{
				path: 'note',
				loadChildren: () => import('./note/note.module').then((m) => m.NoteModule)
			},
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
