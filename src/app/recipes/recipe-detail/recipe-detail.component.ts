import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {

    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipeDetails = recipeService.getRecipeById(this.id);
    });
  }
  ngOnInit() {
  }

  OnAddShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipeDetails.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
