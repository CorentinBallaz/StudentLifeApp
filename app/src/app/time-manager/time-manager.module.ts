import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { TimeManagerPageRoutingModule } from './time-manager-routing.module';

import { TimeManagerPage } from './time-manager.page';

import { NgCalendarModule  } from 'ionic2-calendar';

const routes: Routes = [
  {
    path: '',
    component: TimeManagerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeManagerPageRoutingModule,
    NgCalendarModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TimeManagerPage]
})
export class TimeManagerPageModule {}
