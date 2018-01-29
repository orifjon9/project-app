import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    private token: string = null;

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response: any) => {
                console.log(response);
            })
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                console.log(response);
                this.getToken();
                this.router.navigate(['/']);
            })
            .catch(error => console.log(error));
    }

    signOut() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getToken()
            .then(tk => {
                this.token = tk;
                console.log(tk);
            });
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}
