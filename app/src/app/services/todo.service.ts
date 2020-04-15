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

  constructor(private http: HttpClient, private alertController: AlertController, private authService: AuthService) {
   }

  addTodo(credentials) {
    var Json = {idUser:this.authService.user['id'], label:credentials['title'],content:credentials['content'],deadline:credentials['deadline'],isDone:false};
    return this.http.post(`${this.url}/api/createTodo`,Json).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );    
  }

  getTodos(){
    this.authService.checkToken();
    const userID = this.authService.user['id'];
    return this.http.get(`${this.url}/api/todos/${userID}`).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  logout(){
    this.authService.logout();
  }

  modifiateTodo(id_todo,credentials){
    console.log(credentials);
    var Json = {label:credentials['label'],content:credentials['content'],isDone:credentials['isDone']};
    return this.http.put(`${this.url}/api/todo/${id_todo}`,Json).subscribe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new Error(e);
      })
    );
  }

  deleteTodo(id_todo){
    const userID = this.authService.user['id'];
    var Json={userID: userID, todoID: id_todo};
    console.log(`${this.url}/api/todo/${userID}&${id_todo}`);
    return this.http.delete(`${this.url}/api/todo/${userID}&${id_todo}`).subscribe(
      catchError(e => {
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
