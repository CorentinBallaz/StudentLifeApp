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
	isDesktop: boolean;
	ListeUE : Array<any>;
	bars: any;
	horbar : any;
	colorArray: any;
	mixed:any;
	box:any;
	constructor(private screensizeService: ScreensizeService, private notesService : NotesService) {
		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
			  // Reload because our routing is out of place
			  window.location.reload();
			}
	   
			this.isDesktop = isDesktop;
		  });
		this.ListeUE=[{name : 'UE1',visible: false},{name : 'UE2',visible: false},{name : 'UE3',visible: false},{name : 'UE4',visible: false},{name : 'UE5',visible: false},{name : 'UE6',visible: false}];
	   }
	// ionViewDidEnter() {
	// 	this.createBarChart();
	// 	this.createHorChart();
	// 	this.createboxplot();
	// }
	//@ViewChild('boxPlot',{static: false}) boxPlot;
	clickOn(ue){
		for(var i=0;i<this.ListeUE.length;i++){
			if(ue.name === this.ListeUE[i]["name"]){
				this.ListeUE[i]["visible"] = true;
			}else{
				this.ListeUE[i]["visible"] = false;
			}
		}
	}

	async getStructure(){
		let res = await this.notesService.getStructure();
		console.log(res);
	}


 	// @ViewChild('barChart',{static: false}) barChart;
	// createBarChart() {
	// 	this.bars = new Chart(this.barChart.nativeElement, {
	// 		type: 'horizontalBar',
	// 		data: {
	// 			labels: ["Nombre d'heures"],
	// 			datasets: [{
	// 				label: 'DATA1',
	// 				data: [20],
	// 				backgroundColor: "rgba(63,103,126,1)",
	// 			}, {
	// 				label: 'DATA2',
	// 				data: [20],
	// 				backgroundColor: "rgba(163,103,126,1)",
	// 			}, {
	// 				label: 'DATA3',
	// 				data: [12],
	// 				backgroundColor: "rgba(63,203,226,1)",
	// 			}]
	// 		},

	// 		options: {
	// 			responsive: false,
	// 			legend: {
	// 				position: 'bottom'
	// 			},
	// 			scales: {
	// 				xAxes: [{
	// 					stacked: true
	// 				}],
	// 				yAxes: [{
	// 					stacked: true
	// 				}]
	// 			}
	// 		}
	// 	});
	// } 
	// @ViewChild('horChart',{static: false}) horChart;
	// createHorChart() {
	// 	this.horbar = new Chart(this.horChart.nativeElement, {
	// 	  type: 'bar',
	// 	  data: {
	// 		labels: ['DATA1','DATA2','DATA3'],
	// 		datasets: [{
	// 		  label: 'TP',
	// 		  data: [12, 16, 4],
	// 		  backgroundColor: '#ddee44',
	// 		  borderColor: '#ddee44',
	// 		  borderWidth: 1
	// 		},
	// 		{
	// 		  label: 'TD',
	// 		  data: [3,6,9],
	// 		  backgroundColor: '#dd1144', 
	// 		  borderColor: '#dd1144',
	// 		  borderWidth: 1
	// 		},
	// 		{
	// 			label: 'CM',
	// 			data: [9, 12, 15],
	// 			backgroundColor: "rgba(63,203,226,1)",
	// 			borderWidth: 1
	// 		}]
	// 	  },
	// 	  options: {
	// 		scales: {
	// 			xAxes: [{
	// 				stacked: true
	// 			}],
	// 			yAxes: [{
	// 				stacked: true
	// 			}]
	// 		}
	// 	}
	// 	});
	//   }


  	// //@ViewChild('boxPlot',{static: false}) boxPlot;
	// createboxplot(){
	// 	this.box = new Chart(this.boxPlot.nativeElement, {
	// 		type: "bar",
	// 		data: {
	// 			labels: ['Data1','Data2','Data3'],
	// 			datasets: [
	// 			{
	// 				label: "min",
	// 				backgroundColor: "rgba(240, 140, 121, 0.0)",
	// 				borderColor: "rgba(140, 140, 140, 0.0)",
	// 				borderWidth: 0,
	// 				data: [
	// 				10,
	// 				2,
	// 				5
	// 				],
	// 			},
	// 			{
	// 				label: "avg",
	// 				backgroundColor: "rgba(240, 140, 121, 0.8)",
	// 				borderColor: "rgba(140, 140, 140, 1.0)",
	// 				data: [
	// 				12,
	// 				8,
	// 				10
	// 				],
	// 			},
	// 			{
	// 				label: "max",
	// 				backgroundColor: "rgba(121, 200, 121, 0.8)",
	// 				borderColor: "rgba(140, 140, 140, 0.0)",
	// 				borderWidth: 0,
	// 				data: [
	// 				17,
	// 				15,
	// 				16
	// 				],
	// 			},
	// 			{label: 'Avg Student',
	// 			data: [15.5, 17, 20],
	// 			type: 'line'
	// 			},
	// 			]
	// 		},
	// 		options: {
	// 			tooltips: {
	// 				mode: 'index',
	// 				intersect: false,
	// 				displayColors: false,
	// 			},
	// 			responsive: true,
	// 			scales: {
	// 			xAxes: [
	// 				{
	// 				stacked: true,
	// 				}
	// 			],
	// 			yAxes: [
	// 				{
	// 				stacked: false,
	// 				}
	// 			]
	// 			}
	// 		}
	// 	});
	// }


  ngOnInit() {
	  this.getStructure();
  }
}