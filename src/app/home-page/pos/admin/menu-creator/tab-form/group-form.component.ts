import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalesService } from '../../../../../services/locales.service';
import { MenuGroup } from '../../../../../model/menu-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-group-form',
	templateUrl: './group-form.component.html',
	styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: MenuGroup,
		private dialogRef: MatDialogRef<GroupFormComponent>,
		private localesService: LocalesService
	) {}

	groupForm: FormGroup;
	getLocale = this.localesService.getLocale;
	locales = {
		name: this.getLocale('menuCreatorLocales', 'name'),
		namePlaceholder: this.getLocale(
			'menuCreatorLocales',
			'namePlaceholder'
		),
		submitButton: this.getLocale('menuCreatorLocales', 'submitButton'),
		groupFormHeader: this.getLocale(
			'menuCreatorLocales',
			'groupFormHeader'
		),
	};

	ngOnInit() {
		this.formInit();
		this.setFormValue();
	}

	formInit() {
		this.groupForm = new FormGroup({
			name: new FormControl(null, [Validators.required]),
		});
	}

	setFormValue() {
		if (this.data) {
			this.groupForm.setValue({ name: this.data.name });
		}
	}

	close() {
		this.dialogRef.close();
	}

	onSubmit() {
		this.dialogRef.close(this.groupForm.value);
	}
}
