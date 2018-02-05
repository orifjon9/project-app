import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from 'app/shared/ingredient.model';

export interface AppState {
    shoppingList: State
}

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient('Meat', 25),
        new Ingredient('Potatoes', 5),
        new Ingredient('Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            const ingredient = state.ingredients[action.payload.index];
            const upgratedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[action.payload.index] = upgratedIngredient;
            return {
                ...state,
                ingredients: ingredients
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(action.payload, 1);
            return {
                ...state,
                ingredients: ingredients
            };
        }
        default:
            return state;
    }
}
