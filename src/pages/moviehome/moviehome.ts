import { Component, ViewChild } from '@angular/core';
import { Content, NavController,ModalController, ViewController, AlertController, ToastController } from 'ionic-angular';
import "rxjs/add/operator/map"
import { MoviedetailPage } from "../moviedetail/moviedetail"
import { MoviesearchPage } from "../moviesearch/moviesearch"
import { LoginPage } from '../login/login';
import { CartPage } from "../cart/cart"
import { AuthProvider } from '../../providers/auth/auth';

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
	@ViewChild(Content) content: Content;

	listmovies="popular"
	popularMovies:any;
	tmdbConfigImages:any;
	tvGenres:any;
	page=1;
	query:any;
	APIKEY = "35be3be17f956346becdba89d4f22ca1"
	search_results:any;
	searchTerm: string = '';
	moviecartlist:any[]=[];
	moviewishlist:any[]=[];
	upAndComing:any;
	topRatedMovies:any;


	constructor(
		public navCtrl: NavController,
		public modalCtrl:ModalController,
		public alertCtrl:AlertController,
		public viewCtrl:ViewController,	
		public toastCtrl:ToastController,
		public movieApiProvider : MovieapiProvider,	
		public tmdbApiProvider : TmdbapiProvider,
		public utilsProvider : UtilsProvider,
		public authService: AuthProvider,
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
    	//console.log(popularMovies.results)
    })

    //get up n coming
    this.movieApiProvider.getMovieUpcoming(this.page)
    .subscribe(upAndComing=>{
    	this.upAndComing = upAndComing.results
    })

    //get top rated
    this.movieApiProvider.getMovieTopRated(this.page)
    .subscribe(topRatedMovies=>{
    	this.topRatedMovies=topRatedMovies.results
    })
  }

  addToCart(get){
		this.utilsProvider.addToMoviecart(get)
		let toast = this.toastCtrl.create({
			message:"Added to cart",
			duration:1500,
			position:"middle"
		})
		toast.present();
		//cartModal.present()
	}

	



	viewCart(){
		let cartModal = this.modalCtrl.create(CartPage)
		cartModal.onDidDismiss(data=>{
			console.log(data)
		})
		cartModal.present()
	}

	//search
	getItems(){
		this.http.get("https://api.themoviedb.org/3/search/movie?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US"+"&query="+this.searchTerm)
  		.map(res =>{
  			res.json()  			
  			this.search_results=res.json().results
  			console.log(this.search_results)
  			//search results modal
  			let query_result = this.modalCtrl.create(MoviesearchPage,{search_results:this.search_results});
  			query_result.onDidDismiss(data=>{
  				console.log(data)
  			})
  			query_result.present();
  		})
  		.subscribe(search_results=>{
  		})		
	}

	//infinite scroll
	doInfinite(infiniteScroll){		
		this.page = this.page+1
		setTimeout(()=>{
			this.movieApiProvider.getMoviePopular(this.page)
			.subscribe(popularMovies => {
				this.popularMovies = popularMovies.results
			})

			this.movieApiProvider.getMovieUpcoming(this.page)
		    .subscribe(upAndComing=>{
		    	this.upAndComing = upAndComing.results
		    })

		    this.movieApiProvider.getMovieTopRated(this.page)
		    .subscribe(topRatedMovies=>{
		    	this.topRatedMovies=topRatedMovies.results
		    })
			
			infiniteScroll.complete()
		},300);
	}

	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(LoginPage)
	}

	scrollToTop(){
		this.content.scrollToTop();
	}

}
