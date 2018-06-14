import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingListReducer from './store/shopping-list.reducers';
import { AppState } from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  shoppingList$: Observable<Ingredient[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.shoppingList$ = this.store.select(fromShoppingListReducer.selectAllIngredients);
  }

  editIngredient(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
