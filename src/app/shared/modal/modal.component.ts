import { Component, Inject, TemplateRef, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: {
			template: TemplateRef<ElementRef>;
		}
	) {}
}
