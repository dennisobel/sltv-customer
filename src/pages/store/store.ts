import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';
import { AuthenticationProvider } from "../../providers/authentication/authentication"
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html',
})
export class StorePage {
  private retailers:any[]=[]
  private store = 'home'
  private order:any = {}
  private homeDel:any[]=[];
  private orderNPick:any[]=[];

  constructor(
    private socket: Socket,
    private utils: UtilsProvider,
    private platform: Platform,
    private storage: Storage,
    private navCtrl: NavController, 
    private actionsheetCtrl: ActionSheetController,
    private navParams: NavParams,
    private auth: AuthenticationProvider,) {
  }

  ionViewDidLoad() {
    // Get retailers
		this.auth.AllUsers().then((data:any) => {
			console.log("ALL USERS:",data)
      // this.retailers = data.user;
      this.homeDel = data.users.homeDel;
      this.orderNPick = data.users.orderNPick;

      console.log('USERS',{home:this.homeDel,pick:this.orderNPick})
      
      // Get Orders
      this.order = this.navParams.get('order')
      console.log('ORDER:',this.order)
		})
  }

  onSelect(data){
    console.log("STORE:",data)
    this.order.retailer = data._id
    console.log(this.order)
  }

  onView(data){
    console.log("STORE:",data)
  }

	onClose(remove = false){
	    this.navCtrl.pop()
  }  
  
  openMenu(){
    let actionSheet = this.actionsheetCtrl.create({
      title: "Cart Actions",
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text:"Place Order",
          icon: !this.platform.is("ios")?"cash":null,
          handler: () => {
						this.utils.postMovieTvShowCart(this.order)
						.then((data:any)=>{
							console.log("CART SERVER FEEDBACK:",data)
							// if successful then send notification
							if(data.success == true){
								this.socket.emit("orderNotification",({data:data.data}));
							}
						})
          }
        }
      ]
    })

    actionSheet.present()
  }

}
