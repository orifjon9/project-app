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
  startedEditing = new Subject<number>();

  constructor(private loggingService: LoggingService) { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.notifyAboutChanges('addIngredient');
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(ingredient: string) {
    const index = this.ingredients.indexOf(this.ingredients.find(f => f.name == ingredient));
    this.ingredients.splice(index, 1);
    this.notifyAboutChanges('deleteIngredient');
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // this.ingredients.splice(index, 1, ingredient);
    // or
    this.ingredients[index] = newIngredient;
    this.notifyAboutChanges('updateIngredient');
  }

  private notifyAboutChanges(actionName: string) {
    this.ingredientsChanged.next(this.ingredients.slice());
    this.loggingService.logStatusChanged(actionName);
  }
}
