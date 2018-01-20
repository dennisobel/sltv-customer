import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { UtilsProvider } from "../../providers/utils/utils"
 
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
 
    phone_number: string;
    password: string;
    loading: any;
    usersessionarray:any[]=[];
    connected:any;
 
    constructor(
        public navCtrl: NavController, 
        public authService: AuthProvider, 
        //public socket: Socket, 
        public utilsProvider: UtilsProvider,
        public loadingCtrl: LoadingController,
        public toastCtrll: ToastController) {
 
    }
 
    ionViewDidLoad() {

        // this.getUsers().subscribe(res =>{            
        //     this.connected = res
        //     //console.log(this.connected)
        //     this.utilsProvider.connectedUsers(res)
        // })
        // console.log(this.connected)
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            phone_number: this.phone_number,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
            //LOGIN ERROR WRITE ALERT HERE!!!!
            let toast = this.toastCtrll.create({
                message:"Rectify login credentials and try again.",
                duration: 3000,
                position: "bottom",
                dismissOnPageChange: true 
            })

            toast.onDidDismiss(()=>{
                console.log("Dismissed toast")
            });

            toast.present();
        }); 
    }

    register(){
        this.showLoader();

        let details = {
            phone_number: this.phone_number,
            password: this.password
        };

        console.log(details)

        this.authService.createAccount(details).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
        });

    }
 
    launchSignup(){
        this.navCtrl.push(RegisterPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }

    //Connected users
    // getUsers(){
    //     let observable = new Observable(observer => {
    //         this.socket.on('connected',(data)=>{
    //             observer.next(data);
    //         });
    //     })
    //     return observable
    // }
 
}