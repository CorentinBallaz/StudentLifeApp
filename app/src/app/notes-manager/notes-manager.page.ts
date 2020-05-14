import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { NavController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
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
	@ViewChild('barPlot',{static: false}) barPlot;
	isDesktop: boolean;
	ListeUE : Array<any>;
	bars: any;
	horbar : any;
	colorArray: any;
	mixed:any;
	box:any;
	boxPlotMarksList : Array<any>;
	constructor(private screensizeService: ScreensizeService, private notesService : NotesService) {
		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
			  // Reload because our routing is out of place
			  window.location.reload();
			}
	   
			this.isDesktop = isDesktop;
		  });
	   }


	// ionViewDidEnter() {
	// 	this.createBarChart();
	// 	this.createHorChart();
	// 	this.createboxplot();
	// }
	//@ViewChild('boxPlot',{static: false}) boxPlot;

	clickOn(ue){
		// this.createboxplot();
		for(var i=0;i<this.ListeUE.length;i++){
			if(ue.name === this.ListeUE[i]["name"]){
				this.ListeUE[i]["visible"] = true;
			}else{
				this.ListeUE[i]["visible"] = false;
			}
		}
		this.createboxplot(ue.name);
		



	}

 	

	@ViewChild('horPlot',{static: false}) horPlot;
	createHorChart(ue, semestreContent) {
		var coursesNames = [];
		var coursesDetails = [{
			  label: 'TP',
			  data: [],
			  backgroundColor: '#FF1C14',
			  borderColor: '#FF1C14',
			  borderWidth: 1
			},
			{
			  label: 'TD',
			  data: [],
			  backgroundColor: '#3036FF', 
			  borderColor: '#3036FF',
			  borderWidth: 1
			},
			{
				label: 'CM',
				data: [],
				backgroundColor: "#FFDC4A",
				borderColor:"#FFDC4A",
				borderWidth: 1
			},
			{
				label:'Autre',
				data:[],
				backgroundColor:"#2BFF76",
				borderColor:"#2BFF76",
				borderWidth:1
			}];

		for (var element in semestreContent) {
			var ueContent = semestreContent[element];
			coursesNames.push(ueContent["cours"]);
			coursesDetails[0]["data"].push(ueContent["TP"]);
			coursesDetails[1]["data"].push(ueContent["TD"]);
			coursesDetails[2]["data"].push(ueContent["CM"]);
			coursesDetails[3]["data"].push(ueContent["Autre"]);
		}

		var ctx = document.getElementsByClassName("horChart"+ue)[0] as HTMLCanvasElement;
		new Chart(ctx, {
		  type: 'bar',
		  data: {
			labels: coursesNames,
			datasets: coursesDetails
		  },
		  options: {
			scales: {
				xAxes: [{
					stacked: true
				}],
				yAxes: [{
					stacked: true
				}]
			}
		}
		});
	  }

	createboxplot(ue){
		var ctx = document.getElementsByClassName("barChart"+ue)[0] as HTMLCanvasElement;
		new Chart(ctx, {
			type: "bar",
			data: {
				labels: ['Data1','Data2','Data3'],
				datasets: [
				{
					label: "min",
					backgroundColor: "rgba(240, 140, 121, 0.0)",
					borderColor: "rgba(140, 140, 140, 0.0)",
					borderWidth: 0,
					data: [
					10,
					2,
					5
					],
				},
				{
					label: "avg",
					backgroundColor: "rgba(240, 140, 121, 0.8)",
					borderColor: "rgba(140, 140, 140, 1.0)",
					data: [
					12,
					8,
					10
					],
				},
				{
					label: "max",
					backgroundColor: "rgba(121, 200, 121, 0.8)",
					borderColor: "rgba(140, 140, 140, 0.0)",
					borderWidth: 0,
					data: [
					17,
					15,
					16
					],
				},
				{label: 'Avg Student',
				data: [15.5, 17, 20],
				type: 'line'
				},
				]
			},
			options: {
				tooltips: {
					mode: 'index',
					intersect: false,
					displayColors: false,
				},
				responsive: true,
				scales: {
				xAxes: [
					{
					stacked: true,
					}
				],
				yAxes: [
					{
					stacked: false,
					}
				]
				}
			}
		})

	}
	
	getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
                }


	@ViewChild('barChart',{static: false}) barChart;
	createBarChart(ue,semestreContent) {
		var allCourses = [];
		console.log(semestreContent);

		for (var element in semestreContent) {
			var ueContent = semestreContent[element];

			var oneCours = {};
			oneCours["label"]=ueContent["cours"];
			let tpNumber=0;
			let other=0;
			let tdNumber=0;
			let cmNumber=0;
			if (ueContent["TP"]) {
				tpNumber = ueContent["TP"];
			}
			if (ueContent["Autre"]) {
				other = ueContent["Autre"];
			}
			if (ueContent["TD"]) {
				tdNumber = ueContent["TD"];
			}
			if (ueContent["CM"]) {
				cmNumber = ueContent["CM"];
			}
			
			let sum = tpNumber+other+tdNumber+cmNumber;

			oneCours["data"]=[sum];
			oneCours["backgroundColor"]=this.getRandomColor();
			console.log(oneCours);
			allCourses.push(oneCours);
			

		}

		var ctx = document.getElementsByClassName("barChartHeader"+ue)[0] as HTMLCanvasElement;
		new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels: ["Nombre d'heures"],
				datasets: allCourses
			},

			options: {
				responsive: true,
				legend: {
					position: 'bottom'
				},
				scales: {
              yAxes: [{
              	  stacked:true,
                  gridLines: {
                      display:false
                  },
                ticks: {
                  beginAtZero: true
                }
              }],
              xAxes:[{stacked:true,gridLines: {
                      display:false
                  }}]
            }
			}
		});
	} 

  	ngOnInit() {
  	
		this.notesService.getStructure().then(res=> {
		  	let ueSemestre = res[0]["Semestre8"];
		  	var test = [];
		  	for(var propertyName in ueSemestre) {
		  		let temp = {};
		  		temp["name"]=propertyName;
		  		temp["visible"]=false;
		  		test.push(temp);
			}
			this.ListeUE = test;

		});
	}


	ngAfterViewInit() {
		this.notesService.getStructure().then(res=> {
		  	let ueSemestre = res[0]["Semestre8"];
		  	var test = [];
		  	for(var propertyName in ueSemestre) {
		  		this.createBarChart(propertyName,ueSemestre[propertyName]);
		  		this.createHorChart(propertyName,ueSemestre[propertyName]);
			}

		});
	}
}
