import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }

  userId :any;
  password :any;
  defaultUserID : string = "Admin";
  defaultPassword : string = "0000";
  
  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.password = localStorage.getItem("password");
  }

  validate(){
    const uOk: boolean = (this.userId !== undefined && this.userId !== '');
    const pOk: boolean = (this.password !== undefined && this.password !== '');
    console.log("uOk", uOk);
    console.log("pOk", pOk);
    if (!uOk && !pOk) {
      setTimeout(() => {
        alert('Please put valid Input required');
      }, 10);
    }
    else if (uOk && !pOk) {
      setTimeout(() => {
        alert('Please put valid Input required');
      }, 10);
    }
    else if (!uOk && pOk) {
      setTimeout(() => {
        alert('Please put valid Input required');
      }, 10);
    }
    else {
      this.login();
    }
  }

  remember(){
    const uOk: boolean = (this.userId !== undefined && this.userId !== '');
    const pOk: boolean = (this.password !== undefined && this.password !== '');
    console.log("uOk", uOk);
    console.log("pOk", pOk);
    if (!uOk && !pOk) {
      setTimeout(() => {
        alert('Please put valid input,Input required');
      }, 10);
    }
    else if (uOk && !pOk) {
      setTimeout(() => {
        alert('Please put valid input,Input required');
      }, 10);
    }
    else if (!uOk && pOk) {
      setTimeout(() => {
        alert('Please put valid input,Input required');
      }, 10);
    }
    else {
      this.rememberMe();
    }
  }

  rememberMe(){
    localStorage.setItem("userId",this.userId);
    localStorage.setItem("password",this.password);
  }

  login(){
    if( this.defaultUserID == this.userId && this.defaultPassword == this.password ){
    this.router.navigate(['/order'])
  }

  else{
    alert('Incorrect Credentials')
  }
 }
}
