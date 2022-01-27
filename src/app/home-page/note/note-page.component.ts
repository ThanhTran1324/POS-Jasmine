import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NoteList, NoteItem } from '../../model/note-model';

import { NoteService} from './note.service';
@Component({
  selector: 'app-note-page',
  templateUrl: './note-page.component.html',
  styleUrls: ['./note-page.component.scss']
})
export class NotePageComponent implements OnInit, OnDestroy {

	noteListData: NoteList[];
	noteStateSub: Subscription;
	selectedList: NoteItem[];
	selectedNoteItem: NoteItem;

	constructor(
		private noteService: NoteService
	) { }

	ngOnInit(): void {
		this.noteStateSub = this.noteService.getNoteList().subscribe((noteState: NoteList[])=>{
			this.noteListData = noteState;
		})
	}

	ngOnDestroy(): void {
		this.noteStateSub.unsubscribe();
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
