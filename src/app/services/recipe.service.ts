import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { AuthService } from 'app/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService {
  private baseApiUrl = 'https://orif-recipe-book.firebaseio.com/recipe.json';

  private recipes: Recipe[] = [];
  recipeChangeEvent = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService,
    private httpClient: HttpClient,
    private authService: AuthService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChangeEvent.next(this.getRecipes());
  }

  addRecipes(recipes: Recipe[]) {
    this.recipes.push(...recipes);
    this.recipeChangeEvent.next(this.getRecipes());
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipeChangeEvent.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChangeEvent.next(this.getRecipes());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  save() {
    return this.httpClient.put(this.baseApiUrl + '?auth=' + this.authService.getToken(), this.recipes)
      .map((response: Recipe[]) => {
        return (response ? true : false);
      });
  }

  load() {
    return this.httpClient.get<Recipe[]>(this.baseApiUrl + '?auth=' + this.authService.getToken())
      .map(recipes => {
        this.recipes = [];
        this.addRecipes(recipes);
      });
  }
}
