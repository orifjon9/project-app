import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router/src/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(from: NgForm) {
    const email = from.value.email;
    const password = from.value.password;
    this.authService.signinUser(email, password);
  }
}
