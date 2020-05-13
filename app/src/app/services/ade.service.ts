import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AdeService {

	url = environment.url;

  	constructor(private http:HttpClient, private authService: AuthService) { }

  	getAde() {
  		return new Promise((resolve,reject)=> {
  			this.http.get(`${this.url}/api/getAde`).subscribe(res => {
  				resolve(res);
  			})
  		})
  	}

  	getEad() {
  		return new Promise((resolve,reject)=> {
  			this.http.get(`${this.url}/api/getEad`).subscribe(res => {
  				resolve(res);
  			})
  		})
  	}

  	getCoursesOverview(nbWeek){
		this.authService.checkToken();
		const userID = this.authService.user['id'];
		return new Promise((resolve,reject)=> {
			this.http.get(`${this.url}/api/getAde/coursesNumber/${userID}&${nbWeek}`).subscribe(res => {
				resolve(res);
			})
		})

	}

	getHomerWork(nbWeek){
		this.authService.checkToken();
		const userID = this.authService.user['id'];
		return new Promise((resolve,reject)=> {
			this.http.get(`${this.url}/api/getEad/${userID}&${nbWeek}`).subscribe(res => {
				resolve(res);
			})
		})
	}
}

