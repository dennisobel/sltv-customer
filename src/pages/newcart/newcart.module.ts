import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewcartPage } from './newcart';

@NgModule({
  declarations: [
    NewcartPage,
  ],
  imports: [
    IonicPageModule.forChild(NewcartPage),
  ],
})
export class NewcartPageModule {}
