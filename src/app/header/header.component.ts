import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  numberIngredients  = 0;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => this.numberIngredients = ingredients.length);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
