import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from '../core/home/home.component';
import { HeaderComponent } from '../core/header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoggingService } from '../services/logging.service';
import { AuthGuard } from '../auth/auth-guard';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';


@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent],
    imports: [
        AppRoutingModule,
        SharedModule],
    exports: [
        AppRoutingModule,
        HeaderComponent],
    providers: [
        LoggingService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
    ]
})
export class CoreModule { }
