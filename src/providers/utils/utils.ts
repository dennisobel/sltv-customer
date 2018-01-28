import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import { cartinterface } from "../../schemas/cartschema.interface"

// import { Socket } from 'ng-socket-io';


// let apiUrl = "http://localhost:8080/cart/";

@Injectable()
export class UtilsProvider {	
	private cartlist:any[]=[]
	public titles:any[]=[]
	private moviecartlist:any[]=[]
	private emitData:any;

	constructor(
		public http: Http,
		//private socket: Socket
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
		//console.log(_cartlist)
		return _cartlist
	}

	movieTvShowCart(){
		return this.getCartTitle().concat(this.moviecartlist)
	}

	//Post movieTvShowCart
	/*
	postMovieTvShowCart(data){
		//preloader
		console.log("calling postMovieTvShowCart");
		this.socket.emit("add-cart",data);
		//return new Promise((resolve,reject)=>{			
	  		let headers = new Headers();
	      	headers.append("Accept","application/json");
	  		headers.append("Content-Type", "application/json");

	  		return this.http.post("http://localhost:4000/cart/createcart", data,{headers:headers})
	  		.map(res=>res.json())
	  		// .subscribe(res=>{
	  		// 	resolve(res.json());
	  		// 	//console.log(res.json)
	  		// },(err)=>{
	  		// 	console.log("Error Thrown")
	  		// 	reject(err);
	  		// })

	  	//})
	  	//kill loader
	}
	*/
	

	//get carts posted
	getCartsPosted(){
		return new Promise((resolve, reject)=>{
			let headers = new Headers();
	      	headers.append("Accept","application/json");
	  		headers.append("Content-Type", "application/json");

	  		this.http.get("https://sltvcustomerserver.herokuapp.com/cart/getcart")
	  		.subscribe(res => {
	  			resolve(res.json());
	  			// console.log(res.json().data)
	  		},(err)=>{
	  			reject(err);
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

	
}
