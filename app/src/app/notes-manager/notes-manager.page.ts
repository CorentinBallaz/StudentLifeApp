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
	@ViewChild('barChart',{static: false}) barChart;
	isDesktop: boolean;
	ListeUE : Array<any>;
	bars: any;
    colorArray: any;
	constructor(private screensizeService: ScreensizeService) {
		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
			  // Reload because our routing is out of place
			  window.location.reload();
			}
	   
			this.isDesktop = isDesktop;
		  });
		this.ListeUE=[{name : 'UE1'},{name : 'UE2'},{name : 'UE3'},{name : 'UE4'},{name : 'UE5'},{name : 'UE6'}];
	   }
	ionViewDidEnter() {
		this.createBarChart();
	}
	createBarChart() {
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
