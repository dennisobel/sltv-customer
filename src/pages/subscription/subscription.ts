import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { SubscriptionProvider } from '../../providers/subscription/subscription'
import { HomePage } from '../home/home';
import { PLATFORM_WORKER_APP_ID } from '@angular/common/src/platform_id';

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  private subscription:any[]=[];
  private userData:any;
  private phoneNumber:any;
  private userName:any;

  constructor(
    private subProvider: SubscriptionProvider,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.subscription.push(
      {period:"Weekly",amount:"50.00",description:"Unlimited movies/tv series. Only applicable for USB/SoftCopy deliveries"},
      {period:"Monthly",amount:"150.00",description:"Unlimited movies/tv series. Only applicable for USB/SoftCopy deliveries"}
    )

    console.log('ionViewDidLoad SubscriptionPage');
    this.userData = this.navParams.get('data')
    this.userName = this.userData.userName
    this.phoneNumber = this.userData.phoneNumber;
    console.log("USERDATA:",this.userData)
  }

  weekly(){
    const loader: any = this.loadingCtrl.create(
      {
        content: 'Please wait while we log you in...'
      }
    );
    loader.present() 
    var today = new Date();
    var newdate = new Date();
    newdate.setDate(today.getDate()+7);

    const subscriptionData = {
      type: "weekly",
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      amount: 50,
      subscriptionTime: today,
      expiryDate: newdate 
    }
    console.log(subscriptionData)
    this.subProvider.Subscribe(subscriptionData).then((data:any)=>{
      console.log("WEEKLY DATA:",data)
      if(data.success == true && data.data.status == "active"){
        this.navCtrl.setRoot(HomePage,{data}).then(()=>{
          loader.dismiss()
        })
      }
    })   
  }

  monthly(){
    const loader: any = this.loadingCtrl.create(
      {
        content: 'Please wait while we log you in...'
      }
    );
    loader.present() 

    var today = new Date();
    var newdate = new Date();
    newdate.setDate(today.getDate()+28);

    const subscriptionData = {
      type: "monthly",
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      amount: 10,
      subscriptionTime: today,
      expiryDate: newdate 
    }
    console.log(subscriptionData)
    this.subProvider.Subscribe(subscriptionData).then((data:any)=>{
      console.log("MONTHLY DATA:",data)
      if(data.success == true && data.data.status == "active"){
        this.navCtrl.setRoot(HomePage,{data}).then(()=>{
          loader.dismiss()
        })
      }
    })   
  }

  payperitem(){
    
    const loader: any = this.loadingCtrl.create(
      {
        content: 'Please wait while we log you in...'
      }
    );
    loader.present() 
    const subscriptionData = {
      type: "payperitem",
      userName: this.userName,
      phoneNumber: this.phoneNumber,
      amount: null
    }

    
    
    console.log(subscriptionData)
    this.subProvider.Subscribe(subscriptionData).then((data:any)=>{
      console.log("PAY PER ITEM DATA:",data)
      if(data.success == true && data.data.status == "active"){
        this.navCtrl.setRoot(HomePage,{data}).then(()=>{
          loader.dismiss()
        })
      }
    })  
  }

  handleSubscription(data){
    var today = new Date();
    var newdate = new Date();
    newdate.setDate(today.getDate()+28);

    const loader: any = this.loadingCtrl.create(
      {
        content: 'Please wait while we log you in...'
      }
    );
    loader.present() 

    const subscriptionData:any = {
      subscriptionType : data.period,
      userName: this.userName,
      phoneNumber: this.phoneNumber
    }

    if(data.type !== "Pay Per Item"){
      subscriptionData.subscriptionTime = today,      
      subscriptionData.expiryDate = newdate,
      subscriptionData.amount = data.amount 
    }

    console.log("SUBSCRIPTION DATA:",subscriptionData);

    this.subProvider.Subscribe(subscriptionData).then((data:any)=>{      
      if(data.success == true && data.data.status == "active"){
        this.navCtrl.setRoot(HomePage,{data}).then(()=>{
          loader.dismiss() 
        })
      }
    })     
  }
}
 