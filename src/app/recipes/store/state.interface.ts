import { Recipe } from "app/shared/recipe.model";
import { AppState } from "app/store/app.reducers";

export interface RecipeState extends AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[]
}
