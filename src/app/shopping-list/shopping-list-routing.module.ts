import { Routes } from "@angular/router";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { ShoppingListComponent } from "app/shopping-list/shopping-list.component";
import { AuthGuard } from "app/auth/auth-guard";
import { ShoppingEditComponent } from "app/shopping-list/shopping-edit/shopping-edit.component";


const shoppingListRoutes: Routes = [
    {
        path: '', component: ShoppingListComponent,
        canActivate: [AuthGuard],
        children: [
            { path: ':id/edit', component: ShoppingEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(shoppingListRoutes)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
