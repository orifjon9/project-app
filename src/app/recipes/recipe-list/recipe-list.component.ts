import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../../shared/recipe.model';
import { RecipeState, State } from '../../recipes/store/state.interface';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<State>;

  constructor(private router: Router,
    private store: Store<RecipeState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  onClickNewRecipe() {
    this.router.navigate(['recipes', 'new']);
  }
}
