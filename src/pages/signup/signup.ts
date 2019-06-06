import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LoginPage } from '../login/login';
import { OtpPage } from '../otp/otp';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  private signup : FormGroup;

  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    private authProvider: AuthenticationProvider,
    private navCtrl: NavController, 
    private navParams: NavParams,
    private viewCtrl: ViewController,    
  ) {
    this.signup = this.formBuilder.group({
      userName:['',Validators.required],
      phoneNumber:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ionViewDidLoad() {}

  handleOTP(page) {
    // console.log(this.signup.value)
    this.authProvider.Signup({data:this.signup.value})
    .then((data:any)=>{
      console.log("SIGNUP FEEDBACK:",data)
      if(data.exist == true){
        // HANDLE LOGIN
        /*
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        }).then(() => {
          // Send to login page
          this.navCtrl.setRoot(LoginPage)
        })
        */
       this.navCtrl.setRoot(LoginPage,{data})
      }else if(data.exist == false){
          this.storage.set('user',{data:data.doc})
        // HANDLE OTP
        /*
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        }).then(() => {
          // this.presentPopover(page,{data})
          this.navCtrl.setRoot(OtpPage)
        })
        */
       this.navCtrl.setRoot(OtpPage,{data})
      }
    })

        // // STORE USER DATA
        // this.authProvider.SingleUser(this.signup.value.userName).then((data)=>{
        //   this.storage.set('user',data)
        // })    
  }

  handleLogin(page){
    /*
    return new Promise((resolve,reject) => {
      resolve(this.viewCtrl.dismiss())
    }).then(() => {
      this.navCtrl.setRoot(LoginPage)
    })
    */
   this.navCtrl.setRoot(LoginPage)
  }  


 
}
