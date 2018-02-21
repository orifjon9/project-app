import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from '../recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeItemComponent } from '../recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipesRoutingModule } from '../recipes/recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { recipeReducers } from '../recipes/store/recipe.reducer';
import { RecipeEffects } from '../recipes/store/recipe.effects';

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
        StoreModule.forFeature('recipes', recipeReducers),
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule { }
