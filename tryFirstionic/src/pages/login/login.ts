import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FullName:string="";validData=true;
  Password:string="";Phone:string="";
  MyUser={};AllCustomers=[];
  constructor(public navCtrl: NavController,public alertCtrl:AlertController,public storage:Storage) {
        
      this.MyUser={};
      this.storage.get('MyUserHeraf').then((value)=>{
        if(value){
              this.MyUser=JSON.parse(value);
             this.FullName= this.MyUser["FullName"];
             this.Password= this.MyUser["Password"];
             this.Phone= this.MyUser["Phone"];

            //console.log("Customer_Heraf:"+this.MyUser);
          /* if(this.MyUser["FullName"]!==""){
              navCtrl.setRoot("HomePage");
            }*/
      }else{
        navCtrl.setRoot("RegistrationPage");
      }
      
      }).catch(err=>{

        console.log("Login Page Error :"+err);
      });

  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad LoginPage');
  }
  onLoginClick(){

    if(this.FullName.trim()!=="" &&this.Password.trim()!=="" && this.Phone.trim()!==""){
      this.validData=true; 

      firebase.database().ref("/customers").on('value',response=>{
        this.AllCustomers=this.DataToArray2(response);
        this.AllCustomers=this.AllCustomers.filter(customer=>customer.FullName==this.FullName && customer.Password==this.Password &&customer.Phone==this.Phone)
        
      });
           
      if(this.AllCustomers.length>0){

        this.storage.set("MyUserHeraf",JSON.stringify(this.AllCustomers[0])).then(resolve=>{
          console.log("Data Saved To LocalStorage");

          this.navCtrl.setRoot("HomePage");
        });
      
      }
      else{

        let alert=this.alertCtrl.create({
                                 
          title:`${this.FullName} , Please try again `,
          buttons:["OK"],
          subTitle:"",
          message:"Data is not valid  "
        });
        alert.present();

      }

    }else{
      this.validData=false;                
      let alert=this.alertCtrl.create({
                                 
        title:"Please Fill All Required Fields ",
        buttons:["OK"],
        subTitle:`${this.FullName} , Please try again `,
        message:""
      });
      alert.present();
  
     }

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
