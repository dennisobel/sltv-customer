import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MovieapiProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MovieapiProvider {

  constructor(public http: Http){}

  //Movie

  //Movie Popular
  getMoviePopular(){
  	return this.http.get("https://api.themoviedb.org/3/movie/popular?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Movie Top Rated
  getMovieTopRated(){
  	return this.http.get("https://api.themoviedb.org/3/movie/top_rated?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Movie Upcoming
  getMovieUpcoming(){
  	return this.http.get("https://api.themoviedb.org/3/movie/upcoming?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Movie Latest
  getMovieLatest(){
  	return this.http.get("https://api.themoviedb.org/3/movie/latest?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json())
  }

  //Movies Similar
  getMoviesSimilar(movie_id){
  	return this.http.get("https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Movie Recommendations
  getMovieRecommendations(movie_id){
  	return this.http.get("https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Movie Videos
  getMovieVideos(movie_id){
  	return this.http.get("https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json())
  }

  //Movie Search
  getSearchMovies(query){
  	this.http.get("https://api.themoviedb.org/3/search/movie?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&{query}&page=1")
  	.map(res => res.json())
  }

  //Movie Details
  getMovie(movie_id){
  	return this.http.get("https://api.themoviedb.org/3/movie/{movie_id}?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json())
  }

  getMovieCredits(movie_id){
  	this.http.get("https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=35be3be17f956346becdba89d4f22ca1")
  	.map(res => res.json())
  }  

  //Movie Genres
   getMovieGenres(){
  	return this.http.get("https://api.themoviedb.org/3/genre/movie/list?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json());
  }

}
