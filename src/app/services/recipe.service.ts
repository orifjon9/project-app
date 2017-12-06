import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test a recipe', 'This is a test recipe!',
      'http://www.seriouseats.com/images/2017/02/20170228-pressure-cooker-recipes-roundup-collage.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Carrot', 3)
      ]),
    new Recipe('Qozon kabob', 'Mutton – 1 kg, (it is better to take brisket — an ideal choice for this dish or ribs with fat meat) <br>Potatoes – 1-1,5 kg (take small round tubers, they effectively look in a ready dish)<br>Rump – 200 grams (mutton fat, without it a Qozon Kabob well some how not Kabob)<br>Spices – cumin, salt, pepper.',
      'https://i.mycdn.me/image?id=815772802188&t=0&plc=WEB&tkn=*SxwISgd3qr_JLyROb6V3NjgBBFE',
      [
        new Ingredient('Meat', 12),
        new Ingredient('Tomatoes', 1),
        new Ingredient('Onion', 2),
        new Ingredient('Potatoes', 3),
      ])
  ];

  recipeChangeEvent = new Subject<Recipe[]>();

  constructor(private slService: ShoppingListService) { }

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

}
