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
import { AdeService } from '../services/ade.service'


registerLocaleData(localeFr);

@Component({
  selector: 'app-time-manager',
  templateUrl: './time-manager.page.html',
  styleUrls: ['./time-manager.page.scss'],
})
export class TimeManagerPage implements OnInit {
	progression: number;
	progressionString: any;
	bars: any;
  	colorArray: any;
	isDesktop: boolean;
	myTodosFinished = [];
	myTodosNotFinished = [];
	courseOverview : any;
	todoForm: FormGroup;
	eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

	calendar = {
    	mode: 'week',
    	currentDate: new Date("April 28, 2020 00:00:00"),
    	locale:"fr-FR"
  	};

  	event = {
    	title: '',
    	desc: '',
	    startTime: '',
	    endTime: '',
	    allDay: false,
	    type:''
  	};

  	adeEventStyle = {
	  "background-color":"#057389" ,
	  "border-radius": "4px",
	  "overflow": "hidden",
	  "color": "white",
	  "height": "100%",
	  "width": "100%",
	  "padding": "2px",
	  "line-height": "15px",
	  "text-align": "initial"
	}

	eadEventStyle = {
	  "background-color":"#f7c73f" ,
	  "border-radius": "2px",
	  "overflow": "hidden",
	  "color": "white",
	  "height": "90%",
	  "width": "100%",
	  "padding": "2px",
	  "line-height": "15px",
	  "text-align": "initial"
	}

	todoEventStyle = {
	  "background-color":"#d29681" ,
	  "border-radius": "2px",
	  "overflow": "hidden",
	  "color": "white",
	  "height": "90%",
	  "width": "100%",
	  "padding": "2px",
	  "line-height": "15px",
	  "text-align": "initial"
	}

  	minDate = this.calendar.currentDate.toISOString();

  	@ViewChild(CalendarComponent,{static: false}) 
  	myCal: CalendarComponent;

  	constructor(private formBuilder: FormBuilder, private todoService: TodoService, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private http : HttpClient, private adeService:AdeService, private screensizeService: ScreensizeService) {
		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
			  // Reload because our routing is out of place
			  window.location.reload();
			}
	   
			this.isDesktop = isDesktop;
		  });
	   }

  	resetEvent() {
	    this.event = {
	     	title: '',
	      	desc: '',
	      	startTime: new Date().toISOString(),
	      	endTime: new Date().toISOString(),
	      	allDay: false,
	      	type:''
    	};
  	}

  	async buildAndPushAllEvents() {
  		this.eventSource=[];

  		let adeEvents = await this.adeService.getAde();
  		let eadEvents = await this.adeService.getEad();
  		let todoEvents = await this.todoService.getTodos();

  		this.buildAndPushAdeEvents(adeEvents);
  		this.buildAndPushEadEvents(eadEvents);
  		this.buildAndPushTodoEvents(todoEvents);
  	}

  	buildAndPushAdeEvents(data) {
        data.events.forEach(element => {
		    let event={
		        title:element.title,
		        startTime:new Date(element.startTime),
		        endTime:new Date(element.endTime),
		        allDay: false,
		        desc:element.description,
		        type:"ADE"
		    }
		    this.eventSource.push(event);
		});
	    this.myCal.loadEvents();
  	}

  	buildAndPushEadEvents(data) {

        data.events.forEach(element => {

        	let startTime = new Date(element.startTime);
        	let endTime = new Date(element.endTime);

		    let event={
		        title:element.title,
		        startTime:startTime,
		        endTime:endTime,
		        allDay: true,
		        desc:element.description,
		        type:"EAD"
		    }

		    this.eventSource.push(event);
		});
	    this.myCal.loadEvents();
  	}

  	buildAndPushTodoEvents(data) {
        data.forEach(element => {

        	let startTime = new Date(element.deadline);
        	startTime.setHours(startTime.getHours()+2);
        	let endTime = startTime;


        	if (element.isDone == false) {
        		let event={
		        title:element.label,
		        startTime:startTime,
		        endTime:endTime,
		        allDay: true,
		        desc:element.content,
		        type:"TODO"
		    }
		    this.eventSource.push(event);
        	}
		});
	    this.myCal.loadEvents();
  	}


  // Create the right event format and reload source
  	/*addEvent() {
    	let eventCopy = {
      		title: this.event.title,
      		startTime:  new Date(this.event.startTime),
      		endTime: new Date(this.event.endTime),
      		allDay: this.event.allDay,
      		desc: this.event.desc,
      		type:"PERSO"
    	}
 
    if (eventCopy.allDay) {
      	let start = eventCopy.startTime;
      	let end = eventCopy.startTime;
 
      	eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
      	eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate())+1);
    }
 
    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  } */

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
	}
 
