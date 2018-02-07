import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi";
import { TvapiProvider } from "../../providers/tvapi/tvapi";
import { ItemSliding } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from "../home/home"

@Component({
  selector: 'page-mycollection',
  templateUrl: 'mycollection.html',
})
export class MycollectionPage{
	private tvcollection:any;
	private moviecollection:any;
	private configuration:any;
	private _userdata:number;
	private collection = "tv"

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public utilsProvider : UtilsProvider,
		public tmdbApiProvider : TmdbapiProvider,
		public tvApiProvider : TvapiProvider,	
		public toastCtrl:ToastController,
		public storage: Storage	
	){}

	ionViewDidLoad(){

  	//get user data
  		(()=>{
			this.storage.get("user")
			.then((userdata)=>{
				this._userdata =  userdata._id	
			})
			.then(()=>{
				this.getTv(this._userdata)
				this.getMovie(this._userdata)
			})
		})()
		
		

		this.tmdbApiProvider.getTmdbConfig()
		.subscribe((config)=>{
			this.configuration = config.images
		})


		this.utilsProvider.getTvCollection()
		.then((data)=>{

		})
	}

	deleteTVItem(data){
		this.utilsProvider.deletetv(data._id)
		.then(()=>{
			let index = this.tvcollection.indexOf(data)
			this.tvcollection.splice(index,1)
		})
	}

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

}
