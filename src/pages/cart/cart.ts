import { Component } from '@angular/core';
import { 
	NavController, 
	NavParams, 
	ViewController, 
	AlertController, 
	ActionSheetController, 
	PopoverController, 
	ModalController,
	Platform, 
	ToastController, 
	LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { HomePage } from "../home/home"

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { UtilsProvider } from "../../providers/utils/utils"
import { AuthenticationProvider } from "../../providers/authentication/authentication"
import { Socket } from 'ng-socket-io';
import { StorePage } from '../store/store';
// import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
	private showTvSeries:any = true
	private showMovies:any = true
	private friends:any;
	private order:any;
	private cartlist:any;
	private moviecartlist:any;
	private base_url:any;
	private poster_sizes:any;
	private tmdbConfigImages:any;
	private backdrop_sizes:any;
	private checkout:any;
	private userinfo:any;
	private user:any;
	private connected:any;
	private index:any;
	private APIKEY = "35be3be17f956346becdba89d4f22ca1";
	private users:any;
	private retailers:any;
	private retailer:any;
	private close:Boolean = false;
	private menu: Boolean = false;
	

	constructor(
		private modalCtrl: ModalController,
		private popoverCtrl: PopoverController,
		private loadingCtrl: LoadingController,
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public platform: Platform,
		public viewCtrl:ViewController,
		public actionsheetCtrl: ActionSheetController,
		public alertCtrl: AlertController,
		public toastCtrl:ToastController,
		private auth: AuthenticationProvider,
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
		// this.socket.emit("getconnectedusers")
		this.activeUsers()
	}


	ionViewDidLoad(){
		// Menu
		if(this.navParams.get('from') == 'apphtml'){
			this.menu = true;
		}		
		
		// From
		if(this.navParams.get('from') == 'seasonslist' || this.navParams.get('from') == 'moviehome' || this.navParams.get('from') == 'home'){
			this.close = true;
		}
		// Get retailers
		this.auth.AllUsers().then((data:any) => {
			console.log("ALL USERS:",data)
			this.retailers = data.user;
		})

		//get friendse
		this.storage.get('friend')
		.then((value)=>{
			this.friends = value
		})			


  

		this.cartlist=this.utilsProvider.getCartTitle();
		console.log("CARTLIST:",this.cartlist)

		this.moviecartlist=this.utilsProvider.getMovieCart()

		this.order = {
			tvshows:this.cartlist,
			movies:this.moviecartlist
		}

		//Load user info
		this.storage.get('user').then((value) => { 
			console.log("USER:",value)
			this.order.phonenumber = value.user.phoneNumber; 
		}); 

		// Get Store
		/*
		this.storage.get('store').then((value)=>{
			console.log("VALUE:",value)
			this.order.retailer = value.userName
		})
		*/
		console.log("ORDERS:",this.order)

		if(Array.isArray(this.cartlist)=== true){
			console.log(this.cartlist)
			if(this.cartlist.length <= 0){
				this.showTvSeries = false
				console.log("no series")
			}
	
			// if(this.moviecartlist.length <= 0){
			// 	this.showMovies = false
			// }
		}else if(Array.isArray(this.cartlist) === false){
			this.showTvSeries = false
		}

		if(Array.isArray(this.moviecartlist) === true){
			if(this.moviecartlist.length <= 0){
				this.showMovies = false
			}
		}else if(Array.isArray(this.moviecartlist) === false){
			this.showMovies = false;
		}

		

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

	//reload connectedd users
	activeUsers(){
		return this.socket.emit("getconnectedusers")
	}



	//delete
	onDelete(get){
		let cart = this.utilsProvider.getCart()
		let index = cart.indexOf(get)
		this.utilsProvider.removeFromCart(index)
		this.utilsProvider.removeFromTitle(index)
		this.ionViewDidLoad()
	}

	onDeleteMovie(get){
		let cart = this.utilsProvider.getMovieCart()
		let index = cart.indexOf(get)
		this.utilsProvider.removeFromMovieCart(index)
		this.ionViewDidLoad()
	}

  	//close movieModal
	onClose(remove = false){
		this.activeUsers()
	    this.navCtrl.pop()
	}

	//open action sheet
	openMenu(){
		//this.activeUsers()
		this.socket.on("getAllSockets",(data)=>{
			console.log(JSON.parse(data))
		})
		this.socket.emit("_activeUsers")
		let actionSheet = this.actionsheetCtrl.create({
			title: "Cart Actions",
			cssClass: 'action-sheets-basic-page',
			buttons:[
				/*
				{
					text:"Place & Collect Order",
					icon: !this.platform.is("ios")?"cash":null,
					handler:()=>{							
						this.utilsProvider.postMovieTvShowCart(this.order)
						.then((data:any)=>{
							console.log("CART SERVER FEEDBACK:",data)
							// if successful then send notification
							if(data.success == true){
								this.socket.emit("orderNotification",({data:data.data}));
							}
						})

						const loader: any = this.loadingCtrl.create(
						{
							content: 'Please wait while we process your order...' 
						}
						);
						loader.present() 

						setTimeout(() => {
							loader.dismiss();
						}, 5000);
					}
				},
				{
					text:"Home Delivery",
					icon: !this.platform.is("ios")?"cash":null,
					handler: ()=>{

					}
				},
				*/
				{
					text:"Pick Store",
					icon: !this.platform.is("ios")?"home":null,
					handler: () => {
						this.onStore({order:this.order})
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

	cartEmpty(){
		let toast = this.toastCtrl.create({
			message:"Cart Empty",
			duration:800,
			position:"middle"			
		})

		toast.present()
	}

	onStore(data){
		// this.presentPopover(StorePage)
		this.modalCtrl.create(StorePage,data).present()
	}

	presentPopover(page) {
		let ev = {
		  target : {
			getBoundingClientRect : () => {
			  return {
				top: '100', left:'100'
			  };
			}
		  }
		};
		let popover = this.popoverCtrl.create(
		  page,
		  {ev},
		  {cssClass: 'alertCustomCss',showBackdrop: true},
	  )
		popover.present({
		  // ev: myEvent
		})
	  }	
}

