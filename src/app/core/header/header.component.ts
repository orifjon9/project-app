import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from 'app/shared/ingredient.model';
import { RecipeService } from 'app/services/recipe.service';
import { AuthService } from 'app/auth/auth.service';
import { AppState } from '../../_store/app-state.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  numberIngredients = 0;
  private subscription: Subscription;

  constructor(private store: Store<AppState>,
    private recipeService: RecipeService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
      data => this.numberIngredients = data.ingredients.length);
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
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }
}
