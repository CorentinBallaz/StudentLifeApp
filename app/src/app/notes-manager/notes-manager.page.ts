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
	listUE : Array<any>;
	bars: any;
    colorArray: any;
	constructor(private screensizeService: ScreensizeService, private notesService: NotesService) {
		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
			  // Reload because our routing is out of place
			  window.location.reload();
			}
	   
			this.isDesktop = isDesktop;
		  });
		  	this.listUE=[{name : 'UE1',visible:false},{name : 'UE2',visible:false},{name : 'UE3',visible:false}];
		
	   }
	ionViewDidEnter() {
		this.createBarChart();
	}

	// async getData(){
	// 	this.listUE = [];
	// 	await this.notesService.getNotes().subscribe(res => {
	// 		for (var j = 0; j < Object.values(res).length; j++) {
	// 		}
	// 	});
	// }

	@ViewChild('barChart',{static: false}) barChart;

	createBarChart(){
		this.bars = new Chart(this.barChart.nativeElement, {
			type: 'horizontalBar',
			data: {
				labels: ["AAA"],
				datasets: [{
					label: 'TP',
					data: [20],
					backgroundColor: "rgba(63,103,126,1)",
				}, {
					label: 'TD',
					data: [20],
					backgroundColor: "rgba(163,103,126,1)",
				}, {
					label: 'CM',
					data: [12],
					backgroundColor: "rgba(63,203,226,1)",
				}]
			},

			options: {
				responsive: false,
				legend: {
					position: 'right'
				},
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

  ngOnInit() {
  }
}
