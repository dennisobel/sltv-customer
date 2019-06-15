import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoreviewPage } from './storeview';

@NgModule({
  declarations: [
    StoreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(StoreviewPage),
  ],
})
export class StoreviewPageModule {}
