import { Component, OnInit } from '@angular/core';

import { NoteList, NoteItem } from '../../model/note-model';
@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit {

	NoteListData: NoteList[] = [
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
	]
	selectedList: NoteItem[];
	selectedNoteItem: NoteItem;

	constructor() { }

	ngOnInit(): void {
	}

	setSelectedNoteList(noteList: NoteItem[]){
		console.log(noteList);
		this.selectedList = noteList;
		this.selectedNoteItem = null;
	}

	setSelectedNoteItem(noteItem: NoteItem){
		console.log(noteItem);
		this.selectedNoteItem = noteItem;
	}
}
