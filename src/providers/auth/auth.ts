import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthProvider {
 
  public token: any;
  public user_number: any;
  public user:any;

  path = {
    login:"http://localhost:4000/api/auth/login",
    register:"http://localhost:4000/api/auth/register",
    protected:"http://localhost:4000/api/auth/protected"
  }  

  // 'https://sltvcustomerserver.herokuapp.com/api/auth/register'
 
  constructor(public http: Http, public storage: Storage) {
 
  }
 
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get(this.path.protected, {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
            });
 
        });        
 
    });
 
  }
 
  createAccount(details){
   // console.log(details)
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.path.register, JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();

            this.token = data.token;
            this.user = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user)
            resolve(data);

            resolve(res.json());
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(this.path.login, JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            console.log(data)
            this.token = data.token;
            this.user = data.user;
            this.storage.set('token', data.token);
            this.storage.set('user', data.user)
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  } 
}


//sltvcustomerserver.herokuapp.com