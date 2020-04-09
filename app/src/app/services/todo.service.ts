import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url = environment.url;
  JsonCredentials = {};

  constructor(private http: HttpClient, private alertController: AlertController, private authService: AuthService) { }

  addTodo(credentials) {
    this.authService.getEmail().subscribe(res => {
      var email = res['msg'];
      var label = credentials['title'];
      var content = credentials['content'];
      var deadline = credentials['deadline'];
      this.JsonCredentials = {email: email, label: label, content: content, deadline:deadline, isDone:false};
    });
    return this.http.post(`${this.url}/api/createTodo`, this.JsonCredentials).pipe(
      catchError(e => {
        console.log("passé dans l'erreur");
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
    
    
  }

  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }
}
