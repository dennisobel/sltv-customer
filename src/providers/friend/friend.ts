import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class FriendProvider {
	private path = {
		getfriend:"http://localhost:4000/api/auth/getfriend/",
		getfriends:"http://localhost:4000/api/auth/getfriends",
		addfriend:"http://localhost:4000/friend/addfriend"
	}

	constructor(public http: Http) {}

	AddFriend(data){
		let headers = new Headers()
		headers.append("Accept","application/json")
		headers.append("Content-Type","application/json")

		// return this.http.post(this.path.addfriend, user, {headers:headers})
		// .map(res => res.json())

		return new Promise((resolve,reject)=>{
			this.http.post(this.path.addfriend, data, {headers:headers})
			.subscribe(res => {
				console.log(res.json())
				resolve(res.json())
			},(err)=>{
				reject(err)
			})
		})
	}

	GetFriend(phone_number){
		return new Promise((resolve, reject)=>{
			this.http.get(this.path.getfriend+phone_number)
	  		.subscribe(res => {
	  			resolve(res.json().data);
	  			// console.log(res.json().data)
	  		},(err)=>{
	  			reject(err);
	  		})			
		})
	}

	GetFriends(){
		return new Promise((resolve, reject)=>{
			this.http.get(this.path.getfriends)
	  		.subscribe(res => {
	  			resolve(res.json().data);
	  			// console.log(res.json().data)
	  		},(err)=>{
	  			reject(err);
	  		})			
		})
	}	

	DeleteFriends(){

	}

}
