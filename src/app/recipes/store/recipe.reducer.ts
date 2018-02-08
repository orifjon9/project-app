import { State } from "app/recipes/store/state.interface";
import * as fromRecipeActions from './recipe.actions';
import { Recipe } from "app/shared/recipe.model";
import { Ingredient } from "app/shared/ingredient.model";

export const initState: State = {
    recipes: [
        new Recipe('Test1', 'tedtd detet etded', 'http://juliandance.org/wp-content/uploads/2016/01/RedApple.jpg',
            [new Ingredient('onion', 4)])
    ]
};

export function recipeReducers(state = initState, action: fromRecipeActions.RecipeActions) {
    switch (action.type) {
        case fromRecipeActions.SET_RECIPES: {
            return {
                ...state,
                recipes: [...action.payload]
            };
        }
        case fromRecipeActions.ADD_RECIPE: {
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        }
        case fromRecipeActions.UPDATE_RECIPE: {
            console.log(action.payload);
            const recipe = state.recipes[action.payload.index];
            const upgradedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipe[action.payload.index] = upgradedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        }
        case fromRecipeActions.DELETE_RECIPE: {
            const recipes = [...state.recipes];
            recipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: recipes
            };
        }
        default:
            return state;
    }
}
