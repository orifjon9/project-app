import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedNavigation = 'recipe';
  title = 'app works!';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDIGn0a2snm2Jsyb470DAk-4nDAYGA7zE8',
      authDomain: 'orif-recipe-book.firebaseapp.com',
    });
  }

  onNavigate(event: string) {
    this.loadedNavigation = event;
  }
}
