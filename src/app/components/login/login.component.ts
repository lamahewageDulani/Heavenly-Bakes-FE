import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private integrationService: IntegrationService,
    private router: Router
  ) { }

  userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  request: LoginRequest = new LoginRequest();

  doLogin() {
    const formValue = this.userForm.value;

    if(formValue.username == "" || formValue.password == "") {
      alert("Username and Password are required");
      return;
    }

    this.request.username = formValue.username;
    this.request.password = formValue.password;

    this.integrationService.doLogin(this.request).subscribe({
      next: (response) => {
        console.log("Recieved Response: " + response.token);
        alert("Login Successful");
        this.router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.error("Error Recieved Response: " + error);
        alert("Login Failed");
      }
    });
  }
}
