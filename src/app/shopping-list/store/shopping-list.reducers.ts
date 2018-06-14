import * as ShoppingListActions from './shopping-list.actions';
import * as fromShoppingListAdapter from './shopping-list.adapter';
import * as fromShoppingListState from './state.interface';

import { Ingredient } from '../../shared/ingredient.model';
import { State } from './state.interface';
import { createSelector, createFeatureSelector } from '@ngrx/store';

const initialState: State = fromShoppingListAdapter.adapter.getInitialState({
    ids: [0, 1, 2],
    entities: [
        new Ingredient(0, 'Meat', 25),
        new Ingredient(1, 'Potatoes', 5),
        new Ingredient(2, 'Tomatoes', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
});

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT: {
            action.payload.id = ++state.ids.length;
            return fromShoppingListAdapter.adapter.addOne(action.payload, state);
        }
        case ShoppingListActions.ADD_INGREDIENTS: {
            let length = state.ids.length;
            action.payload.forEach(item => item.id = ++length);
            return fromShoppingListAdapter.adapter.addMany(action.payload, state);
        }
        case ShoppingListActions.UPDATE_INGREDIENT: {
            return fromShoppingListAdapter.adapter.updateOne({ id: state.editedIngredientIndex, changes: action.payload.ingredient }, state)
            // const ingredient = state.ingredients[state.editedIngredientIndex];
            // const upgradedIngredient = {
            //     ...ingredient,
            //     ...action.payload.ingredient
            // };
            // const ingredients = [...state.ingredients];
            // ingredients[state.editedIngredientIndex] = upgradedIngredient;
            // return {
            //     ...state,
            //     ingredients: ingredients,
            //     editedIngredient: null,
            //     editedIngredientIndex: -1
            // };
        }
        case ShoppingListActions.DELETE_INGREDIENT: {
            // const ingredients = [...state.ingredients];
            // ingredients.splice(state.editedIngredientIndex, 1);
            // return {
            //     ...state,
            //     ingredients: ingredients,
            //     editedIngredient: null,
            //     editedIngredientIndex: -1
            // };
            return state;
        }
        case ShoppingListActions.START_EDITING: {
            const editingIngredient = { ...state.entities[action.payload] };
            return fromShoppingListAdapter.adapter.updateOne({ id: editingIngredient.id, changes: editingIngredient }, {
                ...state, editedIngredient: editingIngredient,
                editedIngredientIndex: action.payload
            });
            // 
            // return {
            //     ...state,
            //     editedIngredient: editingIngredient,
            //     editedIngredientIndex: action.payload
            // };
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

export const getState = createFeatureSelector<fromShoppingListState.State>('shoppingList');

export const selectIngredientIds = createSelector(getState, fromShoppingListAdapter.selectIngredientIds);
export const selectAllIngredients = createSelector(getState, fromShoppingListAdapter.selectAllIngredients);
export const selectTotalIngredients = createSelector(getState, fromShoppingListAdapter.selectTotalIngredients);
export const selectIngredientEntities = createSelector(getState, fromShoppingListAdapter.selectIngredientEntities);

