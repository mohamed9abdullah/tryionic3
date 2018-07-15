import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import * as firebase from 'Firebase';
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
  MyUser={};UserProfile={};ConfirmPassword="";validData=true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl:AlertController) {
           
    this.MyUser={};
    this.storage.get('MyUserHeraf').then((value)=>{
      if(value){
            this.MyUser=JSON.parse(value);
          }else{
    
      navCtrl.setRoot("LoginPage");
         

    }
    
    }).catch(err=>{

      console.log("MyAccount Page Error :"+err);
    });

      
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad MyAccountPage');
  }

  onEditClick(){

      if(this.MyUser["FullName"].trim()!=="" &&this.MyUser["Password"].trim()!=="" && this.MyUser["Phone"].trim()!==""){
          this.validData=true;                     

          if(this.MyUser["Password"]==this.ConfirmPassword){
                firebase.database().ref("/customers/"+this.MyUser["key"]).update(this.MyUser)
                .then(resolve=>{

                        this.storage.set("MyUserHeraf",JSON.stringify(this.MyUser)).then(resolve=>{
                                console.log("Data Saved To LocalStorage");

                                let alert=this.alertCtrl.create({
                                            
                                  title:"Congratulations",
                                  buttons:["OK"],
                                  subTitle:"",
                                  message:" Your Information  Saved Successfully"
                                });
                                alert.present();


                              });
                    
                      },err=>console.log("Error from Updating Object:"+err)
                  )
                .catch(error=>{   console.log("Error from updating:"+error);});
                

         }else{
                                    
            let alert=this.alertCtrl.create({
                                      
              title:"Password and Confirm Password Doesn't match , please try again ",
              buttons:["OK"],
              subTitle:`${this.MyUser["FullName"]} ,Please try again `,
              message:""
            });
            alert.present();

          }


    }else{

      this.validData=false;                     
      let alert=this.alertCtrl.create({
                                 
        title:"Please Fill All Required Fields ",
        buttons:["OK"],
        subTitle:`${this.MyUser["FullName"]} ,Please try again `,
        message:""
      });
      alert.present();
  
     }

  }


  logout(){


    //this.storage.clear();
    this.navCtrl.setRoot("LoginPage");
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

}