
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'app/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!' + req);
        //const copiedReq = req.clone({ headers: req.headers.set('','')});
        const copiedReq = req.clone({ params: req.params.append('auth', this.authService.getToken()) });
        return next.handle(copiedReq);
    }
}
