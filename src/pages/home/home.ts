import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, NavController, ModalController, ViewController, AlertController, App, LoadingController, ToastController } from 'ionic-angular';
import "rxjs/add/operator/map"
//import { MoviedetailPage } from "../moviedetail/moviedetail"
import { SeasonslistPage } from "../seasonslist/seasonslist"
import { ListPage } from "../list/list"
import { LoginPage } from '../login/login';
//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AuthProvider } from '../../providers/auth/auth';

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { TvapiProvider } from "../../providers/tvapi/tvapi"
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { SocketProvider } from "../../providers/socket/socket";
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	@ViewChild(Content) content: Content;

	getinfo:any;
	useinfo:any;
	list:any[]=[];
	listmovies="popular"
	poollist:any[]=[];
	pool:any;
	popularTvShows:any;
	topratedTvShows:any;
	tmdbConfigImages:any;
	tvGenres:any;
	page=1;
	query:any;
	APIKEY = "35be3be17f956346becdba89d4f22ca1"
	search_results:any;
	searchTerm: string = '';

	loading: any;
  	isLoggedIn: boolean = false;

	constructor(
		public navCtrl: NavController,
		public modalCtrl:ModalController,
		public alertCtrl:AlertController,
		public viewCtrl:ViewController,	
		public tvApiProvider : TvapiProvider,	
		public tmdbApiProvider : TmdbapiProvider,
		private socketProvider: SocketProvider,  
		private socket: Socket,
		public authService: AuthProvider,
		public app: App,
		public loadingCtrl: LoadingController, 
		private toastCtrl: ToastController,
		public http: Http){

		if(localStorage.getItem("token")){
			this.isLoggedIn = true;
		}



		
	}

	ionViewWillEnter(){
		this.socketProvider.getConnectedUsers().then((res)=>{
			this.socket.on('emitconnectedusers',(clients)=>{
				console.log(clients)
			})				
		})					

	}

	ionViewDidLoad(){
		this.socketProvider.incomingSwap()
		this.socketProvider.onConnect()
		this.tmdbApiProvider.getTmdbConfig()
		.subscribe(tmdbConfig => {
			this.tmdbConfigImages = tmdbConfig.images
			//console.log(tmdbConfig.images)
		})

		//get popular
		this.tvApiProvider.getPopularTvShows(this.page)		
		.subscribe(popularTvShows=>{			
			this.popularTvShows = popularTvShows.results			
		})

		//get latest
		this.tvApiProvider.getTvTopRated(this.page)
		.subscribe(topratedTvShows=>{
			this.topratedTvShows=topratedTvShows.results
			// console.log(topratedTvShows.results)
		})


				
		
	}	


	logout(){
		this.authService.logout()
		this.navCtrl.setRoot(LoginPage)
	}

	//show loader
	showLoader(){
		this.loading = this.loadingCtrl.create({
	    	content: 'Authenticating...'
		});

		this.loading.present();
	}

	//present toast
	presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			dismissOnPageChange: true
		});

		toast.onDidDismiss(() => {
		  // console.log('Dismissed toast');
		});

		toast.present();
	}


	//search tv series
	getItems(){
		this.http.get("https://api.themoviedb.org/3/search/tv?api_key=35be3be17f956346becdba89d4f22ca1&language=en-US"+"&query="+this.searchTerm)
  		.map(res =>{
  			res.json()  			
  			this.search_results=res.json().results
  			// console.log(this.search_results)
  			//search results modal
  			let query_result = this.modalCtrl.create(ListPage,{search_results:this.search_results});
  			query_result.onDidDismiss(data =>{
  				// console.log(data);
  			})
  			query_result.present();
  		})
  		.subscribe(search_results=>{
  		})		
	}


	//create movieModal
	seasonsModal(data){
		console.log("SEASONS MODAL DATA:",data)
		let seasonsModal = this.modalCtrl.create(SeasonslistPage,{data});
		seasonsModal.onDidDismiss(data =>{
			// console.log(data)
		})
		seasonsModal.present();
	}

	//addtopool
	addToPool(get){
		this.poollist.push(get)
		// console.log(this.poollist)
	}

	//infinite scroll
	doInfinite(infiniteScroll){	
		console.log(infiniteScroll)	
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

			this.tvApiProvider.getTvTopRated(this.page)
			.subscribe(topratedTvShows=>{
				this.topratedTvShows=topratedTvShows.results
			})
			
			infiniteScroll.complete()
		},300);
	}

	scrollToTop(){
		this.content.scrollToTop();
	}
}

