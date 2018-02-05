import * as ShoppingListActions from './shopping-list.actions';

import { Ingredient } from 'app/shared/ingredient.model';

const initialState = {
    ingredients: [
        new Ingredient('Meat', 25),
        new Ingredient('Potatoes', 5),
        new Ingredient('Tomatoes', 10)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        }
        default:
            return state;
    }
}
