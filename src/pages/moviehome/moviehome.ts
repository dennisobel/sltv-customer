import { Component } from '@angular/core';
import { NavController,ModalController, ViewController, AlertController, ToastController } from 'ionic-angular';
import "rxjs/add/operator/map"
import { MoviedetailPage } from "../moviedetail/moviedetail"
import { ListPage } from "../list/list"
import { CartPage } from "../cart/cart"
import { WishlistPage } from "../wishlist/wishlist"

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { MovieapiProvider } from "../../providers/movieapi/movieapi"
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { UtilsProvider } from "../../providers/utils/utils"

@Component({
	selector: 'page-home',
	templateUrl: 'moviehome.html'
})

export class MoviehomePage {
	listmovies="popular"
	popularMovies:any;
	tmdbConfigImages:any;
	tvGenres:any;
	page=1;
	query:any;
	APIKEY = "35be3be17f956346becdba89d4f22ca1"
	search_results:any;
	searchTerm: string = '';
	cartlist:any[]=[];
	wishlist:any[]=[];

	constructor(
		public navCtrl: NavController,
		public modalCtrl:ModalController,
		public alertCtrl:AlertController,
		public viewCtrl:ViewController,	
		public toastCtrl:ToastController,
		public movieApiProvider : MovieapiProvider,	
		public tmdbApiProvider : TmdbapiProvider,
		public utilsProvider : UtilsProvider,
		public http: Http){}

  ionViewDidLoad(){
  	//config
  	this.tmdbApiProvider.getTmdbConfig()
		.subscribe(tmdbConfig => {
			this.tmdbConfigImages = tmdbConfig.images
			//console.log(tmdbConfig.images)
	})

  	//get popular movies
    this.movieApiProvider.getMoviePopular(this.page)
    .subscribe(popularMovies =>{
    	this.popularMovies = popularMovies.results
    	console.log(popularMovies.results)
    })
  }

  addToCart(get){
		this.utilsProvider.addItemToCart(get)
		//this.utilsProvider.addToTitles(this.title)
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
		//this.titles = this.utilsProvider.getTitles()
		let cartModal = this.modalCtrl.create(CartPage,{cartlist:this.cartlist})
		cartModal.present()
	}

}
