import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TvapiProvider } from "../../providers/tvapi/tvapi"
import 'rxjs/add/operator/map';
import { resolve } from 'path';

@Injectable()
export class UtilsProvider {	
	private cartlist:any[]=[]
	public titles:any[]=[]
	private moviecartlist:any[]=[]
	private emitData:any;
	public tvcollection:any[] = []
	// public path:string="https://sltvcustomerserver.herokuapp.com/cart/getcart"
	private path = {
		// createcart:"http://localhost:4000/cart/createcart",
		createcart:"http://localhost:4000/createcart",
		getcart:"http://localhost:4000/cart/getcart", 
		getcartbyid:"http://localhost:4000/cart/getcartbyid/",
		deletecartbyid:"http://localhost:4000/cart/deletecartbyid/",		
		createtv:"http://localhost:4000/tv/createtv",
		gettv:"http://localhost:4000/tv/gettv/",
		deletetv:"http://localhost:4000/tv/deletetv/",
		createmovie:"http://localhost:4000/movies/createmovie",
		getmovie:"http://localhost:4000/movies/getmovie/",
		deletemovie:"http://localhost:4000/movies/deletemovie/",
		createmessage:"http://localhost:4000/messages/createmessage/",
		getmessage:"http://localhost:4000/messages/getmessage/",
		getmessages:"http://localhost:4000/messages/getmessages/",
		deletemessage:"http://localhost:4000/messages/deletemessage/"
	}

	constructor(
		public http: Http,
		public storage: Storage,
		public tvApiProvider : TvapiProvider,
	){}

	//add to cart
	addItemToCart(cartlist:any){
		this.cartlist.push(cartlist)
	}

	//remove from cart
	removeFromCart(index:any){
		const position = index
		this.cartlist.splice(position,1)
	}

	//remove from titles
	removeFromTitle(index:any){
		const position = index
		this.titles.splice(position,1)
	}

	//get cart
	getCart(){
		return this.cartlist
	}	

	//add tv titles
	addToTitles(titles:any){
		this.titles.push(titles)
	}


	//movies
	//add to movie cart
	addToMoviecart(moviecartlist:any){
		this.moviecartlist.push(moviecartlist)
	}
	

	//get movie cart 
	getMovieCart(){
		return this.moviecartlist
	}

	//remove from movie cart
	removeFromMovieCart(index:any){
		const position = index
		this.moviecartlist.splice(position,1)
	}

	getCartTitle(){
		//console.log(this.cartlist , this.titles)
		//modify later
		// var values;
		var _cartlist:any;
		for(var j=0; j<this.titles.length; j++){
	 		//values = this.titles[j]
	 		_cartlist = this.cartlist
	 		for(var i=0; i<_cartlist.length; i++){
				_cartlist[i].title=this.titles[i]
			}
		}

		//_cartlist = this.cartlist.concat(this.moviecartlist)
		console.log(_cartlist)
		return _cartlist
	}

	movieTvShowCart(){
		return this.getCartTitle().concat(this.moviecartlist)
	}
	

	//get all carts posted
	getCartsPosted(){
		return new Promise((resolve, reject)=>{
			let headers = new Headers();
	      	headers.append("Accept","application/json");
	  		headers.append("Content-Type", "application/json");

	  		this.http.get(this.path.getcart)
	  		.subscribe(res => {
	  			resolve(res.json());
	  			// console.log(res.json().data)
	  		},(err)=>{
	  			reject(err);
	  		})
		})
	}

	//get cart by id
	getCartById(phone_number){	  		
  		return this.http.get(this.path.getcartbyid + phone_number)	
  		.map(res=>res.json())		
	}

	//delete cart by id
	delCartById(phone_number){
		return this.http.delete(this.path.deletecartbyid + phone_number)
		.map(res => res.json())
	}

	//post message
	//bookmark////////////////////////////////////////////////////
	createmessage(data){
		let headers = new Headers()
		headers.append("Accept","application/json")
		headers.append("Content-Type","application/json")

		return this.http.post(this.path.createmessage, data, {headers:headers})		
		.map(res => res.json())
	}

	//get message
	getmessage(phone_number){
		return this.http.get(this.path.getmessage + phone_number)
		.map(res => res.json())
	}

	getmessages(){
		return this.http.get(this.path.getmessages)
		.map(res=>res.json())
	}

	//post tv collection
	createtv(data){		
		let headers = new Headers()
		headers.append("Accept","application/json")
		headers.append("Content-Type","application/json")

		return this.http.post(this.path.createtv, data, {headers:headers})
		.map(res => res.json())
	}

	//get tv collection
	gettv(_id){
		let _tvid;
		return this.http.get(this.path.gettv + _id)
		.map(res => res.json())
	}

	//delete tv
	deletetv(_id){
		// return this.http.delete(this.path.deletetv + _id)
		// .map(res => res.json())

		return new Promise((resolve,reject)=>{
			this.http.delete(this.path.deletetv + _id)
			.subscribe(res=>{
				resolve(res.json())
			},(err)=>{
				reject(err)
			})
		})
	}

	//post movie collection
	createmovie(data){		
		let headers = new Headers()
		headers.append("Accept","application/json")
		headers.append("Content-Type","application/json")

		return this.http.post(this.path.createmovie, data, {headers:headers})
		.map(res => res.json())
	}	

	//get movie collection
	getmovie(_id){
		let _tvid;
		return this.http.get(this.path.getmovie + _id)
		.map(res => res.json())
	}	

	//delete movie
	deletemovie(_id){
		return new Promise((resolve,reject)=>{
			this.http.delete(this.path.deletemovie + _id)
			.subscribe(res=>{
				resolve(res.json())
			},(err)=>{
				reject(err)
			})
		})
	}	



	//empty array
	emptyArray(){
		this.titles.length = 0
		this.cartlist.length = 0
		this.moviecartlist.length = 0
	}

	//Connected users
	connectedUsers(data){
		this.emitData = data
		return data;
	}

	emitConnected(){
		// console.log(this.emitData)
		return this.emitData
	}

	//collection
	saveToMovieCollection(data){
		let moviecollection = []
		moviecollection.push(data)
		this.storage.set("moviecollection",moviecollection)
		.then((_moviecollection)=>{
			console.log(_moviecollection)
		})
	}

	saveToTvCollection(data){		
		this.tvcollection.push(data)
		this.storage.set("tvcollection",this.tvcollection)
		.then((_tvcollection)=>{
			console.log(_tvcollection)
		})
	}

	getTvCollection(){
		return this.storage.get("tvcollection")
	}

	getMovieCollection(){
		var moviecollection
		this.storage.get("moviecollection")
		.then((_moviecollection)=>{
			moviecollection = _moviecollection
			console.log(_moviecollection)
		})
		return moviecollection
	}

	deleteTVItem(itemToDelete){

	}

	//get carts posted
	// getCartsPosted(){		
	// 	let headers = new Headers();
 //      	headers.append("Accept","application/json");
 //  		headers.append("Content-Type", "application/json");

 //  		return this.http.get("https://sltvcompanionserver.herokuapp.com/cart/getcart")
 //  		.map(res => res.json())		
	// }

	postMovieTvShowCart(data){
		console.log("OUTGOING ORDER:",data)
		return new Promise((resolve,reject)=>{
			let headers = new Headers();
			headers.append("Accept","application/json");
			headers.append("Content-Type", "application/json");
			
			this.http.post(this.path.createcart, JSON.stringify(data),{headers:headers})
			.subscribe((res)=>{
				resolve(res.json())
			},(err)=>{
				reject(err);
			})  
		})		
	}	
	
}
