import { Component, ViewChild } from '@angular/core';
import { Content, ViewController, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { CartPage } from "../cart/cart"
import { Storage } from '@ionic/storage';

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { TvapiProvider } from "../../providers/tvapi/tvapi"
import { UtilsProvider } from "../../providers/utils/utils"

@Component({
  selector: 'page-seasonslist',
  templateUrl: 'seasonslist.html',
})
export class SeasonslistPage {
	@ViewChild(Content) content: Content;

	movdet:any="storyline"
	title:any;
	titles:any
	poster:any;
	year:any;
	rating:any;
	storyline:any;
	cast:any;
	tmdbConfigImages:any;
	id:any;
	tvDetails:any;
	base_url:any;
	poster_sizes:any;
	backdrop_sizes:any;
	backdrop:any;
	bcglink:any;
	seasons:any;
	similar:any;
	vote_average:any;
	premier:any;
	season_number:any
	cartlist:any[]=[];
	wishlist:any[]=[];
	public _userdata:number;
	APIKEY = "35be3be17f956346becdba89d4f22ca1"

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl:ViewController,
		public alertCtrl: AlertController,
		public toastCtrl:ToastController,
		public tmdbApiProvider : TmdbapiProvider,
		public tvApiProvider : TvapiProvider,
		public utilsProvider : UtilsProvider,
		private modalCtrl: ModalController,
		public storage: Storage,	
		public http:Http){}

  ionViewDidLoad(){
  	//get user data
  		(()=>{
			this.storage.get("user")
			.then((userdata)=>{
				this._userdata =  userdata._id		
			})
		})()

		this.id = this.navParams.get("id")
		this.tvApiProvider.getTvDetails(this.id)
		this.title = this.navParams.get("name")
		
	  	this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
	  	.map(res => {
	  		this.base_url = res.json().images.base_url
	  		this.poster_sizes = res.json().images.poster_sizes[0]
	  		this.backdrop_sizes = res.json().images.poster_sizes[2]
	  	})
	  	.subscribe(tmdbConfig => {
		})
  
	  	//tv details
		this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"?api_key="+this.APIKEY+"&language=en-US")
  		.map(res => {
  			this.tvDetails=res.json()
  			this.poster = res.json().poster_path
  			this.backdrop = res.json().backdrop_path
  			this.rating = res.json().vote_average
  			this.seasons = res.json().seasons

  			for(var i=0;i<this.seasons.length;i++){
  				this.season_number = this.seasons[i].season_number
  			}
  		})
  		.subscribe(res => {
  		})

  		//similar shows
  		this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"/similar?api_key="+this.APIKEY+"&language=en-US&page=1")
  		.map(res =>{
  			this.similar=res.json().results
  		})
  		.subscribe(res=>{

  		})


	}

	addToCart(get){
		this.utilsProvider.addItemToCart(get)
		this.utilsProvider.addToTitles(this.title)
		let toast = this.toastCtrl.create({
			message:"Added to cart",
			duration:1500,
			position:"middle"
		})
		toast.present();
	}

	addToTvCollection(data){
		let tvdetails={
			episode_count:data.data.episode_count,
			tvid:data.data.id,
			poster_path:data.data.poster_path,
			season_number:data.data.season_number,
			title:data.title,
			userId:this._userdata
		}

		console.log(tvdetails)

		let alert = this.alertCtrl.create({
			title:"Adding To Collection",
			buttons:[
				{
					text:"Ok",
					handler:()=>{
						this.utilsProvider.createtv(tvdetails)
						.subscribe((data)=>{
							console.log(data)
						})
					}
				},
				{
					text:"Nope",
					role:"cancel",
					handler:()=>{
						//do something here besides console.log("done did")
					}
				}
			]
		})
		
		alert.present()
	}


	viewCart(){
		let cartModal = this.modalCtrl.create(CartPage)
		cartModal.onDidDismiss(data=>{
			// console.log(data)
		})
		cartModal.present()
	}  

	//close movieModal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

	scrollToTop(){
		this.content.scrollToTop();
	}

}