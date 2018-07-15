import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the WorkerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-worker-details',
  templateUrl: 'worker-details.html',
})
export class WorkerDetailsPage {
WorkerItem={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   // debugger;
    this.WorkerItem=navParams.get("WorkerItem");
    //console.log("this is WorkerItem:"+this.WorkerItem);    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WorkerDetailsPage');
  }

}
