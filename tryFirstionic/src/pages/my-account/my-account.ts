import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  MyUser=[];UserProfile={};ConfirmPassword="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl:AlertController) {
      this.MyUser=[];
      this.storage.get('Customer_Heraf').then((value)=>{
        debugger;

        this.MyUser.push(JSON.parse(value));
      this.UserProfile=JSON.parse(value);
        console.log("Customer_Heraf:"+this.MyUser);
     
      
      }).catch(err=>{

        console.log(err);
      });

      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }

  onEditClick(){

      if(this.MyUser[0].FullName.trim()!=="" &&this.MyUser[0].Password.trim()!=="" && this.MyUser[0].Phone.trim()!==""){
          if(this.MyUser[0].Password==this.ConfirmPassword){
          console.log("UserData is "+this.MyUser)
          }else{
                                    
            let alert=this.alertCtrl.create({
                                      
              title:"Password and Confirm Password Doesn't match , please try again ",
              buttons:["OK"],
              subTitle:`${this.MyUser[0].FullName} ,Please try again `,
              message:""
            });
            alert.present();

          }


    }else{
                           
      let alert=this.alertCtrl.create({
                                 
        title:"Please Fill All Required Fields ",
        buttons:["OK"],
        subTitle:`${this.MyUser[0].FullName} ,Please try again `,
        message:""
      });
      alert.present();
  
     }

  }
}