import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendcollectionPage } from './friendcollection';

@NgModule({
  declarations: [
    FriendcollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendcollectionPage),
  ],
})
export class FriendcollectionPageModule {}
