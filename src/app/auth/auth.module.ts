import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { SigninComponent } from "app/auth/signin/signin.component";
import { SignupComponent } from "app/auth/signup/signup.component";
import { AuthRoutingModule } from "app/auth/auth-routing.module";

@NgModule({
    declarations: [SigninComponent, SignupComponent],
    imports: [FormsModule, AuthRoutingModule]
})
export class AuthModule { }
