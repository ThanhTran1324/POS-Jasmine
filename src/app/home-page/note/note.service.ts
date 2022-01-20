import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as NoteActions from './note.actions';
import * as fromRoot from '../../app.reducer';

@Injectable({providedIn: 'root'})
export class NoteService {

	constructor(
		private store: Store<fromRoot.State>
	) { }

	getNoteList(){
		return this.store.select('note');
	}
}
