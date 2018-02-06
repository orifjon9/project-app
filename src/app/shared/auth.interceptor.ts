
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';

import * as fromApp from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/state.interface';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!' + req);
        return this.store.select('auth')
        .take(1)
        .switchMap((authState: fromAuth.State) => {
            const copiedReq = req.clone({ params: req.params.append('auth', authState.token) });
            return next.handle(copiedReq);
        });
    }
}
