import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { AppState } from 'app/store/app.reducers';

import * as fromAuthActions from '../store/auth.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private store: Store<AppState>,
              private router: Router) { } ngOnInit() { }

  onSignup(form: NgForm) {
    this.store.dispatch(new fromAuthActions
      .TrySignup({ username: form.value.email, password: form.value.password }));
      this.router.navigate(['/']);
  }
}
