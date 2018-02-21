import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';
import * as fromRecipeActions from './recipe.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../../shared/recipe.model';
import { RecipeState } from '../../recipes/store/state.interface';

@Injectable()
export class RecipeEffects {
    private baseApiUrl = 'https://orif-recipe-book.firebaseio.com/recipe.json';

    @Effect()
    recipeFetch = this.actions$
        .ofType(fromRecipeActions.FETCH_RECIPES)
        .switchMap((action: fromRecipeActions.FetchRecipes) => {
            return this.httpClient.get<Recipe[]>(this.baseApiUrl);
        }).map(recipes => {
            return {
                type: fromRecipeActions.SET_RECIPES,
                payload: recipes
            };
        }).take(1);
    @Effect({ dispatch: false })
    recipeSave = this.actions$
        .ofType(fromRecipeActions.SAVE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            const request = new HttpRequest('PUT', this.baseApiUrl, state.recipes, {
                reportProgress: true
            });
            return this.httpClient.request(request);
        });

    constructor(public actions$: Actions,
        public httpClient: HttpClient,
        public store: Store<RecipeState>) { }
}
