import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from 'app/auth/signup/signup.component';
import { SigninComponent } from 'app/auth/signin/signin.component';
import { AuthGuard } from 'app/auth/auth-guard';
import { HomeComponent } from 'app/core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
