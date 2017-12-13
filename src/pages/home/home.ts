import { Component } from '@angular/core';
import { NavController,ModalController, ViewController, AlertController } from 'ionic-angular';
import "rxjs/add/operator/map"
import { MoviedetailPage } from "../moviedetail/moviedetail"
import { SeasonslistPage } from "../seasonslist/seasonslist"
import { ListPage } from "../list/list"

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { TvapiProvider } from "../../providers/tvapi/tvapi"
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	getinfo:any;
	useinfo:any;
	list:any[]=[];
	listmovies="popular"
	poollist:any[]=[];
	pool:any;
	popularTvShows:any;
	tmdbConfigImages:any;
	tvGenres:any;
	page=1;
	query:any;
	APIKEY = "35be3be17f956346becdba89d4f22ca1"
	search_results:any;
	searchTerm: string = '';

	constructor(
		public navCtrl: NavController,
		public modalCtrl:ModalController,
		public alertCtrl:AlertController,
		public viewCtrl:ViewController,	
		public tvApiProvider : TvapiProvider,	
		public tmdbApiProvider : TmdbapiProvider,
		public http: Http){}

	ionViewDidLoad(){
		this.tmdbApiProvider.getTmdbConfig()
		.subscribe(tmdbConfig => {
			this.tmdbConfigImages = tmdbConfig.images
			//console.log(tmdbConfig.images)
		})

		this.tvApiProvider.getPopularTvShows(this.page)		
		.subscribe(popularTvShows=>{			
			this.popularTvShows = popularTvShows.results			
		})

				
		
	}	

	//search tv series
	getItems(){
		this.http.get("https://api.themoviedb.org/3/search/tv?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US"+"&query="+this.searchTerm)
  		.map(res =>{
  			res.json()  			
  			this.search_results=res.json().results
  			console.log(this.search_results)
  			//search results modal
  			let query_result = this.modalCtrl.create(ListPage,{search_results:this.search_results});
  			query_result.present();
  		})
  		.subscribe(search_results=>{
  		})		
	}


	//create movieModal
	seasonsModal(get){
		let seasonsModal = this.modalCtrl.create(SeasonslistPage,get);
		seasonsModal.present();
	}

	//addtopool
	addToPool(get){
		this.poollist.push(get)
		console.log(this.poollist)
	}

	//infinite scroll
	doInfinite(infiniteScroll){		
		this.page = this.page+1
		setTimeout(()=>{
			this.tvApiProvider.getPopularTvShows(this.page)
			.subscribe(popularTvShows => {
				//popularTvShows.page++
				//this.page = popularTvShows.page
				//console.log(popularTvShows.page)
				this.popularTvShows = popularTvShows.results
				//console.log(this.popularTvShows)
			})
			
			infiniteScroll.complete()
		},300);
	}
}
