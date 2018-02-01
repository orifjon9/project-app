import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../shared/ingredient.model';

import { Subscription } from 'rxjs/Subscription';
import { RecipeService } from 'app/services/recipe.service';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  numberIngredients = 0;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService,
    private recipeService: RecipeService,
    public authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => this.numberIngredients = ingredients.length);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSaveRecipes() {
    this.recipeService.save().subscribe((result) => {

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
