export interface NoteItem {
	id: string,
	name: string,
	content: string,
}

export interface NoteList {
	id: string,
	name: string,
	noteItemList: NoteItem[],
}
