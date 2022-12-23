import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./jwt/login/login.component";

import {HomeComponent} from "./home/home.component";
import {UserProfileComponent} from "./user/user-profile/user-profile.component";
import {UserUpdteComponent} from "./user/user-updte/user-updte.component";

import {ChangePasswordComponent} from "./change-password/change-password.component";

import {OrderPastComponent} from "./order/order-past/order-past.component";
import { BookingComponent } from './order/booking/booking.component';
import {OrderWaitComponent} from "./order/order-wait/order-wait.component";
import {HouseIncomeComponent} from "./house/house-income/house-income.component";
import {CommentNoticeComponent} from "./house/comment-notice/comment-notice.component";
import {HouseSearchComponent} from "./house/house-search/house-search.component";




const routes: Routes = [
  {
    path: 'house',
    loadChildren: () => import('./house/house.module').then(module => module.HouseModule)
  }, {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'orders',
    loadChildren: () => import('./order/order.module').then(module => module.OrderModule)
  },{
    path: 'home',
    component: HomeComponent
  },{
    path : 'update/:id',
    component: UserUpdteComponent
  },
  {
    path : 'user/:id',
    component : UserProfileComponent
  },
  {
    path: 'orderPast/:start',
    component: OrderPastComponent
  },{
    path : 'booking/:start',
    component : BookingComponent
  }
  ,
  {
    path: 'orderWait/:start',
    component: OrderWaitComponent
  },
  {
    path: 'income',
    component: HouseIncomeComponent
  }
  ,
  {
    path: 'houseSearch',
    component: HouseSearchComponent
  }
  // {
  //   path:'change-password/:id',
  //   component : ChangePasswordComponent
  // }
  // ,
  // {
  //   path : ""
  // }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
