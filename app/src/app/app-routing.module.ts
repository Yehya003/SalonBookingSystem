import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { CustomerComponent } from './customer/customer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { LoginComponent } from './login/login.component';
import { AboutPageComponent } from './about-page/about-page.component';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component:HomePageComponent,
  },

  {
    path: 'homepage',
    component:HomePageComponent,
  },

  {
    path: 'logout',
    component:LogoutComponent,
  },
  
  
  {
    path: 'manageBooking',
    component:ManageBookingComponent,
  },
  {
    path: 'booking',
    component:BookingComponent,
  },
  {
    path: 'register',
    component:CustomerComponent,
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'aboutPage',
    component:AboutPageComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
