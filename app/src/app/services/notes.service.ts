import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class NotesService {

	url = environment.url;

  	constructor(private http:HttpClient, private authService: AuthService) { }

	  getStructure(){
		// this.authService.checkToken();
		const userID = this.authService.user['id'];
		// console.log(userID);
     	return new Promise((resolve,reject)=> {
  			this.http.get(`${this.url}/api/getStructure/${userID}`).subscribe(res => {
  				resolve(res);
  			});
  		});
    }

    getNotes() {
      const userID = this.authService.user['id'];
      return new Promise((resolve,reject)=> {
        this.http.get(`${this.url}/api/getMarks/${userID}`).subscribe(res => {
          resolve(res);
        });
      });
    }

    getAllStudentMarksSemesterFiliere() {
      return new Promise((resolve,reject)=> {
        this.http.get(`${this.url}/api/getMarksSemestreFiliere/IDU&Semestre8`).subscribe(res => {
          resolve(res);
        });
      });
    }
  }
