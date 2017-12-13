import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeasonslistPage } from './seasonslist';

@NgModule({
  declarations: [
    SeasonslistPage,
  ],
  imports: [
    IonicPageModule.forChild(SeasonslistPage),
  ],
})
export class SeasonslistPageModule {}
