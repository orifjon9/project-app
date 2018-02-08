import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Recipe } from 'app/shared/recipe.model';
import { RecipeState } from 'app/recipes/store/state.interface';
import * as fromRecipeActions from '../store/recipe.actions';

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
    private router: Router,
    private store: Store<RecipeState>) { }

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
      this.store
        .select('recipes')
        .subscribe(recipeState => {
          const recipe = recipeState.recipes[this.id];
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
        });
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

  getIngrdients() {
    return (<FormArray>this.editForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.editForm.value);
    if (this.editMode) {
      this.store.dispatch(new fromRecipeActions.UpdateRecipe({ index: this.id, updatedRecipe: this.editForm.value }));
    } else {
      this.store.dispatch(new fromRecipeActions.AddRecipe(this.editForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }
}
