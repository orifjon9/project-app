import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from '@ngrx/store';

import { Recipe } from "../../shared/recipe.model";
import { RecipeService } from "../../services/recipe.service";
import * as ShoppingListActions from '../../_store/shopping-list.actions';
import { Ingredient } from 'app/shared/ingredient.model';
import * as fromShoppingList from '../../_store/shopping-list.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromShoppingList.AppState>) {

    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipeDetails = recipeService.getRecipeById(this.id);
    });
  }
  ngOnInit() {
  }

  OnAddShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetails.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
