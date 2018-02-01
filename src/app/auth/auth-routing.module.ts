import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "app/auth/signup/signup.component";
import { SigninComponent } from "app/auth/signin/signin.component";

const authRouters: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }];
@NgModule({
    imports: [RouterModule.forChild(authRouters)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
