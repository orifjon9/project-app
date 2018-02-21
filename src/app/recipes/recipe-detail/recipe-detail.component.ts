import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from '@ngrx/store';

import { Recipe } from "../../shared/recipe.model";
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeState } from '../../recipes/store/state.interface';
import { Observable } from 'rxjs/Observable';
import * as fromRecipeState from '../store/state.interface';
import * as fromRecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<RecipeState>) {

    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.store.select('recipes')
        .subscribe((recipeState: fromRecipeState.State) => {
          this.recipe = recipeState.recipes[this.id];
        });
    });
  }
  ngOnInit() {
  }

  OnAddShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new fromRecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
