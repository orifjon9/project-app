import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'app/store/app.reducers';
import * as AuthActions from 'app/auth/store/auth.actions';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) { } ngOnInit() { }

  onSignin(from: NgForm) {
    const email = from.value.email;
    const password = from.value.password;
    this.store.dispatch(new AuthActions.TrySignin({ username: email, password: password }));
    this.router.navigate(['/']);
  }
}
