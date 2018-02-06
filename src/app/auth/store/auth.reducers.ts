import { State } from 'app/auth/store/state.interface';
import * as AuthActions from './auth.actions';

const initAuth: State = {
    token: null,
    isAuthenticated: false
};

export function authReducers(state = initAuth, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNIN:
        case AuthActions.SIGNUP: {
            return {
                ...state,
                isAuthenticated: true,
            };
        }
        case AuthActions.LOGOUT: {
            return {
                ...state,
                token: null,
                isAuthenticated: false
            };
        }
        default:
            return state;
    }
}
