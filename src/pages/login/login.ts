import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, PopoverController, App } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SubscriptionProvider } from '../../providers/subscription/subscription';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
    private login: FormGroup;
    private nav:any; 
 
    constructor(
        private storage: Storage,
        private appCtrl: App,
        private formBuilder: FormBuilder,
        private subProvider: SubscriptionProvider,
        private authProvider: AuthenticationProvider,
        private alertCtrl: AlertController,
        private viewCtrl: ViewController,
        private loadingCtrl: LoadingController,
        private popoverCtrl: PopoverController,
        private navCtrl: NavController, 
        private navParams: NavParams) {
    
          this.login = this.formBuilder.group({
            userName:['',Validators.required],
            password:['',Validators.required]
          })
      }
 
    ionViewDidLoad() {}
 
    handleLogin(page){
        // CHECK SUBSCRIPTION STATUS
        
        // console.log("phone:",this.login.value)
        this.subProvider.CheckSubscription(this.login.value.userName).then((data)=>{
          console.log("CHECK SUBSCRIPTION SERVER FEEDBACK",data)
        })

        // STORE USER DATA
        this.authProvider.SingleUser(this.login.value.userName).then((data)=>{
          this.storage.set('user',data)
        })
        

        // this.nav.setRoot(page)
        const loader: any = this.loadingCtrl.create(
          {
            content: 'Please wait while we log you in...'
          }
        );
        loader.present()    
        this.nav = this.appCtrl.getRootNavById('n4')
        this.authProvider.Login({data:this.login.value})
    
          .then((data:any)=>{
            // let _data = data
            console.log("LOGIN POST FEEDBACK:",data)
            /*
            return new Promise((resolve,reject) => {
              resolve(this.viewCtrl.dismiss())
            })
            .then(() => {
              // this.presentPopover(page)
              console.log("SERVER FEEDBACK:",data)
              this.nav.setRoot(page,{data})
            })  
            */  
           if(data.success == true){
            
            this.navCtrl.setRoot(HomePage,{data}).then(()=>{
              loader.dismiss()
            })
           }else if(data.success == false){
            loader.dismiss()
            //  HANDLE WRONG CREDZ
            let wrongCredentials = this.alertCtrl.create({
              title:"Please Check Your Credentials",
              buttons:[
                {
                  text: "Ok",
                  role:'cancel',
                  handler: () => {
                    
                  }
                }
              ]
            })
            wrongCredentials.present()
           }
           
        })
        .then(()=>{
          
        })
        
      }  
}