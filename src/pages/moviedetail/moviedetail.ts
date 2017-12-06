import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { TvapiProvider } from "../../providers/tvapi/tvapi"


@Component({
  selector: 'page-moviedetail',
  templateUrl: 'moviedetail.html',
})
export class MoviedetailPage {
	movdet:any="storyline"
	title:any;
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
	APIKEY = "35be3be17f956346becdba89d4f22ca1"

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl:ViewController,
		public tmdbApiProvider : TmdbapiProvider,
		public tvApiProvider : TvapiProvider,
		private alertCtrl: AlertController,
		public http:Http){}

	  //Tv Details
  

	

	ionViewDidLoad() {
		this.id = this.navParams.get("id")
		console.log(this.id)

		this.tvApiProvider.getTvDetails(this.id)
		

		this.title = this.navParams.get("name")
		// this.poster = this.navParams.get("poster_path")
		this.year = this.navParams.get("first_air_date")
		// this.rating = this.navParams.get("imdbRating")
		this.storyline = this.navParams.get("overview")
		// this.cast = this.navParams.get("actors")

		//Config
		// this.tmdbApiProvider.getTmdbConfig()
		// .subscribe(tmdbConfig => {
		// 	this.tmdbConfigImages = tmdbConfig.images
		// 	//console.log(tmdbConfig.images)
		// })

		//Config

	  	this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
	  	.map(res => {
	  		console.log(res.json().images)
	  		this.base_url = res.json().images.base_url
	  		this.poster_sizes = res.json().images.poster_sizes[6]
	  		this.backdrop_sizes = res.json().images.poster_sizes[2]
	  	})
	  	.subscribe(tmdbConfig => {
			// this.tmdbConfigImages = tmdbConfig
			// console.log(tmdbConfig)
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
  		})
  		.subscribe(res => {
  			// console.log(res)
  		})

  		//similar shows
  		this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"/similar?api_key="+this.APIKEY+"&language=en-US&page=1")
  		.map(res =>{
  			this.similar=res.json().results
  			console.log(this.similar)
  		})
  		.subscribe(res=>{

  		})


	}

	selectSeason(){
		let alert = this.alertCtrl.create();
		alert.setTitle(this.tvDetails.name)
		for(var i = 0; i < this.seasons.length; i++){
			alert.addInput({
				type:"checkbox",
				label:this.seasons[i].season_number+1,
				value:this.seasons[i].season_number+1,
			})			
		}
		alert.addButton("Cancel")
		alert.addButton({
			text:"Add to cart",
			handler:data=>{
				console.log(this.tvDetails.name,data)
			}
		})
		alert.present()
	}
  	
  

	//close movieModal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

}
