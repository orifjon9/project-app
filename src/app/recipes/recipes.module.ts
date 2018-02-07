import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailComponent } from 'app/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'app/recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from 'app/recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from 'app/recipes/recipe-start/recipe-start.component';
import { RecipeItemComponent } from 'app/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from 'app/recipes/recipes.component';
import { RecipesRoutingModule } from 'app/recipes/recipes-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { recipeReducers } from 'app/recipes/store/recipe.reducer';

@NgModule({
    declarations: [
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeStartComponent,
        RecipeItemComponent,
        RecipesComponent
    ],
    imports: [CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes', recipeReducers)
    ]
})
export class RecipesModule { }
