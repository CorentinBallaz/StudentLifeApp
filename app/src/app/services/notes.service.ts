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

    getNotes(){
      return new Promise((resolve,reject)=> {
  			this.http.get(`${this.url}/api/getEad`).subscribe(res => {
  				resolve(res);
  			})
  		})
    }
  }