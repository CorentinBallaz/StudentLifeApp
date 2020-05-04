import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { NavController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ScreensizeService } from '../services/screensize.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.page.html',
  styleUrls: ['./notes-manager.page.scss'],
})
export class NotesManagerPage implements OnInit {

  isDesktop: boolean;
  
  constructor(private screensizeService: ScreensizeService,private todoService: TodoService) {
		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
			  // Reload because our routing is out of place
			  window.location.reload();
			}
	   
			this.isDesktop = isDesktop;
		  });
	   }

  ngOnInit() {
  }

  logout() {
    this.todoService.logout();
  }

}
