import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkersCitiesPage } from './workers-cities';

@NgModule({
  declarations: [
    WorkersCitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkersCitiesPage),
  ],
})
export class WorkersCitiesPageModule {}
