import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
/**
 * Generated class for the WorkersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workers',
  templateUrl: 'workers.html',
})
export class WorkersPage {
HerfaItem:any;
WorkersList:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.HerfaItem=navParams.get("HerfaITem");
    //console.log("this is herfa:"+this.HerfaItem);
   
    firebase.database().ref("/users").on('value',response=>{
      this.WorkersList=this.DataToArray3(response);
      this.WorkersList=this.WorkersList.filter(x=>x.HerfaName==this.HerfaItem.FullName)
    });

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad WorkersPage');
  }

  itemTapped(event,worker){
    this.navCtrl.push("WorkerDetailsPage",{
      WorkerItem:worker
    })
  }

  DataToArray3(AllData) {
    let returnArr = [];

    AllData.forEach(childData => {
        let item = childData.val();
        item.key = childData.key;
        returnArr.push(item);
    });

    return returnArr;
  }
}
