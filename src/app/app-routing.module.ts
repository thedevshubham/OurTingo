import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {  RegisterComponent } from './register/register.component';
import {  ProductsComponent } from './products/products.component';
import { DetailsComponent} from './details/details.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'products/:uid', component: ProductsComponent ,canActivate:[AuthGuard]},
  {path:'details/:Pid', component:DetailsComponent },
  {path:'cart/:uid', component:CartComponent }
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
