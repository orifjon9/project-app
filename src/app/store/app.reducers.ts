import { ActionReducerMap } from '@ngrx/store';

import * as interfaceFromShoppingList from 'app/shopping-list/store/state.interface';
import * as fromShoppingList from 'app/shopping-list/store/shopping-list.reducers';
import * as interfaceFromAuth from 'app/auth/store/state.interface';
import * as fromAuth from 'app/auth/store/auth.reducers';

export interface AppState {
    shoppingList: interfaceFromShoppingList.State,
    auth: interfaceFromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducers
};
