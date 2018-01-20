import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TmdbapiProvider {
	apiKey = "35be3be17f956346becdba89d4f22ca1"

  constructor(public http: Http){}
  //Config
  getTmdbConfig(){
  	return this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
  	.map(res => res.json())
  }
  //Certifications
  /*Get an up to date list of the officially supported TV show/ Movie certifications on TMDb.
  I.E e.g.PG Rating*/
  //Movie Certifications

  getMovieCertifications(){
  	return this.http.get("https://api.themoviedb.org/3/certification/movie/list?api_key=35be3be17f956346becdba89d4f22ca1")
  	.map(res => res.json())
  }
}
