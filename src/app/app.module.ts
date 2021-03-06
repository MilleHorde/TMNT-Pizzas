import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {TMNT} from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from '../service/auth/auth.interceptor';
import {IngredientService} from '../service/ingredient.service';
import {UserService} from '../service/user.service';
import {NavbarService} from '../service/navbar.service';
import {PizzaService} from '../service/pizza.service';
import {AuthService} from '../service/auth/auth.service';
import {ConfigService} from '../service/config.service';
import {AuthGuard} from '../guard/auth.guard';
import {PizzasListPage} from '../pages/pizzas/list/list';
import {PizzaDetailsPage} from '../pages/pizzas/details/details';
import {PizzaEditPage} from '../pages/pizzas/edit/edit';
import {IngredientsListPage} from '../pages/ingredients/list/list';
import {IngredientDetailsPage} from '../pages/ingredients/details/details';
import {IngredientEditPage} from '../pages/ingredients/edit/edit';
import {UserProfilePage} from '../pages/users/profile/profile';
import {SignPage} from '../pages/users/sign/sign';
import {ConvertCtsPipe} from '../pipe/convertCts.pipe';
import {OrderByPipe} from '../pipe/orderby.pipe';
import {Camera} from '@ionic-native/camera';

@NgModule({
  declarations: [
    TMNT,
    PizzasListPage,
    PizzaDetailsPage,
    PizzaEditPage,
    IngredientsListPage,
    IngredientDetailsPage,
    IngredientEditPage,
    UserProfilePage,
    SignPage,
    ConvertCtsPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(TMNT),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TMNT,
    PizzasListPage,
    PizzaDetailsPage,
    PizzaEditPage,
    IngredientsListPage,
    IngredientDetailsPage,
    IngredientEditPage,
    UserProfilePage,
    SignPage
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    IngredientService,
    UserService,
    NavbarService,
    PizzaService,
    AuthService,
    ConfigService,
    AuthGuard
  ]
})
export class AppModule {}
