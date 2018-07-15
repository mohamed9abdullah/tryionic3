import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as firebase from 'Firebase';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 MyUser=[];
 HandCraftsList:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
    /*this.storage.get('Customer_Heraf').then((value)=>{
      debugger;
      this.MyUser.push(JSON.parse(value));
      console.log("Customer_Heraf:"+this.MyUser);

      firebase.database().ref("/handcrafts").on('value',response=>{
     
        this.HandCraftsList=this.DataToArray2(response);
    
     });


    }).catch(err=>{

      console.log(err);
    });*/



    
    firebase.database().ref("/handcrafts").on('value',response=>{
     
      this.HandCraftsList=this.DataToArray2(response);
  
   });
    
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad HomePage');
  }
  DataToArray2(AllData) {
    let returnArr = [];

    AllData.forEach(childData => {
        let item = childData.val();
        item.key = childData.key;
        returnArr.push(item);
    });

    return returnArr;
  }

  itemTapped(event,herfa){
    this.navCtrl.push("WorkersPage",{
      HerfaITem:herfa
    })
  }

}
