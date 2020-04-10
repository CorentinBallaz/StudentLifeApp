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

  constructor(private http: HttpClient, private alertController: AlertController, private authService: AuthService) { }

  addTodo(credentials) {
    var Json = {idUser:this.authService.user['id'], label:credentials['title'],content:credentials['content'],deadline:credentials['deadline']};
    return this.http.post(`${this.url}/api/createTodo`,Json).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );    
  }

  getTodos(){
    const email = this.authService.user['email'];
    return this.http.get(`${this.url}/api/todos/${email}`).pipe(
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
