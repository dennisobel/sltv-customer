import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviedetailPage } from './moviedetail';

@NgModule({
  declarations: [
    MoviedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviedetailPage),
  ],
})
export class MoviedetailPageModule {}
