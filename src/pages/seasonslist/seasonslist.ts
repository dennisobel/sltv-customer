import { Component, ViewChild } from '@angular/core';
import { Content, ViewController, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { CartPage } from "../cart/cart"
import { Storage } from '@ionic/storage';

//API
import { Http } from "@angular/http"
import 'rxjs/add/operator/map'
import { TmdbapiProvider } from "../../providers/tmdbapi/tmdbapi"
import { TvapiProvider } from "../../providers/tvapi/tvapi"
import { UtilsProvider } from "../../providers/utils/utils"

@Component({
  selector: 'page-seasonslist',
  templateUrl: 'seasonslist.html',
})
export class SeasonslistPage {
	@ViewChild(Content) content: Content;

	private movdet:any="storyline"
	private title:any;
	private titles:any
	private poster:any;
	private collection:any;
	private year:any;
	private rating:any;
	private storyline:any;
	private cast:any;
	private tmdbConfigImages:any;
	private id:any;
	private tvDetails:any;
	private friends:any;
	private base_url:any;
	private poster_sizes:any;
	private backdrop_sizes:any;
	private backdrop:any;
	private bcglink:any;
	private seasons:any[]=[];
	private similar:any;
	private vote_average:any;
	private premier:any;
	private season_number:any
	private cartlist:any[]=[];
	private wishlist:any[]=[];
	public _userdata:number;
	public APIKEY = "35be3be17f956346becdba89d4f22ca1"

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl:ViewController,
		public alertCtrl: AlertController,
		public toastCtrl:ToastController,
		public tmdbApiProvider : TmdbapiProvider,
		public tvApiProvider : TvapiProvider,
		public utilsProvider : UtilsProvider,
		private modalCtrl: ModalController,
		public storage: Storage,	
		public http:Http){}

  ionViewDidLoad(){
	  let seasonData = this.navParams.get("data")
	  this.title = seasonData.name
	  console.log("SEZ DATA:",seasonData)
	  this.id = seasonData.id;
	  (()=>{
		console.log("seasonslist did load")
	  })();
	  
		  //get user data
		  /*
  		(()=>{
			this.storage.get("user")
			.then((userdata)=>{
				this._userdata =  userdata._id		
				console.log("USERDATA:",this._userdata)
			})
		})();
		*/

		//friends
		/*
		(()=>{
			interface LooseObject {
			    [key: string]: any
			}	

			let collection: LooseObject = {};	
					
			this.storage.get('friend')
			.then((value)=>{
				this.friends = value
				let i = 0;

				while(this.friends[i]){
					
					this.utilsProvider.gettv(this.friends[i]._id)
					.subscribe((tvdata)=>{
						collection.tv = tvdata.data
						this.collection = tvdata.data





								  	//tv details
									this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"?api_key="+this.APIKEY+"&language=en-US")
							  		.map(res => {
							  			// console.log(res.json())
							  			this.tvDetails=res.json()
							  			this.poster = res.json().poster_path
							  			this.backdrop = res.json().backdrop_path
							  			this.rating = res.json().vote_average
							  			this.seasons = res.json().seasons

							  			for(var i=0;i<this.seasons.length;i++){
							  				this.season_number = this.seasons[i].season_number
							  				// console.log(this.seasons[i].id)
							  				// console.log(this.collection)

							  				for(var j = 0; j < this.collection.length; j++){
							  					if(this.collection[j].tvid == this.seasons[i].id){
							  						console.log("match")

							  						var button = document.getElementById("request").style.display = "none"
							  						// .setAttribute("style","")
							  					}else{
							  						console.log("no match")
							  					}
							  				}

							  			}
							  		})
							  		.subscribe(res => {
							  		})

						// console.log(collection.tv)	

						// let j = 0

						// while(collection.tv[j]){
						// 	// console.log(collection.tv[j].tvid)
						// 	j++;
						// }
					})	

					i++;
					

				}

			})	
			// console.log(collection.tv)
			// this.collection = collection

		})();

		*/







//tv details
this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"?api_key="+this.APIKEY+"&language=en-US")
.map(res => {
	console.log("TV DETAILS",res.json())
	this.tvDetails=res.json()
	this.poster = res.json().poster_path
	this.backdrop = res.json().backdrop_path
	this.rating = res.json().vote_average
	this.seasons = res.json().seasons

	console.log("SEASONS LIST:",this.seasons)

	for(var i=0;i<this.seasons.length;i++){
		this.season_number = this.seasons[i].season_number
		// console.log(this.seasons[i].id)
		// console.log(this.collection)

		/*
		for(var j = 0; j < this.collection.length; j++){
			if(this.collection[j].tvid == this.seasons[i].id){
				console.log("match")

				var button = document.getElementById("request").style.display = "none"
				// .setAttribute("style","")
			}else{
				console.log("no match")
			}
		}
		*/

	}
})
.subscribe(res => {
})	




		

		this.id = this.navParams.get("id")
		// console.log(this.id)
		this.tvApiProvider.getTvDetails(this.id)
		// this.title = this.navParams.get("name")
		
	  	this.http.get("https://api.themoviedb.org/3/configuration?api_key=35be3be17f956346becdba89d4f22ca1")
	  	.map(res => {
	  		this.base_url = res.json().images.base_url
	  		this.poster_sizes = res.json().images.poster_sizes[0]
	  		this.backdrop_sizes = res.json().images.poster_sizes[2]
	  	})
	  	.subscribe(tmdbConfig => {
		})
  
	 //  	//tv details
		// this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"?api_key="+this.APIKEY+"&language=en-US")
  // 		.map(res => {
  // 			// console.log(res.json())
  // 			this.tvDetails=res.json()
  // 			this.poster = res.json().poster_path
  // 			this.backdrop = res.json().backdrop_path
  // 			this.rating = res.json().vote_average
  // 			this.seasons = res.json().seasons

  // 			for(var i=0;i<this.seasons.length;i++){
  // 				this.season_number = this.seasons[i].season_number
  // 				// console.log(this.seasons[i].id)
  // 				console.log(this.collection)

  // 				// for(var j = 0; j < this.collection.tv.length; j++){
  // 				// 	if(this.collection.tv[j].tvid == this.seasons[i].id){
  // 				// 		console.log("match")
  // 				// 	}else{
  // 				// 		console.log("no match")
  // 				// 	}
  // 				// }

		// 		// this.storage.get('friend')
		// 		// .then((value)=>{
		// 		// 	this.friends = value
		// 		// 	let j = 0;

		// 		// 	while(this.friends[j]){
						
		// 		// 		this.utilsProvider.gettv(this.friends[j]._id)
		// 		// 		.subscribe((tvdata)=>{
		// 		// 			// collection.tv = tvdata.data
		// 		// 			// console.log(collection.tv)	

		// 		// 			let k = 0

		// 		// 			while(tvdata.data[k]){
		// 		// 				// console.log(this.seasons[i].id)
		// 		// 				// if(tvdata.data[k].tvid == this.seasons[i].id){
		// 		// 				// 	console.log("match")
		// 		// 				// }else{
		// 		// 				// 	console.log("no match")
		// 		// 				// }
		// 		// 				// k++;
		// 		// 			}
		// 		// 		})	

		// 		// 		j++;
						

		// 		// 	}

		// 		// })	  				


  // 			}
  // 		})
  // 		.subscribe(res => {
  // 		})

  		//similar shows
  		this.http.get("https://api.themoviedb.org/3/tv/"+this.id+"/similar?api_key="+this.APIKEY+"&language=en-US&page=1")
  		.map(res =>{
  			this.similar=res.json().results
  		})
  		.subscribe(res=>{

  		})

 
	}

	addToCart(get){
		
		

		
		get.title = this.title

		console.log("SEASON DETAIL:",get)


		
		this.utilsProvider.addItemToCart(get)
		this.utilsProvider.addToTitles(this.title)
		let toast = this.toastCtrl.create({
			message:"Added to cart",
			duration:1500,
			position:"middle"
		})
		toast.present();
	}

	addToTvCollection(data){
		let tvdetails={
			episode_count:data.data.episode_count,
			tvid:data.data.id,
			poster_path:data.data.poster_path,
			season_number:data.data.season_number,
			title:data.title,
			userId:this._userdata
		}

		console.log(tvdetails)

		let alert = this.alertCtrl.create({
			title:"Adding To Collection",
			buttons:[
				{
					text:"Ok",
					handler:()=>{
						this.utilsProvider.createtv(tvdetails)
						.subscribe((data)=>{
							console.log(data)
						})
					}
				},
				{
					text:"Nope",
					role:"cancel",
					handler:()=>{
						//do something here besides console.log("done did")
					}
				}
			],
			cssClass:'alertCustomCss'
		})
		
		alert.present()
	}


	viewCart(){
		let cartModal = this.modalCtrl.create(CartPage)
		cartModal.onDidDismiss(data=>{
			// console.log(data)
		})
		cartModal.present()
	}  

	//close movieModal
	onClose(remove = false){
	    this.viewCtrl.dismiss(remove);
	}

	scrollToTop(){
		this.content.scrollToTop();
	}

}
