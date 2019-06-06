import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { AlertController} from 'ionic-angular';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable()

export class SocketProvider{
  constructor(
    public socket: Socket,
    public alertCtrl: AlertController
  ){}

  onConnect(){
    this.socket.on('connect',()=>{
    	var sessionid = this.socket.ioSocket.id;
      	console.log("socket id: ",sessionid)
    })
  }	

  onDisconnect(){
    this.socket.on('disconnect',()=>{
      console.log("connection lost")
    })
  }  

  requestSwap(data){
  	this.socket.emit('requestswap',data)  	
  }

  incomingSwap(){
    this.socket.on('incomingswap',(data)=>{
      console.log(data)
      let alert = this.alertCtrl.create({
        title: "New Order",
        buttons:[
          {
            text:"Ok",
            handler:()=>{
              // do something
            }
          },
          {
            text:"Nope",
            role:"cancel",
            handler:()=>{
              //do something here besides console.log("done did")
            }
          }
        ]
      })
      alert.present()
    })
  }

  readyForPickup(data){
	this.socket.on('pickup',(data)=>{
		console.log('ready')
	})
  }

  getConnectedUsers(){
  	return new Promise((resolve,reject)=>{
  		resolve(this.socket.emit('getconnectedusers'))
  	})
  	
  }

  emitConnectedUsers(){
	this.socket.on("emitconnectedusers",(data)=>{
		var _data = data
		// console.log(this.connected)
		// this.ionViewDidLoad()
	})  	
}

  getAllSockets(data){
	this.socket.on("getAllSockets",(data)=>{
		console.log(JSON.parse(data))
	})
  }

  getActiveUsers(){
  	this.socket.emit("_activeUsers")
  }

  addUser(data){
  	this.socket.emit("add_user",data)
  }


  // Oauth
  joinApp(data){
  	this.socket.emit('joinApp',data)
  }

  signIn(data){
  	this.socket.emit('signIn',data)
  }

  signUp(data){
    this.socket.emit('signUp',data)
  }

}
