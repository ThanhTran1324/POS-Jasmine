import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';

import { SharedModule } from 'src/app/shared/shared.module';

import { NotePageComponent } from './note-page.component';
import { NoteRoutingModule } from './note-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoteListItemRenderComponent } from './note-list-item-render/note-list-item-render.component';


@NgModule({
  declarations: [
	NotePageComponent,
	NoteListItemRenderComponent,
  ],
  imports: [
    CommonModule,
	NoteRoutingModule,
	FlexLayoutModule,
	AngularMaterialModule,
	FlexLayoutModule,
	ReactiveFormsModule,
	SharedModule,
  ]
})
export class NoteModule { }
