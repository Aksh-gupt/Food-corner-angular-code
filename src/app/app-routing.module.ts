import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { RecipepageComponent } from './recipepage/recipepage.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyorderComponent } from './myorder/myorder.component';
import { OrderlistComponent } from './myorder/orderlist/orderlist.component';
import { SelectaddressComponent } from './myorder/selectaddress/selectaddress.component';
import { OrderplacedComponent } from './myorder/orderplaced/orderplaced.component';
import { LikeComponent } from './like/like.component';
import { EachMonthComponent } from './analyse/each-month/each-month.component';
import { AnalyseComponent } from './analyse/analyse.component';
import { EachMonthLineComponent } from './analyse/each-month-line/each-month-line.component';
import { EachMonthpieComponent } from './analyse/each-month-pie/each-monthpie.component';

const appRoutes: Routes = [ 
    {path: '', component: HomeComponent},
    {path: 'result',component: ResultComponent},
    {path: 'recipepage', component: RecipepageComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'account', component: MyprofileComponent},
    {path: 'cart', component: CheckoutComponent},
    {path: 'order', component: MyorderComponent , children : [
        {path: '', component: OrderlistComponent},
        {path: 'placeorder', component: SelectaddressComponent},
        {path: 'orderplaced', component: OrderplacedComponent}
    ]},
    {path: 'like', component: LikeComponent},
    {path: 'analyse/month', component: AnalyseComponent, children: [
        {path: '', component: EachMonthComponent},
        {path: 'line', component: EachMonthLineComponent},
        {path: 'pie', component: EachMonthpieComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}