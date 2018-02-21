import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from '../../shared/ingredient.model';
import { State } from './state.interface';

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
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const upgradedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = upgradedIngredient;
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            const ingredients = [...state.ingredients];
            ingredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        }
        case ShoppingListActions.START_EDITING: {
            const editingIngredient = { ...state.ingredients[action.payload] };
            return {
                ...state,
                editedIngredient: editingIngredient,
                editedIngredientIndex: action.payload
            };
        }
        case ShoppingListActions.STOP_EDIT: {
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        }
        default:
            return state;
    }
}
