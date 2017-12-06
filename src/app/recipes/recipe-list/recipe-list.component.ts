import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from 'app/shared/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.recipeChangeEvent
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClickNewRecipe() {
    this.router.navigate(['recipes', 'new']);
  }

}
