import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 
  credentialsForm: FormGroup;
  filieres: any;
 
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
 
  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      filiere: ['', [Validators.required, Validators.minLength(1)]]
    });
    this.getFiliere();
  }

  getFiliere(){
    this.authService.getFiliere().subscribe(res => {
      this.filieres = res;
    });
  }

  register() {
    this.authService.register(this.credentialsForm.value).subscribe(res => {
      // Call Login to automatically login the new user
      this.authService.login(this.credentialsForm.value).subscribe();
    });
  }
 
}