import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  editForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] != null;

      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe['ingredients']) {
        recipe.ingredients.forEach((item) => {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(item.name, Validators.required),
            'amount': new FormControl(item.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }));
        });
      }
    }

    this.editForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient() {
    (<FormArray>this.editForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onSubmit() {
  }
}
