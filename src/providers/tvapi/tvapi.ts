import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TvapiProvider {
  APIKEY = "35be3be17f956346becdba89d4f22ca1"

  constructor(public http: Http){}

  //Tv Popular
  getPopularTvShows(page=1){
  	return this.http.get("https://api.themoviedb.org/3/tv/popular"+"?api_key="+this.APIKEY+"&language=en-US"+"&page="+page+"&append_to_response=popular")
  	.map(res=>res.json());
  }

  //Tv Details
  getTvDetails(tv_id){
  	this.http.get("https://api.themoviedb.org/3/tv/"+tv_id+"?api_key="+this.APIKEY+"&language=en-US")
  	.map(res => res.json())
  }

  //TV Search
  getSearchTv(query){
  	this.http.get("https://api.themoviedb.org/3/search/tv?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&{query}")
  	.map(res => res.json())
  }

  //Tv Genres
  getTvGenres(){
  	return this.http.get("https://api.themoviedb.org/3/genre/tv/list?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json());
  }

  //Tv Certifications
  getTvshowCertifications(){
  	return this.http.get("https://api.themoviedb.org/3/certification/tv/list?api_key=35be3be17f956346becdba89d4f22ca1")
  	.map(res => res.json())
  }

  //Tv Credits
  getTvCredits(tv_id){
  	return this.http.get("https://api.themoviedb.org/3/tv/{tv_id}/credits?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json())
  }

  //Tv Recommendations
  getTvRecommendations(tv_id){
  	return this.http.get("https://api.themoviedb.org/3/tv/{tv_id}/recommendations?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Tv Get simillar
  getTvSimilarShows(tv_id){
  	return this.http.get("https://api.themoviedb.org/3/tv/35be3be17f956346becdba89d4f22ca1/similar?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Tv get videos
  getTvVideos(tv_id){
  	return this.http.get("https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json())
  }

  //Tv Latest
  getTvLatest(){
  	return this.http.get("https://api.themoviedb.org/3/tv/latest?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US")
  	.map(res => res.json())
  }

  //Tv Airing Today
  getTvAiringToday(){
  	return this.http.get("https://api.themoviedb.org/3/tv/airing_today?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Tv on the air next 7 days
  getTvOnAir(){
  	return this.http.get("https://api.themoviedb.org/3/tv/on_the_air?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

  //Tv Top Rated
  getTvTopRated(){
  	return this.http.get("https://api.themoviedb.org/3/tv/top_rated?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US&page=1")
  	.map(res => res.json())
  }

}
