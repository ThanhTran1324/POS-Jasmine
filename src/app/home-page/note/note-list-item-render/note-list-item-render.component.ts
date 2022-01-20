import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NoteItemOrListToRender } from 'src/app/model/note-model';

@Component({
  selector: 'app-note-list-item-render',
  templateUrl: './note-list-item-render.component.html',
  styleUrls: ['./note-list-item-render.component.scss']
})
export class NoteListItemRenderComponent implements OnInit, OnChanges {

	@Input() inputValue: NoteItemOrListToRender[];
	@Input() isNoteList: boolean;
	@Output() selectItem = new EventEmitter<NoteItemOrListToRender>();
	dataToRender: NoteItemOrListToRender[];

	constructor() { }

	ngOnInit(): void {}

	ngOnChanges(): void {
		if(this.isNoteList){
			this.dataToRender = this.inputValue;
		} else {
			this.dataToRender = this.inputValue['noteItemList'];
		}
	}

	onSelectItem(item: NoteItemOrListToRender){
		this.selectItem.emit(item);
	}
}
