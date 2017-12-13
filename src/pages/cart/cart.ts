import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ActionSheetController, Platform } from 'ionic-angular';

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
// import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
// import { TvapiProvider } from "../../providers/tvapi/tvapi"

import { UtilsProvider } from "../../providers/utils/utils"


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
	cartlist:any;
	base_url:any;
	poster_sizes:any;
	tmdbConfigImages:any;
	backdrop_sizes:any;
	title:any;
	checkout:any;
	APIKEY = "35be3be17f956346becdba89d4f22ca1"

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public platform: Platform,
		public viewCtrl:ViewController,
		public actionsheetCtrl: ActionSheetController,
		public utilsProvider: UtilsProvider,
		public http:Http){
	}

	ionViewDidLoad(){
		this.cartlist = this.navParams.get("cartlist")
		this.title = this.navParams.get("title")
		// this.checkout = this.cartlist.concat(this.title)
		console.log(this.cartlist)

		//config
		this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
	  	.map(res => {
	  		this.base_url = res.json().images.base_url
	  		this.poster_sizes = res.json().images.poster_sizes[0]
	  		this.backdrop_sizes = res.json().images.poster_sizes[2]
	  	})
	  	.subscribe(tmdbConfig => {
		})
	}

	//delete
	onDelete(get){
		let cart = this.utilsProvider.getCart()
		for(var i=0; i<cart.length; i++){
			//console.log(cart[i])
			//Object.is(get, cart[i])
			//console.log(JSON.stringify(get) === JSON.stringify(cart[i]))
			if(JSON.stringify(get) === JSON.stringify(cart[i])){
				const position = cart.findIndex(get)
				this.utilsProvider.removeFromCart(get)
				this.cartlist.splice(position,1)
			}
		}
	}

  	//close movieModal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

	//open action sheet
	openMenu(){
		let actionSheet = this.actionsheetCtrl.create({
			title: "Cart Actions",
			cssClass: 'action-sheets-basic-page',
			buttons:[
				{
					text:"Place Order",
					icon: !this.platform.is("ios")?"cash":null,
					handler:()=>{
						console.log(this.cartlist)
					}
				},
				{
					text: 'Cancel',
			        role: 'cancel', 
			        icon: !this.platform.is('ios') ? 'close' : null,
			        handler:()=>{
			        	console.log("Cancel Clicked")
			        }
		        }
			]
		})

		actionSheet.present()
	}

}
