import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotePageComponent } from './note-page.component';
import { NoteRoutingModule } from './note-routing.module';


@NgModule({
  declarations: [
	NotePageComponent,
  ],
  imports: [
    CommonModule,
	NoteRoutingModule
  ]
})
export class NoteModule { }
