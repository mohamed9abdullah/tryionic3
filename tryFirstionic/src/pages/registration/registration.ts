import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import * as firebase from 'Firebase';
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
  FullName:string="";
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
    MyUser=[];
    constructor(public navCtrl: NavController,public alertCtrl:AlertController,public storage:Storage) {
          
      debugger;
      this.MyUser=[];
      this.storage.get('Customer_Heraf').then((value)=>{

        this.MyUser.push(JSON.parse(value));
       //console.log("Customer_Heraf:"+this.MyUser);
       if(this.MyUser.length>0){
         navCtrl.setRoot("HomePage");
       }
      
      }).catch(err=>{
  
        console.log("Register Page Error :"+err);
      });

  }

 onRegisterClick(){
 
  if(this.FullName.trim()!=="" &&this.Password.trim()!=="" && this.Phone.trim()!==""){

    if(this.ConfirmPassword==this.Password){
                               
      this.MyUser.push({
        FullName:this.FullName,
        Password:this.Password,
        ImgURL:this.ImgURL,
        Phone:this.Phone,
        DateOfBirth:this.DateOfBirth,
 
        });

        firebase.database().ref("customers").push({
          FullName:this.FullName,
          Password:this.Password,
          ImgURL:this.ImgURL,
          Phone:this.Phone,
          DateOfBirth:this.DateOfBirth,
   
         }).then(resolve=>{



         console.log("Data Saved To DB");

          debugger;
          this.storage.set("Customer_Herfawy",JSON.stringify(this.MyUser)).then(resolve=>{

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
