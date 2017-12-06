import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovielistPage } from './movielist';

@NgModule({
  declarations: [
    MovielistPage,
  ],
  imports: [
    IonicPageModule.forChild(MovielistPage),
  ],
})
export class MovielistPageModule {}
