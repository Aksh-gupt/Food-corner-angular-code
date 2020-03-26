import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { RecipepageComponent } from './recipepage/recipepage.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { MyorderComponent } from './myorder/myorder.component';
import { CategoryComponent } from './home/category/category.component';
import { PopularComponent } from './home/popular/popular.component';
import { PriceComponent } from './checkout/price/price.component';
import { AdditemComponent } from './checkout/additem/additem.component';
import { ItemComponent } from './checkout/item/item.component';
import { IngredientsService } from './result/ingredients.service';
import QueryService from './shared/query.service';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MostorderComponent } from './result/mostorder/mostorder.component';
import { ResultrecipeComponent } from './result/resultrecipe/resultrecipe.component';
import { RecipepageService } from './recipepage/recipepage.service';
import { PageComponent } from './recipepage/page/page.component';
import { UserService } from './shared/user.service';
import { AuthenticationService } from './shared/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutService } from './checkout/checkout.service';
import { OrderlistComponent } from './myorder/orderlist/orderlist.component';
import { SelectaddressComponent } from './myorder/selectaddress/selectaddress.component';
import { OrderplacedComponent } from './myorder/orderplaced/orderplaced.component';
import { LikeComponent } from './like/like.component';
import { LikeServing } from './like/like.serving';
import { AnalyseComponent } from './analyse/analyse.component';
import { EachMonthComponent } from './analyse/each-month/each-month.component';
import { EachMonthLineComponent } from './analyse/each-month-line/each-month-line.component';
import { EachMonthpieComponent } from './analyse/each-month-pie/each-monthpie.component';
import { AnalyseService } from './analyse/analyse.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    HomeComponent,
    ResultComponent,
    RecipepageComponent,
    CheckoutComponent,
    SigninComponent,
    SignupComponent,
    MyprofileComponent,
    MyorderComponent,
    CategoryComponent,
    PopularComponent,
    PriceComponent,
    AdditemComponent,
    ItemComponent,
    MostorderComponent,
    ResultrecipeComponent,
    PageComponent,
    OrderlistComponent,
    SelectaddressComponent,
    OrderplacedComponent,
    LikeComponent,
    AnalyseComponent,
    EachMonthComponent,
    EachMonthpieComponent,
    EachMonthLineComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  provider: [IngredientsService, 
    QueryService,
    RecipepageService,
    UserService,
    AuthenticationService,
    CheckoutService,
    LikeServing,
    AnalyseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
