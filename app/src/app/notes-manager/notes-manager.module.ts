import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesManagerPageRoutingModule } from './notes-manager-routing.module';

import { NotesManagerPage } from './notes-manager.page';
var UEListe = [{name : 'UE1'},{name : 'UE2'},{name : 'UE3'},{name : 'UE4'},{name : 'UE5'},{name : 'UE6'}];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotesManagerPageRoutingModule
  ],
  declarations: [NotesManagerPage]
})
export class NotesManagerPageModule {}
