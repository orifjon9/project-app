import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {LoggingService} from "../../services/logging.service";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetails: Recipe;

  constructor(private recipeService: RecipeService) {}
  ngOnInit() {
  }

  OnAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeDetails.ingredients);
  }
}
