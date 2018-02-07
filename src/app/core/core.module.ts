import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from 'app/core/home/home.component';
import { HeaderComponent } from 'app/core/header/header.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { LoggingService } from 'app/services/logging.service';
import { RecipeService } from 'app/services/recipe.service';
import { AuthGuard } from 'app/auth/auth-guard';
import { AuthInterceptor } from 'app/shared/auth.interceptor';
import { LoggingInterceptor } from 'app/shared/logging.interceptor';


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
        RecipeService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
    ]
})
export class CoreModule { }
