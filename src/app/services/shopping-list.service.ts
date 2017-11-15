import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from './logging.service';
import { Subject } from 'rxjs/Subject';
/**
 * Created by orifjon9 on 5/22/2017.
 */

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Meat', 25),
    new Ingredient('Potatoes', 5),
    new Ingredient('Tomatoes', 10)
  ];

  statusRemove = new EventEmitter<string>();
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor(private loggingService: LoggingService) { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
    this.loggingService.logStatusChanged('addIngredient');
  }

  deleteIngredient(ingredient: string) {
    const index = this.ingredients.indexOf(this.ingredients.find(f => f.name == ingredient));
    this.ingredients.splice(index, 1);

    this.loggingService.logStatusChanged('deleteIngredient');
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      let storeIngredient: Ingredient = this.ingredients.find(i => i.name == ingredient.name);
      if (storeIngredient) {
        storeIngredient.amount += ingredient.amount;
      }
      else {
        this.ingredients.push(ingredient);
      }
    }

    this.ingredientsChanged.next(this.ingredients);
  }
}
