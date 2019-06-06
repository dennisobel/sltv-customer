import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviehomePage } from './moviehome';

@NgModule({
  declarations: [
    MoviehomePage,
  ],
  imports: [
    IonicPageModule.forChild(MoviehomePage)
  ],
})
export class MoviehomePageModule {}
