import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { AuthService } from 'app/auth/auth.service';
import * as ShoppingListActions from '../_store/shopping-list.actions';

@Injectable()
export class RecipeService {
  private baseApiUrl = 'https://orif-recipe-book.firebaseio.com/recipe.json';

  private recipes: Recipe[] = [];
  recipeChangeEvent = new Subject<Recipe[]>();

  constructor(private httpClient: HttpClient,
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

  save() {
    /*return this.httpClient.put(this.baseApiUrl, this.recipes, {
      observe: 'body',
      params: new HttpParams().set('auth', this.authService.getToken())
    })
      .map((response: Recipe[]) => {
        return (response ? true : false);
      });*/

    const request = new HttpRequest('PUT', this.baseApiUrl, this.recipes, {
      reportProgress: true
    });

    return this.httpClient.request(request);
  }

  load() {
    return this.httpClient.get<Recipe[]>(this.baseApiUrl,
      {
        observe: 'body', // default, you can change it to response if you need get whole response info, events:
        responseType: 'json', // default, you can change it to any parameter
      })
      .map(recipes => {
        this.recipes = [];
        this.addRecipes(recipes);
      });
  }
}
