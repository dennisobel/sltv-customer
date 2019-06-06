import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi";
import { UtilsProvider } from "../../providers/utils/utils";
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { SocketProvider } from "../../providers/socket/socket";


@Component({
  selector: 'page-friendcollection',
  templateUrl: 'friendcollection.html',
})
export class FriendcollectionPage {
	private collection = "tv"
	private data: any;
	private user: any;
	private phone_number: any;
	private configuration:any;
	private tvcollection: any;
	private moviecollection: any;
	private loggeduser:any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		public viewCtrl:ViewController,
		public toastCtrl:ToastController,
		public storage: Storage,
		public authService: AuthProvider,
		public utilsProvider : UtilsProvider,	
		private socketProvider: SocketProvider, 
		public tmdbApiProvider : TmdbapiProvider
	){}

	ionViewDidLoad(){

		this.storage.get("user")
		.then((loggeduser)=>{
			// console.log(loggeduser)
			this.loggeduser = loggeduser.phone_number			
		})


		this.data = this.navParams.get("collection")
		this.phone_number = this.data.userData.phone_number
		this.user = this.data.userData._id
		console.log(this.user)
		
		this.getTv(this.data.userData._id)
		this.getMovie(this.data.userData._id)
		


		this.tmdbApiProvider.getTmdbConfig()
		.subscribe((config)=>{
			this.configuration = config.images
		})		

	}

	//close modal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(LoginPage)
	}	

	// This shouldn't happen
	/*
	deleteTVItem(data){
		this.utilsProvider.deletetv(data._id)
		.then(()=>{
			let index = this.tvcollection.indexOf(data)
			this.tvcollection.splice(index,1)
		})
	}
	*/

	getTv(_id){
		this.utilsProvider.gettv(_id)
		.subscribe((tvdata)=>{
			this.tvcollection = tvdata.data	
			this.tvalert()		
		})			
	}

	deleteMovieItem(data){
		this.utilsProvider.deletemovie(data._id)
		.then(()=>{
			let index = this.moviecollection.indexOf(data)
			this.moviecollection.splice(index,1)
		})
	}		

	getMovie(_id){
		this.utilsProvider.getmovie(_id)
		.subscribe((moviedata)=>{
			this.moviecollection = moviedata.data
		})
	}

	tvalert(){
		this.collectionAlert(this.tvcollection)			
	}

	moviealert(){
		this.collectionAlert(this.moviecollection)		
	}

	collectionAlert(collection){
		if(collection.length == 0){
			// guide
			let blank = this.toastCtrl.create({
				message:"Nothing Added to collection.",
				showCloseButton:true,
				position:"middle"
			})

			blank.onDidDismiss(()=>{
				// this.navCtrl.push(HomePage)
			})

			blank.present();
		}else if(collection.length !== 0){
			// guide
			let guide = this.toastCtrl.create({
				message:"Drag an item left to remove it from the collection",
				showCloseButton:true,
				position:"middle"
			})
			guide.present();					
		}		
	}	

	requestTVItem(data){
		let usercoll = {
			data:data,
			type:"TvShow",
			recepient:this.phone_number,
			sender:this.loggeduser
		}
		
		// this.utilsProvider.createmessage(usercoll)
		// .subscribe((data)=>{
		// 	console.log(data)
		// })

		this.socketProvider.requestSwap(usercoll)
	}

	requestMovieItem(data){	
		console.log(data)
		let usercoll = {
			data:data,
			type:"Movie",
			recepient:this.phone_number,
			sender:this.loggeduser
		}	
		this.utilsProvider.createmessage(usercoll)
		.subscribe((data)=>{
			console.log(data)
		})		
	}

}
