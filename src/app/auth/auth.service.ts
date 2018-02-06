import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/app.reducers';

import * as fromAuth from '../../app/auth/store/auth.actions';

@Injectable()
export class AuthService {

    constructor(private router: Router,
                private store: Store<AppState>) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response: any) => {
                this.store.dispatch(new fromAuth.Signup());
                this.setToken();
            })
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                this.store.dispatch(new fromAuth.Signin());
                this.setToken();
                this.router.navigate(['/']);
            })
            .catch(error => console.log(error));
    }

    signOut() {
        firebase.auth().signOut();
        this.store.dispatch(new fromAuth.Logout());
    }

    private setToken() {
        firebase.auth().currentUser.getIdToken()
            .then(tk => {
                this.store.dispatch(new fromAuth.SetToken(tk));
            });
    }
}
