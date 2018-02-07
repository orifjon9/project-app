import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Ingredient } from 'app/shared/ingredient.model';
import { RecipeService } from 'app/services/recipe.service';
import { AppState } from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/state.interface';
import * as fromAuthActions from 'app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  numberIngredients = 0;
  authState: Observable<fromAuth.State>;
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
      data => this.numberIngredients = data.ingredients.length);
      this.authState = this.store.select('auth');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveRecipes() {
    this.recipeService.save().subscribe((result) => {
      console.log(result);
    });
  }

  onLoadRecipes() {
    this.recipeService.load().subscribe();
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }
}
