import { ActionReducerMap } from '@ngrx/store';

import * as interfaceFromShoppingList from '../shopping-list/store/state.interface';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as interfaceFromAuth from '../auth/store/state.interface';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
    shoppingList: interfaceFromShoppingList.State,
    auth: interfaceFromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducers
};
