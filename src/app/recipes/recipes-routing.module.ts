import { NgModule } from "@angular/core";
import { Routes, Route, RouterModule } from "@angular/router";
import { RecipesComponent } from "app/recipes/recipes.component";
import { RecipeStartComponent } from "app/recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "app/recipes/recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "app/recipes/recipe-detail/recipe-detail.component";
import { AuthGuard } from "app/auth/auth-guard";

const recipeRoutes: Routes = [{
    path: 'recipes', component: RecipesComponent,
    children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent }
    ],
    canActivateChild: [AuthGuard]
}];
@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }
