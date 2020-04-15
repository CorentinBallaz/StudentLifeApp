import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdeService {

	url = environment.url;

  	constructor(private http:HttpClient) { }

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
}

