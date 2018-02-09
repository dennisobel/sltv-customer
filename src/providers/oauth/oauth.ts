import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class OauthProvider{
	private token: any;
	private user_number: any;
	private user:any;
	private path = {
		FBlogin:"http://localhost:5000/users/oauth/facebook"
	}

	constructor(
		private http: Http,
		public storage: Storage
	){}

	FBlogin(){
		console.log("fblogin called")
		return new Promise((resolve, reject)=>{
	        let headers = new Headers();
	        headers.append('Content-Type', 'application/json');		
	        
	        this.http.post(this.path.FBlogin, {headers: headers})
	        .subscribe(FBdada=>{ 
	            let _FBdada = FBdada.json();
	            console.log(_FBdada)	        	
	        })	
		})
	}

}
