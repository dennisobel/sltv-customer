import { Component } from '@angular/core';
import { NavController,ModalController, ViewController, NavParams } from 'ionic-angular';
import "rxjs/add/operator/map"
//import { MoviedetailPage } from "../moviedetail/moviedetail"
import { SeasonslistPage } from "../seasonslist/seasonslist"

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { TvapiProvider } from "../../providers/tvapi/tvapi"
//import { MovieapiProvider } from "../../providers/movieapi/movieapi"

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  tmdbConfigImages:any;
  tvGenres:any;
  search_results:any;
  base_url:any;
  poster_sizes:any;
  backdrop_sizes:any;
  backdrop:any;
  poster:any;
  rating:any;
  APIKEY = "35be3be17f956346becdba89d4f22ca1";

  constructor(
    public navCtrl: NavController,
    public modalCtrl:ModalController,
    public viewCtrl:ViewController, 
    public navParams: NavParams,
    public tvApiProvider : TvapiProvider,  
    public tmdbApiProvider : TmdbapiProvider,
    public http: Http){}

  ionViewDidLoad(){
    this.search_results = this.navParams.get("search_results")
    // console.log(this.navParams.get("search_results"))

    //Config

    this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
    .map(res => {
      // console.log(res.json().images)
      this.base_url = res.json().images.base_url
      this.poster_sizes = res.json().images.poster_sizes[6]
    })
    .subscribe(tmdbConfig => {
    // this.tmdbConfigImages = tmdbConfig
    // console.log(tmdbConfig)
    })

    //Get Genres
    this.tvApiProvider.getTvGenres()
    .subscribe(tvGenres => {
      this.tvGenres = tvGenres.genres      
    })  
  }

  //modal
  seasonsModal(data){
    let seasonsModal = this.modalCtrl.create(SeasonslistPage,{data});
    seasonsModal.onDidDismiss(data =>{
      // console.log(data)
    })
    seasonsModal.present();
  }

  onClose(remove = false){
      this.viewCtrl.dismiss(remove);
  }
}
