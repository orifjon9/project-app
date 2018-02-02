import { NgModule } from '@angular/core';
import { HomeComponent } from 'app/core/home/home.component';
import { HeaderComponent } from 'app/core/header/header.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ShoppingListService } from 'app/services/shopping-list.service';
import { LoggingService } from 'app/services/logging.service';
import { RecipeService } from 'app/services/recipe.service';
import { AuthService } from 'app/auth/auth.service';
import { AuthGuard } from 'app/auth/auth-guard';


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
        ShoppingListService,
        RecipeService,
        AuthService,
        AuthGuard]
})
export class CoreModule { }