// Selected date reange and hence title changed
	onViewTitleChanged(title) {
  		this.viewTitle = title;
	}
 
// Calendar event was clicked
	async onEventSelected(event) {
  		
  		let start = formatDate(event.startTime, 'medium',this.locale);
  		let end = formatDate(event.endTime, 'medium', this.locale);
 		let message;
  		if (event.type == "EAD") {
  			message="Deadline aujourd'hui ou demain minuit, regarde ton EAD !"+ '<br><br>'+event.desc;
  		}

  		else if (event.type == "TODO") {
  			let startDate = new Date(event.startTime);
  			startDate.setHours(startDate.getHours()-2);
  			let start = formatDate(startDate,'medium',this.locale);
  			message=start.toString()+'<br><br>'+event.desc;
  		}
  		else {
  			message=event.desc+'<br><br>'+'Début: ' + start + '<br><br>Fin: ' + end;
  		}
  		const alert = await this.alertCtrl.create({
    	header: event.title,
    	message: message,
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

	  async resetTodo() {
		this.todoForm = this.formBuilder.group({
			title: ['', [Validators.required, Validators.minLength(1)]],
			content: ['', [Validators.required, Validators.minLength(1)]],
			categorie: ['', [Validators.required, Validators.minLength(1)]],
			deadline: ['', []],
		  });
		await this.getTodos();
	  }

	  async onSubmitTodo() {
		await this.todoService.addTodo(this.todoForm.value);
		this.resetTodo();
		this.buildAndPushAllEvents();
	  }

	  async getTodos(){
		this.myTodosFinished = [];
		this.myTodosNotFinished = [];
		let res = await this.todoService.getTodos();
		for (var j = 0; j < Object.values(res).length; j++) {
			var currentJson = {id:Object.values(res)[j]["_id"], label:Object.values(res)[j]['label'], content:Object.values(res)[j]["content"], deadline:Object.values(res)[j]["deadline"], categorie:Object.values(res)[j]["categorie"], isDone:Object.values(res)[j]["isDone"]};
			if(Object.values(res)[j]["isDone"] === true){
				this.myTodosFinished.push(currentJson);
			}else{
				this.myTodosNotFinished.push(currentJson);
			}
		}
		this.progression = this.myTodosFinished.length/(this.myTodosFinished.length+this.myTodosNotFinished.length);
		this.progressionString = (this.progression*100).toFixed(2);
		if(this.progressionString === "NaN"){
			this.progressionString = 0;
		}
		this.createBarChart();
	}

	async onTodoSelected(todo) {
		console.log(todo);
		// Use Angular date pipe for conversion
			let start = formatDate(todo.deadline, 'medium', this.locale);
	   
			const alert = await this.alertCtrl.create({
			header: todo.label,
			subHeader: todo.content + ' , ' + todo.categorie,
			message: 'Deadline: ' + start + '\n State: ' + todo.isDone,
			buttons: ['Ok']
				});
			alert.present();
	  }

	  logout(){
		  this.todoService.logout();
	  }

	  async finishTodo(todo){
	  	let finished = false;
		const alert = await this.alertCtrl.create({
			header: "Confirmation to be finish",
			message: "Are you sure you have finished it ?",
			buttons: [{
				text: 'Yes',
				handler: () => {
					finished = true;
				}
			  },
			  {
				text: 'Cancel',
				role: 'cancel',
			  }]
				});
			alert.present();
			await alert.onDidDismiss();
			if (finished) {
				await this.todoService.modifiateTodo(todo.id,{isDone:true});
				this.getTodos();
				this.buildAndPushAllEvents();
			}
	  }

	  async modifiateTodo(todo){
		var modifiate = false;
		let alert = await this.alertCtrl.create({
			header: todo.label,
			message: "Add your modification here",
			inputs:[{
				type:"text",
				name:"label",
				value:todo.label
			},
			{
				type:"textarea",
				name:"content",
				value:todo.content
			}],
			buttons: [{
				text: 'Yes',
				handler: () => {
					modifiate = true;
				}
			  },
			  {
				text: 'Cancel',
				role: 'cancel',
			  }]
				});
			alert.present();
			let result = await alert.onDidDismiss();
			if(modifiate){
				await this.todoService.modifiateTodo(todo.id,result["data"]["values"]);
				this.getTodos();				
				this.buildAndPushAllEvents();
			}
	  }

	  async deleteTodo(todo){
	  	let deleted = false;
		let alert = await this.alertCtrl.create({
			header: "Confirmation to delete",
			message: "Are you sure to delete ?",
			buttons: [{
				text: 'Yes',
				handler: () => {
					deleted = true;
				}
			  },
			  {
				text: 'Cancel',
				role: 'cancel',
			  }]
				});
			alert.present();
		await alert.onDidDismiss();
		if(deleted) {
			console.log(todo.id);
			await this.todoService.deleteTodo(todo.id);
			this.getTodos();
			this.buildAndPushAllEvents();
		}
	  }

	  async getCoursesOverview(){
  		this.adeService.getCoursesOverview(this.desiredTime).then(res => {
			this.courseOverview=res;
			console.log(res);
		});

	  }

	  @ViewChild('barChart',{static: false}) barChart;

	  createBarChart() {
		const allTodos = this.myTodosFinished.concat(this.myTodosNotFinished);
		var allLabels = [];
		var nbData = [];
		for(var i=0;i<allTodos.length;i++){
			if(!allLabels.includes(allTodos[i]["categorie"])){
				allLabels.push(allTodos[i]["categorie"]);
				nbData.push(0);
			}
			var index = allLabels.indexOf(allTodos[i]["categorie"]);
			nbData[index] = nbData[index] + 1;
		}
		this.bars = new Chart(this.barChart.nativeElement, {
		  type: 'bar',
		  data: {
			labels: allLabels,
			datasets: [{
			  label: 'Nb of todos',
			  data: nbData,
			  backgroundColor: ['rgb(38, 194, 129)','rgb(38, 70, 200)','rgb(200, 115, 17)'], // array should have same number of elements as number of dataset
			  borderColor: ['rgb(38, 194, 129)','rgb(38, 70, 200)','rgb(200, 115, 17)'],// array should have same number of elements as number of dataset
			  borderWidth: -10
			}]
		  },
		  options: {
			  legend: {
				  display: false
			  },
			scales: {
			  yAxes: [{
				ticks: {
				  beginAtZero: true
				}
			  }]
			}
		  }
		});
	  }

	@ViewChild('barChartCoursesOverview',{static: false}) barChartCoursesOverview;
	createBarChart1(){
		this.adeService.getCoursesOverview(this.desiredTime).then(res => {
			let courseOver = res["eventsObject"];
			let allLabels = ['CM','TD','TP'];
			let nbData = [0,0,0];
			console.log(res);
			for (var  i=0;i<courseOver.length;i++){
				if (courseOver[i]["_id"]!=="Other"){
					let index = 0;
					switch ((courseOver[i]["_id"])) {
						case "CM":
							nbData[allLabels.indexOf('CM')]= courseOver[i]["count"];
							break;
						case 'TD':
							nbData[allLabels.indexOf('TD')]= courseOver[i]["count"];
							break;
						case 'TP':
							nbData[allLabels.indexOf('TP')]= courseOver[i]["count"];
							break;
						default:
							break;
					}

				}

			}


			this.bars = new Chart(this.barChartCoursesOverview.nativeElement, {
				type: 'bar',
				data: {
					labels: allLabels,
					datasets: [{
						data: nbData,
						backgroundColor: ['rgb(38, 194, 129)','rgb(38, 70, 200)','rgb(200, 115, 17)'], // array should have same number of elements as number of dataset
						borderColor: ['rgb(38, 194, 129)','rgb(38, 70, 200)','rgb(200, 115, 17)'],// array should have same number of elements as number of dataset
						borderWidth: -10
					}]
				},
				options: {
					legend: {
						display: false
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

		});
	}

	desiredTime: any;
	changeTime(){
		this.createBarChart1();
	}
  ngOnInit() {
        this.resetEvent();
        this.resetTodo();
        this.buildAndPushAllEvents();
      this.desiredTime=1;
      this.createBarChart1();
    }
}
