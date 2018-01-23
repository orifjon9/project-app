import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class RecipeService {
  private baseApiUrl = 'https://orif-recipe-book.firebaseio.com/recipe.json';

  private recipes: Recipe[] = [];
  recipeChangeEvent = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService,
    private http: Http,
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
    return this.http.put(this.baseApiUrl + '?auth=' + this.authService.getToken(), this.recipes)
      .map((response: Response) => {
        return response.ok;
      });
  }

  load() {
    return this.http.get(this.baseApiUrl + '?auth=' + this.authService.getToken())
      .map((response: Response) => {
        if (response.ok) {
          const recipes = response.json() as Recipe[];
          this.recipes = [];
          this.addRecipes(recipes);
        }
      });
  }
}
