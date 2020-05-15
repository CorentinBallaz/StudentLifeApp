import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { NavController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

import {AuthService} from "../services/auth.service";
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
	// desiredTime: any;
	progression: number;
	progressionString: any;
	bars: any;
	bar1:any;
  	colorArray: any;
	isDesktop: boolean;
	myTodosFinished = [];
	myTodosNotFinished = [];
	courseOverview : any;
	todoForm: FormGroup;
	eventSource = [];
  viewTitle: string;
	daughnutChart:any;
	listHomework:any;
  selectedDay = new Date();

	gaugeType:any;
	gaugeValue:any;
	gaugeLabel : any;
	gaugeForm : any;
	gaugeThick:any;


	allLabels:any;
	nbCourse:any;
	nbHomeworks:any;


	calendar = {
    	mode: 'week',
    	currentDate: new Date(2020,3,1),
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
	private thresholdConfig: { "0": { color: string }; "33": { color: string }; "66": { color: string } };
	private desiredTime =1;
  	constructor(private formBuilder: FormBuilder,private authService : AuthService,private todoService: TodoService, private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private http : HttpClient, private adeService:AdeService, private screensizeService: ScreensizeService) {
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
        	let description;
        	if(element.description != "") {
        		description = element.title +'<br><br>'+element.description
        	}
        	else {
        		description=element.title;
        	}

		    let event={
		        title:element.categorie,
		        startTime:startTime,
		        endTime:endTime,
		        allDay: true,
		        desc:description,
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
		try{
			this.bars.destroy();
		}catch (e) {

		}
		this.createBarChart();
	}

	async onTodoSelected(todo) {
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
		  this.authService.logout();
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
			message: "Faites vos modifications",
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
				text: 'Valider',
				handler: () => {
					modifiate = true;
				}
			  },
			  {
				text: 'Annuler',
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
			header: "Attention",
			message: "Etes vous sûr de vouloir supprimer ce TODO ?",
			buttons: [{
				text: 'Oui',
				handler: () => {
					deleted = true;
				}
			  },
			  {
				text: 'Annuler',
				role: 'cancel',
			  }]
				});
			alert.present();
		await alert.onDidDismiss();
		if(deleted) {
			await this.todoService.deleteTodo(todo.id);
			this.getTodos();
			this.buildAndPushAllEvents();
		}
	  }

	  async getCoursesOverview(){
  		this.adeService.getCoursesOverview(this.desiredTime).then(res => {
			this.courseOverview=res;
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
			  backgroundColor: ['#9261FF','#47FF60','#FF982E'], // array should have same number of elements as number of dataset
			  // borderColor: ['rgb(38, 194, 129)','rgb(38, 70, 200)','rgb(200, 115, 17)'],// array should have same number of elements as number of dataset
			  borderWidth: -10
			}]
		  },
		  options: {
			  legend: {
				  display: false
			  },
			scales: {
			  yAxes: [{
				  gridLines: {
					  display:false
				  },
				ticks: {
				  beginAtZero: true
				}
			  }],
			  xAxes:[{gridLines: {
					  display:false
				  }}]
			}
		  }
		});
	  }

	@ViewChild('barChartCoursesOverview',{static: false}) barChartCoursesOverview;
	createBarChart1(){
		this.adeService.getCoursesOverview(this.desiredTime).then(res => {
			let courseOver = res["eventsObject"];
			this.nbHomeworks=courseOver.length;
			this.allLabels = ['CM','TD','TP'];
			this.nbCourse = [0,0,0];
			for (var  i=0;i<courseOver.length;i++){
				if (courseOver[i]["_id"]!=="Other"){
					let index = 0;
					switch ((courseOver[i]["_id"])) {
						case "CM":
							this.nbCourse[this.allLabels.indexOf('CM')]= courseOver[i]["count"];
							break;
						case 'TD':
							this.nbCourse[this.allLabels.indexOf('TD')]= courseOver[i]["count"];
							break;
						case 'TP':
							this.nbCourse[this.allLabels.indexOf('TP')]= courseOver[i]["count"];
							break;
						default:
							break;
					}

				}

			}




			this.bar1 = new Chart(this.barChartCoursesOverview.nativeElement, {
				type: 'bar',
				data: {
					labels: this.allLabels,
					datasets: [{
						data: this.nbCourse,
						backgroundColor: ['#7B88FB', '#2535C7' , '#17217A' ], // array should have same number of elements as number of dataset
						// borderColor: ['rgb(38, 194, 129)','rgb(38, 70, 200)','rgb(200, 115, 17)'],// array should have same number of elements as number of dataset
						borderWidth: -10
					}]
				},
				options: {
				    tooltips: {
                    	enabled: false
                    },

					legend: {
						display: false
					},
					scales: {
						yAxes: [{
							gridLines: {
								display:false
							},
							ticks: {
								beginAtZero: true
							}
						}],
						xAxes:[{gridLines: {
								display:false
							}}]
					}
				}
			});

		});
	}
	removeBar1(){
        // this.bar1.data.labels.pop();
        // this.bar1.data.datasets.forEach((dataset) => {
        //     dataset.data.pop();
        // });
	    // ;
        this.bar1.destroy();
        this.createBarChart1();
    }
	@ViewChild('daughnutHomework',{static: true}) daughnutHomework;
	 async createDaughnut(){

		let res =  await this.adeService.getHomerWork(this.desiredTime);
		let resa = res["eventsObject"];


		this.listHomework=resa;
		let countToDaugnhut = [];
		let labelToDaugnhut=[];
		for (var  i=0;i<resa.length;i++){
			if (labelToDaugnhut.includes(resa[i]["categorie"])){
				countToDaugnhut[labelToDaugnhut.indexOf(resa[i]["categorie"])]+=1;
			}else{
				labelToDaugnhut.push(resa[i]["categorie"]);
				countToDaugnhut.push(1);
			}
		}
		this.daughnutChart = new Chart(this.daughnutHomework.nativeElement, {
			type: 'doughnut',
			data: {
				labels: labelToDaugnhut,
				datasets: [{
					data: countToDaugnhut,
					backgroundColor: [
						'#94D4FF',
						'#FFA2A1',
						'#86FFEF',
						'#FFC36E',
						'#7AFFA2'
					]
				}]
			},
			options: {
				legend: {
					display: false
				},
				// tooltips: {
				// 	enabled: false
				// },
				title: {
					display: false,
					fontStyle: 'bold',
					fontSize: 18
				}
			},

		});
	}
	async changeWorkloadValue(){
		let numberHours=0;
		let nbSemaine = 1;
		let res =  await this.adeService.getHomerWork(this.desiredTime);
		let nbHomeworks=res["eventsObject"].length;
		let nbCourseFromPromise = await this.adeService.getCoursesOverview(this.desiredTime);
		let nbCourse=nbCourseFromPromise["eventsObject"]
		for (var  i=0;i<nbCourse.length;i++){

			switch (nbCourse[i]["_id"]) {
				case "CM":
					numberHours+= nbCourse[i]["count"]*1.5;
					break;
				case "TD":
					numberHours+= nbCourse[i]["count"]*1.5;
					break;
				case "TP":
					numberHours+= nbCourse[i]["count"]*4;
					break;
			}


		}
		if (this.desiredTime == 1){
			nbSemaine=1;
		}else if (this.desiredTime == 2){
			nbSemaine=2;
		}else if (this.desiredTime == 3){
			nbSemaine=4;
		}

		this.gaugeValue = (numberHours+nbHomeworks)/(40 * nbSemaine 	) *100;

		if (this.gaugeValue<33){
			this.gaugeLabel="QUIET"
		}else if (this.gaugeValue>33 &&this.gaugeValue <66){
			this.gaugeLabel="MIDLY BUSY"
		}else {
			this.gaugeLabel="BUSY"
		}




	}
	changeTime(){
	     this.removeBar1();
		// this.createBarChart1();
		this.createDaughnut();
		this.changeWorkloadValue()

	}
  ngOnInit() {



	  this.resetEvent();
        this.resetTodo();
        this.buildAndPushAllEvents();
      this.desiredTime=1;
      this.createBarChart1();
      this.createDaughnut();
	  this.changeWorkloadValue()
	  this.gaugeType="arch";

	  // this.gaugeLabel = "Workload";
	  this.gaugeForm="round"
	  this.gaugeThick=15;
	  this.thresholdConfig = {
		  '0': {color: 'green'},
		  '33': {color: 'orange'},
		  '66': {color: 'red'}
	  };


  }
}
