import { Injectable, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalComponent } from './modal.component';

@Injectable()
export class ModalService {
	constructor(private dialog: MatDialog) {}

	openModal(tempRef: ElementRef) {
		this.dialog.open(ModalComponent, {
			data: {
				template: tempRef,
			},
		});
	}

	closeModal() {
		this.dialog.closeAll();
	}
}
