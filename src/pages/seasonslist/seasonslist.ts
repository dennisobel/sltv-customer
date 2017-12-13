import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { CartPage } from "../cart/cart"
import { WishlistPage } from "../wishlist/wishlist"

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
	APIKEY = "35be3be17f956346becdba89d4f22ca1"

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl:ViewController,
		public toastCtrl:ToastController,
		public tmdbApiProvider : TmdbapiProvider,
		public tvApiProvider : TvapiProvider,
		public utilsProvider : UtilsProvider,
		private modalCtrl: ModalController,
		public http:Http){}

  ionViewDidLoad() {
		this.id = this.navParams.get("id")
		//console.log(this.id)

		this.tvApiProvider.getTvDetails(this.id)
		

		this.title = this.navParams.get("name")
		

	  	this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
	  	.map(res => {
	  		//console.log(res.json().images)
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
  			//console.log(res.json())

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
  			//console.log(this.similar)
  		})
  		.subscribe(res=>{

  		})


	}

	addToCart(get){
		this.utilsProvider.addItemToCart(get)
		this.utilsProvider.addToTitles(this.title)
		//this.cartlist.push(get)
		//console.log(this.cartlist)
		//let cartModal = this.modalCtrl.create(CartPage,{cartlist:this.cartlist})
		let toast = this.toastCtrl.create({
			message:"Added to cart",
			duration:1500,
			position:"middle"
		})
		toast.present();
		//cartModal.present()
	}

	addToWishlist(get){
		this.utilsProvider.addItemToWishlist(get)
		//this.wishlist.push(get)
		//let wishlistModal = this.modalCtrl.create(WishlistPage,{wishlist:this.wishlist})
		let toast = this.toastCtrl.create({
			message:"Added to wishlist",
			duration:1500,
			position:"middle"
		})
		toast.present();
		//wishlistModal.present()
	}



	viewCart(){
		//console.log(this.cartlist)
		this.cartlist = this.utilsProvider.getCart()
		this.titles = this.utilsProvider.getTitles()
		let cartModal = this.modalCtrl.create(CartPage,{cartlist:this.cartlist, title:this.titles})
		cartModal.present()
	}
  	
  

	//close movieModal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

}
