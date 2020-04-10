import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { HttpClient } from '@angular/common/http';

import { AdeService } from '../services/ade.service'


registerLocaleData(localeFr);

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.page.html',
  styleUrls: ['./time-manager.page.scss'],
})
export class TimeManagerPage implements OnInit {

	eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

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

  	@ViewChild(CalendarComponent) 
  	myCal: CalendarComponent;

  	constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private http : HttpClient, private service:AdeService) { }

  	resetEvent() {
    this.event = {
     	title: '',
      	desc: '',
      	startTime: new Date().toISOString(),
      	endTime: new Date().toISOString(),
      	allDay: false
    };
  }
 
    buildAndPushEvent(data) {
      data.events.forEach(element => {
        console.log(element);

        let event={
          title:element.title,
          startTime:new Date(element.startTime),
          endTime:new Date(element.endTime),
          allDay:false,
          desc:element.description
        }
        this.eventSource.push(event);
        this.resetEvent();
        })
      this.myCal.loadEvents();
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
  		this.resetEvent();
      this.service.getAde().then(res => { 
        this.buildAndPushEvent(res);
  	})
    }

}
