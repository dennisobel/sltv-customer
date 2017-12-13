import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoviesearchPage } from './moviesearch';

@NgModule({
  declarations: [
    MoviesearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MoviesearchPage),
  ],
})
export class MoviesearchPageModule {}
