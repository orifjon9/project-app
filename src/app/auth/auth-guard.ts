import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'app/store/app.reducers';
import * as fromAuthState from 'app/auth/store/state.interface';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private store: Store<fromApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.isAuthenticated();
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.isAuthenticated();
    }

    private isAuthenticated() {
        return this.store.select('auth')
            .take(1)
            .map((authState: fromAuthState.State) => authState.isAuthenticated);
    }
}
