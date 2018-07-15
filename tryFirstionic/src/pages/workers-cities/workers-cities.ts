import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the WorkersCitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-workers-cities',
  templateUrl: 'workers-cities.html',
})
export class WorkersCitiesPage {

  CityITem:any;
  WorkersList:any=[];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
  
      this.CityITem=navParams.get("CityITem");
      //console.log("this is CityITem:"+this.CityITem);
     
      firebase.database().ref("/users").on('value',response=>{
        this.WorkersList=this.DataToArray3(response);
        this.WorkersList=this.WorkersList.filter(x=>x.TownName==this.CityITem.FullName)
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
  