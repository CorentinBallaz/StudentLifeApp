import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeManagerPageRoutingModule } from './time-manager-routing.module';

import { TimeManagerPage } from './time-manager.page';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeManagerPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [TimeManagerPage]
})
export class TimeManagerPageModule {}
