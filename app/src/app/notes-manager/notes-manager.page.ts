import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { NavController, AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import {AuthService} from "../services/auth.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ScreensizeService } from '../services/screensize.service';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';
import * as d3 from "d3";

@Component({
  selector: 'app-notes-manager',
  templateUrl: './notes-manager.page.html',
  styleUrls: ['./notes-manager.page.scss'],
})

export class NotesManagerPage implements OnInit {
	@ViewChild('linePlot',{static: false}) linePlot;
	isDesktop: boolean;
	ListeUE : Array<any>;
	bars: any;
	horbar : any;
	colorArray: any;
	mixed:any;
	box:any;
	boxPlotMarksList : Array<any>;
	constructor(private screensizeService: ScreensizeService, private notesService : NotesService,private authService : AuthService) {
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
	}

 	
	logout(){
		this.authService.logout();
	}
	@ViewChild('horPlot',{static: false}) horPlot;
	createHorChart(ue, semestreContent) {
		var coursesNames = [];
		var coursesDetails = [{
			  label: 'TP',
			  data: [],
			  backgroundColor: this.getColor(0),
			  borderColor: this.getColor(0),
			  borderWidth: 1
			},
			{
			  label: 'TD',
			  data: [],
			  backgroundColor: this.getColor(0.33), 
			  borderColor: this.getColor(0.33),
			  borderWidth: 1
			},
			{
				label: 'CM',
				data: [],
				backgroundColor: this.getColor(0.66),
				borderColor:this.getColor(0.66),
				borderWidth: 1
			},
			{
				label:'Autre',
				data:[],
				backgroundColor:this.getColor(0.99),
				borderColor:this.getColor(0.99),
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

		let ctx = document.getElementsByClassName("horChart"+ue)[0] as HTMLCanvasElement;
		new Chart(ctx, {
		  type: 'bar',
		  data: {
			labels: coursesNames,
			datasets: coursesDetails
		  },
		  options: {
		  	responsive:true,
		  	title: {
			      display: true,
			      position: "top",
			      text: "Répartition des cours par matière",
			      fontSize: 18,
			      fontColor: "#111"
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

	createboxplot(structure,courseMean,noteRes){

		for (var ueValue in structure) {
			let ueCourses = [];
			for (let matiere in structure[ueValue]) {
				ueCourses.push(structure[ueValue][matiere]);
			}
			let minNotes = [];
			let maxNotes = [];
			let noteMoyenne = [];
			let studentNotes = [];
			for (let matiere in ueCourses) {
				minNotes.push(courseMean[ueCourses[matiere]]["noteMin"]);
				maxNotes.push(courseMean[ueCourses[matiere]]["noteMax"]);
				noteMoyenne.push(courseMean[ueCourses[matiere]]["moyenne"]);
				console.log(noteRes);
				for (let parcours in noteRes) {
					if ("Semestre8" in noteRes[parcours]) {
						let studentCourseNotes = noteRes[parcours]["Semestre8"][ueCourses[matiere]];
						let studentMeanNote = 0;
						for (let note in studentCourseNotes) {
							studentMeanNote += studentCourseNotes[note];
						}
						studentMeanNote = studentMeanNote / 4;
						studentNotes.push(studentMeanNote);
						break;
					}
				}
				
				

			}
			var data = {
			    labels: ueCourses,
			    datasets: [
			    {
			        label: "Vos notes",
			        data: studentNotes,
			        backgroundColor: "blue",
			        borderColor: "blue",
			        fill: false,
			        lineTension: 0,
			        radius: 5
			      },
			      {
			        label: "Note la plus basse",
			        data: minNotes,
			        backgroundColor: "red",
			        borderColor: "#FF8C89",
			        fill: false,
			        lineTension: 0,
			        radius: 5
			      },
			      {
			        label: "Moyenne de la classe",
			        data: noteMoyenne,
			        backgroundColor: "orange",
			        borderColor: "#ffb38a",
			        fill: false,
			        lineTension: 0,
			        radius: 5
			      },
			      {
			        label: "Note la plus haute",
			        data: maxNotes,
			        backgroundColor: "green",
			        borderColor: "lightgreen",
			        fill: false,
			        lineTension: 0,
			        radius: 5
			      }
			      
			    ]
			  };

			  let ctx = document.getElementsByClassName("barChart"+ueValue)[0] as HTMLCanvasElement;
				new Chart(ctx, {
					type:"line",
					data:data,
					options:{
			    responsive: true,
			    title: {
			      display: true,
			      position: "top",
			      text: "Votre position par rapport à votre promotion",
			      fontSize: 18,
			      fontColor: "#111"
			    },
			    legend: {
			      display: true,
			      position: "bottom",
			      labels: {
			        fontColor: "#333",
			        fontSize: 16
			      }
			    },
			    scales: {
				    yAxes: [{
				      ticks: {
				        max: 20,
				        min: 0
				      }
				    }]
				  }
			  }

			})
		}

		
		

	}
	
	getColor(t) {
		let color = d3.interpolatePlasma(t);
        return color;
    }

	@ViewChild('barChart',{static: false}) barChart;
	createBarChart(ue,semestreContent, largerUe) {
		var allCourses = [];
		let semestreSize = largerUe;
		let cpt = 0;
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
			let t = cpt / semestreSize;
			oneCours["backgroundColor"]=this.getColor(t);
			cpt += 1;
			allCourses.push(oneCours);
			

		}

		let ctx = document.getElementsByClassName("barChartHeader"+ue)[0] as HTMLCanvasElement;
		new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels: ["Nombre de cours"],
				datasets: allCourses
			},

			options: {
				responsive: true,
				title: {
			      display: true,
			      position: "top",
			      text: "Nombre de cours par matière",
			      fontSize: 18,
			      fontColor: "#111"
			    },
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
		
		this.notesService.getStructure().then(structureRes=> {
		  	let ueSemestre = structureRes[0]["Semestre8"];
		  	var test = [];
		  	let largerUe = 0 ;
		  	var structure = {};
		  	for (var ue in ueSemestre) {
		  		if (ueSemestre[ue].length > largerUe) {
		  			largerUe = ueSemestre[ue].length;
		  		}
		  	}

		  	for(var propertyName in ueSemestre) {
		  		this.createBarChart(propertyName,ueSemestre[propertyName], largerUe);
		  		this.createHorChart(propertyName,ueSemestre[propertyName]);
			}

			for (var ue in ueSemestre) {
				structure[ue] = [];
				for (var temp in ueSemestre[ue]) {
					structure[ue].push(ueSemestre[ue][temp]["cours"]);
				}
				
			}

			this.notesService.getNotes().then(notesRes=>
			{
				console.log(notesRes);
				this.notesService.getAllStudentMarksSemesterFiliere().then(classRes=>{
				let studentNumber = classRes["length"];
				let courseMean = {};
				
				for (var json in classRes) {
					var studentNotes = classRes[json]["Semestre8"];
					for (var course in studentNotes) {
						let meanCtTpTdCc = 0;
						for (var type in studentNotes[course]) {
							meanCtTpTdCc+=studentNotes[course][type];
						}
						meanCtTpTdCc = meanCtTpTdCc / 4;

						if(!courseMean[course]) {
							courseMean[course]={};
						}

						if (courseMean[course]["moyenne"]) {
							courseMean[course]["moyenne"] += (meanCtTpTdCc / studentNumber);
						}
						else {
							courseMean[course]["moyenne"] = (meanCtTpTdCc / studentNumber);
						}

						if (!courseMean[course]["noteMax"]) {
							courseMean[course]["noteMax"] = meanCtTpTdCc;
						}
						else {
							if (meanCtTpTdCc > courseMean[course]["noteMax"]) {
								courseMean[course]["noteMax"] = meanCtTpTdCc;
							}
						}

						if (!courseMean[course]["noteMin"]) {
							courseMean[course]["noteMin"] = meanCtTpTdCc;
						}
						else {
							if (meanCtTpTdCc < courseMean[course]["noteMin"]) {
								courseMean[course]["noteMin"] = meanCtTpTdCc;
							}
						}

					}
				}
				this.createboxplot(structure,courseMean,notesRes);

			})
			})
			

			});

		
	}
}
