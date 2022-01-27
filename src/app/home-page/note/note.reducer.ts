import { Action, on, createReducer } from '@ngrx/store';
import * as NoteActions from './note.actions';

import { NoteList } from "../../model/note-model";

export type State = NoteList[];

const initialState: State = [
	{
		id: '1',
		name: 'note list 1',
		noteItemList: [
			{
				id: 'note 1',
				name: 'note 1',
				content: 'ngay xua ngay xua'
			},
			{
				id: 'note 2',
				name: 'note 2',
				content: 'ngay xua ngay xua 2'
			}
		]
	},
	{
		id: '2',
		name: 'note list 2',
		noteItemList: [
			{
				id: 'note 3',
				name: 'note 3',
				content: 'ngay xua ngay xua 3'
			},
			{
				id: 'note 4',
				name: 'note 4',
				content: 'ngay xua ngay xua 4'
			}
		]
	},
	{
		id: '3',
		name: 'note list 3',
		noteItemList: [
			{
				id: 'note 5',
				name: 'note 5',
				content: 'ngay xua ngay xua 5'
			},
			{
				id: 'note 6',
				name: 'note 6',
				content: 'ngay xua ngay xua 6'
			}
		]
	}
];

const noteReducerCreator = createReducer(
	initialState,
	on(NoteActions.getNoteList, (state) => {
		return state;
	})
);

export function noteReducer(state: State | undefined, action: Action) {
	return noteReducerCreator(state, action);
}
