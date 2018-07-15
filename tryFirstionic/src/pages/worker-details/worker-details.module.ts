import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkerDetailsPage } from './worker-details';

@NgModule({
  declarations: [
    WorkerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkerDetailsPage),
  ],
})
export class WorkerDetailsPageModule {}
