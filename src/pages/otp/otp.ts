import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthenticationProvider } from '../../providers/authentication/authentication'


@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {
  private otpform: FormGroup;
  private nav:any;
  private otpData:any={};  

  constructor(
    private formBuilder: FormBuilder,
    private authProvider: AuthenticationProvider,
    private appCtrl: App,
    private viewCtrl: ViewController,
    private navCtrl: NavController, 
    private navParams: NavParams
  ) {
    this.otpform = this.formBuilder.group({
      onetimepassword:['',Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  handleOTP(page){
    this.otpData = {val1:this.navParams.get('data'),val2:this.otpform.value}
    this.authProvider.OTP(this.otpData)
    .then((data:any)=>{
      console.log("SERVER OTP FEEDBACK:",data)
      if(data.success == true){
        /*
        return new Promise((resolve,reject) => {
          resolve(this.viewCtrl.dismiss())
        }).then(() => {
          // this.navCtrl.setRoot(page);
          this.nav.setRoot(page)
        })
        */
       this.navCtrl.setRoot(page,{data:data.docs[0]})
      }else if(data.success == false){
        // handle wrong otp
        // Handle Resend OTP
        console.log("RESEND OTP")
      }
    })

  }

  resendOTP() {

  }  

}
