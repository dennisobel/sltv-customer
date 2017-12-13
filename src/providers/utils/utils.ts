import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { cartinterface } from "../../schemas/cartschema.interface"


@Injectable()
export class UtilsProvider {
	private cartlist:any[]=[]
	private wishlist:any[]=[]
	public titles:any[]=[]

	constructor(
		public http: Http,
	){}

	//add to cart
	addItemToCart(cartlist:any){
		this.cartlist.push(cartlist)
	}

	//remove from cart
	removeFromCart(get:any){
		const position = this.cartlist.findIndex(get)
		this.cartlist.splice(position,1)
	}

	//get cart
	getCart(){
		return this.cartlist
	}

	//add to wishlist
	addItemToWishlist(wishlist:any){
		this.wishlist.push(wishlist)
	}

	//get wishlist
	getWishlist(){
		return this.wishlist
	}

	//add titles
	addToTitles(titles:any){
		this.titles.push(titles)
	}

	//get titles
	getTitles(){
		return this.titles
	}
}
