import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ActionSheetController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { HomePage } from "../home/home"

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { UtilsProvider } from "../../providers/utils/utils"
import { Socket } from 'ng-socket-io';
// import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
	cartlist:any;
	moviecartlist:any;
	base_url:any;
	poster_sizes:any;
	tmdbConfigImages:any;
	backdrop_sizes:any;
	checkout:any;
	userinfo:any;
	user:any;
	connected:any;
	index:any;
	APIKEY = "35be3be17f956346becdba89d4f22ca1";
	users:any;
	

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public platform: Platform,
		public viewCtrl:ViewController,
		public actionsheetCtrl: ActionSheetController,
		public alertCtrl: AlertController,
		public toastCtrl:ToastController,
		public utilsProvider: UtilsProvider,
		public storage: Storage,
		public socket: Socket, 
		public http:Http){
		
			this.socket.on("emitconnectedusers",(data)=>{
				this.connected = data
				// console.log(this.connected)
				this.ionViewDidLoad()
			})		
	}



	ionViewWillEnter(){
		this.socket.emit("getconnectedusers")
	}


	ionViewDidLoad(){		

		//Load user info
        this.storage.get('user').then((value) => { 
            this.user = value.phone_number; 
        });   

		this.cartlist=this.utilsProvider.getCartTitle();
		this.moviecartlist=this.utilsProvider.getMovieCart()

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
		let index = cart.indexOf(get)
		this.utilsProvider.removeFromCart(index)
		this.utilsProvider.removeFromTitle(index)
	}

	onDeleteMovie(get){
		let cart = this.utilsProvider.getMovieCart()
		let index = cart.indexOf(get)
		this.utilsProvider.removeFromMovieCart(index)
	}

  	//close movieModal
	onClose(remove = false){
	    this.navCtrl.pop()
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
						//get connected
						let _connected = this.connected
						// console.log(_connected)						
						// console.log("Calling Place Order...")	

						let _alert = this.alertCtrl.create()
						_alert.setTitle("Choose Distributor")

						for(var key in _connected){
							_alert.addInput({
								type:"radio",
								label:key,
								value:_connected[key],
							})
						}

						_alert.addButton({
							text:"Cancel",
							role:"cancel",
							handler:()=>{
								this.ionViewDidLoad()
							}
						})

						_alert.addButton({
							text:"Ok",
							handler:(data)=>{
								var _movieTvShowCart = {
									tvshows:this.cartlist,
									movies:this.moviecartlist,
									phone_number:this.user,
									socket:data.socket
								}
								// console.log("emitting data to server...")
								this.socket.emit("add-cart",_movieTvShowCart);

								this.utilsProvider.emptyArray()

								let toast = this.toastCtrl.create({
									message:"Order Placed",
									duration:800,
									position:"middle"
								})
								toast.present();								
							}
						})

						_alert.present()


					}
				},
				{
					text: 'Cancel',
			        role: 'cancel', 
			        icon: !this.platform.is('ios') ? 'close' : null,
			        handler:()=>{
			        	// console.log("Cancel Clicked")
			        }
		        }
			]
		})

		actionSheet.present()
	}
}

