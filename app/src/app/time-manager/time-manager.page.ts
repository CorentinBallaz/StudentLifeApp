import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { HttpClient } from '@angular/common/http';


registerLocaleData(localeFr);

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.page.html',
  styleUrls: ['./time-manager.page.scss'],
})
export class TimeManagerPage implements OnInit {
	todoForm: FormGroup;
	eventSource = [];
  	viewTitle: string;
  	selectedDay = new Date();
  	url = 'http://ade6-usmb-ro.grenet.fr/jsp/custom/modules/plannings/direct_cal.jsp?resources=2393&projectId=1&calType=ical&login=iCalExport&password=73rosav&lastDate=2030-08-14';
  	edt;
	calendar = {
    	mode: 'week',
    	currentDate: new Date(),
    	locale:"fr-FR"
  	};

  	event = {
    	title: '',
    	desc: '',
	    startTime: '',
	    endTime: '',
	    allDay: false
  	};

  	minDate = new Date().toISOString();

  	//@ViewChild(CalendarComponent) 
  	myCal: CalendarComponent;

  	constructor(private formBuilder: FormBuilder, private todoService: TodoService, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private http : HttpClient) { }

  	resetEvent() {
    this.event = {
     	title: '',
      	desc: '',
      	startTime: new Date().toISOString(),
      	endTime: new Date().toISOString(),
      	allDay: false
    };
  }
 
  // Create the right event format and reload source
  	addEvent() {
    	let eventCopy = {
      		title: this.event.title,
      		startTime:  new Date(this.event.startTime),
      		endTime: new Date(this.event.endTime),
      		allDay: this.event.allDay,
      		desc: this.event.desc
    	}
 
    if (eventCopy.allDay) {
      	let start = eventCopy.startTime;
      	let end = eventCopy.endTime;
 
      	eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      	eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  }

 // Change current month/week/day
 	next() {
  		var swiper = document.querySelector('.swiper-container')['swiper'];
  		swiper.slideNext();
	}
 
	back() {
  		var swiper = document.querySelector('.swiper-container')['swiper'];
  		swiper.slidePrev();
	}
 
// Change between month/week/day
	changeMode(mode) {
  		this.calendar.mode = mode;
	}
 
// Focus today
	today() {
  		this.calendar.currentDate = new Date();
  		console.log(this.edt);
	}
 
// Selected date reange and hence title changed
	onViewTitleChanged(title) {
  		this.viewTitle = title;
	}
 
// Calendar event was clicked
	async onEventSelected(event) {
  // Use Angular date pipe for conversion
  		let start = formatDate(event.startTime, 'medium', this.locale);
  		let end = formatDate(event.endTime, 'medium', this.locale);
 
  		const alert = await this.alertCtrl.create({
    	header: event.title,
    	subHeader: event.desc,
    	message: 'From: ' + start + '<br><br>To: ' + end,
    	buttons: ['OK']
  		});
  	alert.present();
}
 
// Time slot was clicked
	onTimeSelected(ev) {
  		let selected = new Date(ev.selectedTime);
  		this.event.startTime = selected.toISOString();
  		selected.setHours(selected.getHours() + 1);
  		this.event.endTime = (selected.toISOString());
	}


  	ngOnInit() {
		this.todoForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.minLength(1)]],
			content: ['', [Validators.required, Validators.minLength(1)]],
			deadline: ['', [Validators.required, Validators.minLength(1)]]
		  });
  		this.http.get(this.url,{responseType: 'text'}).subscribe(data => this.edt=data);
		this.resetEvent();
	  }
	  
	  onSubmitTodo() {
		this.todoService.addTodo(this.todoForm.value).subscribe();
	  }

}
