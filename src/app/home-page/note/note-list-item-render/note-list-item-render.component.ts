import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NoteItem, NoteList } from 'src/app/model/note-model';

@Component({
  selector: 'app-note-list-item-render',
  templateUrl: './note-list-item-render.component.html',
  styleUrls: ['./note-list-item-render.component.scss']
})
export class NoteListItemRenderComponent implements OnInit, OnChanges {
	@Input() inputValue: NoteList[] | NoteItem[];
	@Input() isNoteList: boolean;
	dataToRender: NoteItem[] | NoteItem[];
  constructor() { }

  ngOnInit(): void {
  }

 ngOnChanges(changes: SimpleChanges): void {
	this.dataToRender = this.inputValue;
 }

}
