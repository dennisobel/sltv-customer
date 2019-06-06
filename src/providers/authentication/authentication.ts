import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { resolve } from 'dns'; 

@Injectable()
export class AuthenticationProvider {

  private offline = {
    SignupURL: "http://localhost:4000/signup",
    LoginURL: "http://localhost:4000/login",
    OTPURL: "http://localhost:4000/otp",
    SingleUserURL: "http://localhost:4000/getuser/",
    AllUsersURL: "http://localhost:4000/r_getusers"
  }

  constructor(public http: Http) {}

  Signup(data){
    console.log("INCOMING SIGNUP DATA:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");   
      
      this.http.post(this.offline.SignupURL,data,{headers})
        .subscribe(res => {  
          resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

  Login(data){
    console.log("LOGIN DATA TO POST:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");   

      this.http.post(this.offline.LoginURL,data,{headers})
        .subscribe(res => {  
          resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }

  SingleUser(userName){
    console.log("SINGLE USER NAME:",userName)
    return new Promise((resolve,reject) => {
      this.http.get(this.offline.SingleUserURL+userName)
      .subscribe(res => {
        resolve(res.json());
      },(err)=>{
          reject(err);
      });     
    })
  }

  AllUsers(){
    return new Promise((resolve,reject) => {
      this.http.get(this.offline.AllUsersURL)
      .subscribe(res => {
        resolve(res.json());
      },(err)=>{
          reject(err);
      });     
    })
  }

  OTP(data){
    console.log("OUTGOING OTP DATA:",data)
    return new Promise((resolve,reject) => {
      let headers = new Headers(); 
      headers.append("Accept","application/json"); 
      headers.append("Content-Type","application/json");  

      this.http.post(this.offline.OTPURL,data,{headers})
      .subscribe(res => {
        resolve(res.json());
      },(err)=>{
          reject(err);
      });
    })
  }


}
