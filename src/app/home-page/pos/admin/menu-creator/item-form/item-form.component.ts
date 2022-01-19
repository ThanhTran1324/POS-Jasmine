import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LocalesService } from '../../../../../services/locales.service';
import { MenuItem } from '../../../../../model/menu-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-item-form',
	templateUrl: './item-form.component.html',
	styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
	constructor(
		private dialogRef: MatDialogRef<ItemFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: MenuItem,
		private localesService: LocalesService
	) {}

	itemForm: FormGroup;
	getLocale = this.localesService.getLocale;
	locales = {
		name: this.getLocale('menuCreatorLocales', 'name'),
		namePlaceholder: this.getLocale(
			'menuCreatorLocales',
			'namePlaceholder'
		),
		price: this.getLocale('menuCreatorLocales', 'price'),
		pricePlaceholder: this.getLocale(
			'menuCreatorLocales',
			'pricePlaceholder'
		),
		submitButton: this.getLocale('menuCreatorLocales', 'submitButton'),
		itemFormHeader: this.getLocale('menuCreatorLocales', 'itemFormHeader'),
	};

	ngOnInit(): void {
		this.formInit();
		this.setFormValue();
	}

	formInit() {
		this.itemForm = new FormGroup({
			name: new FormControl(null, [Validators.required]),
			price: new FormControl(null, [Validators.required]),
		});
	}

	setFormValue() {
		if (this.data) {
			this.itemForm.setValue({
				name: this.data.name,
				price: this.data.price,
			});
		}
	}

	close() {
		this.dialogRef.close();
	}

	onSubmit() {
		this.dialogRef.close(this.itemForm.value);
	}
}
