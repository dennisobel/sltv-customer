import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { FriendcollectionPage } from '../friendcollection/friendcollection';
import { NewcartPage } from '../newcart/newcart';
import { AuthProvider } from '../../providers/auth/auth';
import { FriendProvider } from '../../providers/friend/friend';
import { ConfigProvider } from '../../providers/config/config'
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';
import { UtilsProvider } from "../../providers/utils/utils";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
	private search_number:any;
	private user:any;
	private phone_number:any;
	private loggeduser:any;
	private _data:any[]=[];
	private friends:any;
	private _userdata:number;
	private tvcollection:any;
	private moviecollection:any;	
	private collection:any;
	private message:any
	private userid:any;
	private profile = "friends"
	private cart:any[]=[];
	private delivered:any[]=[];
	private _delivered:any[]=[];
	private _del:any[]=[];	
	// private _data:any[]=[];
	private movies:any[]=[];
	private tvshows:any[]=[];	
	private base_url:any;
	private poster_sizes:any;
	private backdrop_sizes:any;
	private configuration:any;
	private oldcart:any;
	private neworder:any;	
	private messages:any[]=[];

	constructor(
		public navCtrl: NavController, 
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public authService: AuthProvider,
		public friendProvider: FriendProvider,
		public storage: Storage,
		public socket: Socket, 
		public utilsProvider : UtilsProvider,
		public config: ConfigProvider,
		private modalCtrl: ModalController
	){
		// this.socket.on("new_order", (data) => {		
		// 	console.log(data)
			
		// 	// console.log("Receiving data from server")			

		// 	this.utilsProvider.postMovieTvShowCart(data)
		// 	.subscribe(res => {
		// 		console.log(res.data)
		// 		this.setValue(res.data)
		// 		this.presentAlert(res.data)				
		// 	})	

		// 	// this.setValue(data)
		// 	// this.presentAlert(data)	
		// })			
	}

	ionViewDidLoad(){
		// this.getValue()	
		this.getDelivered()

		

		this.utilsProvider.getCartsPosted()
		.then(res => {
			console.log(res)
		})

		this.friendProvider.GetFriends()
		.then((users)=>{
			// console.log(users);
		})
		.catch((error)=>{
			// console.log(error);
		})
		this.getLoggedUser()

		//friends
		this.storage.get('friend')
		.then((value)=>{
			this.friends = value
		})	

		this.config.getTmdbConfig()
		.subscribe(config => {
			this.configuration = config.images
		})			
	}

	ionViewDidLeave(){
		//user
        this.storage.get("user")
        .then((loggeduser)=>{
            // console.log(loggeduser)
            this.socket.emit("offline",{username:loggeduser.phone_number})
        })	
	}	

	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(LoginPage)
	}

	getUser(){
		this.friendProvider.GetFriend(this.search_number)
		.then((friend:any)=>{
			this.user = friend
			// console.log(this.user)
		})
		.catch((error)=>{
			// console.log(error)
		})
	}

	addToFriend(user){
		let data = {user:user,loggeduser:this.loggeduser}
		// this.friendProvider.AddFriend(data)
		this._data.push(user)
		this.storage.set("friend",this._data)
		.then((successData)=>{
		})
		.then(()=>{
			this.ionViewDidLoad()
		})		
	}

	getLoggedUser(){
		this.storage.get("user")
		.then((loggeduser)=>{
			// console.log(loggeduser)
			this.loggeduser = loggeduser
			this.userid = loggeduser._id

			this.utilsProvider.getCartById(loggeduser.phone_number)
			.subscribe((result)=>{
				console.log(result)
				this.cart = result.data
			})

			this.getMessage(loggeduser.phone_number)
		})
	}

	getTv(_id){
		this.utilsProvider.gettv(_id)
		.subscribe((tvdata)=>{
			this.tvcollection = tvdata.data
			// this.tvalert()	
			// console.log(this.tvcollection)					
		})			
		return this.tvcollection	
	}

	getMovie(_id){
		this.utilsProvider.getmovie(_id)
		.subscribe((moviedata)=>{
			this.moviecollection = moviedata.data
			// console.log(this.moviecollection)			
		})
		return this.moviecollection
	}

	getMessage(phone_number){
		this.utilsProvider.getmessage(phone_number)
		.subscribe((message)=>{
			this.message = message.data
			console.log(this.message)
		})
		return this.message
	}

	viewFriendCollection(data){
		interface LooseObject {
		    [key: string]: any
		}	

		let collection: LooseObject = {};

		this.utilsProvider.getmovie(data._id)
		.subscribe((moviedata)=>{
			collection.movies = moviedata.data
					
		})	

		this.utilsProvider.gettv(data._id)
		.subscribe((tvdata)=>{
			collection.tv = tvdata.data
					
		})	

		collection.userData = data;

		let friendcollectionmodal = this.modalCtrl.create(FriendcollectionPage,{collection:collection})
		friendcollectionmodal.present()	
	}

	onDelivered(cart){
		let alert = this.alertCtrl.create({
			title:"You sure you wanna mark as delivered?",
			buttons:[
				{
					text:"Sure",
					handler:()=>{							
						this.removeConnected(cart)
						this.getValue()
					}			
				},
				{
					text:"My Bad",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]			
		})

		alert.present()

	}	

	onPickup(cart){
		let alert = this.alertCtrl.create({
			title:"Are you sure it's ready 4 pick up?",
			buttons:[
				{
					text:"Sure",
					handler:()=>{	
						// this.socket.emit("pickup",{data:cart})
					}			
				},
				{
					text:"My Bad",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]			
		})
	}

	presentAlert(neworder){		
		let _newcart = this.alertCtrl.create({
			//neworder:this.neworder,
			title:"New Order",
			buttons:[
				{
					text:"View",
					handler:()=>{							
						let _cartModal = this.modalCtrl.create(NewcartPage, {cart:neworder})
						_cartModal.present()
						//this.ionViewDidLoad()
					}			
				},
				{
					text:"Cancel",
					role:"cancel",
					handler:()=>{
						//this.ionViewDidLoad()
					}
				}				
			]				
		})
		_newcart.present()		
		this.ionViewDidLoad()
	}	

	setValue(data){
		this._data.push(data)
		this.storage.set("object",this._data)
		.then((successData)=>{
			// console.log("Data stored")
			// console.log(successData)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})
	}

	getValue(){
		this.storage.get("object")
		.then((data)=>{
			this.cart = data
			// console.log(this.cart)
		})
		return this.cart
	}	

	getDelivered(){
		this.storage.get("delivered")
		.then((data)=>{
			this.delivered = data
			// console.log(this.delivered)
		})
		return this.delivered
	}	

	removeConnected(cart){
		let index = this.cart.indexOf(cart)
		this._del.push(this.cart[index])
		this.cart.splice(index,1)
		
		// console.log(this._del)
		this.storage.set("object",this.cart)
		.then((successData)=>{
			this._delivered.push(successData)
		})

		this.storage.set("delivered",this._del)
		.then((successDelivered)=>{
			// console.log(successDelivered)
		})
		.then(()=>{
			this.ionViewDidLoad()
		})		
	}

	clearStorage(){
		this.storage.clear()
	}	
}
