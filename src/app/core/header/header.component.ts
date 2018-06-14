import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from '../../shared/ingredient.model';
import { AppState } from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/state.interface';
import * as fromAuthActions from '../../auth/store/auth.actions';
import * as fromRecipeActions from '../../recipes/store/recipe.actions';
import * as fromIngredientReducer from '../../shopping-list/store/shopping-list.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  numberIngredients = 0;
  authState: Observable<fromAuth.State>;
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.store.select(fromIngredientReducer.selectTotalIngredients)
      .subscribe(
      data => this.numberIngredients = data);
      this.authState = this.store.select('auth');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveRecipes() {
    this.store.dispatch(new fromRecipeActions.SaveRecipes());
  }

  onLoadRecipes() {
    this.store.dispatch(new fromRecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }
}
