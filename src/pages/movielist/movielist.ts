import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Api
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { MovieapiProvider } from "../../providers/movieapi/movieapi"
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-movielist',
  templateUrl: 'movielist.html',
})
export class MovielistPage {
tmdbConfigImages:any;
popular:any;
movie_genres:any;

constructor(
	public navCtrl: NavController,
	public navParams: NavParams,
	public tmdbApiProvider : TmdbapiProvider,
	public movieApiProvider : MovieapiProvider,
	public http:Http) {
}

ionViewDidLoad() {
	//config
	this.tmdbApiProvider.getTmdbConfig()
	.subscribe(tmdbConfig => {
		this.tmdbConfigImages = tmdbConfig.images
		console.log(tmdbConfig.images)
	})

	//popular
	this.movieApiProvider.getMoviePopular()
	.subscribe(popular=>{
		this.popular=popular.results
		console.log(popular)
	})

	//genres
	this.movieApiProvider.getMovieGenres()
	.subscribe(movie_genres=>{
		this.movie_genres=movie_genres
		console.log(movie_genres.genres)
	})
}

}
