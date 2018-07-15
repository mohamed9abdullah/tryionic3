import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ="RegistrationPage";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {


    var config = {
    apiKey: "AIzaSyC7vBerVmOkgU07rPTyBLfe3k9WKg9eQEg",
    authDomain: "herafy-87392.firebaseapp.com",
    databaseURL: "https://herafy-87392.firebaseio.com",
    projectId: "herafy-87392",
    storageBucket: "herafy-87392.appspot.com",
    messagingSenderId: "729922009979"
  };
  firebase.initializeApp(config);

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home - الرئيسية', component: "HomePage" },
      { title: 'Cities - المدن', component: "CitiesPage" },
      { title: 'My Profile - ملفى الشخصى', component: "MyAccountPage" },



    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
