import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  FullName:string="";validData=true;
  Password:string="";
  ConfirmPassword:string="";
  ImgURL:string="";
  Phone:string="";
 
  DateOfBirth:string="";
 /* MyCameraOptions:CameraOptions={
    quality: 100,
    destinationType: this.MyCamera.DestinationType.DATA_URL,
    encodingType: this.MyCamera.EncodingType.JPEG,
    mediaType: this.MyCamera.MediaType.PICTURE}
*/
    MyUser={};
    constructor(public navCtrl: NavController,public alertCtrl:AlertController,public storage:Storage) {
          
      this.MyUser={};
      this.storage.get('MyUserHeraf').then((value)=>{
        if(value){
              this.MyUser=JSON.parse(value);
            //console.log("Customer_Heraf:"+this.MyUser);
            if(this.MyUser["FullName"]!==""){
              navCtrl.setRoot("HomePage");
            }
      }
      
      }).catch(err=>{
  
        console.log("Register Page Error :"+err);
      });

  }

 onRegisterClick(){
 
  if(this.FullName.trim()!=="" &&this.Password.trim()!=="" && this.Phone.trim()!==""){
    this.validData=true;                
    
    if(this.ConfirmPassword==this.Password){
                               
      this.MyUser={
        FullName:this.FullName,
        Password:this.Password,
        ImgURL:this.ImgURL,
        Phone:this.Phone,
        DateOfBirth:this.DateOfBirth,
 
        };

        firebase.database().ref("customers").push({
          FullName:this.FullName,
          Password:this.Password,
          ImgURL:this.ImgURL,
          Phone:this.Phone,
          DateOfBirth:this.DateOfBirth,
   
         }).then(resolve=>{



         console.log("Data Saved To DB");

          this.storage.set("MyUserHeraf",JSON.stringify(this.MyUser)).then(resolve=>{

            console.log("Data Saved To LocalStorage");

            this.navCtrl.setRoot("HomePage");
          });

         });

       

         

     }else{
                           
      let alert=this.alertCtrl.create({
                                 
        title:"Password and Confirm Password Doesn't match , please try again ",
        buttons:["OK"],
        subTitle:`${this.FullName} ,Please try again `,
        message:""
      });
      alert.present();

     }

  }else{
    this.validData=false;                
    let alert=this.alertCtrl.create({
                               
      title:"Please Fill All Required Fields ",
      buttons:["OK"],
      subTitle:`${this.FullName} ,Please try again `,
      message:""
    });
    alert.present();

   }
         
        

  }

     /* getPicture(){

        this.MyCamera.getPicture(this.MyCameraOptions).then((ImgData)=>{


        this.ImgBytes = 'data:image/jpeg;base64,' + ImgData;
        //You can send it to Backend to create file in server and save path to DB
      }, (err) => {
      // Handle error
      });
    

      }*/


}
